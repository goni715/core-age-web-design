import React, { useState } from "react";
import { Shield, Upload, FileText, CheckCircle2, User, CreditCard, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function KycSubmission() {
  const [step, setStep] = useState<"submit" | "status">("submit");
  const [docType, setDocType] = useState<"nid" | "passport">("nid");

  if (step === "status") {
    return (
      <div className="min-h-screen bg-slate-50/50 py-12 flex items-center justify-center">
        <div className="w-full max-w-3xl flex flex-col items-center">
          <div className="bg-white w-full max-w-2xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 mb-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Verified
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">KYC Status</h2>
            <p className="text-slate-500 text-sm mb-10 max-w-[400px]">
              Congratulations! Your KYC verification is complete. Your agent account is now fully activated and you can start managing cases.
            </p>

            <div className="w-full text-left">
              <h4 className="text-sm font-bold text-slate-900 mb-4">Submitted Documents</h4>
              <div className="flex flex-col gap-3 mb-8">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-semibold text-slate-700">National ID (Front)</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-semibold text-slate-700">National ID (Back)</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-semibold text-slate-700">Selfie with Document</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900 mb-4">Timeline</h4>
              <div className="flex flex-col gap-6 pl-2 mb-8 relative border-l-2 border-slate-100 ml-2">
                <div className="relative">
                  <div className="absolute -left-[27px] bg-white p-1 rounded-full"><div className="w-2.5 h-2.5 bg-slate-300 rounded-full"></div></div>
                  <div className="text-xs text-slate-500 mb-0.5">Submitted on</div>
                  <div className="text-sm font-semibold text-slate-900">May 15, 2026 at 2:30 PM</div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[27px] bg-white p-1 rounded-full"><div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div></div>
                  <div className="text-xs text-slate-500 mb-0.5">Verified on</div>
                  <div className="text-sm font-semibold text-slate-900">May 16, 2026 at 10:15 AM</div>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl shadow-md shadow-primary/20">
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 flex flex-col items-center">
      {/* Progress Steps Header */}
      <div className="flex items-center gap-4 text-xs font-semibold mb-10 max-w-[600px] w-full justify-center">
        <div className="flex items-center gap-2 text-emerald-600"><CheckCircle2 className="w-5 h-5" /> Account Created</div>
        <div className="w-12 h-0.5 bg-emerald-500"></div>
        <div className="flex items-center gap-2 text-emerald-600"><CheckCircle2 className="w-5 h-5" /> OTP Verified</div>
        <div className="w-12 h-0.5 bg-slate-200"></div>
        <div className="flex items-center gap-2 text-blue-600"><div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">3</div> KYC Submission</div>
      </div>

      <div className="bg-white max-w-[600px] w-full p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 flex flex-col items-center">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
          <Shield className="w-6 h-6" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Complete KYC</h2>
        <p className="text-slate-500 text-sm mb-10">Verify your identity to activate your account</p>

        <div className="w-full text-left">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Select Identity Document</h4>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => setDocType("nid")}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${docType === "nid" ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold" : "border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"}`}
            >
              <CreditCard className="w-6 h-6" />
              <span className="text-sm">National ID (NID)</span>
            </button>
            <button
              onClick={() => setDocType("passport")}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${docType === "passport" ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold" : "border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"}`}
            >
              <BookOpen className="w-6 h-6" />
              <span className="text-sm">Passport</span>
            </button>
          </div>

          <h4 className="text-sm font-semibold text-slate-700 mb-4">Upload Documents</h4>
          <div className="flex flex-col gap-6 mb-8">
            {docType === "nid" ? (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-700">NID Front Side</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
                    <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3"><Upload className="w-5 h-5" /></div>
                    <p className="text-sm font-semibold text-slate-700">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-500 mt-1">Clear photo of NID front (max. 5MB)</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-700">NID Back Side</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
                    <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3"><Upload className="w-5 h-5" /></div>
                    <p className="text-sm font-semibold text-slate-700">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-500 mt-1">Clear photo of NID back (max. 5MB)</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-700">Passport Photo Page</label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
                  <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3"><Upload className="w-5 h-5" /></div>
                  <p className="text-sm font-semibold text-slate-700">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-500 mt-1">Clear photo of passport data page (max. 5MB)</p>
                </div>
              </div>
            )}
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-700">Selfie with Document</label>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
                <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3"><Upload className="w-5 h-5" /></div>
                <p className="text-sm font-semibold text-slate-700">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-500 mt-1">Hold your document next to your face (max. 5MB)</p>
              </div>
            </div>
          </div>

          <div className="bg-[#f0f7ff] text-slate-700 p-5 rounded-xl text-sm mb-10 border border-blue-100">
            <h5 className="font-semibold mb-2 text-slate-900">Document Guidelines:</h5>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>Ensure all text and images are clearly visible</li>
              <li>Avoid glare and shadows on documents</li>
              <li>Accepted formats: JPG, PNG, PDF</li>
              <li>Maximum file size: 5MB per document</li>
            </ul>
          </div>

          <h4 className="text-sm font-bold text-slate-900 mb-4">Personal Information</h4>
          <div className="flex flex-col gap-5 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-700">Full Legal Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><User className="w-4 h-4" /></div>
                <input type="text" placeholder={`As shown on ${docType === 'nid' ? 'NID' : 'passport'}`} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-700">{docType === 'nid' ? 'NID' : 'Passport'} Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><CreditCard className="w-4 h-4" /></div>
                <input type="text" placeholder={`Enter your ${docType === 'nid' ? 'NID' : 'passport'} number`} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-700">Date of Birth</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Calendar className="w-4 h-4" /></div>
                <input type="date" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-slate-700" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-700">Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><MapPin className="w-4 h-4" /></div>
                <input type="text" placeholder="Enter your complete address" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl shadow-md shadow-primary/20" onClick={() => setStep("status")}>
              Submit KYC
            </Button>
            <Button variant="outline" className="w-full py-6 rounded-xl border-slate-200 text-slate-700 font-semibold hover:bg-slate-50">
              Save for Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Temporary icon for Passport, if it isn't imported from lucide-react, I will add it.
function BookOpen(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}
