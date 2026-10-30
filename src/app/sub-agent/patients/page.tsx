"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Check, Plus, Loader2, FileText, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useGetPatientsBySubAgentQuery, IAgentPatientItem } from "@/redux/features/agentPatient/agentPatientApi";

export default function SubAgentPatientsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedCaseId, setSelectedCaseId] = useState<string>("CS-2849");

  const { data: patientsResponse, isLoading } = useGetPatientsBySubAgentQuery({
    searchTerm: searchQuery,
    status: activeTab === "all" ? undefined : activeTab,
    preferredCountry: selectedCountry === "all" ? undefined : selectedCountry,
  });

  const samplePatients: IAgentPatientItem[] = [
    {
      _id: "sa-p1",
      caseId: "CS-2849",
      agentUserId: "ag1",
      fullName: "Tariq Hasan",
      phone: "+880 1712 345678",
      treatmentType: "Coronary Angioplasty",
      preferredCountry: "India",
      status: "ongoing",
      timeline: [
        { title: "Case Submitted", date: "12 Oct 2026" },
        { title: "Under Review by 3S Board", date: "14 Oct 2026" },
        { title: "Apollo Hospital Confirmed", date: "18 Oct 2026" },
        { title: "Patient Travel & Admission", date: "24 Oct 2026" },
      ],
      createdAt: "2026-10-12T10:00:00Z",
    },
    {
      _id: "sa-p2",
      caseId: "CS-2848",
      agentUserId: "ag1",
      fullName: "Ruma Begum",
      phone: "+880 1819 876543",
      treatmentType: "Knee Replacement Surgery",
      preferredCountry: "Thailand",
      status: "under_review",
      timeline: [
        { title: "Case Submitted", date: "20 Oct 2026" },
        { title: "Under Review by Bumrungrad Desk", date: "22 Oct 2026" },
      ],
      createdAt: "2026-10-20T10:00:00Z",
    },
    {
      _id: "sa-p3",
      caseId: "CS-2841",
      agentUserId: "ag1",
      fullName: "Kamal Mustafa",
      phone: "+880 1911 223344",
      treatmentType: "Chemotherapy & Oncology",
      preferredCountry: "Singapore",
      status: "completed",
      timeline: [
        { title: "Case Submitted", date: "01 Sep 2026" },
        { title: "Confirmed by Gleneagles", date: "05 Sep 2026" },
        { title: "Treatment Completed", date: "28 Sep 2026" },
        { title: "Referral Payout Released", date: "05 Oct 2026" },
      ],
      createdAt: "2026-09-01T10:00:00Z",
    },
  ];

  const patientsList =
    patientsResponse?.data && patientsResponse.data.length > 0
      ? patientsResponse.data
      : samplePatients;

  const counts = patientsResponse?.statusCounts || {
    all: patientsList.length,
    submitted: 3,
    under_review: 4,
    confirmed: 2,
    ongoing: 2,
    completed: 12,
    cancelled: 0,
  };

  const tabs = [
    { label: `All (${counts.all})`, key: "all" },
    { label: `Submitted (${counts.submitted})`, key: "submitted" },
    { label: `Under review (${counts.under_review})`, key: "under_review" },
    { label: `Confirmed (${counts.confirmed})`, key: "confirmed" },
    { label: `Ongoing (${counts.ongoing})`, key: "ongoing" },
    { label: `Completed (${counts.completed})`, key: "completed" },
  ];

  const selectedPatient =
    patientsList.find((p) => (p.caseId || p._id) === selectedCaseId) ||
    patientsList[0];

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "ongoing":
        return "bg-teal-50 text-teal-700 border-teal-200";
      case "under_review":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "completed":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "submitted":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.key
                  ? "bg-[#0d9488] text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Link
          href="/sub-agent/submit-patient"
          style={{ background: "linear-gradient(135deg, #0d9488, #059669)" }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white font-bold text-xs sm:text-sm shadow-xs hover:opacity-95 active:scale-[0.99] transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Patient</span>
        </Link>
      </div>

      {/* Filter Row */}
      <div className="bg-white rounded-2xl border border-teal-100 p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search my cases by patient name, case ID, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>

        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 font-medium focus:outline-hidden"
        >
          <option value="all">All Destinations</option>
          <option value="India">India</option>
          <option value="Thailand">Thailand</option>
          <option value="Singapore">Singapore</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Turkey">Turkey</option>
        </select>
      </div>

      {/* Master Detail View: Table on Left + Case Timeline on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Cases Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-teal-100 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-6">Patient Name</th>
                  <th className="py-3 px-4">Treatment / Destination</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-6 text-right">Referral Reward</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-teal-600" />
                      Loading your referred cases...
                    </td>
                  </tr>
                ) : patientsList.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400">
                      No cases found matching your search.
                    </td>
                  </tr>
                ) : (
                  patientsList.map((p) => {
                    const id = p.caseId || p._id;
                    const isSelected = selectedCaseId === id;

                    return (
                      <tr
                        key={p._id}
                        onClick={() => setSelectedCaseId(id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-teal-50/80 hover:bg-teal-50"
                            : "hover:bg-slate-50/60"
                        }`}
                      >
                        <td className="py-4 px-6">
                          <div className="font-bold text-slate-900 text-sm">
                            {p.fullName}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400">
                            {p.caseId || "CS-" + p._id.slice(-4)}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-medium text-slate-800 text-xs sm:text-sm">
                            {p.treatmentType}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {p.preferredCountry || "India"}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(
                              p.status
                            )}`}
                          >
                            {p.status}
                          </span>
                        </td>

                        <td className="py-4 px-6 text-right font-extrabold text-teal-800 text-sm">
                          {p.status === "completed"
                            ? "$350 - $750"
                            : "Estimated on admission"}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Selected Case Details & Progress */}
        {selectedPatient && (
          <div className="bg-white rounded-3xl border border-teal-100 shadow-2xs p-6 space-y-5">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/60">
                  {selectedPatient.caseId || "CASE FILE"}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1.5">
                  {selectedPatient.fullName}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedPatient.phone || "No phone provided"}
                </p>
              </div>

              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getStatusBadge(
                  selectedPatient.status
                )}`}
              >
                {selectedPatient.status}
              </span>
            </div>

            {/* Case Meta Box */}
            <div className="bg-teal-50/50 rounded-2xl p-4 text-xs space-y-2.5 border border-teal-100">
              <div className="flex justify-between">
                <span className="text-slate-500">Treatment:</span>
                <span className="font-bold text-slate-800">
                  {selectedPatient.treatmentType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="font-semibold text-slate-800">
                  {selectedPatient.preferredCountry || "India"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Medical Coordinator:</span>
                <span className="font-semibold text-teal-800">
                  3S Care Desk
                </span>
              </div>
            </div>

            {/* Treatment Milestones Timeline */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Treatment Milestones
              </h4>
              <div className="space-y-3">
                {Array.isArray(selectedPatient.timeline) && selectedPatient.timeline.length > 0 ? (
                  selectedPatient.timeline.map((step: { title: string; date: string }, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 text-xs">
                      <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <div className="flex-1 flex justify-between">
                        <span className="font-semibold text-slate-800">
                          {step.title}
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">
                          {step.date}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-slate-400">
                    Case submitted to 3S international medical board.
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={`/sub-agent/submit-patient`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold text-xs transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Submit Another Patient Case</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
