"use client";

import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [pathname]);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Script
          src="/node_modules/flowbite/dist/flowbite.min.js"
          strategy="afterInteractive"
        />

        {/* Navbar */}
        <nav className="flex w-full items-center justify-between border-t border-b border-white/10 px-4 py-4 bg-black/80 backdrop-blur-md shadow-md">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-full bg-gradient-to-br from-blue-900 to-sky-400" />
            <Link href="/">
              <h1 className="text-xl md:text-2xl font-bold text-white hover:text-sky-400 transition">
                Tickr
              </h1>
            </Link>
          </div>

          <div className="space-x-2">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <button className="w-24 transform rounded-lg bg-white/10 px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-white/20 dark:bg-white dark:text-black dark:hover:bg-gray-200 md:w-32">
                    Dashboard
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-24 transform rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-red-700 md:w-32"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <button className="w-24 transform rounded-lg bg-white/10 px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-white/20 dark:bg-white dark:text-black dark:hover:bg-gray-200 md:w-32">
                  Login
                </button>
              </Link>
            )}
          </div>
        </nav>

        {/* Page Content */}
        <main className="p-1">{children}</main>

        {/* ✅ Footer */}
        <footer className="bg-white rounded-lg shadow-sm dark:bg-gray-950 m-4">
          <div className="w-full max-w-screen-2xl mx-auto p-4 md:py-8 px-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-full bg-gradient-to-br from-blue-900 to-sky-400" />
                <Link href="/">
                  <h1 className="text-xl md:text-2xl font-bold text-white hover:text-sky-400 transition">
                    Tickr
                  </h1>
                </Link>
              </div>
              <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                  <a href="#" className="hover:underline me-4 md:me-6">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline me-4 md:me-6">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline me-4 md:me-6">
                    Licensing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2025 <Link href="/">Ticker</Link>. All Rights Reserved.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
