"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  User,
  Clock,
  Check,
  ArrowUpRight,
  Share2,
  Plus,
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  FileText,
  Calendar,
  Loader2,
} from "lucide-react";
import TkIcon from "@/components/icons/TkIcon";
import { Card } from "@/components/ui/card";
import {
  useGetMyNetworksQuery,
  useGetReferralPartnerStatsQuery,
} from "@/redux/features/referralPartner/referralPartnerApi";
import { useGetPatientsByAgentQuery } from "@/redux/features/agentPatient/agentPatientApi";
import { useGetMyProfileQuery } from "@/redux/features/user/userApi";
import {
  useGetAgentStatsQuery,
  useGetAgentMonthlyReferralsQuery,
} from "@/redux/features/dashboard/dashboardApi";
import { setUserInfo } from "@/helpers/SessionHelper";

export default function AgentDashboard() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const { data: profileResponse } = useGetMyProfileQuery();
  const profile = profileResponse?.data;

  const { data: networkData } = useGetMyNetworksQuery({ limit: 5 });
  const { data: statsData } = useGetReferralPartnerStatsQuery();
  const { data: patientsData, isLoading: isLoadingPatients } = useGetPatientsByAgentQuery({ limit: 5 });

  // Dedicated Agent Stats & Monthly Referrals API Integration
  const { data: agentStatsRes, isLoading: isLoadingStats } = useGetAgentStatsQuery();
  const agentStats = agentStatsRes?.data;

  const { data: monthlyReferralsRes, isLoading: isLoadingMonthly } =
    useGetAgentMonthlyReferralsQuery({ year: selectedYear });
  const monthlyData = monthlyReferralsRes?.data;

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

  const totalPatients =
    agentStats?.totalPatients ??
    patientsData?.meta?.total ??
    0;

  const totalPartners =
    agentStats?.referralPartners ??
    statsData?.data?.overviewStats?.referralPartners ??
    statsData?.data?.statusCounts?.all ??
    networkData?.meta?.total ??
    0;

  const ongoingCases =
    agentStats?.ongoingCases ??
    patientsData?.statusCounts?.ongoing ??
    0;

  const completedCases =
    agentStats?.completedCases ??
    agentStats?.completed ??
    patientsData?.statusCounts?.completed ??
    0;

  const currency = agentStats?.currency || "TK";
  const earningsAmount =
    agentStats?.networkEarnings ??
    agentStats?.totalEarnings ??
    statsData?.data?.overviewStats?.networkEarnings ??
    0;
  const networkEarnings = `${currency} ${Number(earningsAmount).toLocaleString()}`;

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
            : p.status === "confirmed"
            ? "bg-[#d1fae5] text-[#059669]"
            : p.status === "submitted"
            ? "bg-purple-50 text-purple-700"
            : "bg-[#e0f2fe] text-[#0284c7]",
      }))
    : [];

  const rawMonthlyList = monthlyData?.monthlyData || [
    { month: "Jan", monthNumber: 1, referrals: 0, cases: 0, count: 0 },
    { month: "Feb", monthNumber: 2, referrals: 0, cases: 0, count: 0 },
    { month: "Mar", monthNumber: 3, referrals: 0, cases: 0, count: 0 },
    { month: "Apr", monthNumber: 4, referrals: 0, cases: 0, count: 0 },
    { month: "May", monthNumber: 5, referrals: 0, cases: 0, count: 0 },
    { month: "Jun", monthNumber: 6, referrals: 0, cases: 0, count: 0 },
    { month: "Jul", monthNumber: 7, referrals: 0, cases: 0, count: 0 },
    { month: "Aug", monthNumber: 8, referrals: 0, cases: 0, count: 0 },
    { month: "Sep", monthNumber: 9, referrals: 0, cases: 0, count: 0 },
    { month: "Oct", monthNumber: 10, referrals: 0, cases: 0, count: 0 },
    { month: "Nov", monthNumber: 11, referrals: 0, cases: 0, count: 0 },
    { month: "Dec", monthNumber: 12, referrals: 0, cases: 0, count: 0 },
  ];

  const maxReferrals = Math.max(
    ...rawMonthlyList.map((m) => m.referrals ?? m.count ?? m.cases ?? 0),
    1
  );

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
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Patient</span>
          </Link>
          <Link
            href="/agent/my-network"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm transition-all border border-white/20 backdrop-blur-xs active:scale-95 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>View Network</span>
          </Link>
        </div>
      </div>

      {/* 5 Stat Cards (Integrated with /dashboard/agent-stats) */}
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
              {isLoadingStats ? (
                <div className="h-8 w-16 bg-slate-100 animate-pulse rounded-lg" />
              ) : (
                item.value
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* 1. Recent Patient Cases (Full Width Block) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Recent Patient Cases</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Active medical travel cases across your partner network
            </p>
          </div>
          <Link
            href="/agent/patients"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>View all cases</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {isLoadingPatients ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-xs">Loading recent patient cases...</span>
          </div>
        ) : recentCases.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">No Patient Cases Yet</h4>
            <p className="text-xs text-slate-500 mb-4">
              Submit your patient cases to start hospital visa routing and track commissions in real-time.
            </p>
            <Link
              href="/agent/submit-patient"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit First Patient</span>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentCases.map((c, i) => (
              <div
                key={i}
                className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/70 px-2 rounded-xl transition-colors"
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
        )}
      </div>

      {/* 2. Monthly Referral Chart (Placed Directly Below Recent Patient Cases) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>Monthly Referrals</span>
              </h3>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                {monthlyData?.totalReferrals ?? 0} Total Cases
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Case submission volume for {monthlyData?.year || selectedYear}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Year Selector */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="bg-transparent focus:outline-hidden cursor-pointer font-bold text-slate-800"
              >
                {[currentYear - 2, currentYear - 1, currentYear, currentYear + 1].map((yr) => (
                  <option key={yr} value={yr}>
                    Year {yr}
                  </option>
                ))}
              </select>
            </div>

            <Link
              href="/agent/commission"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline shrink-0"
            >
              Earnings report
            </Link>
          </div>
        </div>

        {/* 12-Month Bar Chart */}
        {isLoadingMonthly ? (
          <div className="h-56 flex flex-col items-center justify-center text-slate-400 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-xs">Loading monthly referral data...</span>
          </div>
        ) : (
          <div className="h-56 flex items-end justify-between gap-1.5 sm:gap-3 px-2 sm:px-4 pt-8 pb-3 bg-slate-50/50 rounded-2xl border border-slate-100">
            {rawMonthlyList.map((m, idx) => {
              const val = m.referrals ?? m.count ?? m.cases ?? 0;
              const heightPercent =
                val > 0
                  ? Math.min(Math.max(Math.round((val / maxReferrals) * 85) + 15, 22), 100)
                  : 8;
              const hasCases = val > 0;

              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
                  title={`${m.month} ${monthlyData?.year || selectedYear}: ${val} referrals`}
                >
                  {/* Referral Count Tag on Top */}
                  {hasCases ? (
                    <span className="text-[10px] font-extrabold text-blue-700 bg-blue-100/90 px-1.5 py-0.5 rounded-md shadow-2xs group-hover:scale-110 transition-transform">
                      {val}
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      0
                    </span>
                  )}

                  {/* Bar */}
                  <div className="w-full flex justify-center items-end flex-1 max-w-[42px]">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-lg transition-all duration-300 ${
                        hasCases
                          ? "bg-gradient-to-t from-blue-700 via-blue-600 to-indigo-500 shadow-md shadow-blue-500/25 group-hover:opacity-90"
                          : "bg-slate-200/80 group-hover:bg-slate-300"
                      }`}
                    />
                  </div>

                  {/* Month Label */}
                  <span
                    className={`text-[11px] sm:text-xs font-semibold ${
                      hasCases ? "text-blue-900 font-bold" : "text-slate-500"
                    }`}
                  >
                    {m.month}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Chart Footer Info */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-700">
              {monthlyData?.averageCasesPerMonthFormatted ||
                `Average: ${monthlyData?.averageCasesPerMonth ?? 0} cases / month`}
            </span>
            <span>•</span>
            <span>Total Referrals: <strong className="text-slate-800">{monthlyData?.totalReferrals ?? 0}</strong></span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="inline-block w-2.5 h-2.5 rounded-xs bg-gradient-to-tr from-blue-700 to-indigo-500" />
            <span>Active Referral Month</span>
            <span className="inline-block w-2.5 h-2.5 rounded-xs bg-slate-200 ml-2" />
            <span>No Referrals</span>
          </div>
        </div>
      </div>
    </div>
  );
}
