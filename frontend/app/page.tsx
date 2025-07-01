"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { WavyBackground } from "../components/ui/3d-marquee";
import { WobbleCard } from "../components/ui/wobble-card";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden px-4">
        <WavyBackground className="max-w-4xl mx-auto pb-40" />
        <div className="absolute inset-0 z-10 h-full w-full bg-black/75 dark:bg-black/70" />

        <div className="relative z-20 mx-auto flex h-screen w-full max-w-7xl flex-col items-center justify-center overflow-hidden rounded-3xl">
          <h2 className="text-center text-2xl font-bold text-white md:text-4xl lg:text-6xl max-w-4xl">
            Stay organized, stay ahead —{" "}
            <span className="inline-block rounded-xl bg-blue-500/40 px-4 py-1 underline decoration-sky-500 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
              tick off
            </span>{" "}
            your tasks one by one.
          </h2>

          <p className="mt-6 max-w-2xl text-center text-sm text-neutral-200 md:text-base">
            Tickr helps you manage your day with clarity. Plan, prioritize, and
            complete tasks efficiently — because every small win matters.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {isAuthenticated ? (
              <button
                onClick={() => router.push("/dashboard")}
                className="rounded-md bg-sky-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => router.push("/login")}
                  className="rounded-md bg-sky-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="rounded-md border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Wobble Cards Section */}
      <div className="relative z-20 -mt-32 pb-20 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
          {/* Card 1 */}
          <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px] relative overflow-hidden">
            <div className="z-10 relative max-w-xs">
              <h2 className="text-left text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Organize smarter, not harder
              </h2>
              <p className="mt-4 text-left text-base/6 text-neutral-200">
                With Tickr, manage daily goals, categorize tasks, and track
                progress — all from a clean, intuitive dashboard.
              </p>
            </div>
            <div className="absolute right-4 bottom-4 w-1/3 max-w-[160px] sm:max-w-[180px] lg:max-w-[220px]">
              <Image
                src="/image29.jpg"
                width={300}
                height={300}
                alt="Task organization"
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </WobbleCard>

          {/* Card 2 */}
          <WobbleCard containerClassName="col-span-1 min-h-[300px] relative overflow-hidden">
            <div className="z-10 relative">
              <h2 className="max-w-80 text-left text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Your tasks, your way
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                Update status, edit, or delete tasks seamlessly. From urgent to
                done — everything in one view.
              </p>
            </div>
          </WobbleCard>

          {/* Card 3 */}
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px] relative overflow-hidden">
            <div className="z-10 relative max-w-sm">
              <h2 className="max-w-sm md:max-w-lg text-left text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Built for productivity lovers
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                Whether you&#39;re a student, creator, or developer — Tickr
                keeps your daily goals within reach.
              </p>
            </div>
            <div className="absolute right-2 bottom-2 w-5/6 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[60%] max-w-[400px]">
              <Image
                src="/image24.jpg"
                width={600}
                height={600}
                alt="Task management"
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </WobbleCard>
        </div>
      </div>
    </>
  );
}
