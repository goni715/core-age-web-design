"use client";

import React from "react";
import Link from "next/link";
import { User, Clock, Check, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AgentDashboard() {

  const stats = [
    {
      label: "Total patients",
      value: "142",
      icon: User,
      iconBg: "bg-[#eff6ff]",
      iconColor: "text-[#2563eb]",
    },
    {
      label: "Ongoing cases",
      value: "12",
      icon: Clock,
      iconBg: "bg-[#fffbeb]",
      iconColor: "text-[#d97706]",
    },
    {
      label: "Completed",
      value: "98",
      icon: Check,
      iconBg: "bg-[#ecfdf5]",
      iconColor: "text-[#059669]",
    },
    {
      label: "Total earnings",
      value: "$24,850",
      icon: DollarSign,
      iconBg: "bg-[#eff6ff]",
      iconColor: "text-[#2563eb]",
    },
  ];

  const recentCases = [
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
    {
      initials: "ED",
      name: "Emily Davis",
      id: "CS-2844",
      treatment: "Dental implants",
      country: "Malaysia",
      status: "Completed",
      statusBadge: "bg-[#e2e8f0]/80 text-[#475569]",
    },
    {
      initials: "DW",
      name: "David Wilson",
      id: "CS-2843",
      treatment: "Eye surgery",
      country: "India",
      status: "Ongoing",
      statusBadge: "bg-[#e0f2fe] text-[#0284c7]",
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
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-100/90 shadow-2xs flex flex-col justify-between"
            >
              <div className={`w-8 h-8 rounded-lg ${stat.iconBg} ${stat.iconColor} flex items-center justify-center mb-3`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 font-normal mt-1">
                  {stat.label}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main 2-Column Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (Monthly performance & Recent cases) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Monthly performance Card */}
          <Card className="bg-white rounded-2xl p-6 border border-slate-100/90 shadow-2xs">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 text-base">Monthly performance</h3>
              <span className="text-xs font-semibold text-[#059669] bg-[#dcfce7] px-3 py-1 rounded-full">
                +12% this month
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              {/* Left Key Numbers */}
              <div className="md:col-span-6 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-bold text-slate-900 tracking-tight">18</div>
                  <div className="text-xs text-slate-500 mt-1 leading-tight">Cases submitted</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 tracking-tight">$3,240</div>
                  <div className="text-xs text-slate-500 mt-1 leading-tight">Earnings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 tracking-tight">94%</div>
                  <div className="text-xs text-slate-500 mt-1 leading-tight">Success rate</div>
                </div>
              </div>

              {/* Right Bar Chart */}
              <div className="md:col-span-6 flex items-end justify-between sm:justify-end sm:gap-4.5 pt-4 md:pt-0">
                {monthlyBars.map((bar, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div className="h-24 w-8 sm:w-9 flex items-end justify-center">
                      <div
                        style={{ height: `${bar.heightPercent}%` }}
                        className={`w-full rounded-t-xs transition-all ${
                          bar.active
                            ? "bg-[#0059a7]"
                            : "bg-[#a5c8ea] hover:bg-[#91bae0]"
                        }`}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-slate-400">
                      {bar.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Recent cases Card */}
          <Card className="bg-white rounded-2xl p-6 border border-slate-100/90 shadow-2xs">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-900 text-base">Recent cases</h3>
              <Link
                href="/patients"
                className="text-blue-600 font-semibold text-xs hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100/80">
                    <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                      PATIENT
                    </th>
                    <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase hidden sm:table-cell">
                      TREATMENT
                    </th>
                    <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase hidden md:table-cell">
                      COUNTRY
                    </th>
                    <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase text-right sm:text-center">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentCases.map((item, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                      {/* Patient Info */}
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#e8f1fc] text-[#2563eb] font-semibold text-xs flex items-center justify-center shrink-0">
                            {item.initials}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                              {item.name}
                            </div>
                            <div className="text-xs text-slate-400 font-normal">
                              {item.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Treatment */}
                      <td className="py-3.5 text-sm text-slate-600 font-normal hidden sm:table-cell">
                        {item.treatment}
                      </td>

                      {/* Country */}
                      <td className="py-3.5 text-sm text-slate-600 font-normal hidden md:table-cell">
                        {item.country}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 text-right sm:text-center">
                        <span
                          className={`inline-block px-3.5 py-1 rounded-full text-xs font-semibold ${item.statusBadge} min-w-[90px]`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column (Widgets) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Quick actions Card */}
          <Card className="bg-white rounded-2xl p-5 border border-slate-100/90 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm mb-3">Quick actions</h3>
            <div className="space-y-2.5">
              <Link
                href="/submit-patient"
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold text-xs py-2.5 px-4 rounded-xl w-full text-center block transition-colors shadow-xs"
              >
                + Submit patient
              </Link>
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/patients"
                  className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs py-2 px-3 rounded-xl text-center block transition-colors"
                >
                  View cases
                </Link>
                <Link
                  href="/commission"
                  className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs py-2 px-3 rounded-xl text-center block transition-colors"
                >
                  Commission
                </Link>
              </div>
              <Link
                href="/commission"
                className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs py-2 px-3 rounded-xl text-center w-full block transition-colors"
              >
                Withdraw earnings
              </Link>
            </div>
          </Card>

          {/* Your reporting path Card */}
          <Card className="bg-white rounded-2xl p-5 border border-slate-100/90 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm mb-3.5">Your reporting path</h3>
            <div className="flex items-center gap-2">
              <span className="bg-[#005ca9] text-white text-xs font-semibold px-3 py-1.5 rounded-lg inline-flex items-center justify-center">
                You
              </span>
              <span className="text-slate-400 font-bold text-sm">→</span>
              <span className="bg-[#e6fcf5] text-[#059669] border border-[#a7f3d0] text-xs font-semibold px-3 py-1.5 rounded-lg inline-flex items-center justify-center">
                3S Medi Care Int
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mt-3">
              You were onboarded directly by 3S Medi Care Int. Your cases and commission are handled by 3S.
            </p>
          </Card>

          {/* Healthcare network Card */}
          <Card className="bg-white rounded-2xl p-5 border border-slate-100/90 shadow-2xs">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="font-bold text-slate-900 text-sm">Healthcare network</h3>
              <Link
                href="/healthcare-network"
                className="text-blue-600 text-xs font-semibold hover:underline"
              >
                Open
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700">Thailand</span>
                <Link
                  href="/healthcare-network"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  10 hospitals
                </Link>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700">India</span>
                <Link
                  href="/healthcare-network"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  15 hospitals
                </Link>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700">Singapore</span>
                <span className="text-slate-500">To be confirmed</span>
              </div>
            </div>
          </Card>

          {/* Need help? Card */}
          <Card className="bg-[#ecf4fd] rounded-2xl p-5 border border-blue-100/60 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">Need help?</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Our support team can help with a case, a commission query or a withdrawal.
            </p>
            <Link
              href="/support"
              className="bg-[#0060c7] hover:bg-[#0050a4] text-white font-semibold text-xs py-2.5 px-4 rounded-xl w-full text-center block transition-colors shadow-xs"
            >
              Contact support
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
