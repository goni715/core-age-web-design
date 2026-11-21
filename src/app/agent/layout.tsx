"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  LogOut,
  User,
  Check,
  Loader2,
  Building2,
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
import { agentSidebarLinks } from "@/data/sidebar.data";
import { Button } from "@/components/ui/button";
import { clearSession, getUserInfo } from "@/helpers/SessionHelper";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useGenerateInvitationLinkMutation } from "@/redux/features/referralPartner/referralPartnerApi";
import { SuccessToast, ErrorToast } from "@/helpers/ValidationHelper";
import AgentRoute from "@/providers/AgentRoute";
import { useGetMyProfileQuery } from "@/redux/features/user/userApi";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: profileResponse } = useGetMyProfileQuery();
  const profile = profileResponse?.data;

  const [logout] = useLogoutMutation();
  const [generateInvitationLink, { isLoading: isGeneratingInviteLink }] =
    useGenerateInvitationLinkMutation();
  const [copiedInviteLink, setCopiedInviteLink] = useState(false);

  const [userInfo, setUserInfoState] = useState({
    fullName: "Channel Partner",
    email: "",
    initials: "CP",
    agencyName: "",
  });

  useEffect(() => {
    const user = getUserInfo();
    const name = profile?.fullName || user.fullName || "Channel Partner";
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

  const handleInvitePartner = async () => {
    try {
      const res = await generateInvitationLink().unwrap();
      const link = res?.data?.invitationLink;
      if (link) {
        await navigator.clipboard?.writeText(link);
        setCopiedInviteLink(true);
        SuccessToast("Invitation link copied to clipboard!");
        setTimeout(() => setCopiedInviteLink(false), 2000);
      }
    } catch {
      ErrorToast("Failed to generate invitation link. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
    } catch {
      clearSession();
      router.replace("/login");
    }
  };

  // Header content based on pathname
  const getHeaderMeta = () => {
    if (pathname.startsWith("/agent/my-network")) {
      return {
        badge: "CHANNEL PARTNER",
        title: "My Network",
        desc: "Every referral partner you have onboarded, with their cases and earnings for you",
        showInviteBtn: true,
      };
    }
    if (pathname.startsWith("/agent/patients")) {
      return {
        badge: "CHANNEL PARTNER",
        title: "Patients & Cases",
        desc: "Monitor all patient cases submitted by you and your referral partners",
        showInviteBtn: false,
      };
    }
    if (pathname.startsWith("/agent/submit-patient")) {
      return {
        badge: "CHANNEL PARTNER",
        title: "Submit New Patient",
        desc: "Submit a new patient case and assign to a referral partner if applicable",
        showInviteBtn: false,
      };
    }
    if (pathname.startsWith("/agent/commission")) {
      return {
        badge: "CHANNEL PARTNER",
        title: "Commission & Earnings",
        desc: "Track total revenue, partner shares, approved payouts and payout requests",
        showInviteBtn: false,
      };
    }
    if (pathname.startsWith("/agent/healthcare-network")) {
      return {
        badge: "CHANNEL PARTNER",
        title: "Healthcare Network",
        desc: "See how many hospitals 3S works with in each country before referring a patient",
        showInviteBtn: false,
      };
    }
    if (pathname.startsWith("/agent/support")) {
      return {
        badge: "CHANNEL PARTNER",
        title: "Help & Support",
        desc: "Contact 3S care coordinators and track partner ticket resolutions",
        showInviteBtn: false,
      };
    }
    if (pathname.startsWith("/agent/profile")) {
      return {
        badge: "CHANNEL PARTNER",
        title: "Partner Profile",
        desc: "Manage your agency info, payout accounts, and portal security",
        showInviteBtn: false,
      };
    }
    return {
      badge: "CHANNEL PARTNER",
      title: "Partner Dashboard",
      desc: "Welcome back! Monitor your healthcare referral network and cases in real-time.",
      showInviteBtn: false,
    };
  };

  const headerMeta = getHeaderMeta();

  return (
    <AgentRoute>
      <div className="flex min-h-screen bg-[#f4f7fb]">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
          fixed lg:sticky top-0 z-50 h-screen bg-[#0062c4] text-white flex flex-col w-64 shrink-0
          transition-transform duration-300 ease-in-out lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          {/* Brand / Logo */}
          <div className="h-20 flex items-center justify-between px-6 shrink-0 border-b border-white/10">
            <Link href="/agent/dashboard" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-[#00c99a] text-[#0a2540] flex items-center justify-center font-black text-sm tracking-tight shadow-xs transition-transform group-hover:scale-105">
                3S
              </div>
              <div>
                <span className="font-bold text-white text-sm block leading-tight tracking-tight">
                  3S Medi Care Int
                </span>
                <span className="text-[11px] text-blue-200/90 font-normal block leading-tight mt-0.5">
                  Channel Partner Portal
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
              {agentSidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  link.href === "/agent/dashboard"
                    ? pathname === "/agent/dashboard" || pathname === "/agent"
                    : pathname.startsWith(link.href);
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
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-white" : "text-blue-200"
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
            <div className="bg-[#0051a8]/80 border border-white/10 rounded-2xl p-4 text-white shadow-xs">
              <div className="text-[11px] text-blue-200/90 font-normal">
                {profile?.agencyName ? "Master Agency" : "Reporting to"}
              </div>
              <div className="font-bold text-sm text-white tracking-tight mt-0.5 truncate" title={profile?.agencyName || "3S Medi Care Int"}>
                {profile?.agencyName || "3S Medi Care Int"}
              </div>
              <div className="text-[11px] text-blue-200/80 font-normal mt-0.5">
                Channel Partner Direct
              </div>
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
          {/* Sticky Header */}
          <header className="sticky top-0 z-30 bg-[#f4f7fb]/95 backdrop-blur-md border-b border-slate-200/60 px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 transition-all">
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
                  <span className="text-[#0062c4] text-[11px] font-bold tracking-wider uppercase block leading-tight">
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
                {headerMeta.showInviteBtn && (
                  <Button
                    onClick={handleInvitePartner}
                    disabled={isGeneratingInviteLink}
                    className="bg-[#f97316] hover:bg-[#ea580c] text-white font-medium text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    {isGeneratingInviteLink ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : copiedInviteLink ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-base leading-none font-bold">+</span>
                    )}
                    <span>
                      {copiedInviteLink ? "Copied!" : "Invite referral partner"}
                    </span>
                  </Button>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-hidden cursor-pointer flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-200/50 transition-all">
                    <div className="w-9 h-9 rounded-full bg-[#dbeafe] text-[#1d4ed8] font-bold text-xs flex items-center justify-center ring-2 ring-blue-500/20">
                      {userInfo.initials}
                    </div>
                    <div className="hidden md:block text-left text-xs leading-tight">
                      <div className="font-semibold text-slate-800">
                        {userInfo.fullName}
                      </div>
                      <div className="text-[11px] text-blue-600 font-medium">
                        Channel Partner
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
                        <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                          Channel Partner
                        </span>
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-slate-100 my-1" />
                    <DropdownMenuItem
                      onClick={() => router.push("/agent/profile")}
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
    </AgentRoute>
  );
}
