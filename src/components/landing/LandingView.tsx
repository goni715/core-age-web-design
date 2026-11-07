"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UserPlus,
  Share2,
  Check,
  ChevronDown,
  ArrowRight,
  FileText,
  Activity,
  DollarSign,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingViewProps {
  authCard: React.ReactNode;
}

export default function LandingView({ authCard }: LandingViewProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const faqs = [
    {
      q: "What is the difference between a Channel Partner and a Referral Partner?",
      a: "A Channel Partner (formerly Master Agent) leads a network of referral partners, earns override commission across their entire network, and can also refer patients directly. A Referral Partner (formerly Sub-Agent) focuses on referring individual patients, tracking their treatment journey, and receiving direct per-case referral commission.",
    },
    {
      q: "I was a Sub-Agent. What changes for me?",
      a: "Nothing changes regarding your account or referral commission! Sub-Agents are now officially termed 'Referral Partners' for clarity. You log into the same portal with your existing credentials, submit cases, and view earnings without interruption.",
    },
    {
      q: "Who can become a Referral Partner?",
      a: "Doctors, clinics, diagnostic centers, medical travel facilitators, corporate HR managers, and healthcare enthusiasts can register as Referral Partners to connect patients with top-tier accredited hospitals abroad.",
    },
    {
      q: "How is commission calculated?",
      a: "Commissions are credited per confirmed patient admission based on hospital billing and the treatment specialty. You can track real-time estimates, pending settlements, and completed payouts from your portal dashboard.",
    },
  ];

  return (
    <div className="w-full flex flex-col font-sans">
      {/* 1. HERO SECTION */}
      <section className="bg-[#0b2239] text-white pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-white/10">
              PARTNER PORTAL
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12]">
              Refer patients.
              <br />
              Track every case.
              <br />
              <span className="text-[#2dd4bf]">Earn with confidence.</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              The partner portal of 3S Medi Care International for Channel
              Partners and Referral Partners. Refer patients for treatment abroad,
              follow each case, and see your commission reports in one place.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link href="/sign-up">
                <Button className="bg-[#00cba0] hover:bg-[#00b58e] text-slate-900 font-bold px-6 py-3 rounded-xl text-sm shadow-md cursor-pointer border-0 flex items-center gap-2">
                  <span>Register as Channel Partner</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold px-6 py-3 rounded-xl text-sm cursor-pointer"
                >
                  Partner Login
                </Button>
              </Link>
            </div>

            <p className="text-xs text-slate-400 pt-1">
              Referral Partners were previously called Sub-Agents. Same portal,
              same account.
            </p>
          </div>

          {/* Right Column (5 cols): Embedded Auth Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="bg-white w-full max-w-[460px] p-7 sm:p-8 rounded-3xl shadow-2xl text-slate-900 border border-slate-100">
              {authCard}
            </div>
          </div>
        </div>
      </section>

      {/* 2. PARTNER TYPES SECTION */}
      <section
        id="partner-types"
        className="py-20 px-6 bg-slate-50/70 scroll-mt-20 border-b border-slate-200/60"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 block">
              PARTNER TYPES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Two ways to partner with 3S
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-2xl leading-relaxed">
              Whether you lead a referral network or refer patients on your own,
              there is a place for you in the 3S Partner Portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Referral Partner Card */}
            <div className="bg-white rounded-3xl p-8 border-2 border-blue-600 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    Formerly Sub-Agent
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Referral Partner
                  </h3>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                    For doctors, diagnostic centres, travel agencies and other
                    healthcare professionals who refer patients for treatment
                    abroad.
                  </p>
                </div>

                <ul className="space-y-3 text-sm text-slate-700 pt-2">
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Register directly with 3S, or join under a Channel Partner</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Submit patients and follow each case through the portal</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>See your commission reports at any time</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <Link href="/login?role=sub-agent">
                  <Button className="w-full bg-[#005ca9] hover:bg-[#004e90] text-white font-bold py-2.5 rounded-xl text-sm shadow-xs cursor-pointer">
                    Sign In as Referral Partner
                  </Button>
                </Link>
              </div>
            </div>

            {/* Channel Partner Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    Builds a network
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Channel Partner
                  </h3>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                    For organisations and leaders who refer patients and also
                    recruit and manage their own Referral Partners.
                  </p>
                </div>

                <ul className="space-y-3 text-sm text-slate-700 pt-2">
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Refer patients directly to 3S</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Onboard and manage your own Referral Partners</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Follow cases and commissions for yourself and your network</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <Link href="/sign-up">
                  <Button className="w-full bg-[#005ca9] hover:bg-[#004e90] text-white font-bold py-2.5 rounded-xl text-sm shadow-xs cursor-pointer">
                    Register as Channel Partner
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section
        id="how-it-works"
        className="py-20 px-6 bg-white scroll-mt-20 border-b border-slate-200/60"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 block">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              From registration to commission,
              <br />
              in four steps
            </h2>
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#005ca9] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Register</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Create your Referral Partner account and choose how you join.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#005ca9] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Refer a patient</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Submit the patient&apos;s details through your dashboard.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#005ca9] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Track the case</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                3S coordinates the treatment while you follow the case status.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#00cba0] text-slate-900 font-bold flex items-center justify-center text-sm shadow-xs">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Earn commission</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                View your commission reports in the portal.
              </p>
            </div>
          </div>

          {/* Banner Box: Two ways to join as a Referral Partner */}
          <div className="bg-[#0b2239] text-white rounded-2xl p-7 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 space-y-1.5">
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                Two ways to join as a Referral Partner
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm">
                Choose the route that fits you when you register.
              </p>
            </div>

            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4 border border-white/10 space-y-1">
                <span className="text-teal-300 font-bold text-sm block">
                  Directly with 3S
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Work with the 3S team and manage your own account.
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-4 border border-white/10 space-y-1">
                <span className="text-teal-300 font-bold text-sm block">
                  Under a Channel Partner
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Join a network led by one of our Channel Partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INSIDE THE PORTAL SECTION */}
      <section className="py-20 px-6 bg-slate-50/70 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 block">
              INSIDE THE PORTAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything you need to refer with
              <br />
              clarity
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Patient referrals
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Submit and manage every patient you refer from your dashboard.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Case tracking
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                See where each case stands, so you can keep your patients
                informed.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Commission reports
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Clear reports of what you have earned, available whenever you
                sign in.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Network management
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                For Channel Partners: onboard and oversee your Referral
                Partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section id="faq" className="py-20 px-6 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 block">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Common questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/50 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-4 px-6 flex items-center justify-between text-left font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-100/60 transition-colors cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-4 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

