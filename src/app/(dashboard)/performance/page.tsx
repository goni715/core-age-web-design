"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  DollarSign,
  CheckCircle2,
  TrendingUp,
  Award,
  BarChart3,
  MessageSquare,
  Bell,
  ArrowUpRight,
  Target,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function PerformancePage() {
  const stats = [
    {
      label: "Cases This Month",
      value: "18",
      subtext: "+3 compared to last month",
      icon: Users,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50",
    },
    {
      label: "Monthly Earnings",
      value: "$3,240",
      subtext: "+12% commission growth",
      icon: DollarSign,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50",
    },
    {
      label: "Treatments Completed",
      value: "15",
      subtext: "83% completion rate",
      icon: CheckCircle2,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50",
    },
    {
      label: "Referral Success Rate",
      value: "94%",
      subtext: "Well above network avg (78%)",
      icon: TrendingUp,
      iconColor: "text-teal-500",
      iconBg: "bg-teal-50",
    },
  ];

  const monthlyHistory = [
    { month: "September 2026", cases: 18, completed: 15, earnings: "$3,240", conversion: "94%", tier: "Platinum" },
    { month: "August 2026", cases: 15, completed: 13, earnings: "$2,850", conversion: "92%", tier: "Gold" },
    { month: "July 2026", cases: 19, completed: 17, earnings: "$3,600", conversion: "95%", tier: "Platinum" },
    { month: "June 2026", cases: 12, completed: 10, earnings: "$2,100", conversion: "89%", tier: "Gold" },
    { month: "May 2026", cases: 14, completed: 12, earnings: "$2,450", conversion: "90%", tier: "Gold" },
  ];

  return (
    <div className="max-w-[1360px] mx-auto space-y-6">
      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <Link
          href="/support"
          className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80 transition-colors flex items-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
          <span>Support Center</span>
        </Link>
        <Link
          href="/notifications"
          className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80 transition-colors flex items-center gap-1.5"
        >
          <Bell className="w-3.5 h-3.5 text-slate-500" />
          <span>Notifications</span>
        </Link>
        <Link
          href="/performance"
          className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap bg-[#005ca9] text-white shadow-xs transition-colors flex items-center gap-1.5"
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Performance Analytics</span>
        </Link>
      </div>

      {/* 1. 4 Primary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl ${stat.iconBg} ${stat.iconColor} flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-[#059669] bg-[#dcfce7] px-2 py-0.5 rounded-full">
                  Active
                </span>
              </div>

              <div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-700 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {stat.subtext}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 2. Middle Section: Goals & Rank */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Monthly Targets & Progress (8 cols) */}
        <Card className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Monthly Targets & Milestones</h3>
              <p className="text-xs text-slate-500 mt-0.5">Track your progress towards monthly partner tier bonuses</p>
            </div>
            <span className="text-xs font-semibold text-[#005ca9] bg-blue-50 px-3 py-1 rounded-full">
              September 2026
            </span>
          </div>

          <div className="space-y-5">
            {/* Target 1: Case Submissions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-blue-600" /> Case Submission Goal
                </span>
                <span className="font-bold text-slate-900">18 / 20 cases (90%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#0062c4] rounded-full transition-all" style={{ width: "90%" }} />
              </div>
              <span className="text-[11px] text-slate-400 block">2 more referred cases needed to reach diamond bonus</span>
            </div>

            {/* Target 2: Earnings Goal */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-amber-600" /> Earnings Goal
                </span>
                <span className="font-bold text-slate-900">$3,240 / $4,000 (81%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: "81%" }} />
              </div>
              <span className="text-[11px] text-slate-400 block">$760 needed to hit maximum tier reward payout</span>
            </div>
          </div>
        </Card>

        {/* Top Performer Card (4 cols) */}
        <Card className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center shadow-xs">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Top Performer</h3>
                <span className="text-xs text-[#059669] font-semibold">Top 10% Partner</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              You are among the highest-performing medical referral partners in the network this quarter.
            </p>
          </div>

          <div className="bg-amber-50/60 border border-amber-100/90 rounded-2xl p-5 text-center mt-6">
            <span className="text-4xl font-black text-amber-600 block tracking-tight">#8</span>
            <span className="text-xs font-semibold text-slate-600 mt-1 block">Out of 150 Active Partners</span>
          </div>
        </Card>
      </div>

      {/* 3. Performance History Table */}
      <Card className="bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Monthly Performance Record</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  MONTH
                </th>
                <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  CASES REFERRED
                </th>
                <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  COMPLETED
                </th>
                <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  EARNINGS
                </th>
                <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  CONVERSION
                </th>
                <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase text-right">
                  PARTNER TIER
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {monthlyHistory.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 pr-2 font-bold text-xs sm:text-sm text-slate-900">
                    {row.month}
                  </td>
                  <td className="py-3.5 px-2 text-xs sm:text-sm text-slate-700">
                    {row.cases}
                  </td>
                  <td className="py-3.5 px-2 text-xs sm:text-sm text-slate-700">
                    {row.completed}
                  </td>
                  <td className="py-3.5 px-2 text-xs sm:text-sm font-bold text-slate-900">
                    {row.earnings}
                  </td>
                  <td className="py-3.5 px-2 text-xs sm:text-sm text-slate-700">
                    {row.conversion}
                  </td>
                  <td className="py-3.5 pl-2 text-right">
                    <span className="bg-[#e0f2fe] text-[#0284c7] font-semibold text-xs px-3 py-1 rounded-full">
                      {row.tier}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
