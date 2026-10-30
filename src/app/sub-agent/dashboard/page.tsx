"use client";

import React from "react";
import Link from "next/link";
import { User, Clock, Check, DollarSign, ArrowUpRight, Plus, Sparkles, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useGetPatientsBySubAgentQuery } from "@/redux/features/agentPatient/agentPatientApi";

export default function SubAgentDashboard() {
  const { data: patientsData, isLoading } = useGetPatientsBySubAgentQuery({ limit: 5 });

  const totalCases = patientsData?.meta?.total || 14;
  const ongoingCases = patientsData?.statusCounts?.ongoing || 2;
  const completedCases = patientsData?.statusCounts?.completed || 12;

  const stats = [
    {
      label: "My Total Cases",
      value: String(totalCases),
      icon: User,
      iconBg: "bg-teal-50",
      iconColor: "text-teal-600",
    },
    {
      label: "Ongoing Treatment",
      value: String(ongoingCases),
      icon: Clock,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      label: "Completed Cases",
      value: String(completedCases),
      icon: Check,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "My Referral Earnings",
      value: "$4,280",
      icon: DollarSign,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-700",
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
        treatment: p.treatmentType || "Specialist Care",
        country: p.preferredCountry || "India",
        status: p.status || "Ongoing",
        statusBadge:
          p.status === "completed"
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : p.status === "under_review"
            ? "bg-amber-50 text-amber-700 border-amber-200"
            : "bg-teal-50 text-teal-700 border-teal-200",
      }))
    : [
        {
          initials: "TH",
          name: "Tariq Hasan",
          id: "CS-2849",
          treatment: "Coronary Angioplasty",
          country: "India",
          status: "Ongoing",
          statusBadge: "bg-teal-50 text-teal-700 border-teal-200",
        },
        {
          initials: "RB",
          name: "Ruma Begum",
          id: "CS-2848",
          treatment: "Knee Replacement Surgery",
          country: "Thailand",
          status: "Under review",
          statusBadge: "bg-amber-50 text-amber-700 border-amber-200",
        },
        {
          initials: "KM",
          name: "Kamal Mustafa",
          id: "CS-2841",
          treatment: "Chemotherapy & Oncology",
          country: "Singapore",
          status: "Completed",
          statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
        },
      ];

  return (
    <div className="max-w-[1360px] mx-auto space-y-6">
      {/* Sub-Agent Welcome Banner */}
      <div
        style={{ background: "linear-gradient(135deg, #0d5c56 0%, #0f766e 45%, #059669 100%)" }}
        className="rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-teal-900/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-white/20 text-white backdrop-blur-xs border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-teal-200" />
              Sub-Agent Referral Portal
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Refer Patients & Track Direct Commissions
          </h2>
          <p className="text-teal-100 text-xs sm:text-sm max-w-xl leading-relaxed">
            Submit medical travel cases directly for visa processing, expert hospital quotations, and prompt referral payouts.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <Link
            href="/sub-agent/submit-patient"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-teal-900 font-bold text-sm hover:bg-teal-50 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-teal-700" />
            <span>Submit Patient</span>
          </Link>
          <Link
            href="/sub-agent/patients"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm transition-all border border-white/25 backdrop-blur-xs active:scale-95 cursor-pointer"
          >
            <span>My Cases</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {stats.map((item, idx) => (
          <Card
            key={idx}
            className="p-5 border border-teal-100 bg-white rounded-2xl shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
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

      {/* 2-Column: My Recent Cases & Channel Partner Network Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): My Cases */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-teal-100 shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                My Recent Patient Referrals
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Cases you submitted for overseas hospital treatment
              </p>
            </div>
            <Link
              href="/sub-agent/patients"
              className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 hover:underline"
            >
              <span>View all cases</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentCases.map((c, i) => (
              <div
                key={i}
                className="py-3.5 flex items-center justify-between gap-4 hover:bg-teal-50/40 px-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 font-bold text-xs flex items-center justify-center shrink-0 border border-teal-100">
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
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${c.statusBadge}`}
                  >
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Reporting & Referral Partner Status Card */}
        <div className="bg-white rounded-2xl border border-teal-100 shadow-2xs p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-teal-600" />
                <span>Reporting Channel Partner</span>
              </div>
              <h3 className="font-bold text-slate-900 text-lg mt-1">
                3S Medi Care Int
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Master partner handling clinical records, visa desk & payouts
              </p>
            </div>

            <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-100 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Your Partner Status:</span>
                <span className="font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md shadow-2xs">
                  Active Sub-Agent
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Average Payout:</span>
                <span className="font-bold text-slate-800">$350 - $1,200 / case</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Hospital Acceptance:</span>
                <span className="font-bold text-teal-700">98.4%</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <Link
              href="/sub-agent/submit-patient"
              style={{ background: "linear-gradient(135deg, #0d9488, #059669)" }}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-white font-bold text-xs shadow-sm hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit Another Patient</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
