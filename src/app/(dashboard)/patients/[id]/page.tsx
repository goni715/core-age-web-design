import React from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, FileText, Download, Building2, User, MapPin, CheckCircle2, Circle, Clock, MessageSquare, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PatientDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you'd fetch the patient using params.id
  // Mock data for John Smith CS-2847
  
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      
      {/* Back button */}
      <div>
        <Link href="/agent/patients" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Cases
        </Link>
      </div>

      {/* Header Card */}
      <Card className="p-6 md:p-8 border-none shadow-sm rounded-3xl bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
          <div className="w-16 h-16 rounded-full bg-[#2b88ef] text-white flex items-center justify-center text-2xl font-bold shrink-0 shadow-md shadow-blue-200">
            JS
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">John Smith</h1>
            <div className="flex flex-wrap items-center text-sm text-slate-500 gap-y-1 gap-x-3 mb-4">
              <span className="flex items-center gap-1.5">
                Case ID: <span className="font-semibold text-slate-700">CS-2847</span>
              </span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
              <span>Cardiac Surgery</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded-full shadow-sm">
                Treatment Ongoing
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Clock className="w-3.5 h-3.5" /> Submitted: May 10, 2026
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <MapPin className="w-3.5 h-3.5" /> India
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-start md:items-end w-full md:w-auto pt-4 md:pt-0 border-t border-slate-100 md:border-none">
          <span className="text-xs font-medium text-slate-400 mb-1">Budget</span>
          <span className="text-3xl font-bold text-slate-900">$15,000</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Timeline, Hospital, Reports) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Case Timeline */}
          <Card className="p-6 md:p-8 border-none shadow-sm rounded-3xl bg-white">
            <h3 className="text-[17px] font-bold text-slate-900 mb-6">Case Timeline</h3>
            
            <div className="flex flex-col relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:bg-slate-100 pb-2">
              
              {/* Step 1 */}
              <div className="relative flex items-start gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-[#2b88ef] text-white flex items-center justify-center shrink-0 z-10 shadow-sm shadow-blue-200">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="pt-2">
                  <h4 className="text-[15px] font-bold text-slate-900 mb-1 leading-none">Submitted</h4>
                  <p className="text-xs font-medium text-slate-500">May 10, 2026</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-start gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-[#2b88ef] text-white flex items-center justify-center shrink-0 z-10 shadow-sm shadow-blue-200">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="pt-2">
                  <h4 className="text-[15px] font-bold text-slate-900 mb-1 leading-none">Under Review</h4>
                  <p className="text-xs font-medium text-slate-500">May 11, 2026</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-start gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-[#2b88ef] text-white flex items-center justify-center shrink-0 z-10 shadow-sm shadow-blue-200">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="pt-2">
                  <h4 className="text-[15px] font-bold text-slate-900 mb-1 leading-none">Confirmed</h4>
                  <p className="text-xs font-medium text-slate-500">May 13, 2026</p>
                </div>
              </div>

              {/* Step 4 (Current) */}
              <div className="relative flex items-start gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-[#2b88ef] text-white flex items-center justify-center shrink-0 z-10 shadow-md shadow-blue-300 ring-4 ring-blue-50">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-[15px] font-bold text-slate-900 leading-none">Treatment Ongoing</h4>
                    <span className="px-2 py-0.5 bg-orange-500 text-white text-[9px] font-bold uppercase tracking-wider rounded-sm">Current</span>
                  </div>
                  <p className="text-xs font-medium text-slate-500">May 15, 2026</p>
                </div>
              </div>

              {/* Step 5 (Future) */}
              <div className="relative flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 border-2 border-white flex items-center justify-center shrink-0 z-10">
                  <Circle className="w-4 h-4" />
                </div>
                <div className="pt-2">
                  <h4 className="text-[15px] font-bold text-slate-400 mb-1 leading-none">Completed</h4>
                  <p className="text-xs font-medium text-slate-400">Expected: May 25, 2026</p>
                </div>
              </div>

            </div>
          </Card>

          {/* Assigned Hospital */}
          <Card className="p-6 md:p-8 border-none shadow-sm rounded-3xl bg-white">
            <h3 className="text-[17px] font-bold text-slate-900 mb-5">Assigned Hospital</h3>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col sm:flex-row gap-5 items-start">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <Building2 className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Apollo Hospitals</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider mb-0.5">Assigned Doctor</div>
                      <div className="text-sm font-semibold text-slate-900">Dr. Rajesh Kumar</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider mb-0.5">Specialization</div>
                      <div className="text-sm font-semibold text-slate-900">Cardiac Surgeon</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider mb-0.5">Location</div>
                      <div className="text-sm font-semibold text-slate-900">Chennai, India</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Uploaded Reports */}
          <Card className="p-6 md:p-8 border-none shadow-sm rounded-3xl bg-white">
            <h3 className="text-[17px] font-bold text-slate-900 mb-5">Uploaded Reports</h3>
            <div className="flex flex-col gap-3">
              {[
                { name: "Medical Report - Initial.pdf", size: "2.4 MB", date: "May 10, 2026" },
                { name: "ECG Report.pdf", size: "1.8 MB", date: "May 10, 2026" },
                { name: "Blood Test Results.pdf", size: "1.2 MB", date: "May 10, 2026" },
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-orange-50/30 rounded-xl border border-orange-100/50 hover:bg-orange-50/70 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-orange-100 text-orange-500 rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 mb-0.5 group-hover:text-blue-600 transition-colors">{doc.name}</h5>
                      <p className="text-[11px] font-medium text-slate-500">{doc.size} • {doc.date}</p>
                    </div>
                  </div>
                  <Button className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* Right Column (Contact, Commission, Support) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Patient Contact */}
          <Card className="p-6 border-none shadow-sm rounded-3xl bg-white">
            <h3 className="text-[15px] font-bold text-slate-900 mb-4">Patient Contact</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-teal-50 text-teal-600 rounded-full mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Phone</div>
                  <div className="text-sm font-semibold text-slate-900">+91 98765 43210</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-full mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Email</div>
                  <div className="text-sm font-semibold text-slate-900 truncate">john.smith@email.com</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Commission Preview */}
          <Card className="p-6 border-none shadow-sm rounded-3xl bg-white text-center">
            <h3 className="text-[15px] font-bold text-slate-900 mb-4 text-left">Commission Preview</h3>
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-6 text-white shadow-md shadow-orange-200 mb-3">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="w-8 h-8 opacity-80" />
              </div>
              <div className="text-3xl font-bold mb-1">$1,200</div>
              <div className="text-xs font-semibold text-white/90">Expected Commission</div>
            </div>
            <p className="text-[10px] font-medium text-slate-400 px-2 leading-relaxed">
              Commission will be credited upon case completion
            </p>
          </Card>

          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-6 rounded-2xl shadow-md shadow-emerald-200 text-sm">
            <MessageSquare className="w-4 h-4 mr-2" /> Contact Support
          </Button>

        </div>
      </div>
    </div>
  );
}
