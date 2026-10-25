"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface AuthorizationLoaderProps {
  className?: string;
  variant?: "dashboard" | "auth" | "auto";
}

export const AuthorizationLoader: React.FC<AuthorizationLoaderProps> = ({
  className,
  variant = "auto",
}) => {
  const pathname = usePathname() || "";
  const isAuthRoute =
    variant === "auth" ||
    (variant === "auto" &&
      (pathname.startsWith("/login") ||
        pathname.startsWith("/forgot-password") ||
        pathname.startsWith("/reset-password") ||
        pathname.startsWith("/verify-otp")));

  if (isAuthRoute) {
    return (
      <div
        role="status"
        aria-label="Loading authentication..."
        className={cn(
          "relative min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 overflow-hidden select-none",
          className
        )}
      >
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-100 p-8 space-y-6">
          {/* Card Icon & Header Skeleton */}
          <div className="flex flex-col items-center space-y-3">
            <Skeleton className="h-12 w-12 rounded-xl bg-blue-100/70" />
            <Skeleton className="h-6 w-40 rounded-lg" />
            <Skeleton className="h-4 w-64 rounded-md bg-slate-100" />
          </div>

          {/* Form Fields Skeleton */}
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-24 rounded" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-20 rounded" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
          </div>

          {/* Options & Button Skeleton */}
          <div className="flex items-center justify-between pt-1">
            <Skeleton className="h-4 w-28 rounded" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>

          <Skeleton className="h-11 w-full rounded-lg bg-gradient-to-r from-blue-200 to-teal-200" />

          {/* Footer note skeleton */}
          <div className="pt-2 flex justify-center">
            <Skeleton className="h-3.5 w-44 rounded bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Layout Skeleton
  return (
    <div
      role="status"
      aria-label="Loading dashboard..."
      className={cn("min-h-screen bg-slate-50/50 w-full select-none", className)}
    >
      {/* Sidebar Skeleton (Desktop) */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-100 bg-white flex-col hidden md:flex">
        {/* Brand/Logo Area */}
        <div className="flex h-[88px] items-center justify-center px-6 border-b border-slate-100 shrink-0">
          <Skeleton className="h-12 w-44 rounded-xl" />
        </div>

        {/* Navigation Items Skeleton */}
        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4">
          {[
            { w: "w-24" },
            { w: "w-20" },
            { w: "w-20" },
            { w: "w-28" },
            { w: "w-32" },
            { w: "w-24" },
            { w: "w-20" },
            { w: "w-24" },
            { w: "w-20" },
            { w: "w-20" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-xl px-4 py-[13px] bg-slate-50/50"
            >
              <Skeleton className="h-5 w-5 rounded-md shrink-0" />
              <Skeleton className={`h-4 ${item.w} rounded`} />
            </div>
          ))}
        </div>

        {/* Bottom Logout Button Skeleton */}
        <div className="border-t border-slate-100 p-4 shrink-0">
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 bg-slate-50/60">
            <Skeleton className="h-5 w-5 rounded-md bg-rose-200/50" />
            <Skeleton className="h-4 w-20 rounded bg-rose-200/50" />
          </div>
        </div>
      </aside>

      {/* Main Content Area Skeleton */}
      <div className="flex flex-col md:pl-64">
        {/* Header Skeleton */}
        <header className="sticky top-0 z-30 flex h-[88px] w-full items-center justify-between border-b border-slate-100 bg-white/80 px-8 backdrop-blur-md">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-6 w-36 rounded-lg" />
            <Skeleton className="h-3.5 w-72 rounded hidden sm:block bg-slate-100" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-20 rounded hidden sm:block" />
          </div>
        </header>

        {/* Dashboard Content Skeleton */}
        <main className="flex-1 p-8">
          <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
            {/* Welcome Banner Skeleton */}
            <div className="h-28 rounded-2xl bg-white border border-slate-100 p-6 flex items-center justify-between shadow-xs">
              <div className="space-y-2">
                <Skeleton className="h-6 w-56 rounded-lg" />
                <Skeleton className="h-4 w-80 rounded bg-slate-100 hidden sm:block" />
              </div>
              <Skeleton className="h-10 w-28 rounded-xl bg-slate-100 hidden md:block" />
            </div>

            {/* Stats Grid Skeleton (4 cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-28 rounded-2xl bg-white border border-slate-100 p-5 shadow-xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3.5 w-24 rounded" />
                    <Skeleton className="h-8 w-8 rounded-xl bg-blue-100/60" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-7 w-20 rounded-md" />
                    <Skeleton className="h-3 w-28 rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>

            {/* Two Column Section Skeleton (Chart/Table + Activities) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Chart / Table Card Skeleton (2 cols) */}
              <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-100 p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-50">
                  <div className="space-y-1.5">
                    <Skeleton className="h-5 w-40 rounded" />
                    <Skeleton className="h-3.5 w-60 rounded bg-slate-100" />
                  </div>
                  <Skeleton className="h-8 w-24 rounded-lg bg-slate-100" />
                </div>
                <div className="space-y-3 pt-1">
                  {[1, 2, 3, 4, 5].map((row) => (
                    <div
                      key={row}
                      className="h-12 rounded-xl bg-slate-50/70 flex items-center justify-between px-4"
                    >
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-7 w-7 rounded-lg" />
                        <Skeleton className="h-4 w-32 rounded" />
                      </div>
                      <Skeleton className="h-4 w-20 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Side Activities Skeleton (1 col) */}
              <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-50">
                  <Skeleton className="h-5 w-32 rounded" />
                  <Skeleton className="h-6 w-16 rounded-full bg-slate-100" />
                </div>
                <div className="space-y-3 pt-1">
                  {[1, 2, 3, 4].map((act) => (
                    <div
                      key={act}
                      className="h-16 rounded-xl bg-slate-50/70 p-3 flex items-center gap-3"
                    >
                      <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
                      <div className="space-y-1.5 flex-1">
                        <Skeleton className="h-3.5 w-28 rounded" />
                        <Skeleton className="h-3 w-36 rounded bg-slate-100" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthorizationLoader;
