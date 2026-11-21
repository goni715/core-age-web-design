"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, FileText, UserPlus, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function SubAgentSubmitPatientSuccessPage() {
  return (
    <div className="max-w-xl mx-auto py-12 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle2 className="w-9 h-9" />
      </div>

      <div className="space-y-2">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200">
          <Sparkles className="w-3.5 h-3.5" />
          Referral Partner Case Recorded
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Patient Case is Under Review
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          Your patient referral has been forwarded to 3S clinical coordinators and your Master Channel Partner for hospital quotation.
        </p>
      </div>

      <Card className="p-6 bg-white rounded-3xl border border-teal-100 shadow-2xs text-left text-xs space-y-3">
        <div className="font-bold text-slate-900 pb-2 border-b border-slate-100 text-sm">
          Case Status Details
        </div>
        <div className="flex justify-between py-1">
          <span className="text-slate-500">Initial Status:</span>
          <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
            Under Review
          </span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-slate-500">Quotation Time:</span>
          <span className="font-semibold text-slate-800">Within 24 Hours</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-slate-500">Referral Credit:</span>
          <span className="font-semibold text-teal-700">Attached to Your Account</span>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/sub-agent/patients"
          style={{ background: "linear-gradient(135deg, #0d9488, #059669)" }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-white font-bold text-sm shadow-sm hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>View My Cases</span>
        </Link>
        <Link
          href="/sub-agent/submit-patient"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>Submit Another Case</span>
        </Link>
      </div>
    </div>
  );
}
