"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Copy,
  Check,
  FileText,
  Upload,
  ChevronLeft,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function PatientDetailsPage() {
  const params = useParams();
  const caseId = (params?.id as string) || "CS-2847";
  const [copied, setCopied] = useState(false);

  const patientId = "3S-PT-2026-004817";

  const handleCopy = () => {
    navigator.clipboard?.writeText(patientId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const overviewMetrics = [
    {
      title: "HOSPITAL VISITS",
      value: "3",
      subtext: "completed, 1 more scheduled",
      highlight: true,
    },
    {
      title: "DAYS IN TREATMENT",
      value: "12",
      subtext: "since arrival on 28 Sep 2026",
      highlight: false,
    },
    {
      title: "ESTIMATED BUDGET",
      value: "$4,500",
      subtext: "treatment and stay",
      highlight: false,
    },
    {
      title: "DESTINATION",
      value: "India",
      subtext: "Cardiology",
      highlight: false,
    },
  ];

  const caseProgressSteps = [
    { label: "Submitted", date: "02 Sep 2026", status: "completed" },
    { label: "Under review", date: "04 Sep 2026", status: "completed" },
    { label: "Confirmed", date: "09 Sep 2026", status: "completed" },
    { label: "Ongoing", date: "28 Sep 2026", status: "current" },
    { label: "Completed", date: "Not yet", status: "pending" },
  ];

  const hospitalVisits = [
    {
      visit: "1",
      date: "29 Sep 2026",
      hospital: "Hospital name to be added",
      purpose: "Initial consultation and examination",
      status: "Completed",
      statusBadge: "bg-[#d1fae5] text-[#059669]",
    },
    {
      visit: "2",
      date: "01 Oct 2026",
      hospital: "Hospital name to be added",
      purpose: "Diagnostic tests and pre-operative checks",
      status: "Completed",
      statusBadge: "bg-[#d1fae5] text-[#059669]",
    },
    {
      visit: "3",
      date: "04 Oct 2026",
      hospital: "Hospital name to be added",
      purpose: "Admission and surgery",
      status: "Completed",
      statusBadge: "bg-[#d1fae5] text-[#059669]",
    },
    {
      visit: "4",
      date: "14 Oct 2026",
      hospital: "Hospital name to be added",
      purpose: "Post-operative follow-up",
      status: "Scheduled",
      statusBadge: "bg-[#ffedd5] text-[#d97706]",
    },
  ];

  const travelChips = [
    "Medical visa : Approved",
    "Flights : Booked",
    "Accommodation : Arranged",
    "Airport pickup : Arranged",
    "Interpreter : Arranged",
  ];

  const documents = [
    {
      name: "Medical history summary",
      sub: "PDF, uploaded 02 Sep 2026",
    },
    {
      name: "ECG report",
      sub: "PDF, uploaded 02 Sep 2026",
    },
    {
      name: "Passport copy",
      sub: "PDF, uploaded 05 Sep 2026",
    },
  ];

  return (
    <div className="max-w-[1360px] mx-auto space-y-5">
      {/* 1. Header Card */}
      <Card className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Left: Avatar + Details */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#dbeafe] text-[#1d4ed8] font-bold text-base flex items-center justify-center shrink-0">
            JS
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                John Smith
              </h1>
              <span className="bg-[#e0f2fe] text-[#0284c7] font-semibold text-xs px-3 py-0.5 rounded-full">
                Ongoing
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
              <span>Patient ID</span>
              <span className="font-bold text-slate-800">{patientId}</span>
              <button
                onClick={handleCopy}
                className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded"
                title="Copy Patient ID"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
              <span className="text-slate-300">·</span>
              <span>Case {caseId}</span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 self-start md:self-center">
          <Link
            href="/support"
            className="border border-slate-200/90 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors shadow-2xs"
          >
            Contact support
          </Link>
          <button
            onClick={() => alert("Downloading case summary for John Smith...")}
            className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors shadow-xs"
          >
            Download case summary
          </button>
        </div>
      </Card>

      {/* 2. Overview 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {overviewMetrics.map((metric, idx) => (
          <Card
            key={idx}
            className={`rounded-2xl p-5 bg-white shadow-2xs flex flex-col justify-between ${
              metric.highlight
                ? "border-2 border-[#0062c4]"
                : "border border-slate-100"
            }`}
          >
            <div>
              <span
                className={`text-[11px] uppercase font-bold tracking-wider block ${
                  metric.highlight ? "text-[#0062c4]" : "text-slate-400"
                }`}
              >
                {metric.title}
              </span>
              <div className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
                {metric.value}
              </div>
            </div>
            <div className="text-xs text-slate-500 mt-1 font-normal">
              {metric.subtext}
            </div>
          </Card>
        ))}
      </div>

      {/* 3. Case Progress (Horizontal Stepper) */}
      <Card className="bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs">
        <h3 className="font-bold text-slate-900 text-base mb-6">Case progress</h3>

        <div className="overflow-x-auto pb-2">
          <div className="min-w-[650px] flex items-center justify-between relative px-6">
            {/* Horizontal Connecting Line Behind Nodes */}
            <div className="absolute top-[14px] left-[48px] right-[48px] h-[3px] bg-slate-200 z-0">
              {/* Active green portion covering first 3 completed intervals */}
              <div className="h-full bg-[#059669] w-[75%]" />
            </div>

            {/* Stepper Nodes */}
            {caseProgressSteps.map((step, idx) => {
              const isCompleted = step.status === "completed";
              const isCurrent = step.status === "current";

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center relative z-10"
                >
                  {/* Indicator Icon */}
                  <div className="mb-3">
                    {isCompleted ? (
                      <div className="w-7 h-7 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-xs">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    ) : isCurrent ? (
                      <div className="w-7 h-7 rounded-full border-[3px] border-[#0062c4] bg-white flex items-center justify-center shadow-xs">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#0062c4]" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full border-2 border-slate-300 bg-white" />
                    )}
                  </div>

                  {/* Label & Date */}
                  <div
                    className={`text-xs font-bold ${
                      isCompleted || isCurrent ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {step.date}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* 4. Two-Column Split Layout below Stepper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (Hospital visit history & Treatment details) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Hospital Visit History Card */}
          <Card className="bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-900 text-base">
                Hospital visit history
              </h3>
              <span className="bg-[#dcfce7] text-[#15803d] text-xs font-semibold px-3 py-1 rounded-full">
                3 completed · 1 scheduled
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                      VISIT
                    </th>
                    <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                      DATE
                    </th>
                    <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                      HOSPITAL
                    </th>
                    <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                      PURPOSE
                    </th>
                    <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase text-right">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {hospitalVisits.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 pr-2 font-bold text-xs text-slate-900">
                        {item.visit}
                      </td>
                      <td className="py-3.5 px-2 text-xs text-slate-700 whitespace-nowrap">
                        {item.date}
                      </td>
                      <td className="py-3.5 px-2 text-xs text-slate-500">
                        {item.hospital}
                      </td>
                      <td className="py-3.5 px-2 text-xs text-slate-700">
                        {item.purpose}
                      </td>
                      <td className="py-3.5 pl-2 text-right">
                        <span
                          className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold ${item.statusBadge} min-w-[85px] text-center`}
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

          {/* Treatment Details Card */}
          <Card className="bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-base mb-5">
              Treatment details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Treatment</span>
                <span className="font-bold text-slate-900 text-sm">Cardiac surgery</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Specialty</span>
                <span className="font-bold text-slate-900 text-sm">Cardiology</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Primary condition</span>
                <span className="font-bold text-slate-900 text-sm">
                  Coronary artery disease
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Treating doctor</span>
                <span className="text-slate-600 text-sm">Doctor name to be added</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Admission date</span>
                <span className="font-bold text-slate-900 text-sm">04 Oct 2026</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Expected discharge</span>
                <span className="font-bold text-slate-900 text-sm">12 Oct 2026</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Planned stay</span>
                <span className="font-bold text-slate-900 text-sm">8 days</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Recovery plan</span>
                <span className="font-bold text-slate-900 text-sm">
                  Follow-up in 90 days
                </span>
              </div>
            </div>

            {/* Travel and Stay Arranged Section */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block mb-3">
                TRAVEL AND STAY ARRANGED BY 3S
              </span>

              <div className="flex flex-wrap gap-2">
                {travelChips.map((chip, idx) => (
                  <span
                    key={idx}
                    className="bg-[#e6fcf5] text-[#059669] border border-[#a7f3d0] rounded-lg px-3 py-1.5 text-xs font-medium inline-flex items-center gap-1.5 shadow-2xs"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column (Profile, Origin, Documents, Commission) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Patient Profile Card */}
          <Card className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm mb-4">Patient profile</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-normal">Age and sex</span>
                <span className="font-bold text-slate-900">54, Male</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-normal">Nationality</span>
                <span className="font-bold text-slate-900">Bangladesh</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-normal">Phone</span>
                <span className="font-bold text-slate-900">+880 17XX XXX 214</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-normal">Preferred language</span>
                <span className="font-bold text-slate-900">Bengali</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-normal">Registered</span>
                <span className="font-bold text-slate-900">02 Sep 2026</span>
              </div>
            </div>
          </Card>

          {/* Case Origin Card */}
          <Card className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm mb-4">Case origin</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-normal">Submitted by</span>
                <span className="font-bold text-slate-900">Nusrat Jahan (RP-0112)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-normal">Channel Partner</span>
                <span className="font-bold text-slate-900">Channel Partner A</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-normal">Onboarding path</span>
                <span className="font-bold text-slate-900">Via Channel Partner</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-normal">Submitted on</span>
                <span className="font-bold text-slate-900">02 Sep 2026</span>
              </div>
            </div>
          </Card>

          {/* Documents Card */}
          <Card className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="font-bold text-slate-900 text-sm">Documents</h3>
              <button
                onClick={() => alert("Upload dialog...")}
                className="text-blue-600 text-xs font-semibold hover:underline cursor-pointer"
              >
                Upload
              </button>
            </div>

            <div className="space-y-2.5">
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-100/90 hover:bg-slate-50 flex items-center gap-3 transition-colors cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {doc.name}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {doc.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Commission on this case Card */}
          <Card className="bg-[#ecf4fd] rounded-2xl p-5 border border-blue-100/60 shadow-2xs">
            <span className="text-[11px] font-bold text-blue-700 tracking-wider uppercase block">
              COMMISSION ON THIS CASE
            </span>
            <div className="text-3xl font-extrabold text-slate-900 my-1 tracking-tight">
              $420
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pending approval. Released after the case is completed.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
