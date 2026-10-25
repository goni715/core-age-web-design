"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, Laptop, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { sidebarLinks } from "@/data/sidebar.data";
import { Button } from "@/components/ui/button";
import { clearSession } from "@/helpers/SessionHelper";
import { useLogoutMutation, useLogoutFromAllMutation } from "@/redux/features/auth/authApi";
import PrivateRoute from "@/providers/PrivateRoute";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [logout] = useLogoutMutation();
  const [logoutFromAll] = useLogoutFromAllMutation();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
    } catch {
      clearSession();
      router.replace("/login");
    }
  };

  const handleLogoutAll = async () => {
    try {
      await logoutFromAll({}).unwrap();
    } catch {
      clearSession();
      router.replace("/login");
    }
  };

  const isChannelPartnerSection = pathname === "/my-network" || pathname === "/patients" || pathname.startsWith("/patients/");
  const portalSubtitle = isChannelPartnerSection ? "Channel Partner Portal" : "Referral Partner Portal";
  const reportingRole = isChannelPartnerSection ? "Channel Partner" : "Direct onboarding";

  return (
    <PrivateRoute>
      <div className="flex min-h-screen bg-[#f4f7fb]">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 z-50 h-screen bg-[#0062c4] text-white flex flex-col w-64 shrink-0
        transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Brand / Logo */}
        <div className="h-20 flex items-center justify-between px-6 shrink-0">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-[#00c99a] text-[#0a2540] flex items-center justify-center font-black text-sm tracking-tight shadow-xs transition-transform group-hover:scale-105">
              3S
            </div>
            <div>
              <span className="font-bold text-white text-sm block leading-tight tracking-tight">3S Medi Care Int</span>
              <span className="text-[11px] text-blue-200/90 font-normal block leading-tight mt-0.5">{portalSubtitle}</span>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white/80 hover:text-white hover:bg-white/10 h-8 w-8"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3.5 py-2">
          <nav className="flex flex-col gap-1.5">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-white/15 text-white font-semibold shadow-xs"
                      : "text-blue-100/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-blue-200"}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Reporting Card & Logout */}
        <div className="p-4 mt-auto shrink-0 space-y-2">
          <div className="bg-[#0051a8]/80 border border-white/10 rounded-2xl p-4 text-white shadow-xs">
            <div className="text-[11px] text-blue-200/90 font-normal">Reporting to</div>
            <div className="font-bold text-sm text-white tracking-tight mt-0.5">3S Medi Care Int</div>
            <div className="text-[11px] text-blue-200/80 font-normal mt-0.5">{reportingRole}</div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-blue-100/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer group"
          >
            <LogOut className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Header - Fixed at top, does not scroll */}
        <header className="sticky top-0 z-30 bg-[#f4f7fb]/95 backdrop-blur-md border-b border-slate-200/60 px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 transition-all">
          <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-4">
            {/* Condition: My Network Page */}
            {pathname === "/my-network" ? (
              <>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 h-9 w-9 shrink-0"
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                  <div>
                    <span className="text-[#059669] text-[11px] font-bold tracking-wider uppercase block leading-tight">
                      CHANNEL PARTNER
                    </span>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
                      My Network
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5 hidden sm:block">
                      Every referral partner you have onboarded, with their cases and earnings for you
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText("https://medicare.partner.com/invite/CP-8841");
                      alert("Invitation link copied to clipboard: https://medicare.partner.com/invite/CP-8841");
                    }}
                    className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold text-xs sm:text-sm py-2.5 px-4 sm:px-5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>+ Invite referral partner</span>
                  </button>
                </div>
              </>
            ) : pathname === "/healthcare-network" ? (
              <>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 h-9 w-9 shrink-0"
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                  <div>
                    <span className="text-[#059669] text-[11px] font-bold tracking-wider uppercase block leading-tight">
                      REFERRAL PARTNER
                    </span>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
                      Healthcare network
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5 hidden sm:block">
                      See how many hospitals 3S works with in each country before you choose where to refer a patient
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-hidden cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-[#dbeafe] text-[#1d4ed8] font-bold text-xs flex items-center justify-center hover:ring-2 hover:ring-blue-300 transition-all">
                        AR
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-lg border-gray-100 p-0 bg-white">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="font-medium px-4 py-3 text-gray-700 text-sm">
                          Ahmed Rahman
                        </DropdownMenuLabel>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator className="bg-gray-100 m-0" />
                      <div className="p-1.5">
                        <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50">
                          <User className="h-4 w-4" />
                          <span className="text-sm">Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50">
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm">Logout</span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : pathname === "/profile" ? (
              <>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 h-9 w-9 shrink-0"
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                  <div>
                    <span className="text-[#059669] text-[11px] font-bold tracking-wider uppercase block leading-tight">
                      REFERRAL PARTNER
                    </span>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
                      Partner Profile
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5 hidden sm:block">
                      Manage your profile information, payout details, and security settings
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-hidden cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-[#dbeafe] text-[#1d4ed8] font-bold text-xs flex items-center justify-center hover:ring-2 hover:ring-blue-300 transition-all">
                        AR
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-lg border-gray-100 p-0 bg-white">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="font-medium px-4 py-3 text-gray-700 text-sm">
                          Ahmed Rahman
                        </DropdownMenuLabel>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator className="bg-gray-100 m-0" />
                      <div className="p-1.5">
                        <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50">
                          <User className="h-4 w-4" />
                          <span className="text-sm">Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50">
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm">Logout</span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : pathname === "/support" ? (
              <>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 h-9 w-9 shrink-0"
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                  <div>
                    <span className="text-[#059669] text-[11px] font-bold tracking-wider uppercase block leading-tight">
                      REFERRAL PARTNER
                    </span>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
                      Support Desk
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5 hidden sm:block">
                      Track support tickets, case inquiries, and official replies with email notifications
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-hidden cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-[#dbeafe] text-[#1d4ed8] font-bold text-xs flex items-center justify-center hover:ring-2 hover:ring-blue-300 transition-all">
                        AR
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-lg border-gray-100 p-0 bg-white">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="font-medium px-4 py-3 text-gray-700 text-sm">
                          Ahmed Rahman
                        </DropdownMenuLabel>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator className="bg-gray-100 m-0" />
                      <div className="p-1.5">
                        <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50">
                          <User className="h-4 w-4" />
                          <span className="text-sm">Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50">
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm">Logout</span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : pathname === "/notifications" ? (
              <>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 h-9 w-9 shrink-0"
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                  <div>
                    <span className="text-[#059669] text-[11px] font-bold tracking-wider uppercase block leading-tight">
                      REFERRAL PARTNER
                    </span>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
                      Notifications
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5 hidden sm:block">
                      Stay updated on case approvals, commission credits, and patient travel
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-hidden cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-[#dbeafe] text-[#1d4ed8] font-bold text-xs flex items-center justify-center hover:ring-2 hover:ring-blue-300 transition-all">
                        AR
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-lg border-gray-100 p-0 bg-white">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="font-medium px-4 py-3 text-gray-700 text-sm">
                          Ahmed Rahman
                        </DropdownMenuLabel>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator className="bg-gray-100 m-0" />
                      <div className="p-1.5">
                        <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50">
                          <User className="h-4 w-4" />
                          <span className="text-sm">Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50">
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm">Logout</span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : pathname === "/performance" ? (
              <>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 h-9 w-9 shrink-0"
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                  <div>
                    <span className="text-[#059669] text-[11px] font-bold tracking-wider uppercase block leading-tight">
                      REFERRAL PARTNER
                    </span>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
                      Performance Analytics
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5 hidden sm:block">
                      Track your case conversion rates, monthly targets, and earnings growth
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-hidden cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-[#dbeafe] text-[#1d4ed8] font-bold text-xs flex items-center justify-center hover:ring-2 hover:ring-blue-300 transition-all">
                        AR
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-lg border-gray-100 p-0 bg-white">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="font-medium px-4 py-3 text-gray-700 text-sm">
                          Ahmed Rahman
                        </DropdownMenuLabel>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator className="bg-gray-100 m-0" />
                      <div className="p-1.5">
                        <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50">
                          <User className="h-4 w-4" />
                          <span className="text-sm">Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50">
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm">Logout</span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : pathname.startsWith("/profile") ? (
              <>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 h-9 w-9 shrink-0"
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                  <div>
                    <span className="text-[#059669] text-[11px] font-bold tracking-wider uppercase block leading-tight">
                      REFERRAL PARTNER
                    </span>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
                      Partner Profile
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5 hidden sm:block">
                      Manage your profile details, payout methods, compliance documents, and security
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-hidden cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-[#dbeafe] text-[#1d4ed8] font-bold text-xs flex items-center justify-center hover:ring-2 hover:ring-blue-300 transition-all">
                        AR
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-lg border-gray-100 p-0 bg-white">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="font-medium px-4 py-3 text-gray-700 text-sm">
                          Ahmed Rahman
                        </DropdownMenuLabel>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator className="bg-gray-100 m-0" />
                      <div className="p-1.5">
                        <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50">
                          <User className="h-4 w-4" />
                          <span className="text-sm">Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50">
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm">Logout</span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : pathname === "/patients" ? (
              <>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 h-9 w-9 shrink-0"
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                  <div>
                    <span className="text-[#059669] text-[11px] font-bold tracking-wider uppercase block leading-tight">
                      CHANNEL PARTNER
                    </span>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
                      Patients and cases
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5 hidden sm:block">
                      Every case in your network, tagged to the referral partner who submitted it
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/submit-patient"
                    className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold text-xs sm:text-sm py-2.5 px-4 sm:px-5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>+ Submit patient</span>
                  </Link>
                </div>
              </>
            ) : pathname.startsWith("/patients/") ? (
              /* Condition 2: Patient Details Page */
              <>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 h-9 w-9 shrink-0"
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                  <Link
                    href="/patients"
                    className="inline-flex items-center text-xs sm:text-sm font-semibold text-[#0062c4] hover:underline"
                  >
                    ‹ Back to patients
                  </Link>
                </div>

                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-hidden cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-[#dbeafe] text-[#1d4ed8] font-bold text-xs flex items-center justify-center hover:ring-2 hover:ring-blue-300 transition-all">
                        AR
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-lg border-gray-100 p-0 bg-white">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="font-medium px-4 py-3 text-gray-700 text-sm">
                          Ahmed Rahman
                        </DropdownMenuLabel>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator className="bg-gray-100 m-0" />
                      <div className="p-1.5">
                        <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50">
                          <User className="h-4 w-4" />
                          <span className="text-sm">Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50">
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm">Logout</span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              /* Condition 3: Dashboard & Other Pages */
              <>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 h-9 w-9 shrink-0"
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <Menu className="w-5 h-5" />
                  </Button>

                  <div>
                    <span className="text-[#059669] text-[11px] font-bold tracking-wider uppercase block leading-tight">
                      REFERRAL PARTNER
                    </span>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
                      Welcome back, Ahmed Rahman
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5 hidden sm:block">
                      Here is what is happening with your referred cases today
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                  <span className="bg-[#ffedd5] text-[#c2410c] text-xs font-semibold px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full whitespace-nowrap shadow-2xs">
                    Premium Referral Partner
                  </span>

                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-hidden cursor-pointer">
                      <div className="w-9 h-9 rounded-full bg-[#dbeafe] text-[#1d4ed8] font-bold text-xs flex items-center justify-center hover:ring-2 hover:ring-blue-300 transition-all shadow-2xs">
                        AR
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-lg border-gray-100 p-0 bg-white">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="font-medium px-4 py-3 text-gray-700 text-sm">
                          Ahmed Rahman
                        </DropdownMenuLabel>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator className="bg-gray-100 m-0" />
                      <div className="p-1.5">
                        <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50">
                          <User className="h-4 w-4" />
                          <span className="text-sm">Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50">
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm">Logout</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogoutAll} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50">
                          <Laptop className="h-4 w-4" />
                          <span className="text-sm">Logout from all devices</span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
    </PrivateRoute>
  );
}
