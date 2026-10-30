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

  const isSubAgent = pathname.startsWith("/sub-agent");

  // Dashboard Layout Skeleton
  return (
    <div
      role="status"
      aria-label="Loading dashboard..."
      className={cn(
        "min-h-screen w-full select-none",
        isSubAgent ? "bg-[#f3f9f8]" : "bg-slate-50/50",
        className
      )}
    >
      {/* Sidebar Skeleton (Desktop) */}
      <aside
        style={isSubAgent ? { backgroundColor: "#0d5c56" } : undefined}
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 border-r flex-col hidden md:flex",
          isSubAgent
            ? "bg-[#0d5c56] border-white/10 text-white"
            : "border-slate-100 bg-white"
        )}
      >
        {/* Brand/Logo Area */}
        <div
          className={cn(
            "flex h-[88px] items-center justify-center px-6 border-b shrink-0",
            isSubAgent ? "border-white/10" : "border-slate-100"
          )}
        >
          <Skeleton
            className={cn(
              "h-12 w-44 rounded-xl",
              isSubAgent ? "bg-white/20" : "bg-muted"
            )}
          />
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
          ].map((item, idx) => (
            <div
              key={idx}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-[13px]",
                isSubAgent ? "bg-white/10" : "bg-slate-50/50"
              )}
            >
              <Skeleton
                className={cn(
                  "h-5 w-5 rounded-md shrink-0",
                  isSubAgent ? "bg-white/20" : "bg-muted"
                )}
              />
              <Skeleton
                className={cn(
                  `h-4 ${item.w} rounded`,
                  isSubAgent ? "bg-white/20" : "bg-muted"
                )}
              />
            </div>
          ))}
        </div>

        {/* Bottom Logout Button Skeleton */}
        <div
          className={cn(
            "border-t p-4 shrink-0",
            isSubAgent ? "border-white/10" : "border-slate-100"
          )}
        >
          <div
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3",
              isSubAgent ? "bg-white/10" : "bg-slate-50/60"
            )}
          >
            <Skeleton
              className={cn(
                "h-5 w-5 rounded-md",
                isSubAgent ? "bg-white/20" : "bg-rose-200/50"
              )}
            />
            <Skeleton
              className={cn(
                "h-4 w-20 rounded",
                isSubAgent ? "bg-white/20" : "bg-rose-200/50"
              )}
            />
          </div>
        </div>
      </aside>

      {/* Main Content Area Skeleton */}
      <div className="flex flex-col md:pl-64">
        {/* Header Skeleton */}
        <header
          className={cn(
            "sticky top-0 z-30 flex h-[88px] w-full items-center justify-between border-b px-8 backdrop-blur-md",
            isSubAgent
              ? "bg-[#f3f9f8]/90 border-teal-200/50"
              : "border-slate-100 bg-white/80"
          )}
        >
          <div className="flex flex-col gap-1.5">
            <Skeleton
              className={cn(
                "h-6 w-36 rounded-lg",
                isSubAgent ? "bg-teal-200/60" : "bg-muted"
              )}
            />
            <Skeleton
              className={cn(
                "h-3.5 w-72 rounded hidden sm:block",
                isSubAgent ? "bg-teal-100/50" : "bg-slate-100"
              )}
            />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton
              className={cn(
                "h-10 w-10 rounded-full",
                isSubAgent ? "bg-teal-200/60" : "bg-muted"
              )}
            />
            <Skeleton
              className={cn(
                "h-4 w-20 rounded hidden sm:block",
                isSubAgent ? "bg-teal-200/60" : "bg-muted"
              )}
            />
          </div>
        </header>

        {/* Dashboard Content Skeleton */}
        <main className="flex-1 p-8">
          <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
            {/* Welcome Banner Skeleton */}
            <div
              style={
                isSubAgent
                  ? {
                      background:
                        "linear-gradient(135deg, #0d5c56 0%, #0f766e 45%, #059669 100%)",
                    }
                  : undefined
              }
              className={cn(
                "h-28 rounded-2xl p-6 flex items-center justify-between shadow-xs",
                isSubAgent
                  ? "border border-teal-800 text-white"
                  : "bg-white border border-slate-100"
              )}
            >
              <div className="space-y-2">
                <Skeleton
                  className={cn(
                    "h-6 w-56 rounded-lg",
                    isSubAgent ? "bg-white/20" : "bg-muted"
                  )}
                />
                <Skeleton
                  className={cn(
                    "h-4 w-80 rounded hidden sm:block",
                    isSubAgent ? "bg-white/15" : "bg-slate-100"
                  )}
                />
              </div>
              <Skeleton
                className={cn(
                  "h-10 w-28 rounded-xl hidden md:block",
                  isSubAgent ? "bg-white/20" : "bg-slate-100"
                )}
              />
            </div>

            {/* Stats Grid Skeleton (4 cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "h-28 rounded-2xl bg-white p-5 shadow-xs flex flex-col justify-between",
                    isSubAgent
                      ? "border border-teal-100"
                      : "border border-slate-100"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3.5 w-24 rounded" />
                    <Skeleton
                      className={cn(
                        "h-8 w-8 rounded-xl",
                        isSubAgent ? "bg-teal-100/60" : "bg-blue-100/60"
                      )}
                    />
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
