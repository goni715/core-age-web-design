"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { User, Clock, Check, ArrowUpRight, Share2, Plus, ShieldCheck, AlertCircle } from "lucide-react";
import TkIcon from "@/components/icons/TkIcon";
import { Card } from "@/components/ui/card";
import {
  useGetMyNetworksQuery,
  useGetReferralPartnerStatsQuery,
} from "@/redux/features/referralPartner/referralPartnerApi";
import { useGetPatientsByAgentQuery } from "@/redux/features/agentPatient/agentPatientApi";
import { useGetMyProfileQuery } from "@/redux/features/user/userApi";
import { setUserInfo } from "@/helpers/SessionHelper";

export default function AgentDashboard() {
  const { data: profileResponse } = useGetMyProfileQuery();
  const profile = profileResponse?.data;

  const { data: networkData } = useGetMyNetworksQuery({ limit: 5 });
  const { data: statsData } = useGetReferralPartnerStatsQuery();
  const { data: patientsData } = useGetPatientsByAgentQuery({ limit: 5 });

  useEffect(() => {
    if (profile) {
      setUserInfo({
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        agencyName: profile.agencyName,
        role: "agent",
        userId: profile.userId || profile._id,
      });
    }
  }, [profile]);

  const totalPartners =
    statsData?.data?.overviewStats?.referralPartners ??
    statsData?.data?.statusCounts?.all ??
    networkData?.meta?.total ??
    0;
  const totalPatients = patientsData?.meta?.total || 0;
  const ongoingCases = patientsData?.statusCounts?.ongoing || 0;
  const completedCases = patientsData?.statusCounts?.completed || 0;
  const networkEarnings =
    statsData?.data?.overviewStats?.formattedEarnings?.replace("$", "TK ") ??
    (statsData?.data?.overviewStats?.networkEarnings !== undefined
      ? `TK ${statsData.data.overviewStats.networkEarnings.toLocaleString()}`
      : "TK 0");

  const stats = [
    {
      label: "Total Patients",
      value: String(totalPatients),
      icon: User,
      iconBg: "bg-[#eff6ff]",
      iconColor: "text-[#2563eb]",
    },
    {
      label: "Referral Partners",
      value: String(totalPartners),
      icon: Share2,
      iconBg: "bg-[#ecfdf5]",
      iconColor: "text-[#059669]",
    },
    {
      label: "Ongoing Cases",
      value: String(ongoingCases),
      icon: Clock,
      iconBg: "bg-[#fffbeb]",
      iconColor: "text-[#d97706]",
    },
    {
      label: "Completed",
      value: String(completedCases),
      icon: Check,
      iconBg: "bg-[#eff6ff]",
      iconColor: "text-[#0284c7]",
    },
    {
      label: "Network Earnings",
      value: networkEarnings,
      icon: TkIcon,
      iconBg: "bg-[#f0fdf4]",
      iconColor: "text-[#16a34a]",
    },
  ];

  const recentCases = patientsData?.data?.length
    ? patientsData.data.slice(0, 5).map((p) => ({
        initials: p.fullName
          ? p.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()
          : "PT",
        name: p.fullName,
        id: p.caseId || "CS-" + p._id.slice(-4),
        treatment: p.treatmentType || "General Care",
        country: p.preferredCountry || "India",
        status: p.status || "Ongoing",
        statusBadge:
          p.status === "completed"
            ? "bg-[#ecfdf5] text-[#059669]"
            : p.status === "under_review"
            ? "bg-[#fffbeb] text-[#d97706]"
            : "bg-[#e0f2fe] text-[#0284c7]",
      }))
    : [
        {
          initials: "JS",
          name: "John Smith",
          id: "CS-2847",
          treatment: "Cardiac surgery",
          country: "India",
          status: "Ongoing",
          statusBadge: "bg-[#e0f2fe] text-[#0284c7]",
        },
        {
          initials: "SJ",
          name: "Sarah Johnson",
          id: "CS-2846",
          treatment: "Orthopedic surgery",
          country: "Thailand",
          status: "Under review",
          statusBadge: "bg-[#ffedd5] text-[#d97706]",
        },
        {
          initials: "MB",
          name: "Michael Brown",
          id: "CS-2845",
          treatment: "Cancer treatment",
          country: "Singapore",
          status: "Confirmed",
          statusBadge: "bg-[#d1fae5] text-[#059669]",
        },
      ];

  const monthlyBars = [
    { month: "Apr", heightPercent: 48, active: false },
    { month: "May", heightPercent: 64, active: false },
    { month: "Jun", heightPercent: 52, active: false },
    { month: "Jul", heightPercent: 78, active: false },
    { month: "Aug", heightPercent: 64, active: false },
    { month: "Sep", heightPercent: 96, active: true },
  ];

  return (
    <div className="max-w-[1360px] mx-auto space-y-6">
      {/* Quick Action Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-blue-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-white/20 text-white backdrop-blur-xs">
              {profile?.agencyName ? `${profile.agencyName} • Channel Partner` : "Channel Partner Workspace"}
            </span>
            {profile?.approvalStatus && (
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase backdrop-blur-xs ${
                  profile.approvalStatus === "approved"
                    ? "bg-emerald-500/30 text-emerald-100 border border-emerald-400/30"
                    : "bg-amber-500/30 text-amber-100 border border-amber-400/30"
                }`}
              >
                {profile.approvalStatus === "approved" ? (
                  <>
                    <ShieldCheck className="w-3 h-3 text-emerald-300" />
                    <span>Verified</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3 h-3 text-amber-300" />
                    <span>Approval Pending</span>
                  </>
                )}
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {profile?.fullName ? `Welcome back, ${profile.fullName}!` : "Expand Your Medical Referral Network"}
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm max-w-xl">
            Onboard new referral partners, submit high-priority patient travel cases, and track your multi-tier hospital commission payouts.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/agent/submit-patient"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition-all shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Patient</span>
          </Link>
          <Link
            href="/agent/my-network"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm transition-all border border-white/20 backdrop-blur-xs active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>View Network</span>
          </Link>
        </div>
      </div>

      {/* 5 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {stats.map((item, idx) => (
          <Card
            key={idx}
            className="p-5 border border-slate-200/80 bg-white rounded-2xl shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                {item.label}
              </span>
              <div
                className={`w-9 h-9 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0`}
              >
                <item.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              {item.value}
            </div>
          </Card>
        ))}
      </div>

      {/* 2-Column: Recent Cases & Monthly Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Recent Patient Cases */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Recent Patient Cases
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Active medical travel cases across your partner network
              </p>
            </div>
            <Link
              href="/agent/patients"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline"
            >
              <span>View all cases</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentCases.map((c, i) => (
              <div
                key={i}
                className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/60 px-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-100">
                    {c.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm truncate">
                        {c.name}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {c.id}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 truncate mt-0.5">
                      {c.treatment} • Destination: {c.country}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${c.statusBadge}`}
                  >
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Monthly Referral Performance */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">
                Monthly Referrals
              </h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                +28.4%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Case submission volume over past 6 months
            </p>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 px-2 pt-6">
            {monthlyBars.map((b, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
              >
                <div
                  style={{ height: `${b.heightPercent}%` }}
                  className={`w-full rounded-t-lg transition-all ${
                    b.active
                      ? "bg-gradient-to-t from-blue-600 to-indigo-500 shadow-md shadow-blue-500/20"
                      : "bg-slate-200 hover:bg-slate-300"
                  }`}
                />
                <span className="text-[11px] font-semibold text-slate-500">
                  {b.month}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Average: 24 cases / month</span>
            <Link
              href="/agent/commission"
              className="text-blue-600 font-bold hover:underline"
            >
              Earnings report
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
