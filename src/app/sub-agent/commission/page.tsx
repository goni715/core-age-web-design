"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DollarSign, CheckCircle2, Clock, TrendingUp, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SubAgentCommissionPage() {
  const [activeTab, setActiveTab] = useState("All");

  const summary = [
    {
      label: "Total Earned",
      value: "$4,280",
      icon: DollarSign,
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
    {
      label: "Approved Earnings",
      value: "$3,150",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Pending Cases",
      value: "$1,130",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Completed Payouts",
      value: "$2,800",
      icon: TrendingUp,
      color: "text-teal-700",
      bg: "bg-teal-50",
    },
  ];

  const tabs = ["All", "Pending", "Approved", "Paid"];

  const earnings = [
    {
      caseId: "CS-2849",
      name: "Tariq Hasan",
      hospital: "Apollo Hospitals, Chennai",
      treatment: "Coronary Angioplasty",
      status: "Pending",
      statusColor: "bg-amber-500",
      amount: "$450",
      payoutDate: "Pending patient admission",
    },
    {
      caseId: "CS-2848",
      name: "Ruma Begum",
      hospital: "Bumrungrad Hospital, Bangkok",
      treatment: "Knee Replacement",
      status: "Approved",
      statusColor: "bg-emerald-500",
      amount: "$680",
      payoutDate: "Estimated next cycle",
    },
    {
      caseId: "CS-2841",
      name: "Kamal Mustafa",
      hospital: "Gleneagles Hospital, Singapore",
      treatment: "Oncology Care",
      status: "Paid",
      statusColor: "bg-teal-600",
      amount: "$1,200",
      payoutDate: "05 Oct 2026",
    },
    {
      caseId: "CS-2832",
      name: "Nazia Karim",
      hospital: "Prince Court Medical, Malaysia",
      treatment: "Dental Implants",
      status: "Paid",
      statusColor: "bg-teal-600",
      amount: "$320",
      payoutDate: "15 Sep 2026",
    },
  ];

  const filteredEarnings =
    activeTab === "All"
      ? earnings
      : earnings.filter((e) => e.status === activeTab);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Referral Earnings & Rewards
          </h1>
          <p className="text-slate-500 text-sm">
            Track your per-case referral fee, approved earnings, and completed settlements
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Settled directly by Master Channel Partner</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((stat, idx) => (
          <Card
            key={idx}
            className="p-5 border border-teal-100 shadow-2xs rounded-2xl bg-white space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </span>
              <div
                className={`w-9 h-9 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center shrink-0`}
              >
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {stat.value}
            </div>
          </Card>
        ))}
      </div>

      {/* Earnings Table */}
      <div className="bg-white rounded-3xl border border-teal-100 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#0d9488] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6">Referred Patient</th>
                <th className="py-3 px-4">Hospital & Treatment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Payout Date</th>
                <th className="py-3 px-6 text-right">Referral Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEarnings.map((e, i) => (
                <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 text-sm">
                      {e.name}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      {e.caseId}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-xs">
                    <div className="font-semibold text-slate-800">
                      {e.hospital}
                    </div>
                    <div className="text-slate-500">{e.treatment}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <span className={`w-2 h-2 rounded-full ${e.statusColor}`} />
                      {e.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-500">
                    {e.payoutDate}
                  </td>
                  <td className="py-4 px-6 text-right font-extrabold text-teal-800 text-sm">
                    {e.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
