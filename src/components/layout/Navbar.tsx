"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isAuthOrLanding =
    pathname === "/" || pathname === "/login" || pathname === "/sign-up";

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname === "/" || pathname === "/login" || pathname === "/sign-up") {
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <nav className="bg-[#0b2239] text-white sticky top-0 z-50 border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 cursor-pointer transition-opacity hover:opacity-90"
        >
          <div className="bg-white px-2.5 py-1.5 rounded-xl flex items-center">
            <Image
              src="/logo.png"
              alt="3S Medi Care International"
              width={147}
              height={40}
              className="h-8 sm:h-9 w-auto object-contain"
              priority
            />
          </div>
          {/* <span className="hidden sm:inline-block text-xs font-semibold text-slate-300 pl-2 border-l border-white/20">
            Partner Portal
          </span> */}
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#partner-types"
            onClick={(e) => handleScrollTo(e, "partner-types")}
            className="text-sm font-medium text-slate-200 hover:text-white transition-colors cursor-pointer"
          >
            Partner types
          </Link>
          <Link
            href="/#how-it-works"
            onClick={(e) => handleScrollTo(e, "how-it-works")}
            className="text-sm font-medium text-slate-200 hover:text-white transition-colors cursor-pointer"
          >
            How it works
          </Link>
          <Link
            href="/#faq"
            onClick={(e) => handleScrollTo(e, "faq")}
            className="text-sm font-medium text-slate-200 hover:text-white transition-colors cursor-pointer"
          >
            FAQ
          </Link>

          <Link href="/login">
            <Button
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold rounded-xl px-5 h-9 text-xs sm:text-sm cursor-pointer"
            >
              Login
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-200 hover:bg-white/10 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="bg-[#0b2239] border-b border-white/10 py-4 px-6 flex flex-col gap-3 md:hidden animate-in slide-in-from-top-2 duration-200">
          <Link
            href="/#partner-types"
            onClick={(e) => handleScrollTo(e, "partner-types")}
            className="text-sm font-medium text-slate-200 hover:text-white py-1"
          >
            Partner types
          </Link>
          <Link
            href="/#how-it-works"
            onClick={(e) => handleScrollTo(e, "how-it-works")}
            className="text-sm font-medium text-slate-200 hover:text-white py-1"
          >
            How it works
          </Link>
          <Link
            href="/#faq"
            onClick={(e) => handleScrollTo(e, "faq")}
            className="text-sm font-medium text-slate-200 hover:text-white py-1"
          >
            FAQ
          </Link>
          <div className="pt-2">
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant="outline"
                className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white justify-center"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
