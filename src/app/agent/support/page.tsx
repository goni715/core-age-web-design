"use client";

import React, { useState } from "react";
import {
  Plus,
  X,
  Send,
  Loader2,
  MessageSquare,
  User,
  Mail,
  Phone,
  Inbox,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetMyProfileQuery } from "@/redux/features/user/userApi";
import { getUserInfo } from "@/helpers/SessionHelper";
import {
  useSubmitSupportMutation,
  useGetSupportsQuery,
} from "@/redux/features/support/supportApi";
import { SuccessToast, ErrorToast } from "@/helpers/ValidationHelper";

export default function AgentSupportPage() {
  const [newTicketModal, setNewTicketModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ subject?: string; message?: string }>({});

  // 1. Fetch agent profile details behind the scenes
  const { data: profileResponse } = useGetMyProfileQuery();
  const sessionUser = typeof window !== "undefined" ? getUserInfo() : null;

  const fullName =
    profileResponse?.data?.fullName || sessionUser?.fullName || "Agent";
  const email =
    profileResponse?.data?.email || sessionUser?.email || "agent@medicare.com";
  const phone =
    profileResponse?.data?.phone || sessionUser?.phone || "01700000000";

  // 2. Submit support ticket mutation
  const [submitSupport, { isLoading: isSubmitting }] =
    useSubmitSupportMutation();

  // 3. Fetch real agent support tickets
  const { data: supportsData, isLoading: isLoadingSupports } =
    useGetSupportsQuery(undefined);

  const rawTickets = supportsData?.data || [];
  const tickets = rawTickets.map((t, idx) => ({
    id: t.ticket
      ? (String(t.ticket).startsWith("TK-") ? String(t.ticket) : `TK-${t.ticket}`)
      : t.id || t._id
      ? `TK-${(t.id || t._id || "").slice(-4).toUpperCase()}`
      : `TK-${4100 + idx}`,
    subject: t.subject || "General Inquiry",
    status: t.status === "resolved" ? "Resolved" : t.status === "in-progress" ? "In Progress" : "Open",
    priority: t.priority ? t.priority.charAt(0).toUpperCase() + t.priority.slice(1) : "Normal",
    category: "Partner Support",
    updatedAt: t.createdAt
      ? new Date(t.createdAt).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Recently",
    assignedTo: "Partner Support Desk",
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { subject?: string; message?: string } = {};
    if (!subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!message.trim()) {
      newErrors.message = "Message details are required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const payload = {
        fullName,
        email,
        phone,
        subject: subject.trim(),
        message: message.trim(),
      };

      const res = await submitSupport(payload).unwrap();

      SuccessToast(res?.message || "Support ticket submitted successfully");
      setSubject("");
      setMessage("");
      setErrors({});
      setNewTicketModal(false);
    } catch (err: any) {
      const errMsg =
        err?.data?.message ||
        err?.error ||
        "Failed to submit support ticket. Please try again.";
      ErrorToast(errMsg);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
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
          onClick={() => {
            setErrors({});
            setNewTicketModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Support Ticket</span>
        </Button>
      </div>

      {/* Tickets Table Card */}
      <Card className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Your Support Tickets</h3>
          <span className="text-xs text-slate-500 font-medium">
            {tickets.length} Active {tickets.length === 1 ? "inquiry" : "inquiries"}
          </span>
        </div>

        {isLoadingSupports ? (
          <div className="py-16 text-center space-y-3">
            <Loader2 className="w-7 h-7 text-blue-600 animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-medium">Loading support tickets...</p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="py-16 px-4 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Inbox className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-base">No support tickets found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You haven&apos;t submitted any support requests yet. Click the button below to submit your first ticket.
              </p>
            </div>
            <Button
              onClick={() => {
                setErrors({});
                setNewTicketModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl inline-flex items-center gap-1.5 shadow-xs cursor-pointer mt-2"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit First Ticket</span>
            </Button>
          </div>
        ) : (
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
        )}
      </Card>

      {/* Pop-up Modal for New Support Ticket */}
      {newTicketModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 transition-all animate-in fade-in"
          onClick={() => {
            if (!isSubmitting) setNewTicketModal(false);
          }}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    New Support Ticket
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Submit your issue or request to 3S partner desk
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setNewTicketModal(false)}
                disabled={isSubmitting}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Agent Info Tag (Behind the scene preview) */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="font-bold">{fullName}</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400" />
                  {email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  {phone}
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Subject Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Subject <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if (errors.subject) {
                      setErrors((prev) => ({ ...prev, subject: undefined }));
                    }
                  }}
                  placeholder="e.g. Urgent Visa Invitation Letter / Commission Query"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 ${
                    errors.subject
                      ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                      : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
                  }`}
                />
                {errors.subject && (
                  <p className="text-rose-500 text-[11px]">{errors.subject}</p>
                )}
              </div>

              {/* Message TextArea */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) {
                      setErrors((prev) => ({ ...prev, message: undefined }));
                    }
                  }}
                  placeholder="Please describe your inquiry, patient case ID (if applicable), and any specific assistance required..."
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 leading-relaxed resize-none ${
                    errors.message
                      ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                      : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
                  }`}
                />
                {errors.message && (
                  <p className="text-rose-500 text-[11px]">{errors.message}</p>
                )}
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNewTicketModal(false)}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Ticket</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
