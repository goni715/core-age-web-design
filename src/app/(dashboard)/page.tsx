"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn, isSubAgent } from "@/helpers/SessionHelper";

export default function RootDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
    } else if (isSubAgent()) {
      router.replace("/sub-agent/dashboard");
    } else {
      router.replace("/agent/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center text-sm text-slate-400">
      Directing to your portal dashboard...
    </div>
  );
}
