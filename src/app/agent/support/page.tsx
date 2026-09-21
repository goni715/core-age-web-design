"use client";

import React, { useState } from "react";
import { MessageSquare, Phone, Mail, FileText, DollarSign, TrendingUp, Search, Send, CheckCircle2, AlertCircle, Users, Clock, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SupportCenterPage() {
  const [activeTab, setActiveTab] = useState<"Support" | "Notifications" | "Performance">("Support");

  const notifications = [
    { type: "success", title: "Case CS-2847 Approved", desc: "Your patient case has been approved and assigned to Apollo Hospitals", time: "2 hours ago", unread: true },
    { type: "commission", title: "Commission Payment Processed", desc: "$1,200 has been credited to your account", time: "5 hours ago", unread: true },
    { type: "assignment", title: "New Assignment", desc: "Dr. Rajesh Kumar has been assigned to case CS-2846", time: "1 day ago", unread: false },
    { type: "warning", title: "Document Required", desc: "Additional medical reports needed for case CS-2845", time: "2 days ago", unread: false },
    { type: "success", title: "Case Completed", desc: "Treatment completed for patient Emily Davis", time: "3 days ago", unread: false },
  ];

  const pageHeaders = {
    Support: { title: "Support Center", subtitle: "Get help and support from our team" },
    Notifications: { title: "Notifications", subtitle: "Stay updated with your cases and activities" },
    Performance: { title: "Performance Analytics", subtitle: "Track your performance and achievements" }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-[calc(100vh-140px)]">
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">{pageHeaders[activeTab].title}</h1>
        <p className="text-slate-500 text-sm">{pageHeaders[activeTab].subtitle}</p>
      </div>

      {/* Segmented Control Tabs */}
      <Card className="p-2 mb-6 border-none shadow-sm rounded-2xl bg-white shrink-0 mx-auto sm:mx-0 sm:w-fit">
        <div className="flex items-center">
          {["Support", "Notifications", "Performance"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-5 sm:px-8 py-2.5 rounded-xl text-sm font-semibold transition-all ${
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

      {/* Main Content Area - Flexible height to fill space */}
      <div className="flex-1 min-h-0">
        {activeTab === "Support" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Chat Area */}
            <Card className="lg:col-span-2 p-0 border-none shadow-sm rounded-3xl bg-white flex flex-col h-full overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center gap-4 shrink-0 bg-white z-10">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Support Team</h3>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Online
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-6 custom-scrollbar bg-slate-50/30">
                <div className="flex flex-col items-start max-w-[85%]">
                  <div className="bg-[#2b88ef] text-white rounded-2xl rounded-tl-sm px-5 py-3.5 text-[15px] shadow-sm shadow-blue-200 mb-1">
                    Hello! How can I assist you today?
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 px-1">10:30 AM</span>
                </div>
                
                <div className="flex flex-col items-end max-w-[85%] self-end">
                  <div className="bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-tr-sm px-5 py-3.5 text-[15px] shadow-sm mb-1">
                    I need help with commission withdrawal
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 px-1">10:32 AM</span>
                </div>

                <div className="flex flex-col items-start max-w-[85%]">
                  <div className="bg-[#2b88ef] text-white rounded-2xl rounded-tl-sm px-5 py-3.5 text-[15px] shadow-sm shadow-blue-200 mb-1 leading-relaxed">
                    I'd be happy to help! You can request a withdrawal from the Commission page. The minimum withdrawal amount is $100.
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 px-1">10:33 AM</span>
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 sm:p-6 border-t border-slate-100 shrink-0 bg-white">
                <div className="relative flex items-center">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-700"
                  />
                  <button className="absolute right-2 w-10 h-10 bg-[#2b88ef] hover:bg-blue-600 text-white rounded-xl flex items-center justify-center transition-colors shadow-md shadow-blue-200">
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </div>
            </Card>

            {/* Support Sidebar */}
            <div className="lg:col-span-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2 pb-10 lg:pb-0">
              <Card className="p-6 border-none shadow-sm rounded-3xl bg-white shrink-0">
                <h3 className="text-[15px] font-bold text-slate-900 mb-5">Contact Methods</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors cursor-pointer group">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Call Support</h4>
                      <p className="text-xs text-slate-500 mt-0.5">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors cursor-pointer group">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Email Support</h4>
                      <p className="text-xs text-slate-500 mt-0.5 truncate max-w-[150px]">support@3smedicare.com</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-none shadow-sm rounded-3xl bg-white shrink-0">
                <h3 className="text-[15px] font-bold text-slate-900 mb-4">Help Topics</h3>
                <div className="flex flex-col gap-1">
                  {[
                    { icon: FileText, title: "How to Submit a Patient" },
                    { icon: DollarSign, title: "Commission Payment Process" },
                    { icon: TrendingUp, title: "Withdrawal Guidelines" },
                    { icon: Search, title: "Case Tracking" },
                  ].map((topic, idx) => (
                    <button key={idx} className="flex items-center gap-3 p-3 text-left hover:bg-slate-50 rounded-xl transition-colors group">
                      <topic.icon className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">{topic.title}</span>
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-none shadow-sm rounded-3xl bg-white shrink-0">
                <h3 className="text-[15px] font-bold text-slate-900 mb-2">Availability</h3>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">
                  Our support team is available Monday to Friday, 9:00 AM - 6:00 PM EST
                </p>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "Notifications" && (
          <div className="flex flex-col gap-4 pb-10 overflow-y-auto h-full custom-scrollbar pr-2">
            {notifications.map((notif, idx) => {
              const icons = {
                success: <CheckCircle2 className="w-5 h-5" />,
                commission: <DollarSign className="w-5 h-5" />,
                assignment: <Users className="w-5 h-5" />,
                warning: <AlertCircle className="w-5 h-5" />
              };
              
              const colors = {
                success: "bg-emerald-50 text-emerald-600 border-emerald-200",
                commission: "bg-emerald-50 text-emerald-600 border-emerald-200", // Based on screenshot
                assignment: "bg-blue-50 text-blue-600 border-blue-200",
                warning: "bg-amber-50 text-amber-600 border-amber-200"
              };

              return (
                <Card 
                  key={idx} 
                  className={`p-5 sm:p-6 border ${notif.unread ? 'border-blue-200 shadow-md shadow-blue-50 bg-[#f8fbff]' : 'border-slate-100 shadow-sm bg-white'} rounded-3xl flex items-start gap-5 transition-shadow hover:shadow-md`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${(colors as any)[notif.type]}`}>
                    {(icons as any)[notif.type]}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`text-[15px] font-bold ${notif.unread ? 'text-slate-900' : 'text-slate-700'}`}>{notif.title}</h3>
                      {notif.unread && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
                    </div>
                    <p className={`text-sm mb-3 ${notif.unread ? 'text-slate-600 font-medium' : 'text-slate-500'}`}>{notif.desc}</p>
                    <span className="text-[11px] font-bold text-slate-400 tracking-wide uppercase flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {notif.time}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {activeTab === "Performance" && (
          <div className="flex flex-col gap-6 pb-10 overflow-y-auto h-full custom-scrollbar pr-2">
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 shrink-0">
              <Card className="p-6 border-none shadow-sm rounded-2xl bg-white flex flex-col gap-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">18</div>
                  <div className="text-xs font-medium text-slate-500">Cases This Month</div>
                </div>
              </Card>
              <Card className="p-6 border-none shadow-sm rounded-2xl bg-white flex flex-col gap-4">
                <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center shrink-0">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">$3,240</div>
                  <div className="text-xs font-medium text-slate-500">Earnings</div>
                </div>
              </Card>
              <Card className="p-6 border-none shadow-sm rounded-2xl bg-white flex flex-col gap-4">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">15</div>
                  <div className="text-xs font-medium text-slate-500">Completed</div>
                </div>
              </Card>
              <Card className="p-6 border-none shadow-sm rounded-2xl bg-white flex flex-col gap-4">
                <div className="w-10 h-10 bg-teal-50 text-teal-500 rounded-xl flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">94%</div>
                  <div className="text-xs font-medium text-slate-500">Success Rate</div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shrink-0">
              
              {/* Performance Highlights */}
              <Card className="lg:col-span-2 p-6 md:p-8 border-none shadow-sm rounded-3xl bg-white">
                <h3 className="font-bold text-slate-900 mb-8">Performance Highlights</h3>
                
                <div className="flex flex-col gap-8">
                  {/* Monthly Target Progress */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="font-semibold text-slate-600">Monthly Target</span>
                      <span className="font-bold text-slate-900">18 / 20 cases</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>

                  {/* Earnings Goal Progress */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="font-semibold text-slate-600">Earnings Goal</span>
                      <span className="font-bold text-slate-900">$3,240 / $4,000</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '81%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Top Performer */}
              <Card className="lg:col-span-1 p-6 md:p-8 border-none shadow-sm rounded-3xl bg-white flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-xl flex items-center justify-center shadow-md shadow-orange-200">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900">Top Performer</h3>
                </div>
                
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  You're in the top 10% of agents this month! Keep up the excellent work.
                </p>

                <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center mt-auto">
                  <span className="text-3xl font-black text-orange-500 mb-1">#8</span>
                  <span className="text-xs font-semibold text-slate-500">Out of 150 agents</span>
                </div>
              </Card>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
