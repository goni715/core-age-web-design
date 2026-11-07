"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingFooter from "@/components/layout/LandingFooter";
import PublicRoute from "@/providers/PublicRoute";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingOrLoginOrSignUp =
    pathname === "/" || pathname === "/login" || pathname === "/sign-up";

  return (
    <PublicRoute>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <div className="flex-grow">{children}</div>
        {isLandingOrLoginOrSignUp ? <LandingFooter /> : <Footer />}
      </div>
    </PublicRoute>
  );
}
