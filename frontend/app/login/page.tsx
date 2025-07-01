"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "../../components/alert"; // adjust path as needed

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"blue" | "green" | "red">("blue");

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Login failed");
      }

      localStorage.setItem("token", result.token);
      setAlertMessage("Login successful!");
      setAlertType("green");

      // Redirect after short delay to show the alert
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      setAlertMessage(err.message || "Something went wrong");
      setAlertType("red");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-black/70 backdrop-blur-md border border-white/10 rounded-lg shadow-md text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center text-sky-400">
        Login
      </h2>

      {alertMessage && <Alert message={alertMessage} variant={alertType} />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-3 bg-transparent border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-gray-400"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-3 bg-transparent border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-gray-400"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-sky-600 text-white p-3 rounded hover:bg-sky-700 transition"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
