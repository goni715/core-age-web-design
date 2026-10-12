"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Award,
  DollarSign,
  Building2,
  Edit,
  ArrowRight,
  Headphones,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ProfileOverviewPage() {
  return (
    <div className="space-y-6">
      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Personal Information & Tier Details (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-2xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h2 className="text-base font-bold text-slate-900">Personal & Contact Details</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verified details linked with your partner agreement and payout records
                </p>
              </div>
              <Link
                href="/profile/edit"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#0062c4] hover:text-[#004e90] bg-blue-50/80 hover:bg-blue-100/80 px-3.5 py-1.5 rounded-full transition-colors"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Details</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs">
              <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block mb-1 font-medium">Full Name</span>
                <span className="text-slate-900 font-bold text-sm">Ahmed Rahman</span>
              </div>
              <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block mb-1 font-medium">Partner ID</span>
                <span className="text-slate-900 font-mono font-bold text-sm">RP-0112</span>
              </div>
              <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block mb-1 font-medium">Email Address</span>
                <span className="text-slate-900 font-semibold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  ahmed.rahman@medicare.bd
                </span>
              </div>
              <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block mb-1 font-medium">Phone Number</span>
                <span className="text-slate-900 font-semibold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  +880 1712-345678
                </span>
              </div>
              <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block mb-1 font-medium">WhatsApp Hotline</span>
                <span className="text-[#059669] font-bold flex items-center gap-1.5">
                  +880 1712-345678
                </span>
              </div>
              <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block mb-1 font-medium">Operating City & Country</span>
                <span className="text-slate-900 font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Dhaka, Bangladesh
                </span>
              </div>
            </div>
          </Card>

          {/* Partnership Tier & Privileges */}
          <Card className="bg-gradient-to-br from-[#004e90] to-[#0062c4] text-white rounded-3xl p-6 sm:p-7 shadow-xs relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-300" />
                  <span className="text-xs uppercase font-bold tracking-wider text-blue-200">
                    Partner Tier
                  </span>
                </div>
                <span className="bg-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-xs">
                  Tier 3 (Gold)
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">Premium Referral Partner</h3>
                <p className="text-xs text-blue-100/90 mt-1 max-w-lg leading-relaxed">
                  You are eligible for highest commission slabs, expedited visa handling, and exclusive hospital access in Thailand, India, and China.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white/10 rounded-2xl p-3 border border-white/10 backdrop-blur-xs">
                  <span className="text-[11px] text-blue-200 block">Commission Rate</span>
                  <span className="text-base font-bold text-white mt-0.5 block">12% - 15%</span>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 border border-white/10 backdrop-blur-xs">
                  <span className="text-[11px] text-blue-200 block">Payout Frequency</span>
                  <span className="text-base font-bold text-white mt-0.5 block">Bi-Weekly</span>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 border border-white/10 backdrop-blur-xs">
                  <span className="text-[11px] text-blue-200 block">VIP Concierge</span>
                  <span className="text-base font-bold text-emerald-300 mt-0.5 block">Enabled</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Account Manager & Fast Actions */}
        <div className="space-y-6">
          {/* Dedicated Account Manager */}
          <Card className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 font-bold text-base shrink-0">
                PS
              </div>
              <div>
                <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider block">
                  Dedicated Manager
                </span>
                <h3 className="font-bold text-slate-900 text-sm">Priya Sharma</h3>
                <span className="text-xs text-slate-400">Head of Partner Relations</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Your assigned account manager is available 24/7 for emergency patient escalations, bed approvals, and commission reconciliations.
            </p>

            <div className="space-y-2.5 text-xs pt-1 border-t border-slate-100">
              <div className="flex items-center justify-between py-1 text-slate-600">
                <span className="text-slate-400">Office Hotline</span>
                <span className="font-semibold text-slate-900">+66 2 026 8800</span>
              </div>
              <div className="flex items-center justify-between py-1 text-slate-600">
                <span className="text-slate-400">Direct Email</span>
                <span className="font-semibold text-[#0062c4]">priya.s@3smedicare.com</span>
              </div>
              <div className="flex items-center justify-between py-1 text-slate-600">
                <span className="text-slate-400">Availability</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Available Now
                </span>
              </div>
            </div>

            <Link
              href="/support"
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2.5 rounded-xl transition-colors shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact Manager</span>
            </Link>
          </Card>

          {/* Quick Navigation Cards */}
          <Card className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider px-1">
              Account Management
            </h4>
            <Link
              href="/profile/bank"
              className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0062c4] flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block group-hover:text-blue-600">
                    Bank & Payout Details
                  </span>
                  <span className="text-[11px] text-slate-400">Standard Chartered Bank</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/profile/documents"
              className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block group-hover:text-teal-600">
                    Compliance Documents
                  </span>
                  <span className="text-[11px] text-slate-400">3 of 3 verified</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/profile/security"
              className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block group-hover:text-purple-600">
                    Account Security & 2FA
                  </span>
                  <span className="text-[11px] text-slate-400">Protected & active</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
