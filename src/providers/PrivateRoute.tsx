"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/helpers/SessionHelper";
import AuthorizationLoader from "@/components/loader/AuthorizationLoader";
import { TChildren } from "@/types/global.type";

const PrivateRoute = ({ children }: TChildren) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isLoggedIn();
      if (!loggedIn) {
        router.replace("/login");
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
};

export default PrivateRoute;