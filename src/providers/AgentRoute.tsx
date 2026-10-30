"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn, isSubAgent } from "@/helpers/SessionHelper";
import AuthorizationLoader from "@/components/loader/AuthorizationLoader";
import { TChildren } from "@/types/global.type";

const AgentRoute = ({ children }: TChildren) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isLoggedIn();
      if (!loggedIn) {
        router.replace("/login");
        return;
      }

      // If user is sub-agent, redirect them to sub-agent portal
      if (isSubAgent()) {
        router.replace("/sub-agent/dashboard");
        return;
      }

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <AuthorizationLoader />;
  }

  return <>{children}</>;
};

export default AgentRoute;
