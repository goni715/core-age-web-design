"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  LogOut,
  User,
  Plus,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { subAgentSidebarLinks } from "@/data/sidebar.data";
import { Button } from "@/components/ui/button";
import { clearSession, getUserInfo } from "@/helpers/SessionHelper";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useGetSubAgentProfileQuery } from "@/redux/features/user/userApi";
import SubAgentRoute from "@/providers/SubAgentRoute";

export default function SubAgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: profileResponse } = useGetSubAgentProfileQuery();
  const profile = profileResponse?.data;

  const [logout] = useLogoutMutation();

  const [userInfo, setUserInfoState] = useState({
    fullName: "Referral Partner",
    email: "",
    initials: "RP",
    agencyName: "",
  });

  useEffect(() => {
    const user = getUserInfo();
    const name = profile?.fullName || user.fullName || "Referral Partner";
    const parts = name.trim().split(" ").filter(Boolean);
    const initials =
      parts.length > 1
        ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        : name.slice(0, 2).toUpperCase();

    setUserInfoState({
      fullName: name,
      email: profile?.email || user.email || "",
      initials,
      agencyName: profile?.agencyName || user.agencyName || "",
    });
  }, [profile]);

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
    } catch {
      clearSession();
      router.replace("/login?role=sub-agent");
    }
  };

  // Header content based on pathname
  const getHeaderMeta = () => {
    if (pathname.startsWith("/sub-agent/patients")) {
      return {
        badge: "REFERRAL PARTNER NETWORK",
        title: "My Referred Cases",
        desc: "Track the journey, treatment milestones, and referral commission of your patients",
      };
    }
    if (pathname.startsWith("/sub-agent/submit-patient")) {
      return {
        badge: "REFERRAL PARTNER NETWORK",
        title: "Submit New Patient Case",
        desc: "Refer a new patient to 3S specialist hospitals for consultation and medical travel",
      };
    }
    if (pathname.startsWith("/sub-agent/commission")) {
      return {
        badge: "REFERRAL PARTNER NETWORK",
        title: "Referral Earnings",
        desc: "View your earned referral fees, completed payouts, and pending approvals",
      };
    }
    if (pathname.startsWith("/sub-agent/healthcare-network")) {
      return {
        badge: "REFERRAL PARTNER NETWORK",
        title: "Global Hospital Network",
        desc: "Explore accredited international hospitals to help patients choose top care",
      };
    }
    if (pathname.startsWith("/sub-agent/support")) {
      return {
        badge: "REFERRAL PARTNER NETWORK",
        title: "Referral Partner Support",
        desc: "Direct coordination with 3S medical desk and your Master Channel Partner",
      };
    }
    if (pathname.startsWith("/sub-agent/profile")) {
      return {
        badge: "REFERRAL PARTNER NETWORK",
        title: "Referral Partner Profile",
        desc: "Manage your contact info, clinic details, and payment preferences",
      };
    }
    return {
      badge: "REFERRAL PARTNER NETWORK",
      title: "Referral Partner Portal",
      desc: "Welcome back! View your referred patient cases, progress status, and rewards.",
    };
  };

  const headerMeta = getHeaderMeta();

  return (
    <SubAgentRoute>
      <div className="flex min-h-screen bg-[#f3f9f8]">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar with Teal/Emerald styling */}
        <aside
          style={{ backgroundColor: "#0d5c56" }}
          className={`
          fixed lg:sticky top-0 z-50 h-screen bg-[#0d5c56] text-white flex flex-col w-64 shrink-0
          transition-transform duration-300 ease-in-out lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          {/* Brand / Logo */}
          <div className="h-20 flex items-center justify-between px-6 shrink-0 border-b border-white/10">
            <Link href="/sub-agent/dashboard" className="flex items-center gap-3 group">
              <div
                style={{ background: "linear-gradient(135deg, #34d399, #99f6e4)" }}
                className="w-9 h-9 rounded-xl text-[#073834] flex items-center justify-center font-black text-sm tracking-tight shadow-xs transition-transform group-hover:scale-105"
              >
                3S
              </div>
              <div>
                <span className="font-bold text-white text-sm block leading-tight tracking-tight">
                  3S Medi Care Int
                </span>
                <span className="text-[11px] text-teal-200/90 font-normal block leading-tight mt-0.5">
                  Referral Partner Portal
                </span>
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
          <div className="flex-1 overflow-y-auto px-3.5 py-4">
            <nav className="flex flex-col gap-1.5">
              {subAgentSidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  link.href === "/sub-agent/dashboard"
                    ? pathname === "/sub-agent/dashboard" ||
                      pathname === "/sub-agent"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsSidebarOpen(false)}
                    style={
                      isActive
                        ? { backgroundColor: "rgba(255, 255, 255, 0.16)" }
                        : undefined
                    }
                    className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white/15 text-white font-semibold shadow-xs"
                        : "text-teal-100/85 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-emerald-300" : "text-teal-200"
                      }`}
                    />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Section: Reporting Card & Logout */}
          <div className="p-4 mt-auto shrink-0 space-y-2">
            <div
              style={{ backgroundColor: "#094742" }}
              className="border border-white/10 rounded-2xl p-4 text-white shadow-xs"
            >
              <div className="text-[11px] text-teal-200/90 font-normal flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                <span>Reporting Channel Partner</span>
              </div>
              <div className="font-bold text-sm text-white tracking-tight mt-0.5 truncate" title={profile?.agentName}>
                {profile?.agentName || "Master Channel Partner"}
              </div>
              <div className="text-[11px] text-teal-200/80 font-normal mt-0.5 truncate">
                {profile?.agentPhone || "3S Healthcare Network"}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-teal-100/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer group"
            >
              <LogOut className="w-5 h-5 text-teal-200 group-hover:text-white transition-colors" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Sticky Header */}
          <header className="sticky top-0 z-30 bg-[#f3f9f8]/95 backdrop-blur-md border-b border-teal-200/50 px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 transition-all">
            <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-4">
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
                  <span className="text-[#0d9488] text-[11px] font-bold tracking-wider uppercase block leading-tight">
                    {headerMeta.badge}
                  </span>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
                    {headerMeta.title}
                  </h1>
                  <p className="text-slate-500 text-xs sm:text-sm mt-0.5 hidden sm:block">
                    {headerMeta.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/sub-agent/submit-patient"
                  style={{ background: "linear-gradient(135deg, #0d9488, #059669)" }}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Submit Patient</span>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-hidden cursor-pointer flex items-center gap-2 p-1.5 rounded-xl hover:bg-teal-50 transition-all">
                    <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center ring-2 ring-teal-500/25">
                      {userInfo.initials}
                    </div>
                    <div className="hidden md:block text-left text-xs leading-tight">
                      <div className="font-semibold text-slate-800">
                        {userInfo.fullName}
                      </div>
                      <div className="text-[11px] text-teal-700 font-medium">
                        Referral Partner
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 mt-2 rounded-2xl shadow-xl border-slate-100 p-1.5 bg-white"
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="px-3 py-2">
                        <div className="font-semibold text-slate-900 text-sm">
                          {userInfo.fullName}
                        </div>
                        {userInfo.email && (
                          <div className="text-xs text-slate-400 font-normal truncate mt-0.5">
                            {userInfo.email}
                          </div>
                        )}
                        <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-50 text-teal-700 border border-teal-200/60">
                          Referral Partner
                        </span>
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-slate-100 my-1" />
                    <DropdownMenuItem
                      onClick={() => router.push("/sub-agent/profile")}
                      className="cursor-pointer flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 text-sm"
                    >
                      <User className="h-4 w-4 text-slate-500" />
                      <span>Profile & Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-sm"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1360px] mx-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </SubAgentRoute>
  );
}
