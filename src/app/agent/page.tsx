"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AgentRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/agent/dashboard");
  }, [router]);

  return (
    <div className="py-20 text-center text-sm text-slate-400">
      Loading agent portal...
    </div>
  );
}
