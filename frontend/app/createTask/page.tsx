"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Alert from "../../components/alert"; // adjust path if needed

type TaskForm = {
  title: string;
  description?: string;
  deadline?: string;
  category?: string;
};

export default function CreateTaskForm() {
  const router = useRouter();

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"blue" | "red" | "green">("blue");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskForm>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }

    // Dynamically import and initialize Flowbite Datepicker
    import("flowbite").then((flowbite) => {
      // @ts-expect-error: flowbite types are not available
      const Datepicker =
        flowbite?.Datepicker ||
        (flowbite?.default && flowbite.default.Datepicker);
      const inputEl = document.getElementById(
        "datepicker-input"
      ) as HTMLInputElement;
      if (inputEl && Datepicker) {
        new Datepicker(inputEl);
      }
    });
  }, [router]);

  const onSubmit = async (data: TaskForm) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAlertMessage("You must be logged in to create a task.");
      setAlertType("red");
      return router.push("/login");
    }

    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to create task");

      setAlertMessage("Task created successfully!");
      setAlertType("green");
      reset();

      // Redirect after a short delay to show the alert
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      setAlertMessage(err.message || "Something went wrong.");
      setAlertType("red");
      console.error("Task creation error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-white/5 backdrop-blur border border-white/10 rounded-xl text-white space-y-4"
    >
      <h2 className="text-xl font-bold text-sky-400">Create New Task</h2>

      {alertMessage && <Alert message={alertMessage} variant={alertType} />}

      {/* Title */}
      <input
        type="text"
        placeholder="Title"
        {...register("title", { required: "Title is required" })}
        className="w-full p-3 bg-transparent border border-white/20 rounded placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      {errors.title && (
        <p className="text-red-400 text-sm">{errors.title.message}</p>
      )}

      {/* Description */}
      <textarea
        placeholder="Description (optional)"
        {...register("description")}
        className="w-full p-3 bg-transparent border border-white/20 rounded placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />

      {/* Deadline */}
      <div className="relative max-w-sm">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
          <svg
            className="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input
          {...register("deadline")}
          type="text"
          id="datepicker-input"
          placeholder="Select date"
          data-datepicker
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>

      {/* Category */}
      <input
        type="text"
        placeholder="Category (e.g. design, coding)"
        {...register("category")}
        className="w-full p-3 bg-transparent border border-white/20 rounded placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-sky-600 text-white p-3 rounded hover:bg-sky-700 transition"
      >
        Create Task
      </button>
    </form>
  );
}
