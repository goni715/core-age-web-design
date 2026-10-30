"use client";

import React, { useState } from "react";
import { Search, Globe, Building2, MapPin, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AgentHealthcareNetworkPage() {
  const [selectedCountryCode, setSelectedCountryCode] = useState("IN");
  const [searchQuery, setSearchQuery] = useState("");

  const countries = [
    {
      code: "IN",
      name: "India",
      countText: "18",
      countSubtext: "partner hospitals",
      statusBadge: "Top Referral",
      hospitals: [
        { name: "Apollo Hospitals", city: "Chennai / Delhi", specialties: "Cardiology, Oncology, Organ Transplant", relationship: "Direct Accredited" },
        { name: "Fortis Healthcare", city: "Mumbai / Gurgaon", specialties: "Bone Marrow, Neuro, Orthopedics", relationship: "Direct Accredited" },
        { name: "Max Super Speciality Hospital", city: "New Delhi", specialties: "Cancer, Cardiac, Robotic Surgery", relationship: "Direct Accredited" },
        { name: "Manipal Hospital", city: "Bengaluru", specialties: "Spine, Joint, Liver Transplant", relationship: "Direct Accredited" },
        { name: "Medanta - The Medicity", city: "Gurugram", specialties: "Heart, Liver, Kidney, Cancer", relationship: "Direct Accredited" },
      ],
    },
    {
      code: "TH",
      name: "Thailand",
      countText: "12",
      countSubtext: "partner hospitals",
      statusBadge: "Top Medical Tourism",
      hospitals: [
        { name: "Bumrungrad International Hospital", city: "Bangkok", specialties: "Multi-specialty, Cardiology, Spine", relationship: "Direct Accredited" },
        { name: "Bangkok Hospital", city: "Bangkok", specialties: "Trauma, Cancer, Neurology", relationship: "Direct Accredited" },
        { name: "Samitivej Hospital", city: "Sukhumvit", specialties: "Pediatrics, Liver, Wellness", relationship: "Direct Accredited" },
        { name: "Vejthani Hospital", city: "Bangkok", specialties: "Orthopedics & Joint Replacement", relationship: "Direct Accredited" },
      ],
    },
    {
      code: "SG",
      name: "Singapore",
      countText: "8",
      countSubtext: "partner hospitals",
      statusBadge: "Premium Care",
      hospitals: [
        { name: "Mount Elizabeth Hospital", city: "Orchard / Novena", specialties: "Cardiovascular, Oncology, Neuroscience", relationship: "Direct Accredited" },
        { name: "Gleneagles Hospital", city: "Napier Road", specialties: "Gastroenterology, Liver Transplant", relationship: "Direct Accredited" },
        { name: "Raffles Hospital", city: "North Bridge Road", specialties: "General & Bariatric Surgery", relationship: "Direct Accredited" },
      ],
    },
    {
      code: "MY",
      name: "Malaysia",
      countText: "10",
      countSubtext: "partner hospitals",
      statusBadge: "Affordable Premium",
      hospitals: [
        { name: "Prince Court Medical Centre", city: "Kuala Lumpur", specialties: "Burns, IVF, Orthopedics", relationship: "Direct Accredited" },
        { name: "Gleneagles Hospital Kuala Lumpur", city: "Ampang", specialties: "Cardiac, Cancer, Orthopedic", relationship: "Direct Accredited" },
        { name: "Sunway Medical Centre", city: "Sunway City", specialties: "Robotic Surgery, Hematology", relationship: "Direct Accredited" },
      ],
    },
    {
      code: "TR",
      name: "Turkey",
      countText: "9",
      countSubtext: "partner hospitals",
      statusBadge: "High Volume",
      hospitals: [
        { name: "Acibadem Healthcare Group", city: "Istanbul", specialties: "Neurosurgery, CyberKnife, Pediatric", relationship: "Direct Accredited" },
        { name: "Memorial Healthcare Group", city: "Istanbul", specialties: "Organ Transplant, IVF, Oncology", relationship: "Direct Accredited" },
        { name: "Anadolu Medical Center", city: "Gebze", specialties: "Johns Hopkins Affiliated Oncology", relationship: "Direct Accredited" },
      ],
    },
  ];

  const currentCountry =
    countries.find((c) => c.code === selectedCountryCode) || countries[0];

  const filteredHospitals = currentCountry.hospitals.filter(
    (h) =>
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.specialties.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Global Healthcare Network
          </h1>
          <p className="text-slate-500 text-sm">
            Browse accredited international hospitals across your channel partner jurisdiction
          </p>
        </div>
      </div>

      {/* Country Selection Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {countries.map((country) => {
          const isSelected = country.code === selectedCountryCode;
          return (
            <button
              key={country.code}
              type="button"
              onClick={() => setSelectedCountryCode(country.code)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? "bg-blue-50/90 border-blue-500 shadow-sm ring-2 ring-blue-500/20"
                  : "bg-white border-slate-200/80 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 text-sm">
                  {country.name}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {country.code}
                </span>
              </div>
              <div className="text-xl font-extrabold text-slate-900">
                {country.countText}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {country.countSubtext}
              </div>
            </button>
          );
        })}
      </div>

      {/* Hospital Listing */}
      <Card className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Hospitals in {currentCountry.name}
            </h3>
            <p className="text-xs text-slate-500">
              {filteredHospitals.length} certified partner facilities ready for patient admission
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search hospital or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredHospitals.map((hospital, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-bold text-slate-900 text-sm sm:text-base">
                    {hospital.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{hospital.city}</span>
                  <span>•</span>
                  <span className="text-slate-700 font-medium">
                    {hospital.specialties}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {hospital.relationship}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
