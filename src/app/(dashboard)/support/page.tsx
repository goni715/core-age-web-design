"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LifeBuoy,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageSquare,
  Send,
  Paperclip,
  Mail,
  ArrowRight,
  Bell,
  BarChart3,
  User,
  X,
  Check,
  ChevronRight,
  Inbox,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TicketReply {
  id: string;
  senderName: string;
  senderRole: string;
  avatar: string;
  isStaff: boolean;
  message: string;
  timestamp: string;
  attachments?: string[];
}

interface SupportTicket {
  id: string;
  subject: string;
  category: "Commission & Payout" | "Patient Case" | "Visa & Travel" | "Hospital Coordination" | "General";
  patientRef?: string;
  priority: "Urgent" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved";
  assignedTo: string;
  createdDate: string;
  lastUpdated: string;
  replies: TicketReply[];
}

export default function SupportPage() {
  const [filterStatus, setFilterStatus] = useState<"All" | "Open" | "In Progress" | "Resolved">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replySuccessBanner, setReplySuccessBanner] = useState<string | null>(null);

  // New Ticket Modal State
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [newTicketSubject, setNewTicketSubject] = useState("");
  const [newTicketCategory, setNewTicketCategory] = useState<SupportTicket["category"]>("Patient Case");
  const [newTicketPriority, setNewTicketPriority] = useState<SupportTicket["priority"]>("Medium");
  const [newTicketPatientRef, setNewTicketPatientRef] = useState("");
  const [newTicketMessage, setNewTicketMessage] = useState("");

  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "TKT-2026-0841",
      subject: "Expedited Visa Invitation Letter for Case 3S-PT-2026-004817 (Bangkok Hospital)",
      category: "Visa & Travel",
      patientRef: "3S-PT-2026-004817",
      priority: "Urgent",
      status: "In Progress",
      assignedTo: "Priya Sharma (Visa Concierge Desk)",
      createdDate: "Oct 11, 2026 - 02:30 PM",
      lastUpdated: "Today at 10:15 AM",
      replies: [
        {
          id: "REP-1",
          senderName: "Ahmed Rahman",
          senderRole: "Referral Partner",
          avatar: "AR",
          isStaff: false,
          message:
            "Patient John Smith needs the formal Bangkok Hospital medical visa endorsement letter stamped within 24 hours. The embassy interview in Dhaka is scheduled for day after tomorrow morning.",
          timestamp: "Oct 11, 2026 - 02:30 PM",
          attachments: ["Passport_Copy_JS.pdf"],
        },
        {
          id: "REP-2",
          senderName: "Priya Sharma",
          senderRole: "Senior Partner Relations Officer (3S Medi Care)",
          avatar: "PS",
          isStaff: true,
          message:
            "Dear Ahmed, We have escalated this directly to Dr. Chatchai's international desk at Bangkok Hospital. The stamped embassy document is currently being issued and will be uploaded here shortly.",
          timestamp: "Oct 11, 2026 - 04:45 PM",
        },
        {
          id: "REP-3",
          senderName: "Medical Concierge Desk",
          senderRole: "Support Officer (Bangkok Center)",
          avatar: "3S",
          isStaff: true,
          message:
            "Document issued and verified. You can find the embassy invitation attached. We have also informed the patient via WhatsApp hotline.",
          timestamp: "Today at 10:15 AM",
          attachments: ["Bangkok_Hospital_Visa_Embassy_Stamped.pdf"],
        },
      ],
    },
    {
      id: "TKT-2026-0792",
      subject: "Commission reconciliation for September bi-weekly payout (Cycle 2)",
      category: "Commission & Payout",
      patientRef: "3S-PT-2026-004720",
      priority: "High",
      status: "Open",
      assignedTo: "Financial Operations Desk",
      createdDate: "Oct 09, 2026 - 11:15 AM",
      lastUpdated: "Yesterday at 04:20 PM",
      replies: [
        {
          id: "REP-10",
          senderName: "Ahmed Rahman",
          senderRole: "Referral Partner",
          avatar: "AR",
          isStaff: false,
          message:
            "Case 3S-PT-2026-004720 treatment cost was $18,500 at Fortis Hospital, Gurgaon. Please verify why the commission ledger reflects 10% instead of our Tier-3 12% agreement.",
          timestamp: "Oct 09, 2026 - 11:15 AM",
        },
        {
          id: "Financial Operations Desk",
          senderName: "Tanvir Hasan",
          senderRole: "Accounts & Settlement Officer",
          avatar: "TH",
          isStaff: true,
          message:
            "Hello Ahmed, Thank you for highlighting this. We are cross-referencing your Tier-3 contract addendum with Fortis. A supplemental wire payment will be added to the Oct 15 disbursement cycle.",
          timestamp: "Yesterday at 04:20 PM",
        },
      ],
    },
    {
      id: "TKT-2026-0683",
      subject: "Hospital bed booking confirmation at Fortis Memorial, Gurgaon",
      category: "Hospital Coordination",
      patientRef: "3S-PT-2026-004655",
      priority: "Medium",
      status: "Resolved",
      assignedTo: "Clinical Liaison Team",
      createdDate: "Oct 04, 2026 - 09:00 AM",
      lastUpdated: "Oct 06, 2026 - 03:30 PM",
      replies: [
        {
          id: "REP-20",
          senderName: "Ahmed Rahman",
          senderRole: "Referral Partner",
          avatar: "AR",
          isStaff: false,
          message:
            "Patient Rahima Begum requested a private deluxe suite for cardiac surgery recovery. Please confirm bed allocation with the hospital guest relations team.",
          timestamp: "Oct 04, 2026 - 09:00 AM",
        },
        {
          id: "REP-21",
          senderName: "Dr. Alok Verma",
          senderRole: "Fortis International Patient Coordinator",
          avatar: "AV",
          isStaff: true,
          message:
            "Confirmed. Suite #408 has been reserved with ICU step-down telemetry. Patient arrived comfortably and admission formalities completed.",
          timestamp: "Oct 06, 2026 - 03:30 PM",
        },
      ],
    },
    {
      id: "TKT-2026-0540",
      subject: "Request for translated doctor discharge summary & post-op medication chart",
      category: "Patient Case",
      patientRef: "3S-PT-2026-004509",
      priority: "Low",
      status: "Resolved",
      assignedTo: "Medical Records Desk",
      createdDate: "Sep 29, 2026 - 01:20 PM",
      lastUpdated: "Oct 01, 2026 - 11:00 AM",
      replies: [
        {
          id: "REP-30",
          senderName: "Ahmed Rahman",
          senderRole: "Referral Partner",
          avatar: "AR",
          isStaff: false,
          message:
            "Patient returned to Dhaka and requires an English-to-Bengali translation of the neurosurgery discharge protocol for the local physician.",
          timestamp: "Sep 29, 2026 - 01:20 PM",
        },
        {
          id: "REP-31",
          senderName: "Medical Records Desk",
          senderRole: "Clinical Translator",
          avatar: "MR",
          isStaff: true,
          message:
            "Translated documentation completed by our bilingual medical officer and emailed to both partner and patient.",
          timestamp: "Oct 01, 2026 - 11:00 AM",
          attachments: ["Bengali_Discharge_Protocol_Summary.pdf"],
        },
      ],
    },
  ]);

  // Filtered tickets
  const filteredTickets = tickets.filter((t) => {
    const matchesFilter = filterStatus === "All" || t.status === filterStatus;
    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.patientRef && t.patientRef.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Handle Submit Reply
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;

    const newReply: TicketReply = {
      id: `REP-${Date.now()}`,
      senderName: "Ahmed Rahman",
      senderRole: "Referral Partner",
      avatar: "AR",
      isStaff: false,
      message: replyText.trim(),
      timestamp: "Just now",
    };

    const updatedTicket: SupportTicket = {
      ...selectedTicket,
      lastUpdated: "Just now",
      status: selectedTicket.status === "Resolved" ? "Open" : selectedTicket.status,
      replies: [...selectedTicket.replies, newReply],
    };

    setTickets((prev) => prev.map((t) => (t.id === selectedTicket.id ? updatedTicket : t)));
    setSelectedTicket(updatedTicket);
    setReplyText("");

    // Success email dispatch banner
    setReplySuccessBanner(
      `Reply added to ${selectedTicket.id}! An automated notification email has been dispatched to backend support (support@3smedicare.com) and assigned officer.`
    );
    setTimeout(() => {
      setReplySuccessBanner(null);
    }, 4500);
  };

  // Handle Create New Ticket
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject.trim() || !newTicketMessage.trim()) return;

    const newTicketId = `TKT-2026-0${Math.floor(100 + Math.random() * 900)}`;
    const newTicket: SupportTicket = {
      id: newTicketId,
      subject: newTicketSubject.trim(),
      category: newTicketCategory,
      patientRef: newTicketPatientRef.trim() || undefined,
      priority: newTicketPriority,
      status: "Open",
      assignedTo: "Support Operations Desk",
      createdDate: "Just now",
      lastUpdated: "Just now",
      replies: [
        {
          id: `REP-${Date.now()}`,
          senderName: "Ahmed Rahman",
          senderRole: "Referral Partner",
          avatar: "AR",
          isStaff: false,
          message: newTicketMessage.trim(),
          timestamp: "Just now",
        },
      ],
    };

    setTickets([newTicket, ...tickets]);
    setIsNewTicketOpen(false);
    setNewTicketSubject("");
    setNewTicketMessage("");
    setNewTicketPatientRef("");

    setReplySuccessBanner(
      `Support ticket #${newTicketId} created successfully! A notification email has been dispatched to backend support desk.`
    );
    setTimeout(() => {
      setReplySuccessBanner(null);
    }, 4500);
  };

  return (
    <div className="max-w-[1360px] mx-auto space-y-6">
      {/* 1. Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <Link
          href="/support"
          className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap bg-[#005ca9] text-white shadow-xs transition-colors flex items-center gap-1.5"
        >
          <LifeBuoy className="w-3.5 h-3.5" />
          <span>Support Tickets</span>
        </Link>
        <Link
          href="/notifications"
          className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80 transition-colors flex items-center gap-1.5"
        >
          <Bell className="w-3.5 h-3.5 text-slate-500" />
          <span>Notifications</span>
          <span className="w-2 h-2 rounded-full bg-blue-600 ml-0.5" />
        </Link>
        <Link
          href="/performance"
          className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80 transition-colors flex items-center gap-1.5"
        >
          <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
          <span>Performance Analytics</span>
        </Link>
      </div>

      {/* 2. Top Alert Banner on Email Notification Dispatch */}
      {replySuccessBanner && (
        <div className="bg-[#dcfce7] border border-[#86efac] text-[#15803d] rounded-2xl p-4 flex items-center justify-between shadow-2xs animate-in fade-in">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs font-semibold">{replySuccessBanner}</span>
          </div>
          <button
            onClick={() => setReplySuccessBanner(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-bold ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 3. Metric Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs">
          <span className="text-xs text-slate-400 font-medium block">Total Tickets</span>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">{tickets.length}</span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Recorded requests</span>
        </Card>
        <Card className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs">
          <span className="text-xs text-amber-600 font-medium block">Open Tickets</span>
          <span className="text-2xl font-bold text-amber-600 mt-1 block">
            {tickets.filter((t) => t.status === "Open").length}
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Awaiting reply</span>
        </Card>
        <Card className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs">
          <span className="text-xs text-blue-600 font-medium block">In Progress</span>
          <span className="text-2xl font-bold text-blue-600 mt-1 block">
            {tickets.filter((t) => t.status === "In Progress").length}
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Under review</span>
        </Card>
        <Card className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs">
          <span className="text-xs text-emerald-600 font-medium block">Resolved</span>
          <span className="text-2xl font-bold text-emerald-600 mt-1 block">
            {tickets.filter((t) => t.status === "Resolved").length}
          </span>
          <span className="text-[11px] text-emerald-600 mt-0.5 block">100% resolution rate</span>
        </Card>
      </div>

      {/* 4. Filter Pills, Search Bar & Create Ticket Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {(["All", "Open", "In Progress", "Resolved"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                filterStatus === tab
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              {tab === "All" ? `All (${tickets.length})` : `${tab} (${tickets.filter((t) => t.status === tab).length})`}
            </button>
          ))}
        </div>

        {/* Search & Add Ticket */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tickets by ID, subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500 shadow-2xs"
            />
          </div>

          <button
            onClick={() => setIsNewTicketOpen(true)}
            className="bg-[#005ca9] hover:bg-[#004e90] text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Open New Ticket</span>
          </button>
        </div>
      </div>

      {/* 5. Support Tickets Table */}
      <Card className="bg-white rounded-3xl border border-slate-100 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 pl-6">Ticket ID</th>
                <th className="py-3.5">Subject & Category</th>
                <th className="py-3.5">Patient Ref</th>
                <th className="py-3.5">Priority</th>
                <th className="py-3.5">Status</th>
                <th className="py-3.5">Replies</th>
                <th className="py-3.5">Last Activity</th>
                <th className="py-3.5 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Inbox className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="font-semibold text-xs text-slate-600">No support tickets found</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Try adjusting your filter or search keywords</p>
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <td className="py-3.5 pl-6 font-mono font-bold text-slate-900">
                      {ticket.id}
                    </td>
                    <td className="py-3.5 max-w-[280px]">
                      <div className="font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                        {ticket.subject}
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {ticket.category}
                      </span>
                    </td>
                    <td className="py-3.5 font-mono text-slate-600">
                      {ticket.patientRef ? (
                        <span className="bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                          {ticket.patientRef}
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          ticket.priority === "Urgent"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : ticket.priority === "High"
                            ? "bg-orange-50 text-orange-700 border border-orange-200"
                            : ticket.priority === "Medium"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                          ticket.status === "Resolved"
                            ? "bg-[#dcfce7] text-[#15803d]"
                            : ticket.status === "In Progress"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            ticket.status === "Resolved"
                              ? "bg-emerald-500"
                              : ticket.status === "In Progress"
                              ? "bg-blue-500"
                              : "bg-amber-500"
                          }`}
                        />
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-3.5 font-semibold text-slate-700">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[11px]">
                        {ticket.replies.length} replies
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-500 text-[11px]">
                      {ticket.lastUpdated}
                    </td>
                    <td className="py-3.5 pr-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTicket(ticket);
                        }}
                        className="bg-white hover:bg-slate-100 border border-slate-200 text-[#0062c4] font-semibold text-xs px-3 py-1.5 rounded-xl transition-colors inline-flex items-center gap-1"
                      >
                        <span>View</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 6. Ticket Details & Replies Thread Modal / Drawer */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100">
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/70 flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                    {selectedTicket.id}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                    {selectedTicket.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      selectedTicket.status === "Resolved"
                        ? "bg-[#dcfce7] text-[#15803d]"
                        : selectedTicket.status === "In Progress"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {selectedTicket.status}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      selectedTicket.priority === "Urgent"
                        ? "bg-red-50 text-red-700"
                        : selectedTicket.priority === "High"
                        ? "bg-orange-50 text-orange-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    Priority: {selectedTicket.priority}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {selectedTicket.subject}
                </h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-1">
                  <span>Created: {selectedTicket.createdDate}</span>
                  <span>·</span>
                  <span>Assigned to: <strong className="text-slate-700">{selectedTicket.assignedTo}</strong></span>
                  {selectedTicket.patientRef && (
                    <>
                      <span>·</span>
                      <span>Patient: <strong className="font-mono text-slate-700">{selectedTicket.patientRef}</strong></span>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={() => setSelectedTicket(null)}
                className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Replies List (Chronological) */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider text-center">
                Conversation Thread ({selectedTicket.replies.length} replies)
              </div>

              {selectedTicket.replies.map((reply) => (
                <div
                  key={reply.id}
                  className={`p-4 rounded-2xl border ${
                    reply.isStaff
                      ? "bg-blue-50/50 border-blue-100/80 ml-0 sm:ml-4"
                      : "bg-slate-50/70 border-slate-100 mr-0 sm:mr-4"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-full text-[11px] font-bold flex items-center justify-center ${
                          reply.isStaff
                            ? "bg-[#005ca9] text-white"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {reply.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 text-xs">{reply.senderName}</span>
                          {reply.isStaff && (
                            <span className="bg-[#dcfce7] text-[#15803d] text-[9px] font-bold px-1.5 py-0.2 rounded-sm flex items-center gap-0.5">
                              <ShieldCheck className="w-3 h-3" /> Official Staff
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">{reply.senderRole}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">{reply.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed pl-9">
                    {reply.message}
                  </p>

                  {/* Attachments if any */}
                  {reply.attachments && reply.attachments.length > 0 && (
                    <div className="pl-9 mt-3 flex flex-wrap gap-2">
                      {reply.attachments.map((file, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-slate-700 font-mono shadow-2xs"
                        >
                          <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                          <span>{file}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Reply Form */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-white">
              <form onSubmit={handleSendReply} className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                    <span>Post a Reply</span>
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" />
                    Auto notification email will be dispatched to backend support
                  </span>
                </div>

                <textarea
                  rows={3}
                  placeholder="Type your response or update here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500 resize-none"
                  required
                />

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => alert("Attachment dialog simulated. You can attach PDFs or medical images.")}
                      className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                    >
                      <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                      <span>Attach File</span>
                    </button>
                    <span className="text-[11px] text-slate-400 hidden sm:inline">Max size: 10MB</span>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#005ca9] hover:bg-[#004e90] text-white font-semibold text-xs px-5 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Reply & Email</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 7. Modal: Create New Support Ticket */}
      {isNewTicketOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-6 border border-slate-100 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Open New Support Ticket</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Submit an inquiry or case escalation to 3S partner relations
                </p>
              </div>
              <button
                onClick={() => setIsNewTicketOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Ticket Subject</label>
                <input
                  type="text"
                  placeholder="Brief summary of your inquiry or issue..."
                  value={newTicketSubject}
                  onChange={(e) => setNewTicketSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Category</label>
                  <select
                    value={newTicketCategory}
                    onChange={(e) => setNewTicketCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Patient Case">Patient Case</option>
                    <option value="Visa & Travel">Visa & Travel</option>
                    <option value="Commission & Payout">Commission & Payout</option>
                    <option value="Hospital Coordination">Hospital Coordination</option>
                    <option value="General">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Priority Level</label>
                  <select
                    value={newTicketPriority}
                    onChange={(e) => setNewTicketPriority(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent (Immediate attention)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Patient Reference ID <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3S-PT-2026-004817"
                  value={newTicketPatientRef}
                  onChange={(e) => setNewTicketPatientRef(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Detailed Message / Description</label>
                <textarea
                  rows={4}
                  placeholder="Provide all relevant details, patient hospital name, required actions..."
                  value={newTicketMessage}
                  onChange={(e) => setNewTicketMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500 resize-none"
                  required
                />
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl flex items-center gap-2.5 text-[11px] text-blue-900">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  When you submit this ticket, an automated dispatch email will be sent to the backend operations desk and assigned officer.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewTicketOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#005ca9] hover:bg-[#004e90] text-white font-semibold px-5 py-2 rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Ticket</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
