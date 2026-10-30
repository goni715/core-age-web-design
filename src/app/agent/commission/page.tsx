"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DollarSign, CheckCircle2, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AgentCommissionPage() {
  const [activeTab, setActiveTab] = useState("All");

  const summary = [
    { label: "Total Commission", value: "$24,850", icon: DollarSign, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Approved", value: "$18,420", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Pending Approval", value: "$4,280", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Paid Out", value: "$16,150", icon: TrendingUp, color: "text-teal-500", bg: "bg-teal-50" },
  ];

  const tabs = ["All", "Pending", "Approved", "Paid"];

  const commissions = [
    { initials: "JS", name: "John Smith", status: "Pending", statusColor: "bg-amber-500", caseId: "CS-2847", hospital: "Apollo Hospitals", amount: "$1,200", partner: "Nusrat Jahan (RP-0112)" },
    { initials: "SJ", name: "Sarah Johnson", status: "Approved", statusColor: "bg-emerald-500", caseId: "CS-2846", hospital: "Bumrungrad Hospital", amount: "$850", partner: "Imran Hossain (RP-0107)" },
    { initials: "MB", name: "Michael Brown", status: "Paid", statusColor: "bg-teal-500", caseId: "CS-2845", hospital: "Mount Elizabeth", amount: "$2,500", partner: "Direct Channel Agent" },
    { initials: "ED", name: "Emily Davis", status: "Paid", statusColor: "bg-teal-500", caseId: "CS-2844", hospital: "Prince Court Medical", amount: "$320", partner: "Farhana Akter (RP-0121)" },
    { initials: "DW", name: "David Wilson", status: "Pending", statusColor: "bg-amber-500", caseId: "CS-2843", hospital: "Fortis Hospital", amount: "$650", partner: "Rakib Chowdhury (RP-0130)" },
    { initials: "LA", name: "Lisa Anderson", status: "Approved", statusColor: "bg-emerald-500", caseId: "CS-2842", hospital: "Bangkok Hospital", amount: "$1,000", partner: "Nusrat Jahan (RP-0112)" },
  ];

  const filteredCommissions =
    activeTab === "All"
      ? commissions
      : commissions.filter((c) => c.status === activeTab);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Channel Commission & Revenue
          </h1>
          <p className="text-slate-500 text-sm">
            Track multi-tier referral income across your onboarded sub-agents network
          </p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md shadow-amber-200 text-sm shrink-0 cursor-pointer">
          <DollarSign className="w-4 h-4 mr-1.5" /> Request Payout
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((stat, idx) => (
          <Card key={idx} className="p-5 border border-slate-200/80 shadow-2xs rounded-2xl bg-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </span>
              <div className={`w-9 h-9 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center shrink-0`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {stat.value}
            </div>
          </Card>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#0a2540] text-white shadow-xs"
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
                <th className="py-3 px-6">Patient & Case</th>
                <th className="py-3 px-4">Hospital</th>
                <th className="py-3 px-4">Referral Origin</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-6 text-right">Commission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCommissions.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 text-sm">{c.name}</div>
                    <div className="text-[11px] font-mono text-slate-400">{c.caseId}</div>
                  </td>
                  <td className="py-4 px-4 text-xs font-medium text-slate-700">
                    {c.hospital}
                  </td>
                  <td className="py-4 px-4 text-xs text-blue-700 font-semibold">
                    {c.partner}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <span className={`w-2 h-2 rounded-full ${c.statusColor}`} />
                      {c.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right font-extrabold text-slate-900 text-sm">
                    {c.amount}
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
