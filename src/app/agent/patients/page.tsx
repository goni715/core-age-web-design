"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PatientsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Submitted", "Under Review", "Confirmed", "Ongoing", "Completed"];

  const patients = [
    { initials: "JS", name: "John Smith", status: "Ongoing", statusColor: "bg-teal-500", caseId: "CS-2847", treatment: "Cardiac Surgery", country: "India", budget: "$15,000" },
    { initials: "SJ", name: "Sarah Johnson", status: "Under Review", statusColor: "bg-amber-500", caseId: "CS-2846", treatment: "Orthopedic Surgery", country: "Thailand", budget: "$8,500" },
    { initials: "MB", name: "Michael Brown", status: "Confirmed", statusColor: "bg-blue-500", caseId: "CS-2845", treatment: "Cancer Treatment", country: "Singapore", budget: "$25,000" },
    { initials: "ED", name: "Emily Davis", status: "Completed", statusColor: "bg-emerald-500", caseId: "CS-2844", treatment: "Dental Implants", country: "Malaysia", budget: "$3,200" },
    { initials: "DW", name: "David Wilson", status: "Ongoing", statusColor: "bg-teal-500", caseId: "CS-2843", treatment: "Eye Surgery", country: "India", budget: "$6,500" },
    { initials: "LA", name: "Lisa Anderson", status: "Submitted", statusColor: "bg-blue-400", caseId: "CS-2842", treatment: "Spine Surgery", country: "Thailand", budget: "$12,000" },
    { initials: "JT", name: "James Taylor", status: "Under Review", statusColor: "bg-amber-500", caseId: "CS-2841", treatment: "Kidney Transplant", country: "India", budget: "$18,000" },
    { initials: "MG", name: "Maria Garcia", status: "Completed", statusColor: "bg-emerald-500", caseId: "CS-2840", treatment: "Hip Replacement", country: "Malaysia", budget: "$9,800" },
    { initials: "RM", name: "Robert Martinez", status: "Ongoing", statusColor: "bg-teal-500", caseId: "CS-2839", treatment: "Heart Valve Surgery", country: "Singapore", budget: "$22,000" },
    { initials: "JL", name: "Jennifer Lee", status: "Confirmed", statusColor: "bg-blue-500", caseId: "CS-2838", treatment: "Cosmetic Surgery", country: "Thailand", budget: "$5,500" },
  ];

  const filteredPatients = activeTab === "All" ? patients : patients.filter(p => p.status === activeTab);

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full">
      <div className="mb-8 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Submitted Patients</h1>
          <p className="text-slate-500 text-sm">View and manage all your submitted patient cases</p>
        </div>
        <Link href="/agent/submit-patient">
          <Button className="bg-[#2b88ef] hover:bg-blue-600 text-white font-semibold py-5 px-6 rounded-xl shadow-md shadow-blue-200 text-sm">
            Submit New
          </Button>
        </Link>
      </div>

      <Card className="p-4 mb-6 border-none shadow-sm rounded-2xl bg-white shrink-0">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input 
            type="text" 
            placeholder="Search by patient name, case ID, or treatment..." 
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-700"
          />
        </div>
      </Card>

      <Card className="p-2 mb-6 border-none shadow-sm rounded-2xl bg-white shrink-0 overflow-x-auto custom-scrollbar">
        <div className="flex items-center min-w-max p-2 gap-1 sm:gap-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab 
                  ? "bg-[#2b88ef] text-white shadow-md shadow-blue-200" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </Card>

      <div className="mb-4 text-xs font-semibold text-slate-500 shrink-0 px-2">
        Showing <span className="text-slate-900">{filteredPatients.length}</span> results
      </div>

      <div className="flex flex-col gap-4 pb-10">
        {filteredPatients.map((patient, idx) => (
          <Card key={idx} className="p-4 sm:p-5 md:p-6 border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="flex items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-12 h-12 rounded-full bg-[#2b88ef] text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-sm shadow-blue-200">
                {patient.initials}
              </div>
              
              <div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5">
                  <h3 className="text-[17px] font-bold text-slate-900 leading-none">{patient.name}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white ${patient.statusColor}`}>
                    {patient.status}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center text-xs text-slate-500 gap-y-1 gap-x-2 sm:gap-x-3">
                  <span className="flex items-center gap-1.5">
                    Case ID: <span className="font-semibold text-slate-700">{patient.caseId}</span>
                  </span>
                  <span className="hidden sm:inline w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span>{patient.treatment}</span>
                  <span className="hidden sm:inline w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span>{patient.country}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t border-slate-100 lg:border-t-0">
              <div className="flex flex-col items-start lg:items-end">
                <span className="text-[10px] font-medium text-slate-400 mb-0.5">Budget</span>
                <span className="text-lg font-bold text-slate-900">{patient.budget}</span>
              </div>
              <Link href={`/agent/patients/${patient.caseId}`}>
                <Button className="bg-[#2b88ef] hover:bg-blue-600 text-white font-semibold py-5 px-6 rounded-xl shadow-md shadow-blue-200 text-sm">
                  View Details <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
            
          </Card>
        ))}
      </div>
    </div>
  );
}
