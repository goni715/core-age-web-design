"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, Check } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function PatientsPage() {
  const [activeTab, setActiveTab] = useState("All (386)");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPartner, setSelectedPartner] = useState("All referral partners");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedPatientId, setSelectedPatientId] = useState("CS-2847");

  const tabs = [
    { label: "All (386)", key: "All" },
    { label: "Submitted (24)", key: "Submitted" },
    { label: "Under review (31)", key: "Under review" },
    { label: "Confirmed (22)", key: "Confirmed" },
    { label: "Ongoing (41)", key: "Ongoing" },
    { label: "Completed (268)", key: "Completed" },
  ];

  const patients = [
    {
      id: "CS-2847",
      name: "John Smith",
      treatment: "Cardiac surgery",
      country: "India",
      submittedBy: "Nusrat Jahan",
      submittedByRole: "Via Channel Partner A",
      submittedById: "RP-0112",
      channelPartner: "Channel Partner A",
      onboardingPath: "Via Channel Partner",
      status: "Ongoing",
      statusBadge: "bg-[#e0f2fe] text-[#0284c7]",
      commissionStatus: "Pending approval",
      progressSteps: [
        { label: "Submitted", date: "02 Sep 2026", status: "completed" },
        { label: "Under review", date: "04 Sep 2026", status: "completed" },
        { label: "Confirmed", date: "09 Sep 2026", status: "completed" },
        { label: "Ongoing", date: "28 Sep 2026", status: "current" },
        { label: "Completed", date: "Not yet", status: "pending" },
      ],
    },
    {
      id: "CS-2846",
      name: "Sarah Johnson",
      treatment: "Orthopedic surgery",
      country: "Thailand",
      submittedBy: "Imran Hossain",
      submittedByRole: "Via Channel Partner A",
      submittedById: "RP-0115",
      channelPartner: "Channel Partner A",
      onboardingPath: "Via Channel Partner",
      status: "Under review",
      statusBadge: "bg-[#ffedd5] text-[#d97706]",
      commissionStatus: "Pending submission",
      progressSteps: [
        { label: "Submitted", date: "01 Sep 2026", status: "completed" },
        { label: "Under review", date: "04 Sep 2026", status: "current" },
        { label: "Confirmed", date: "Pending", status: "pending" },
        { label: "Ongoing", date: "Pending", status: "pending" },
        { label: "Completed", date: "Not yet", status: "pending" },
      ],
    },
    {
      id: "CS-2845",
      name: "Michael Brown",
      treatment: "Cancer treatment",
      country: "Singapore",
      submittedBy: "You",
      submittedByRole: "Direct submission",
      submittedById: "Direct",
      channelPartner: "Direct Partner",
      onboardingPath: "Direct",
      status: "Confirmed",
      statusBadge: "bg-[#d1fae5] text-[#059669]",
      commissionStatus: "Under review",
      progressSteps: [
        { label: "Submitted", date: "28 Aug 2026", status: "completed" },
        { label: "Under review", date: "31 Aug 2026", status: "completed" },
        { label: "Confirmed", date: "05 Sep 2026", status: "current" },
        { label: "Ongoing", date: "Pending", status: "pending" },
        { label: "Completed", date: "Not yet", status: "pending" },
      ],
    },
    {
      id: "CS-2844",
      name: "Emily Davis",
      treatment: "Dental implants",
      country: "Malaysia",
      submittedBy: "Farhana Akter",
      submittedByRole: "Via Channel Partner A",
      submittedById: "RP-0120",
      channelPartner: "Channel Partner A",
      onboardingPath: "Via Channel Partner",
      status: "Completed",
      statusBadge: "bg-[#e2e8f0]/80 text-[#475569]",
      commissionStatus: "Paid",
      progressSteps: [
        { label: "Submitted", date: "10 Aug 2026", status: "completed" },
        { label: "Under review", date: "12 Aug 2026", status: "completed" },
        { label: "Confirmed", date: "15 Aug 2026", status: "completed" },
        { label: "Ongoing", date: "20 Aug 2026", status: "completed" },
        { label: "Completed", date: "01 Sep 2026", status: "completed" },
      ],
    },
    {
      id: "CS-2843",
      name: "David Wilson",
      treatment: "Eye surgery",
      country: "India",
      submittedBy: "Rakib Chowdhury",
      submittedByRole: "Via Channel Partner A",
      submittedById: "RP-0108",
      channelPartner: "Channel Partner A",
      onboardingPath: "Via Channel Partner",
      status: "Ongoing",
      statusBadge: "bg-[#e0f2fe] text-[#0284c7]",
      commissionStatus: "Pending approval",
      progressSteps: [
        { label: "Submitted", date: "15 Aug 2026", status: "completed" },
        { label: "Under review", date: "18 Aug 2026", status: "completed" },
        { label: "Confirmed", date: "22 Aug 2026", status: "completed" },
        { label: "Ongoing", date: "01 Sep 2026", status: "current" },
        { label: "Completed", date: "Not yet", status: "pending" },
      ],
    },
    {
      id: "CS-2842",
      name: "Anna Lee",
      treatment: "Knee replacement",
      country: "Thailand",
      submittedBy: "Mahmudul Hasan",
      submittedByRole: "Via Channel Partner A",
      submittedById: "RP-0125",
      channelPartner: "Channel Partner A",
      onboardingPath: "Via Channel Partner",
      status: "Submitted",
      statusBadge: "bg-[#e0f2fe] text-[#0284c7]",
      commissionStatus: "Pending review",
      progressSteps: [
        { label: "Submitted", date: "03 Sep 2026", status: "current" },
        { label: "Under review", date: "Pending", status: "pending" },
        { label: "Confirmed", date: "Pending", status: "pending" },
        { label: "Ongoing", date: "Pending", status: "pending" },
        { label: "Completed", date: "Not yet", status: "pending" },
      ],
    },
    {
      id: "CS-2841",
      name: "Robert Chen",
      treatment: "Spine surgery",
      country: "China",
      submittedBy: "Tasnim Sultana",
      submittedByRole: "Via Channel Partner A",
      submittedById: "RP-0130",
      channelPartner: "Channel Partner A",
      onboardingPath: "Via Channel Partner",
      status: "Under review",
      statusBadge: "bg-[#ffedd5] text-[#d97706]",
      commissionStatus: "Pending review",
      progressSteps: [
        { label: "Submitted", date: "02 Sep 2026", status: "completed" },
        { label: "Under review", date: "05 Sep 2026", status: "current" },
        { label: "Confirmed", date: "Pending", status: "pending" },
        { label: "Ongoing", date: "Pending", status: "pending" },
        { label: "Completed", date: "Not yet", status: "pending" },
      ],
    },
  ];

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  // Filtering
  const filteredPatients = patients.filter((patient) => {
    const tabMatch =
      activeTab === "All (386)" ||
      patient.status.toLowerCase() === activeTab.split(" ")[0].toLowerCase();
    const searchMatch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.treatment.toLowerCase().includes(searchQuery.toLowerCase());
    const countryMatch =
      selectedCountry === "All" || patient.country === selectedCountry;
    return tabMatch && searchMatch && countryMatch;
  });

  return (
    <div className="max-w-[1360px] mx-auto space-y-5">
      {/* 1. Tabs / Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.label
                ? "bg-[#005ca9] text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 2. Search & Filter Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient or case ID"
            className="w-full bg-white border border-slate-200/90 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500 shadow-2xs"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <button className="bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-2xs">
              <span>Submitted by: {selectedPartner}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          <div className="relative">
            <button className="bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-2xs">
              <span>Country: {selectedCountry}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Split Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Cases Table */}
        <div className="lg:col-span-8">
          <Card className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100/90">
                    <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                      PATIENT
                    </th>
                    <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                      TREATMENT
                    </th>
                    <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                      COUNTRY
                    </th>
                    <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                      SUBMITTED BY
                    </th>
                    <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase text-right">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50/80">
                  {filteredPatients.map((item) => {
                    const isSelected = selectedPatient.id === item.id;
                    return (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedPatientId(item.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-[#f0f7ff] border-l-2 border-blue-600"
                            : "hover:bg-slate-50/60"
                        }`}
                      >
                        {/* Patient Name & ID */}
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900 text-sm leading-tight">
                            {item.name}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 font-normal">
                            {item.id}
                          </div>
                        </td>

                        {/* Treatment */}
                        <td className="py-3 px-3 text-xs sm:text-sm text-slate-700 font-normal">
                          {item.treatment}
                        </td>

                        {/* Country */}
                        <td className="py-3 px-3 text-xs sm:text-sm text-slate-700 font-normal">
                          {item.country}
                        </td>

                        {/* Submitted by */}
                        <td className="py-3 px-3">
                          <div className="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">
                            {item.submittedBy}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5 font-normal">
                            {item.submittedByRole}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-3 text-right">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${item.statusBadge} min-w-[85px] text-center`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Showing {filteredPatients.length} of 386 cases</span>
            </div>
          </Card>
        </div>

        {/* Right Column: Case Quick Preview Drawer */}
        <div className="lg:col-span-4">
          <Card className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs space-y-5 sticky top-24">
            {/* Header: Case ID, Status, Patient Name */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-slate-500 font-medium">
                  Case {selectedPatient.id}
                </span>
                <span
                  className={`px-3 py-0.5 rounded-full text-xs font-semibold ${selectedPatient.statusBadge}`}
                >
                  {selectedPatient.status}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {selectedPatient.name}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {selectedPatient.treatment}, {selectedPatient.country}
              </p>
            </div>

            {/* Case Origin Box */}
            <div className="bg-[#f8fafc] rounded-xl p-3.5 border border-slate-100/90 text-xs space-y-2">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                CASE ORIGIN
              </span>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500 font-normal">Submitted by</span>
                <span className="font-bold text-slate-900 text-right">
                  {selectedPatient.submittedBy}{" "}
                  {selectedPatient.submittedById !== "Direct" &&
                    `(${selectedPatient.submittedById})`}
                </span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500 font-normal">Channel Partner</span>
                <span className="font-bold text-slate-900 text-right">
                  {selectedPatient.channelPartner}
                </span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500 font-normal">Onboarding path</span>
                <span className="font-bold text-slate-900 text-right">
                  {selectedPatient.onboardingPath}
                </span>
              </div>
            </div>

            {/* Progress Stepper */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-3.5">
                PROGRESS
              </span>

              <div className="relative pl-6 space-y-4">
                {selectedPatient.progressSteps.map((step, idx) => {
                  const isCompleted = step.status === "completed";
                  const isCurrent = step.status === "current";
                  const isLast = idx === selectedPatient.progressSteps.length - 1;

                  return (
                    <div key={idx} className="relative flex items-start justify-between">
                      {/* Connecting Line */}
                      {!isLast && (
                        <div
                          className={`absolute left-[-15px] top-[14px] w-[2px] h-[calc(100%+8px)] ${
                            isCompleted ? "bg-[#059669]" : "bg-slate-200"
                          }`}
                        />
                      )}

                      {/* Icon / Circle Indicator */}
                      <div className="absolute left-[-22px] top-[1px] flex items-center justify-center">
                        {isCompleted ? (
                          <div className="w-4 h-4 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-2xs">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        ) : isCurrent ? (
                          <div className="w-4 h-4 rounded-full border-2 border-[#0062c4] bg-white flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#0062c4]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-slate-300 bg-white" />
                        )}
                      </div>

                      {/* Step Labels */}
                      <div>
                        <div
                          className={`text-xs font-bold leading-tight ${
                            isCompleted || isCurrent ? "text-slate-900" : "text-slate-400"
                          }`}
                        >
                          {step.label}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {step.date}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Commission Box & Details Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-400 font-normal block leading-tight">
                  Commission on this case
                </span>
                <span className="text-sm font-bold text-slate-900 block mt-0.5">
                  {selectedPatient.commissionStatus}
                </span>
              </div>

              <Link
                href={`/patients/${selectedPatient.id}`}
                className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs py-2 px-3.5 rounded-xl transition-colors shrink-0 shadow-2xs"
              >
                View details
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
