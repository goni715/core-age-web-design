"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full">
      {/* Blue Banner CTA */}
      <div className="bg-[#005ca9] text-white py-14 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Ready to start referring?
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm md:text-base leading-relaxed">
              Register as a Channel Partner, or sign in to your Referral Partner account to submit and manage patients.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Link href="/sign-up">
              <Button className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-6 py-2.5 rounded-xl text-sm shadow-md cursor-pointer border-0">
                Register as Channel Partner
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold px-5 py-2.5 rounded-xl text-sm cursor-pointer"
              >
                Sign In to Portal
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0b2239] text-slate-300 py-6 px-6 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
              3S
            </div>
            <span className="text-slate-400">
              © {currentYear} 3S Medi Care International. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <a
              href="https://3smedicareint.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              3smedicareint.com
            </a>
            <a
              href="mailto:management@3smedicareint.com"
              className="hover:text-white transition-colors"
            >
              management@3smedicareint.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

