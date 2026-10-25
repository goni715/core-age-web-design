"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/helpers/SessionHelper";
import AuthorizationLoader from "@/components/loader/AuthorizationLoader";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isLoggedIn();
      if (loggedIn) {
        router.replace("/");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <AuthorizationLoader />;
  }

  return <>{children}</>;
}

export default PublicRoute;
