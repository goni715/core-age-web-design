"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn, isSubAgent } from "@/helpers/SessionHelper";
import AuthorizationLoader from "@/components/loader/AuthorizationLoader";
import { TChildren } from "@/types/global.type";

const SubAgentRoute = ({ children }: TChildren) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isLoggedIn();
      if (!loggedIn) {
        router.replace("/login?role=sub-agent");
        return;
      }

      // If user is not sub-agent (i.e. master agent), redirect to agent portal
      if (!isSubAgent()) {
        router.replace("/agent/dashboard");
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

export default SubAgentRoute;
