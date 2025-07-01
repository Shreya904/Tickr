"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { ExpandableCardDemo } from "../../components/ExpandableCardDemo";

// Types

type DecodedToken = {
  email: string;
  username?: string;
  userid: string;
  exp: number;
  iat: number;
};

type Task = {
  id: string;
  title: string;
  description?: string;
  status?: string;
  deadline?: string;
  category?: string;
};

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
        router.push("/login");
      }
    }
  }, [router]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Failed to fetch tasks");

        setTasks(result.tasks || []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 py-8">
      {/* Profile Section */}
      <div className="mb-6 mx-auto max-w-3xl p-4 border border-white/10 rounded-lg bg-white/5 text-white flex justify-between items-center">
        <div>
          <p className="text-sm text-neutral-400">Logged in as:</p>
          <h3 className="text-lg font-semibold">
            {user?.username ?? "User"} ({user?.email})
          </h3>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/");
          }}
          className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* CTA Box */}
      <div className="mb-10 mx-auto w-full max-w-3xl rounded-xl border border-white/10 bg-white/5 px-6 py-6 shadow-md backdrop-blur-md">
        <h2 className="text-xl font-semibold text-white mb-2">
          Plan something great today 🚀
        </h2>
        <p className="text-sm text-neutral-300 mb-4">
          Create a new task to keep your goals on track. Stay productive and
          focused.
        </p>
        <button
          onClick={() => {
            router.push("/createTask");
          }}
          className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition"
        >
          + Create Task
        </button>
      </div>

      {/* Tasks */}
      <h1 className="text-2xl font-bold mb-6 text-white max-w-2xl mx-auto">
        My Tasks
      </h1>

      {tasks.length === 0 ? (
        <p className="text-center text-neutral-400">
          You don’t have any tasks yet.
        </p>
      ) : (
        <div className="w-full max-w-2xl mx-auto">
          <ExpandableCardDemo tasks={tasks} setTasks={setTasks} />
        </div>
      )}
    </div>
  );
}
