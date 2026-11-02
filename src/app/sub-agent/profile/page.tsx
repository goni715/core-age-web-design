"use client";

import React, { useEffect, useState } from "react";
import { User, Phone, Mail, Building2, Sparkles, Award } from "lucide-react";
import TkIcon from "@/components/icons/TkIcon";
import { Card } from "@/components/ui/card";
import { getUserInfo } from "@/helpers/SessionHelper";

export default function SubAgentProfilePage() {
  const [profile, setProfile] = useState({
    fullName: "Marjan Hossain",
    email: "marjan@gmail.com",
    phone: "01666666666",
    role: "Sub-Agent Partner",
    userId: "SA-2041",
  });

  useEffect(() => {
    const info = getUserInfo();
    setProfile({
      fullName: info.fullName || "Marjan Hossain",
      email: info.email || "marjan@gmail.com",
      phone: info.phone || "01666666666",
      role: "Sub-Agent Partner",
      userId: info.userId || "SA-2041",
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Sub-Agent Profile</h1>
        <p className="text-slate-500 text-sm">
          View your referral partner registration details and payout accounts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="p-6 bg-white rounded-3xl border border-teal-100 shadow-2xs text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-teal-100 text-teal-800 font-extrabold text-2xl flex items-center justify-center mx-auto ring-4 ring-teal-50">
            {profile.fullName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">
              {profile.fullName}
            </h3>
            <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200/60">
              {profile.role}
            </span>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs text-left space-y-2 text-slate-600">
            <div className="flex justify-between">
              <span className="text-slate-400">Account Status:</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Active Partner
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Master Agency:</span>
              <span className="font-semibold text-slate-800">3S Medi Care Int</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Referred Cases:</span>
              <span className="font-bold text-teal-700">14 Patients</span>
            </div>
          </div>
        </Card>

        {/* Detailed Info (2 cols) */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 sm:p-7 bg-white rounded-3xl border border-teal-100 shadow-2xs space-y-5">
            <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal-600" />
              <span>Contact & Clinic Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">Full Name</span>
                <span className="font-bold text-slate-900 text-sm">
                  {profile.fullName}
                </span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">Partner Role</span>
                <span className="font-bold text-teal-800 text-sm">
                  Sub-Agent Referral Partner
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

          <Card className="p-6 bg-white rounded-3xl border border-teal-100 shadow-2xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <TkIcon className="w-4 h-4 text-emerald-600" />
              <span>Payment Details</span>
            </h3>
            <p className="text-xs text-slate-500">
              Referral fees are paid upon patient hospital admission through your chosen payment method.
            </p>
            <div className="bg-teal-50/60 p-3 rounded-xl border border-teal-100 text-xs text-teal-900 flex items-center justify-between">
              <span>bKash / Mobile Banking •••• {profile.phone.slice(-4)}</span>
              <span className="font-bold text-teal-800 bg-white px-2 py-0.5 rounded-md shadow-2xs">
                Active
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
