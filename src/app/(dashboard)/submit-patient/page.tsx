import React from "react";
import Link from "next/link";
import { Upload, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SubmitPatientPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Submit New Patient</h1>
        <p className="text-slate-500 text-sm">Fill in the patient details to submit a new case</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Patient Information */}
          <Card className="p-6 md:p-8 border-none shadow-sm rounded-2xl bg-white">
            <h3 className="font-bold text-slate-900 mb-6 text-[15px]">Patient Information</h3>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-700">Full Name</label>
                <input type="text" placeholder="Enter patient's full name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-700">Phone Number</label>
                  <input type="text" placeholder="+1 (555) 000-0000" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-700">Age</label>
                  <input type="text" placeholder="Enter age" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-700">Gender</label>
                <div className="grid grid-cols-3 gap-3">
                  <Button className="py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-600 font-medium text-sm transition-colors">Male</Button>
                  <Button className="py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-600 font-medium text-sm transition-colors">Female</Button>
                  <Button className="py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-600 font-medium text-sm transition-colors">Other</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Medical Information */}
          <Card className="p-6 md:p-8 border-none shadow-sm rounded-2xl bg-white">
            <h3 className="font-bold text-slate-900 mb-6 text-[15px]">Medical Information</h3>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-700">Treatment Type</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm" />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-700">Symptoms / Notes</label>
                <textarea 
                  placeholder="Describe the patient's symptoms and medical condition..." 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm min-h-[120px] resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-700">Preferred Country</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-700">Budget Range</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm" />
                </div>
              </div>
            </div>
          </Card>

          {/* Upload Reports */}
          <Card className="p-6 md:p-8 border-none shadow-sm rounded-2xl bg-white">
            <h3 className="font-bold text-slate-900 mb-6 text-[15px]">Upload Reports</h3>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
              <Upload className="w-8 h-8 text-slate-400 mb-4" />
              <p className="text-[15px] font-bold text-slate-900 mb-1">Click to upload medical reports</p>
              <p className="text-xs text-slate-500 font-medium">Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB per file)</p>
            </div>
          </Card>

          <Link href="/agent/submit-patient/success">
            <Button className="w-full bg-[#2b88ef] hover:bg-blue-600 text-white font-semibold py-7 rounded-xl shadow-md text-base mt-2">
              Submit Patient Case
            </Button>
          </Link>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card className="p-6 border-none shadow-sm rounded-2xl bg-white">
            <h3 className="font-bold text-slate-900 mb-5 text-[15px]">Submission Guidelines</h3>
            
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Complete Information</h4>
                  <p className="text-xs text-slate-500 mt-1">Ensure all patient details are accurate and complete</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Medical Reports</h4>
                  <p className="text-xs text-slate-500 mt-1">Upload clear and recent medical documents</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Review Process</h4>
                  <p className="text-xs text-slate-500 mt-1">Cases are reviewed within 24-48 hours</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Track Progress</h4>
                  <p className="text-xs text-slate-500 mt-1">Monitor case status in your dashboard</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-none shadow-sm rounded-2xl bg-white">
            <h3 className="font-bold text-slate-900 mb-3 text-[15px]">Need Help?</h3>
            <p className="text-xs text-slate-500 mb-6">
              Contact our support team if you need assistance with the submission process.
            </p>
            <Button variant="outline" className="w-full py-5 rounded-xl border-blue-200 text-blue-600 font-semibold hover:bg-blue-50">
              Contact Support
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
