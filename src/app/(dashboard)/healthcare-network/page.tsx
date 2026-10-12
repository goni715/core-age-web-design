"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function HealthcareNetworkPage() {
  const [selectedCountryCode, setSelectedCountryCode] = useState("TH");
  const [searchQuery, setSearchQuery] = useState("");

  const countries = [
    {
      code: "TH",
      name: "Thailand",
      countText: "10",
      countSubtext: "hospitals",
      statusBadge: "Viewing",
      badgeType: "active",
      hasConfirmedCount: true,
      hospitals: [
        { name: "Hospital name to be added", city: "City", specialties: "Specialties", relationship: "To be confirmed" },
        { name: "Hospital name to be added", city: "City", specialties: "Specialties", relationship: "To be confirmed" },
        { name: "Hospital name to be added", city: "City", specialties: "Specialties", relationship: "To be confirmed" },
        { name: "Hospital name to be added", city: "City", specialties: "Specialties", relationship: "To be confirmed" },
        { name: "Hospital name to be added", city: "City", specialties: "Specialties", relationship: "To be confirmed" },
      ],
    },
    {
      code: "IN",
      name: "India",
      countText: "15",
      countSubtext: "hospitals",
      statusBadge: "Confirmed count",
      badgeType: "confirmed",
      hasConfirmedCount: true,
      hospitals: [
        { name: "Hospital name to be added", city: "City", specialties: "Specialties", relationship: "To be confirmed" },
        { name: "Hospital name to be added", city: "City", specialties: "Specialties", relationship: "To be confirmed" },
        { name: "Hospital name to be added", city: "City", specialties: "Specialties", relationship: "To be confirmed" },
        { name: "Hospital name to be added", city: "City", specialties: "Specialties", relationship: "To be confirmed" },
        { name: "Hospital name to be added", city: "City", specialties: "Specialties", relationship: "To be confirmed" },
      ],
    },
    {
      code: "CN",
      name: "China",
      countText: "TBC",
      countSubtext: "count to be added",
      statusBadge: "Pending",
      badgeType: "pending",
      hasConfirmedCount: false,
      hospitals: [
        { name: "Hospital name to be added", city: "City", specialties: "Specialties", relationship: "To be confirmed" },
        { name: "Hospital name to be added", city: "City", specialties: "Specialties", relationship: "To be confirmed" },
      ],
    },
    {
      code: "SG",
      name: "Singapore",
      countText: "TBC",
      countSubtext: "count to be added",
      statusBadge: "Pending",
      badgeType: "pending",
      hasConfirmedCount: false,
      hospitals: [
        { name: "Hospital name to be added", city: "City", specialties: "Specialties", relationship: "To be confirmed" },
        { name: "Hospital name to be added", city: "City", specialties: "Specialties", relationship: "To be confirmed" },
      ],
    },
    {
      code: "MY",
      name: "Malaysia",
      countText: "TBC",
      countSubtext: "count to be added",
      statusBadge: "Pending",
      badgeType: "pending",
      hasConfirmedCount: false,
      hospitals: [
        { name: "Hospital name to be added", city: "City", specialties: "Specialties", relationship: "To be confirmed" },
        { name: "Hospital name to be added", city: "City", specialties: "Specialties", relationship: "To be confirmed" },
      ],
    },
  ];

  const selectedCountry =
    countries.find((c) => c.code === selectedCountryCode) || countries[0];

  const filteredHospitals = selectedCountry.hospitals.filter(
    (h) =>
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.specialties.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1360px] mx-auto space-y-6">
      {/* 1. Top 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        <Card className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            5
          </div>
          <div className="text-xs text-slate-500 font-normal mt-1">
            Destination countries
          </div>
        </Card>

        <Card className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            25
          </div>
          <div className="text-xs text-slate-500 font-normal mt-1">
            Hospitals counted so far (Thailand + India)
          </div>
        </Card>

        <Card className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            3
          </div>
          <div className="text-xs text-slate-500 font-normal mt-1">
            Countries awaiting a confirmed count
          </div>
        </Card>
      </div>

      {/* 2. Destination Country Cards (Row of 5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {countries.map((country) => {
          const isSelected = selectedCountryCode === country.code;

          return (
            <Card
              key={country.code}
              onClick={() => setSelectedCountryCode(country.code)}
              className={`rounded-2xl p-4 bg-white transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "border-2 border-[#0062c4] shadow-xs"
                  : "border border-slate-100 hover:border-slate-300 shadow-2xs"
              }`}
            >
              <div>
                {/* Top Row: Country Code Avatar + Status Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div
                    className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${
                      isSelected || country.badgeType === "confirmed"
                        ? "bg-[#005ca9] text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {country.code}
                  </div>

                  {/* Badge */}
                  {isSelected ? (
                    <span className="bg-[#005ca9] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                      Viewing
                    </span>
                  ) : country.badgeType === "confirmed" ? (
                    <span className="bg-[#dcfce7] text-[#15803d] text-[11px] font-semibold px-2 py-0.5 rounded-full">
                      Confirmed count
                    </span>
                  ) : (
                    <span className="bg-[#fef3c7] text-[#d97706] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                      Pending
                    </span>
                  )}
                </div>

                {/* Middle: Big count/TBC + subtext */}
                <div className="text-2xl font-bold text-slate-900 tracking-tight">
                  {country.countText}
                </div>
                <div className="text-xs text-slate-400 font-normal mt-0.5">
                  {country.countSubtext}
                </div>
              </div>

              {/* Bottom: Country Name */}
              <div className="font-bold text-slate-900 text-sm mt-3 pt-2">
                {country.name}
              </div>
            </Card>
          );
        })}
      </div>

      {/* 3. Hospital Directory Table Card */}
      <Card className="bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs space-y-4">
        {/* Table Header: Country Title & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
          <h2 className="font-bold text-slate-900 text-base sm:text-lg">
            {selectedCountry.name}: {selectedCountry.hasConfirmedCount ? `${selectedCountry.countText} hospitals` : "Hospitals"}
          </h2>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hospital or specialty"
              className="bg-white border border-slate-200/90 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500 w-full sm:w-64 md:w-72 shadow-2xs"
            />
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  HOSPITAL
                </th>
                <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  CITY
                </th>
                <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  SPECIALTIES
                </th>
                <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase text-right">
                  RELATIONSHIP
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredHospitals.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 pr-3">
                    <span className="font-bold text-slate-900 text-sm">
                      {item.name}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-xs sm:text-sm text-slate-500 font-normal">
                    {item.city}
                  </td>
                  <td className="py-4 px-3 text-xs sm:text-sm text-slate-500 font-normal">
                    {item.specialties}
                  </td>
                  <td className="py-4 pl-3 text-right">
                    <span className="inline-block bg-[#f1f5f9] text-[#475569] text-xs font-medium px-3.5 py-1 rounded-full text-center min-w-[115px]">
                      {item.relationship}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Note */}
        <div className="pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            Hospital names appear here once the 3S team has confirmed them. Hospitals are listed as confirmed partners only where a partnership agreement is in place.
          </p>
        </div>
      </Card>
    </div>
  );
}
