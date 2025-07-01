"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "../hooks/outsideclicks";

type Task = {
  id: string;
  title: string;
  description: string;
  image?: string;
  status: "pending" | "in-progress" | "completed";
  content?: string | React.ReactNode | (() => React.ReactNode);
};

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export function ExpandableCardDemo({ tasks, setTasks }: Props) {
  const [active, setActive] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useOutsideClick(ref, () => setActive(null));

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useEffect(() => {
    if (active) {
      setEditTitle(active.title);
      setEditDescription(active.description);
    }
  }, [active]);

  const getInitials = (title: string) =>
    title
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const getGradientByStatus = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "from-green-500 to-teal-500";
      case "in-progress":
        return "from-yellow-400 to-orange-500";
      case "pending":
      default:
        return "from-gray-500 to-gray-700";
    }
  };

  const updateStatusPersisted = async (
    taskId: string,
    newStatus: Task["status"]
  ) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
      );
      if (active?.id === taskId) {
        setActive({ ...active, status: newStatus });
      }
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const handleUpdateTask = async () => {
    if (!active) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${active.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          status: active.status,
        }),
      });

      if (!res.ok) throw new Error("Failed to update task");
      const { task: updatedTask } = await res.json();

      setTasks((prev) =>
        prev.map((t) => (t.id === active.id ? updatedTask : t))
      );
      setActive(null);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleDeleteTask = async () => {
    if (!active) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${active.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete task");
      setTasks((prev) => prev.filter((t) => t.id !== active.id));
      setActive(null);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-10"
          />
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-50 grid place-items-center">
            <button
              className="absolute top-4 right-4 bg-white dark:bg-neutral-800 rounded-full h-8 w-8 flex items-center justify-center z-50"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </button>

            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-xl"
            >
              <div
                className={`w-full h-60 flex items-center justify-center bg-gradient-to-br ${getGradientByStatus(
                  active.status
                )}`}
              >
                <span className="text-white text-5xl font-bold">
                  {getInitials(active.title)}
                </span>
              </div>

              <div className="p-4 space-y-4">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                />

                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                />

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="status"
                    className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    Status:
                  </label>
                  <select
                    id="status"
                    value={active.status}
                    onChange={(e) =>
                      updateStatusPersisted(
                        active.id,
                        e.target.value as Task["status"]
                      )
                    }
                    className="rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-neutral-300 dark:border-neutral-600 mt-4">
                  <button
                    onClick={handleUpdateTask}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleDeleteTask}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Task Cards */}
      <div className="max-w-2xl mx-auto w-full space-y-2 mt-4">
        {tasks.map((task) => (
          <motion.div
            layoutId={`card-${task.id}-${id}`}
            key={task.id}
            onClick={() => setActive(task)}
            className="cursor-pointer flex gap-4 items-center bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
          >
            <div
              className={`w-14 h-14 rounded-lg flex items-center justify-center bg-gradient-to-br ${getGradientByStatus(
                task.status
              )}`}
            >
              <span className="text-white text-lg font-bold">
                {getInitials(task.title)}
              </span>
            </div>

            <div className="flex-1">
              <h4 className="font-semibold text-neutral-900 dark:text-white">
                {task.title}
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {task.description}
              </p>
            </div>

            <select
              value={task.status}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) =>
                updateStatusPersisted(task.id, e.target.value as Task["status"])
              }
              className="text-xs rounded-full px-2 py-1 font-medium bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </motion.div>
        ))}
      </div>
    </>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black dark:text-white"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
