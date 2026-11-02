"use client";

import React, { useEffect, useState } from "react";
import { User, Phone, Mail, Building2, ShieldCheck, Award } from "lucide-react";
import TkIcon from "@/components/icons/TkIcon";
import { Card } from "@/components/ui/card";
import { getUserInfo } from "@/helpers/SessionHelper";

export default function AgentProfilePage() {
  const [profile, setProfile] = useState({
    fullName: "Ahmed Rahman",
    email: "agent@medicare.com",
    phone: "+880 1711 223344",
    role: "Channel Partner",
    userId: "AG-1001",
  });

  useEffect(() => {
    const info = getUserInfo();
    setProfile({
      fullName: info.fullName || "Ahmed Rahman",
      email: info.email || "agent@medicare.com",
      phone: info.phone || "+880 1711 223344",
      role: "Channel Partner (Master Agent)",
      userId: info.userId || "AG-1001",
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Partner Profile</h1>
        <p className="text-slate-500 text-sm">
          Manage your master agency details, verified credentials, and banking setup
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-2xs text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-700 font-extrabold text-2xl flex items-center justify-center mx-auto ring-4 ring-blue-50">
            {profile.fullName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">
              {profile.fullName}
            </h3>
            <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
              {profile.role}
            </span>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs text-left space-y-2 text-slate-600">
            <div className="flex justify-between">
              <span className="text-slate-400">Partner Tier:</span>
              <span className="font-bold text-slate-800">Gold Channel</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Accreditation:</span>
              <span className="font-semibold text-emerald-600">Verified</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Network Size:</span>
              <span className="font-bold text-blue-700">24 Sub-Agents</span>
            </div>
          </div>
        </Card>

        {/* Detailed Info (2 cols) */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 sm:p-7 bg-white rounded-3xl border border-slate-200/80 shadow-2xs space-y-5">
            <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Agency & Contact Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">Full Name</span>
                <span className="font-bold text-slate-900 text-sm">
                  {profile.fullName}
                </span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">Agency Name</span>
                <span className="font-bold text-slate-900 text-sm">
                  3S Medicare Int Partner
                </span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">Email Address</span>
                <span className="font-semibold text-slate-900 text-sm truncate block">
                  {profile.email}
                </span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">Phone Number</span>
                <span className="font-semibold text-slate-900 text-sm">
                  {profile.phone}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <TkIcon className="w-4 h-4 text-emerald-600" />
              <span>Payout & Banking Details</span>
            </h3>
            <p className="text-xs text-slate-500">
              Direct Wire & Bank Transfer is active for automatic month-end settlement.
            </p>
            <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 text-xs text-emerald-800 flex items-center justify-between">
              <span>Standard Chartered Bank •••• 4892</span>
              <span className="font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md shadow-2xs">
                Verified
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
