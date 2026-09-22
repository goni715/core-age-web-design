import React from "react";
import Link from "next/link";
import { Users, Activity, CheckCircle2, DollarSign, UserPlus, FileText, ArrowRight, HeadphonesIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AgentDashboard() {
  const stats = [
    { label: "Total Patients", value: "142", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Ongoing Cases", value: "12", icon: Activity, color: "text-teal-500", bg: "bg-teal-50" },
    { label: "Completed", value: "98", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Total Earnings", value: "$24,850", icon: DollarSign, color: "text-orange-500", bg: "bg-orange-50" },
  ];

  const quickActions = [
    { label: "Submit Patient", icon: UserPlus, bg: "bg-[#2b88ef]", href: "/agent/submit-patient" },
    { label: "View Cases", icon: FileText, bg: "bg-blue-400", href: "/agent/cases" },
    { label: "Commission", icon: DollarSign, bg: "bg-emerald-500", href: "/agent/commission" },
    { label: "Withdraw", icon: DollarSign, bg: "bg-amber-500", href: "/agent/withdraw" },
  ];

  const recentCases = [
    { initials: "JS", name: "John Smith", id: "CS-2847", treatment: "Cardiac Surgery", country: "India", status: "Ongoing", statusBg: "bg-teal-500" },
    { initials: "SJ", name: "Sarah Johnson", id: "CS-2846", treatment: "Orthopedic Surgery", country: "Thailand", status: "Under Review", statusBg: "bg-amber-500" },
    { initials: "MB", name: "Michael Brown", id: "CS-2845", treatment: "Cancer Treatment", country: "Singapore", status: "Confirmed", statusBg: "bg-blue-500" },
    { initials: "ED", name: "Emily Davis", id: "CS-2844", treatment: "Dental Implants", country: "Malaysia", status: "Completed", statusBg: "bg-emerald-500" },
    { initials: "DW", name: "David Wilson", id: "CS-2843", treatment: "Eye Surgery", country: "India", status: "Ongoing", statusBg: "bg-teal-500" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Welcome Section */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, Ahmed Rahman</h1>
          <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">Premium Agent</span>
        </div>
        <p className="text-slate-500 text-sm">Here's what's happening with your cases today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6 border-none shadow-sm rounded-2xl flex flex-col items-start gap-4">
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-xs font-medium text-slate-500">{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => (
            <Link key={idx} href={action.href}>
              <Card className={`${action.bg} text-white border-none shadow-md hover:shadow-lg transition-shadow rounded-2xl p-6 flex flex-col items-center justify-center gap-3 h-32`}>
                <action.icon className="w-8 h-8 opacity-90" />
                <span className="font-semibold text-sm">{action.label}</span>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Performance */}
        <Card className="col-span-1 lg:col-span-2 p-6 border-none shadow-sm rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Monthly Performance</h3>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1">
              <Activity className="w-3 h-3" /> +12% this month
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100/50">
              <div className="text-2xl font-bold text-slate-900 mb-1">18</div>
              <div className="text-xs font-medium text-slate-500">Cases Submitted</div>
            </div>
            <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-50">
              <div className="text-2xl font-bold text-slate-900 mb-1">$3,240</div>
              <div className="text-xs font-medium text-slate-500">Earnings</div>
            </div>
            <div className="bg-orange-50/50 p-5 rounded-xl border border-orange-50">
              <div className="text-2xl font-bold text-slate-900 mb-1">94%</div>
              <div className="text-xs font-medium text-slate-500">Success Rate</div>
            </div>
          </div>
        </Card>

        {/* Need Help */}
        <Card className="col-span-1 p-6 border-none shadow-sm rounded-2xl flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center">
              <HeadphonesIcon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900">Need Help?</h3>
          </div>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            Our support team is here to assist you with any questions or concerns.
          </p>
          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-5 rounded-xl shadow-md shadow-emerald-200">
            Contact Support <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>
      </div>

      {/* Recent Cases */}
      <Card className="p-6 border-none shadow-sm rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-900">Recent Cases</h3>
          <Link href="/agent/cases" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        
        <div className="flex flex-col">
          {recentCases.map((caseItem, idx) => (
            <div key={idx} className={`flex items-center justify-between py-4 ${idx !== recentCases.length - 1 ? 'border-b border-slate-100' : ''}`}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold">
                  {caseItem.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{caseItem.name}</div>
                  <div className="text-xs text-slate-500">{caseItem.id}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-12">
                <div className="hidden md:block text-right">
                  <div className="text-sm font-semibold text-slate-700">{caseItem.treatment}</div>
                  <div className="text-xs text-slate-500">{caseItem.country}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold text-white ${caseItem.statusBg} min-w-[90px] text-center`}>
                    {caseItem.status}
                  </span>
                  <Button className="w-8 h-8 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
