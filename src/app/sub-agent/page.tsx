"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SubAgentRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/sub-agent/dashboard");
  }, [router]);

  return (
    <div className="py-20 text-center text-sm text-slate-400">
      Loading sub-agent portal...
    </div>
  );
}
