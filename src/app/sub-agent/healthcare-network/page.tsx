"use client";

import React, { useState, useEffect } from "react";
import { Search, Building2, MapPin, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  useGetSubAgentCountryStatsQuery,
  useGetSubAgentHospitalsQuery,
} from "@/redux/features/hospital/hospitalApi";

export default function SubAgentHealthcareNetworkPage() {
  const { data: statsResponse, isLoading: isStatsLoading } =
    useGetSubAgentCountryStatsQuery();

  const [selectedCountryCode, setSelectedCountryCode] = useState("BD");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, 350);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Default countries if API is loading or offline
  const fallbackCountries = [
    { code: "BD", name: "Bangladesh", count: 2 },
    { code: "IN", name: "India", count: 1 },
    { code: "TH", name: "Thailand", count: 0 },
    { code: "SG", name: "Singapore", count: 0 },
    { code: "MY", name: "Malaysia", count: 0 },
    { code: "TR", name: "Turkey", count: 0 },
  ];

  const countries =
    statsResponse?.data && statsResponse.data.length > 0
      ? statsResponse.data.map((item) => ({
          code:
            item.code ||
            (item.country === "Bangladesh"
              ? "BD"
              : item.country.slice(0, 2).toUpperCase()),
          name: item.country,
          count: item.totalHospitals ?? item.count ?? 0,
        }))
      : fallbackCountries;

  // Set initial selected code once API responds
  useEffect(() => {
    if (countries.length > 0) {
      const exists = countries.some((c) => c.code === selectedCountryCode);
      if (!exists) {
        setSelectedCountryCode(countries[0].code);
      }
    }
  }, [countries, selectedCountryCode]);

  const currentCountry =
    countries.find((c) => c.code === selectedCountryCode) || countries[0];

  // Fetch hospitals filtered by country and searchTerm
  const {
    data: hospitalsResponse,
    isLoading: isHospitalsLoading,
    isFetching: isHospitalsFetching,
  } = useGetSubAgentHospitalsQuery({
    country: currentCountry.name,
    searchTerm: debouncedSearch || undefined,
  });

  const hospitals = hospitalsResponse?.data || [];
  const totalHospitals = hospitalsResponse?.meta?.total ?? hospitals.length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Global Hospital Directory
          </h1>
          <p className="text-slate-500 text-sm">
            Explore 3S accredited partner hospitals to guide your patients toward top medical treatment
          </p>
        </div>
      </div>

      {/* Country Selection Cards Section */}
      {isStatsLoading ? (
        /* Skeleton Loading */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="p-4 rounded-2xl border border-teal-100/80 bg-white shadow-2xs animate-pulse space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 w-16 sm:w-20 bg-slate-200 rounded-md" />
                <div className="h-4 w-6 bg-slate-200 rounded-full" />
              </div>
              <div className="h-7 w-10 sm:w-12 bg-slate-200 rounded-md mt-2" />
              <div className="h-3 w-20 sm:w-24 bg-slate-100 rounded-md" />
            </div>
          ))}
        </div>
      ) : (
        /* Real API Data Cards */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {countries.map((country) => {
            const isSelected = country.code === selectedCountryCode;
            return (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  setSelectedCountryCode(country.code);
                  setSearchQuery("");
                }}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-teal-50/90 border-teal-500 shadow-sm ring-2 ring-teal-500/20"
                    : "bg-white border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 text-sm truncate pr-1">
                    {country.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      isSelected
                        ? "bg-teal-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {country.code}
                  </span>
                </div>
                <div className="text-xl font-extrabold text-slate-900">
                  {country.count}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  partner hospitals
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Hospital Listing Card */}
      <Card className="bg-white rounded-3xl border border-teal-100 shadow-2xs overflow-hidden">
        {/* Card Header with Search */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Hospitals in {currentCountry.name}
            </h3>
            <p className="text-xs text-slate-500">
              {totalHospitals} certified partner facilities ready for patient admission
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search hospital or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
        </div>

        {/* Content Section: Skeleton Loading vs Empty vs Hospital Rows */}
        {isHospitalsLoading || isHospitalsFetching ? (
          /* Hospitals Skeleton Loading */
          <div className="divide-y divide-slate-100">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-pulse"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-slate-200 rounded-md shrink-0" />
                    <div className="h-5 w-44 sm:w-56 bg-slate-200 rounded-md" />
                  </div>
                  <div className="h-3.5 w-60 sm:w-72 bg-slate-100 rounded-md" />
                </div>
                <div className="h-6 w-28 bg-slate-100 rounded-full shrink-0" />
              </div>
            ))}
          </div>
        ) : hospitals.length === 0 ? (
          /* Empty State */
          <div className="py-14 text-center space-y-2 px-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Building2 className="w-5 h-5" />
            </div>
            <p className="font-bold text-sm text-slate-800">
              No hospitals currently listed for {currentCountry.name}
            </p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchQuery
                ? `No hospitals matched "${searchQuery}". Try a different keyword.`
                : "Accredited hospital facilities for this region are undergoing onboarding. Contact your Channel Partner for offline arrangements."}
            </p>
          </div>
        ) : (
          /* Real Hospitals List */
          <div className="divide-y divide-slate-100">
            {hospitals.map((hospital) => {
              const addressText = hospital.address || hospital.city || currentCountry.name;
              const specialtiesText =
                hospital.specialities && hospital.specialities.length > 0
                  ? hospital.specialities.join(", ")
                  : hospital.contactNumber
                  ? `Phone: ${hospital.contactNumber}`
                  : hospital.website
                  ? hospital.website.replace(/^https?:\/\//, "")
                  : "Multi-Speciality Healthcare";

              return (
                <div
                  key={hospital._id || hospital.id || hospital.name}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-teal-50/40 transition-colors"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span className="font-bold text-slate-900 text-sm sm:text-base truncate">
                        {hospital.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="shrink-0">{addressText}</span>
                      <span>•</span>
                      <span className="text-slate-700 font-medium truncate">
                        {specialtiesText}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                      <CheckCircle2 className="w-3 h-3 text-teal-600" />
                      Direct Accredited
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
