"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Edit,
  CreditCard,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Camera,
  MapPin,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    {
      label: "Overview & Profile",
      href: "/profile",
      icon: User,
      isActive: pathname === "/profile" || pathname === "/profile/overview",
    },
    {
      label: "Edit Details",
      href: "/profile/edit",
      icon: Edit,
      isActive: pathname === "/profile/edit",
    },
    {
      label: "Bank & Payout",
      href: "/profile/bank",
      icon: CreditCard,
      isActive: pathname === "/profile/bank" || pathname === "/profile/payout",
    },
    {
      label: "Documents",
      href: "/profile/documents",
      icon: FileText,
      isActive: pathname === "/profile/documents",
    },
    {
      label: "Security",
      href: "/profile/security",
      icon: ShieldCheck,
      isActive: pathname === "/profile/security",
    },
  ];

  return (
    <div className="max-w-[1360px] mx-auto space-y-6">
      {/* 1. Hero Profile Header Card */}
      <Card className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left: Avatar + Identification */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl bg-[#0062c4] text-white font-black text-2xl flex items-center justify-center shadow-md">
                AR
              </div>
              <button
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full border border-slate-200 text-slate-700 hover:text-blue-600 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                title="Change Photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Ahmed Rahman
                </h1>
                <span className="bg-[#ffedd5] text-[#c2410c] text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap shadow-2xs">
                  Premium Referral Partner
                </span>
                <span className="bg-[#dcfce7] text-[#15803d] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 font-normal">
                <span className="font-semibold text-slate-700">Partner ID: RP-0112</span>
                <span>·</span>
                <span>Member since Jan 2024</span>
                <span>·</span>
                <span className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-3 h-3 text-slate-400" /> Dhaka, Bangladesh
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick Performance Stat Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100/90 text-center sm:text-left min-w-[110px]">
              <span className="text-[11px] text-slate-400 font-medium block">Total Patients</span>
              <span className="text-xl font-bold text-slate-900 mt-0.5 block">142</span>
            </div>
            <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100/90 text-center sm:text-left min-w-[110px]">
              <span className="text-[11px] text-slate-400 font-medium block">Success Rate</span>
              <span className="text-xl font-bold text-[#059669] mt-0.5 block">94%</span>
            </div>
            <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100/90 text-center sm:text-left min-w-[110px]">
              <span className="text-[11px] text-slate-400 font-medium block">Earnings</span>
              <span className="text-xl font-bold text-slate-900 mt-0.5 block">$24,850</span>
            </div>
            <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100/90 text-center sm:text-left min-w-[110px]">
              <span className="text-[11px] text-slate-400 font-medium block">Partner Rank</span>
              <span className="text-xl font-bold text-amber-600 mt-0.5 block">#8</span>
            </div>
          </div>
        </div>
      </Card>

      {/* 2. Navigation Pills Bar matching exact screenshot */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-2xs ${
                tab.isActive
                  ? "bg-[#005ca9] text-white shadow-xs"
                  : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/80"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${tab.isActive ? "text-white" : "text-slate-500"}`} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>

      {/* 3. Sub-page Content */}
      <div>{children}</div>
    </div>
  );
}
