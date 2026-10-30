"use client";

import React, { useState } from "react";
import {
  LifeBuoy,
  Plus,
  Mail,
  ShieldCheck,
  Building2,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SubAgentSupportPage() {
  const [newTicketModal, setNewTicketModal] = useState(false);

  const tickets = [
    {
      id: "TK-4035",
      subject: "Hospital treatment plan update for case CS-2849",
      status: "In Progress",
      category: "Medical Records",
      updatedAt: "30 mins ago",
    },
    {
      id: "TK-3990",
      subject: "Referral Fee Settlement Confirmation for CS-2841",
      status: "Resolved",
      category: "Commission & Payout",
      updatedAt: "2 days ago",
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Sub-Agent Support & Coordination
          </h1>
          <p className="text-slate-500 text-sm">
            Reach out for medical quotation status, patient travel logistics, or referral earnings queries
          </p>
        </div>

        <button
          onClick={() => setNewTicketModal(true)}
          style={{ background: "linear-gradient(135deg, #0d9488, #059669)" }}
          className="text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-xs hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer border-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Support Request</span>
        </button>
      </div>

      {/* Support Direct Contacts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 bg-white rounded-2xl border border-teal-100 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
            <Mail className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase">
            3S Clinical Coordinator
          </div>
          <div className="text-sm font-bold text-slate-900">
            cases@3smedicare.com
          </div>
          <p className="text-[11px] text-slate-400">Average response: &lt; 30 mins</p>
        </Card>

        <Card className="p-5 bg-white rounded-2xl border border-teal-100 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <LifeBuoy className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase">
            Sub-Agent Helpline
          </div>
          <div className="text-sm font-bold text-slate-900">
            +880 1800 333 444
          </div>
          <p className="text-[11px] text-slate-400">WhatsApp & Phone Support</p>
        </Card>

        <Card className="p-5 bg-white rounded-2xl border border-teal-100 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase">
            Master Channel Partner
          </div>
          <div className="text-sm font-bold text-slate-900">
            Direct Agency Liaison
          </div>
          <p className="text-[11px] text-slate-400">Assigned Partner Support</p>
        </Card>
      </div>

      {/* Tickets List */}
      <Card className="bg-white rounded-3xl border border-teal-100 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">
            Your Support Inquiries
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            2 active tickets
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {tickets.map((t) => (
            <div
              key={t.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-teal-50/40 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                    {t.id}
                  </span>
                  <span className="font-bold text-slate-900 text-sm">
                    {t.subject}
                  </span>
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span>Category: {t.category}</span>
                  <span>•</span>
                  <span>{t.updatedAt}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    t.status === "Resolved"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-teal-50 text-teal-700 border border-teal-200"
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
