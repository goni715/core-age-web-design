"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  DollarSign,
  Users,
  AlertCircle,
  Clock,
  Check,
  MessageSquare,
  BarChart3,
  Plane,
  FileCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      category: "Cases",
      title: "Case CS-2847 Approved & Hospital Assigned",
      desc: "Your patient John Smith has been accepted by Apollo Hospitals, New Delhi. Admission confirmed for 04 Oct 2026.",
      time: "2 hours ago",
      dateGroup: "Today",
      unread: true,
      actionLink: "/patients/CS-2847",
      actionText: "View Case Details",
    },
    {
      id: 2,
      type: "commission",
      category: "Commission",
      title: "Commission Credited: $1,200.00",
      desc: "Commission for completed orthopedic treatment case CS-2840 has been credited to your withdrawal wallet.",
      time: "5 hours ago",
      dateGroup: "Today",
      unread: true,
      actionLink: "/commission",
      actionText: "Check Earnings",
    },
    {
      id: 3,
      type: "travel",
      category: "Travel & Visa",
      title: "Medical Visa & Flight Booked for Case CS-2846",
      desc: "Visa approved and flight itinerary confirmed for Sarah Johnson to Bangkok, Thailand. Hotel lodging arranged.",
      time: "8 hours ago",
      dateGroup: "Today",
      unread: true,
      actionLink: "/patients/CS-2846",
      actionText: "View Itinerary",
    },
    {
      id: 4,
      type: "assignment",
      category: "Cases",
      title: "Specialist Assigned: Dr. Rajesh Kumar",
      desc: "Senior Cardiologist Dr. Rajesh Kumar has reviewed reports and is assigned to patient case CS-2847.",
      time: "Yesterday, 3:45 PM",
      dateGroup: "Yesterday",
      unread: false,
      actionLink: "/patients/CS-2847",
      actionText: "Review Doctor",
    },
    {
      id: 5,
      type: "warning",
      category: "Cases",
      title: "Document Required for Case CS-2845",
      desc: "Additional biopsy pathology report needed from referring clinic to finalize oncological surgical plan in Singapore.",
      time: "Yesterday, 11:15 AM",
      dateGroup: "Yesterday",
      unread: false,
      actionLink: "/patients/CS-2845",
      actionText: "Upload Document",
    },
    {
      id: 6,
      type: "success",
      category: "Cases",
      title: "Treatment Completed: Emily Davis (CS-2844)",
      desc: "Dental implant surgery successfully completed in Kuala Lumpur, Malaysia. Patient discharged in good health.",
      time: "3 days ago",
      dateGroup: "Earlier",
      unread: false,
      actionLink: "/patients/CS-2844",
      actionText: "View Discharge Summary",
    },
    {
      id: 7,
      type: "commission",
      category: "Commission",
      title: "Monthly Tier Bonus Unlocked",
      desc: "Congratulations! You completed over 15 cases this month and unlocked the Platinum Partner bonus tier.",
      time: "5 days ago",
      dateGroup: "Earlier",
      unread: false,
      actionLink: "/commission",
      actionText: "View Rewards",
    },
  ]);

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const filters = ["All", "Unread", "Cases", "Commission", "Travel & Visa"];

  const filtered = notifications.filter((notif) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Unread") return notif.unread;
    return notif.category === activeFilter;
  });

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="max-w-[1360px] mx-auto space-y-6">
      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <Link
          href="/support"
          className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80 transition-colors flex items-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
          <span>Support Center</span>
        </Link>
        <Link
          href="/notifications"
          className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap bg-[#005ca9] text-white shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-white ml-0.5" />
          )}
        </Link>
        <Link
          href="/performance"
          className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80 transition-colors flex items-center gap-1.5"
        >
          <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
          <span>Performance Analytics</span>
        </Link>
      </div>

      {/* Top Controls: Filter Pills & Mark Read Action */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === filter
                  ? "bg-[#005ca9] text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80"
              }`}
            >
              {filter} {filter === "Unread" && `(${unreadCount})`}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleMarkAllAsRead}
          className="border border-slate-200/90 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-4 py-2 rounded-xl transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          Mark all as read
        </button>
      </div>

      {/* Notifications Cards Feed */}
      <div className="space-y-4">
        {filtered.map((notif) => {
          return (
            <Card
              key={notif.id}
              className={`p-5 rounded-2xl border transition-all ${
                notif.unread
                  ? "border-blue-200/90 bg-[#f8fbff] shadow-xs"
                  : "border-slate-100 bg-white shadow-2xs hover:shadow-xs"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* Icon Badge */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      notif.type === "success"
                        ? "bg-[#d1fae5] text-[#059669]"
                        : notif.type === "commission"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : notif.type === "travel"
                        ? "bg-blue-50 text-blue-600 border border-blue-100"
                        : notif.type === "assignment"
                        ? "bg-sky-50 text-sky-600 border border-sky-100"
                        : "bg-amber-50 text-amber-600 border border-amber-100"
                    }`}
                  >
                    {notif.type === "success" && <CheckCircle2 className="w-5 h-5" />}
                    {notif.type === "commission" && <DollarSign className="w-5 h-5" />}
                    {notif.type === "travel" && <Plane className="w-5 h-5" />}
                    {notif.type === "assignment" && <Users className="w-5 h-5" />}
                    {notif.type === "warning" && <AlertCircle className="w-5 h-5" />}
                  </div>

                  {/* Body Text */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-sm font-bold ${
                          notif.unread ? "text-slate-900" : "text-slate-800"
                        }`}
                      >
                        {notif.title}
                      </h3>
                      {notif.unread && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      )}
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
                      {notif.desc}
                    </p>

                    <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400 font-medium">
                      <Clock className="w-3 h-3" />
                      <span>{notif.time}</span>
                      <span>·</span>
                      <span className="font-semibold text-slate-600">{notif.category}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="self-end sm:self-center shrink-0">
                  <Link
                    href={notif.actionLink}
                    className="border border-slate-200/90 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-3.5 py-1.5 rounded-xl transition-colors shadow-2xs inline-block"
                  >
                    {notif.actionText}
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
