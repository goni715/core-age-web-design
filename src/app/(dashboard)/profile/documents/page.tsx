"use client";

import React, { useState } from "react";
import {
  FileText,
  Upload,
  CheckCircle2,
  Eye,
  Download,
  AlertCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ProfileDocumentsPage() {
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const documents = [
    {
      id: "DOC-01",
      name: "National ID / Passport Verification",
      filename: "NID_Ahmed_Rahman_2026.pdf",
      size: "2.4 MB",
      verifiedDate: "Jan 15, 2024",
      status: "Verified",
      validUntil: "Dec 31, 2029",
    },
    {
      id: "DOC-02",
      name: "Healthcare Consultancy Trade License",
      filename: "Trade_License_TR2026_Dhaka.pdf",
      size: "3.8 MB",
      verifiedDate: "Jan 20, 2024",
      status: "Verified",
      validUntil: "Jun 30, 2027",
    },
    {
      id: "DOC-03",
      name: "3S Medi Care Channel Partnership Agreement",
      filename: "3S_Partner_Agreement_Signed.pdf",
      size: "1.2 MB",
      verifiedDate: "Jan 22, 2024",
      status: "Active Agreement",
      validUntil: "Lifetime Partner",
    },
    {
      id: "DOC-04",
      name: "Tax Identification Certificate (e-TIN)",
      filename: "TIN_Certificate_eTIN_8819.pdf",
      size: "950 KB",
      verifiedDate: "Feb 02, 2024",
      status: "Verified",
      validUntil: "Current Financial Year",
    },
  ];

  const handleUploadSimulate = () => {
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {uploadSuccess && (
        <div className="bg-[#dcfce7] border border-[#86efac] text-[#15803d] rounded-2xl p-4 flex items-center justify-between shadow-2xs animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-semibold">
              Document uploaded successfully! Our compliance desk will verify it within 24 hours.
            </span>
          </div>
          <button
            onClick={() => setUploadSuccess(false)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Grid: Document List & Upload Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Verified Documents (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">Compliance & Identity Documents</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Legal and regulatory files verifying your referral agency standing
                </p>
              </div>
              <span className="bg-[#dcfce7] text-[#15803d] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 4 of 4 Verified
              </span>
            </div>

            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0062c4] flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-xs">{doc.name}</h3>
                        <span className="bg-[#dcfce7] text-[#15803d] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          {doc.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-slate-400 mt-1">
                        <span className="font-mono text-slate-600">{doc.filename}</span>
                        <span>·</span>
                        <span>{doc.size}</span>
                        <span>·</span>
                        <span>Verified on {doc.verifiedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:self-center shrink-0">
                    <button
                      onClick={() => alert(`Viewing ${doc.name} (${doc.filename})`)}
                      className="flex items-center gap-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => alert(`Downloading ${doc.filename}...`)}
                      className="flex items-center gap-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Upload New Document */}
        <div className="space-y-6">
          <Card className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Upload Additional Document</h3>
            <p className="text-xs text-slate-400">
              Submit trade license renewal, updated power of attorney, or bank endorsement letter.
            </p>

            <div
              onClick={handleUploadSimulate}
              className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-blue-400 hover:bg-blue-50/20 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 flex items-center justify-center mx-auto mb-3 transition-colors">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-slate-800">
                Click to browse or drag & drop
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                PDF, PNG, or JPG (Max file size 15 MB)
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-100 text-[11px] text-amber-900 space-y-1">
              <span className="font-bold block">Compliance Note:</span>
              <p className="text-amber-800/90 leading-relaxed">
                All uploaded documents must be authentic and clearly legible. Verified within 24 hours by 3S Compliance Desk.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
