"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();



  return (
    <nav className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-100 relative">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-90">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            3S
          </div>
          <span className="text-base sm:text-lg md:text-xl font-bold text-slate-800">3S Medicare Int</span>
        </Link>



        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {/* <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            Doctor Login
          </Button> */}
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            <Link href="/login">Login</Link>
          </Button>
          {/* <Button variant="ghost" className="text-blue-600 hover:bg-blue-50" asChild>
            <Link href="/login">Login</Link>
          </Button> */}

        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-3">

          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-600 hover:bg-slate-100 hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl py-4 px-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-2 duration-200">

          <div className="flex flex-col gap-3 pt-2">
            <Link href="/login">
              <Button 
                variant="outline" 
                className="w-full text-blue-600 border-blue-600 hover:bg-blue-50 justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
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
