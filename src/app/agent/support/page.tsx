"use client";

import React, { useState } from "react";
import {
  LifeBuoy,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageSquare,
  Send,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AgentSupportPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [newTicketModal, setNewTicketModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const tickets = [
    {
      id: "TK-4029",
      subject: "Urgent Visa Invitation Letter for Cardiac Case CS-2847",
      status: "In Progress",
      priority: "High",
      category: "Visa & Travel",
      updatedAt: "10 mins ago",
      assignedTo: "Dr. Sarah (Coordinator)",
    },
    {
      id: "TK-3982",
      subject: "Commission Payout Query for Q3 Sub-Agent referrals",
      status: "Resolved",
      priority: "Medium",
      category: "Finance & Commission",
      updatedAt: "Yesterday",
      assignedTo: "Finance Operations",
    },
    {
      id: "TK-3910",
      subject: "Bumrungrad Hospital Orthopedic Quotation Clarification",
      status: "Open",
      priority: "Normal",
      category: "Medical Records",
      updatedAt: "2 days ago",
      assignedTo: "International Desk",
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Channel Partner Support Desk
          </h1>
          <p className="text-slate-500 text-sm">
            24/7 dedicated assistance for patient travel logistics, hospital liaison, and payouts
          </p>
        </div>

        <Button
          onClick={() => setNewTicketModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Support Ticket</span>
        </Button>
      </div>

      {/* Support Direct Contacts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Mail className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase">Emergency Desk</div>
          <div className="text-sm font-bold text-slate-900">care@3smedicare.com</div>
          <p className="text-[11px] text-slate-400">Response time: &lt; 15 mins</p>
        </Card>

        <Card className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <LifeBuoy className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase">Partner Hotline</div>
          <div className="text-sm font-bold text-slate-900">+880 1800 333 444</div>
          <p className="text-[11px] text-slate-400">Available 24/7 WhatsApp & Voice</p>
        </Card>

        <Card className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase">Dedicated Manager</div>
          <div className="text-sm font-bold text-slate-900">Dr. M. Rahman (Director)</div>
          <p className="text-[11px] text-slate-400">Master Partner Priority Line</p>
        </Card>
      </div>

      {/* Tickets Table */}
      <Card className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Your Support Tickets</h3>
          <span className="text-xs text-slate-500 font-medium">
            3 Active inquiries
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {tickets.map((t) => (
            <div
              key={t.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    {t.id}
                  </span>
                  <span className="font-bold text-slate-900 text-sm">
                    {t.subject}
                  </span>
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span>Category: {t.category}</span>
                  <span>•</span>
                  <span>Assigned: {t.assignedTo}</span>
                  <span>•</span>
                  <span>{t.updatedAt}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    t.status === "Resolved"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : t.status === "In Progress"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {t.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
