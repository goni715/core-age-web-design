"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DollarSign, CheckCircle2, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", earnings: 1200 },
  { name: "Feb", earnings: 1800 },
  { name: "Mar", earnings: 2400 },
  { name: "Apr", earnings: 2100 },
  { name: "May", earnings: 3200 },
];

export default function CommissionPage() {
  const [activeTab, setActiveTab] = useState("All");

  const summary = [
    { label: "Total Commission", value: "$24,850", icon: DollarSign, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Approved", value: "$18,420", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Pending", value: "$4,280", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Paid", value: "$16,150", icon: TrendingUp, color: "text-teal-500", bg: "bg-teal-50" },
  ];

  const tabs = ["All", "Pending", "Approved", "Paid"];

  const commissions = [
    { initials: "JS", name: "John Smith", status: "Pending", statusColor: "bg-amber-500", caseId: "CS-2847", hospital: "Apollo Hospitals", amount: "$1,200" },
    { initials: "SJ", name: "Sarah Johnson", status: "Approved", statusColor: "bg-emerald-500", caseId: "CS-2846", hospital: "Bumrungrad Hospital", amount: "$850" },
    { initials: "MB", name: "Michael Brown", status: "Paid", statusColor: "bg-teal-500", caseId: "CS-2845", hospital: "Mount Elizabeth", amount: "$2,500" },
    { initials: "ED", name: "Emily Davis", status: "Paid", statusColor: "bg-teal-500", caseId: "CS-2844", hospital: "Prince Court Medical", amount: "$320" },
    { initials: "DW", name: "David Wilson", status: "Pending", statusColor: "bg-amber-500", caseId: "CS-2843", hospital: "Fortis Hospital", amount: "$650" },
    { initials: "LA", name: "Lisa Anderson", status: "Approved", statusColor: "bg-emerald-500", caseId: "CS-2842", hospital: "Bangkok Hospital", amount: "$1,000" },
    { initials: "JT", name: "James Taylor", status: "Approved", statusColor: "bg-emerald-500", caseId: "CS-2841", hospital: "Max Hospital", amount: "$1,800" },
    { initials: "MG", name: "Maria Garcia", status: "Paid", statusColor: "bg-teal-500", caseId: "CS-2840", hospital: "Gleneagles Hospital", amount: "$980" },
  ];

  const filteredCommissions = activeTab === "All" ? commissions : commissions.filter(c => c.status === activeTab);

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Commission</h1>
          <p className="text-slate-500 text-sm">Track your earnings and commission details</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-5 px-6 rounded-xl shadow-md shadow-amber-200 text-sm shrink-0">
          <DollarSign className="w-4 h-4 mr-2" /> Request Withdrawal <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {summary.map((stat, idx) => (
          <Card key={idx} className="p-6 border-none shadow-sm rounded-2xl bg-white flex flex-col gap-4">
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center shrink-0`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-xs font-medium text-slate-500">{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="p-6 md:p-8 border-none shadow-sm rounded-3xl bg-white">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[17px] font-bold text-slate-900">Monthly Earnings</h3>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" /> +28% from last month
          </span>
        </div>
        
        <div className="h-[250px] sm:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                tickFormatter={(value) => `$${value}`}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                formatter={(value: any) => [`$${value}`, 'Earnings']}
              />
              <Line 
                type="monotone" 
                dataKey="earnings" 
                stroke="#2b88ef" 
                strokeWidth={3}
                dot={{ fill: '#2b88ef', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#2b88ef', stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Tabs */}
      <Card className="p-2 border-none shadow-sm rounded-2xl bg-white overflow-x-auto custom-scrollbar">
        <div className="flex items-center min-w-max p-2 gap-1 sm:gap-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-sm font-semibold transition-all ${
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

      {/* List */}
      <div className="flex flex-col gap-4 pb-10">
        {filteredCommissions.map((comm, idx) => (
          <Card key={idx} className="p-4 sm:p-5 md:p-6 border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            
            <div className="flex items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-12 h-12 rounded-full bg-[#2b88ef] text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-sm shadow-blue-200">
                {comm.initials}
              </div>
              
              <div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5">
                  <h3 className="text-[17px] font-bold text-slate-900 leading-none">{comm.name}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white ${comm.statusColor}`}>
                    {comm.status}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center text-xs text-slate-500 gap-y-1 gap-x-2 sm:gap-x-3">
                  <span className="flex items-center gap-1.5">
                    Case ID: <span className="font-semibold text-slate-700">{comm.caseId}</span>
                  </span>
                  <span className="hidden sm:inline w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span>{comm.hospital}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 pt-4 sm:pt-0 border-t border-slate-100 sm:border-t-0">
              <div className="flex flex-col items-start sm:items-end">
                <span className="text-[10px] font-medium text-slate-400 mb-0.5">Commission</span>
                <span className="text-xl font-bold text-slate-900">{comm.amount}</span>
              </div>
              <Link href={`/agent/patients/${comm.caseId}`}>
                <Button className="bg-[#2b88ef] hover:bg-blue-600 text-white font-semibold py-5 px-6 rounded-xl shadow-md shadow-blue-200 text-sm">
                  View Details <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
            
          </Card>
        ))}
      </div>

    </div>
  );
}
