import React from "react";
import Link from "next/link";
import { CheckCircle2, FileText, Building2, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SubmitSuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-130px)]">
      <Card className="max-w-xl w-full p-8 md:p-12 border-none shadow-sm rounded-3xl bg-white flex flex-col items-center text-center">
        
        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-3">Patient Case Submitted Successfully!</h2>
        <p className="text-slate-500 text-sm mb-8 max-w-[400px] leading-relaxed">
          Your patient case has been received and is now under review by our medical team. You will be notified once the case is processed.
        </p>

        {/* Case ID Box */}
        <div className="bg-slate-50 rounded-2xl w-full py-6 flex flex-col items-center justify-center mb-6 border border-slate-100">
          <span className="text-xs font-semibold text-slate-500 mb-2">Case ID</span>
          <span className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">CS-3446</span>
          <span className="text-[11px] text-slate-400">Please save this Case ID for future reference</span>
        </div>

        {/* What happens next Box */}
        <div className="bg-blue-50/50 rounded-2xl w-full p-6 flex flex-col text-left mb-8 border border-blue-50">
          <h4 className="font-bold text-slate-900 mb-5">What happens next?</h4>
          
          <div className="flex flex-col gap-5">
            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
              <div>
                <h5 className="text-sm font-bold text-slate-900">Medical Review</h5>
                <p className="text-xs text-slate-500 mt-1">Our team will review the case within 24-48 hours</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
              <div>
                <h5 className="text-sm font-bold text-slate-900">Hospital Assignment</h5>
                <p className="text-xs text-slate-500 mt-1">We'll match the patient with the best hospital and specialist</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
              <div>
                <h5 className="text-sm font-bold text-slate-900">Confirmation</h5>
                <p className="text-xs text-slate-500 mt-1">You'll receive a notification when the case is confirmed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <Link href="/agent/cases">
            <Button className="w-full bg-[#2b88ef] hover:bg-blue-600 text-white font-semibold py-6 rounded-xl shadow-md">
              <FileText className="w-4 h-4 mr-2" /> View All Cases
            </Button>
          </Link>
          <Link href="/agent">
            <Button variant="outline" className="w-full py-6 rounded-xl border-blue-200 text-blue-600 font-semibold hover:bg-blue-50">
              Back to Dashboard
            </Button>
          </Link>
        </div>

      </Card>
    </div>
  );
}
