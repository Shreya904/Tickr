import { useState } from "react";

interface AlertProps {
  message: string;
  variant?: "blue" | "red" | "green" | "yellow" | "gray";
}

const alertStyles = {
  blue: "text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400",
  red: "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400",
  green: "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400",
  yellow: "text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300",
  gray: "text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-300",
};

export default function Alert({ message, variant = "blue" }: AlertProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className={`flex items-center p-4 mb-4 rounded-lg ${alertStyles[variant]}`}
      role="alert"
    >
      <svg
        className="shrink-0 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div className="ms-3 text-sm font-medium">{message}</div>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className={`ms-auto -mx-1.5 -my-1.5 bg-transparent text-current rounded-lg focus:ring-2 p-1.5 hover:opacity-80 h-8 w-8`}
        aria-label="Close"
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}
