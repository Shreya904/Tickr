"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Alert from "../../components/alert"; // adjust path if needed

type RegisterForm = {
  username: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"blue" | "green" | "red">("blue");

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await fetch(
        "https://tickr-z2vp.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      setAlertMessage("Registration successful!");
      setAlertType("green");

      console.log("Server response:", result);
      // Optionally redirect to login or dashboard
    } catch (err: any) {
      setAlertMessage(err.message || "Something went wrong");
      setAlertType("red");
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-black/70 backdrop-blur-md border border-white/10 rounded-lg shadow-md text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center text-sky-400">
        Register
      </h2>

      {alertMessage && <Alert message={alertMessage} variant={alertType} />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
            className="w-full p-3 bg-transparent border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-gray-400"
          />
          {errors.username && (
            <p className="text-red-400 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

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
          Register
        </button>
      </form>
    </div>
  );
}
