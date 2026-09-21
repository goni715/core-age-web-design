"use client";

import React, { useState } from "react";
import { Camera, TrendingUp, CheckCircle2, Phone, Mail, MapPin, Edit, FileText, Settings, HelpCircle, LogOut, Upload, Eye, Download, Bell, Lock, Globe, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AgentProfilePage() {
  const [activeTab, setActiveTab] = useState<"Profile" | "Edit Profile" | "Documents" | "Settings">("Profile");

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-full">
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Agent Profile</h1>
        <p className="text-slate-500 text-sm">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <Card className="p-2 mb-6 border-none shadow-sm rounded-2xl bg-white shrink-0 mx-auto sm:mx-0 sm:w-fit overflow-x-auto custom-scrollbar max-w-full">
        <div className="flex items-center min-w-max">
          {(["Profile", "Edit Profile", "Documents", "Settings"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-8 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab 
                  ? "bg-[#2b88ef] text-white shadow-md shadow-blue-200" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </Card>

      <div className="flex-1 min-h-0 pb-10 overflow-y-auto custom-scrollbar pr-2">
        
        {/* Profile Tab */}
        {activeTab === "Profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Card className="p-6 md:p-8 border-none shadow-sm rounded-3xl bg-white">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 text-center sm:text-left">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-[#2b88ef] text-white flex items-center justify-center text-3xl font-bold shadow-md shadow-blue-200">
                      AR
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-slate-200 text-blue-500 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="pt-2">
                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-slate-900">Ahmed Rahman</h2>
                      <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">Premium Agent</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-500 mb-2">Agent ID: <span className="text-slate-700">AGT-2547</span></div>
                    <div className="text-xs font-medium text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
                      <div className="w-3.5 h-3.5 border border-slate-300 rounded-sm"></div> Member since January 2024
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-500 rounded-xl">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900 leading-none mb-1">142</div>
                      <div className="text-xs font-semibold text-slate-500">Total Cases</div>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 text-emerald-500 rounded-xl">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900 leading-none mb-1">94%</div>
                      <div className="text-xs font-semibold text-slate-500">Success Rate</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 md:p-8 border-none shadow-sm rounded-3xl bg-white">
                <h3 className="font-bold text-slate-900 mb-6 text-[15px]">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Phone</div>
                      <div className="text-sm font-bold text-slate-900">+880 1712-345678</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="truncate w-full">
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Email</div>
                      <div className="text-sm font-bold text-slate-900 truncate">ahmed.rahman@email.com</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 sm:col-span-2">
                    <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Address</div>
                      <div className="text-sm font-bold text-slate-900">Dhaka, Bangladesh</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 border-none shadow-sm rounded-3xl bg-white">
                <h3 className="font-bold text-slate-900 mb-4 text-[15px]">Quick Actions</h3>
                <div className="flex flex-col gap-1">
                  <button onClick={() => setActiveTab("Edit Profile")} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group text-left">
                    <Edit className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">Edit Profile</span>
                  </button>
                  <button onClick={() => setActiveTab("Documents")} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group text-left">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">Documents</span>
                  </button>
                  <button onClick={() => setActiveTab("Settings")} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group text-left">
                    <Settings className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">Settings</span>
                  </button>
                  <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group text-left">
                    <HelpCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">Help & Support</span>
                  </button>
                  <div className="h-px bg-slate-100 my-2"></div>
                  <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors group text-left">
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-semibold text-red-600 group-hover:text-red-700">Logout</span>
                  </button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Edit Profile Tab */}
        {activeTab === "Edit Profile" && (
          <Card className="p-6 md:p-8 border-none shadow-sm rounded-3xl bg-white max-w-3xl">
            <h3 className="font-bold text-slate-900 mb-6 text-[17px]">Edit Profile Information</h3>
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-700">Full Name</label>
                  <input type="text" defaultValue="Ahmed Rahman" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-slate-900" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-700">Phone Number</label>
                  <input type="text" defaultValue="+880 1712-345678" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-slate-900" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-700">Email Address</label>
                <input type="email" defaultValue="ahmed.rahman@email.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-slate-900" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-700">Address</label>
                <textarea rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-slate-900 resize-none"></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-700">NID Number</label>
                  <input type="text" defaultValue="1234567890123" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-slate-900" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-700">Bank Account Number</label>
                  <input type="text" defaultValue="1234567890" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-slate-900" />
                </div>
              </div>

              <Button type="button" className="w-fit bg-[#2b88ef] hover:bg-blue-600 text-white font-semibold py-5 px-8 rounded-xl shadow-md shadow-blue-200">
                <FileText className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </form>
          </Card>
        )}

        {/* Documents Tab */}
        {activeTab === "Documents" && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-end">
              <Button className="bg-[#2b88ef] hover:bg-blue-600 text-white font-semibold py-5 px-6 rounded-xl shadow-md shadow-blue-200">
                <Upload className="w-4 h-4 mr-2" /> Upload New Document
              </Button>
            </div>
            
            <div className="flex flex-col gap-4">
              {[
                { name: "NID Copy", size: "2.4 MB", date: "Jan 15, 2026", status: "Verified", statusColor: "bg-emerald-500" },
                { name: "Trade License", size: "1.8 MB", date: "Jan 15, 2026", status: "Verified", statusColor: "bg-emerald-500" },
                { name: "Bank Statement", size: "3.2 MB", date: "May 10, 2026", status: "Pending Review", statusColor: "bg-orange-500" },
                { name: "Agent Agreement", size: "1.5 MB", date: "Jan 15, 2026", status: "Verified", statusColor: "bg-emerald-500" },
              ].map((doc, idx) => (
                <Card key={idx} className="p-4 sm:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-50 text-orange-500 rounded-xl shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-slate-900 mb-1">{doc.name}</h4>
                      <p className="text-xs font-medium text-slate-500">PDF • {doc.size} <span className="hidden sm:inline mx-1">•</span><br className="sm:hidden" /> Uploaded: {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <span className={`px-3 py-1 text-white text-[11px] font-bold rounded-full ${doc.statusColor}`}>
                      {doc.status}
                    </span>
                    <div className="flex items-center gap-1 ml-auto sm:ml-0">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "Settings" && (
          <div className="flex flex-col gap-6 max-w-3xl">
            
            {/* Notifications */}
            <Card className="p-6 md:p-8 border-none shadow-sm rounded-3xl bg-white">
              <h3 className="font-bold text-slate-900 mb-5 text-[15px]">Notifications</h3>
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <Bell className="w-5 h-5 text-blue-500 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Push Notifications</h4>
                      <p className="text-xs text-slate-500">Receive notifications about case updates</p>
                    </div>
                  </div>
                  {/* Toggle Switch styling */}
                  <div className="w-11 h-6 bg-blue-500 rounded-full relative cursor-pointer shadow-inner">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Email Alerts</h4>
                      <p className="text-xs text-slate-500">Receive email notifications for important updates</p>
                    </div>
                  </div>
                  <div className="w-11 h-6 bg-blue-500 rounded-full relative cursor-pointer shadow-inner">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Security */}
            <Card className="p-6 md:p-8 border-none shadow-sm rounded-3xl bg-white">
              <h3 className="font-bold text-slate-900 mb-5 text-[15px]">Security</h3>
              <div className="flex flex-col gap-5">
                <button className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-200 transition-colors w-full text-left">
                  <div className="flex items-center gap-4">
                    <Lock className="w-5 h-5 text-blue-500 shrink-0" />
                    <h4 className="text-sm font-bold text-slate-900">Change Password</h4>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <Lock className="w-5 h-5 text-blue-500 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Two-Factor Authentication</h4>
                      <p className="text-xs text-slate-500">Add an extra layer of security</p>
                    </div>
                  </div>
                  <div className="w-11 h-6 bg-slate-200 rounded-full relative cursor-pointer shadow-inner">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Preferences */}
            <Card className="p-6 md:p-8 border-none shadow-sm rounded-3xl bg-white">
              <h3 className="font-bold text-slate-900 mb-5 text-[15px]">Preferences</h3>
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="flex items-center gap-4">
                  <Globe className="w-5 h-5 text-blue-500 shrink-0" />
                  <h4 className="text-sm font-bold text-slate-900">Language</h4>
                </div>
                <div className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
                  English
                </div>
              </div>
            </Card>

            {/* Legal */}
            <Card className="p-6 md:p-8 border-none shadow-sm rounded-3xl bg-white">
              <h3 className="font-bold text-slate-900 mb-5 text-[15px]">Legal</h3>
              <div className="flex flex-col gap-4 mb-6">
                <Link href="#" className="text-sm font-bold text-blue-500 hover:text-blue-600">Terms & Conditions</Link>
                <Link href="#" className="text-sm font-bold text-blue-500 hover:text-blue-600">Privacy Policy</Link>
              </div>
              <div className="text-[10px] font-semibold text-slate-400 pt-4 border-t border-slate-100">
                Version 2.1.0 • Last updated May 2026
              </div>
            </Card>

          </div>
        )}

      </div>
    </div>
  );
}
