"use client";

import React from "react";
import {
  User,
  Phone,
  Mail,
  Building2,
  ShieldCheck,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Loader2,
  RefreshCw,
} from "lucide-react";
import TkIcon from "@/components/icons/TkIcon";
import { Card } from "@/components/ui/card";
import { useGetMyProfileQuery } from "@/redux/features/user/userApi";
import { SuccessToast } from "@/helpers/ValidationHelper";
import { getUserInfo } from "@/helpers/SessionHelper";

export default function AgentProfilePage() {
  const { data: profileResponse, isLoading, isError, refetch, isFetching } =
    useGetMyProfileQuery();

  const sessionUser = typeof window !== "undefined" ? getUserInfo() : null;
  const profile = profileResponse?.data || (sessionUser && sessionUser.fullName ? {
    _id: sessionUser.userId,
    userId: sessionUser.userId,
    fullName: sessionUser.fullName,
    email: sessionUser.email,
    phone: sessionUser.phone,
    agencyName: sessionUser.agencyName || "Channel Partner Agency",
    approvalStatus: "approved",
    createdAt: new Date().toISOString(),
  } : undefined);

  const formatDate = (isoString?: string) => {
    if (!isoString) return "—";
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return isoString;
    }
  };

  const formatDateTime = (isoString?: string) => {
    if (!isoString) return "—";
    try {
      const date = new Date(isoString);
      return `${date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })} at ${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } catch {
      return isoString;
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    SuccessToast(`${label} copied to clipboard`);
  };

  const initials = profile?.fullName
    ? profile.fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join("")
    : "CP";

  const isApproved =
    profile?.approvalStatus?.toLowerCase() === "approved" ||
    profile?.approvalStatus?.toLowerCase() === "active";

  return (
    <div className="max-w-5xl mx-auto space-y-7 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-blue-100 text-blue-700">
              Channel Partner Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Master Partner Profile
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Manage your master agency credentials, partner status, and settlement details
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer self-start sm:self-auto shadow-2xs disabled:opacity-60"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin text-blue-600" : ""}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-8 bg-white rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center min-h-[360px] space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-sm font-medium text-slate-500">Loading partner profile...</p>
          </Card>
          <Card className="md:col-span-2 p-8 bg-white rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center min-h-[360px] space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-sm font-medium text-slate-500">Fetching agency details...</p>
          </Card>
        </div>
      ) : isError || !profile ? (
        <Card className="p-8 bg-white rounded-3xl border border-rose-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Failed to load profile</h3>
            <p className="text-sm text-slate-500 mt-1">
              Could not retrieve your partner profile information. Please check your connection.
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Try Again
          </button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Summary Card */}
          <div className="space-y-6">
            <Card className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-2xs text-center space-y-5">
              {/* Avatar */}
              <div className="relative mx-auto w-24 h-24">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md ring-4 ring-blue-100">
                  {initials}
                </div>
                <div
                  className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${
                    isApproved ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                  }`}
                  title={isApproved ? "Approved Partner" : "Pending Approval"}
                >
                  {isApproved ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Clock className="w-3.5 h-3.5" />
                  )}
                </div>
              </div>

              {/* Title & Role */}
              <div>
                <h2 className="font-bold text-slate-900 text-xl tracking-tight">
                  {profile.fullName || "Partner Member"}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {profile.agencyName || "Channel Partner Agency"}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/70">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Channel Partner</span>
                </div>
              </div>

              {/* Approval Status Badge */}
              <div className="pt-2">
                {isApproved ? (
                  <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Approved & Verified Partner</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-800 text-xs font-semibold">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="capitalize">
                      Status: {profile.approvalStatus || "Pending Review"}
                    </span>
                  </div>
                )}
              </div>

              {/* Key Meta details */}
              <div className="pt-4 border-t border-slate-100 text-xs text-left space-y-3 text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Partner Tier:</span>
                  <span className="font-bold text-slate-800">Master Channel</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Account Type:</span>
                  <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                    Direct Agent
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Member Since:</span>
                  <span className="font-medium text-slate-800">
                    {formatDate(profile.createdAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Last Active:</span>
                  <span className="font-medium text-slate-800">
                    {profile.lastLoginAt ? formatDate(profile.lastLoginAt) : "Recently"}
                  </span>
                </div>
              </div>
            </Card>

            {/* Quick Support / Contact Card */}
            <Card className="p-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-white">3S Medi Care Head Office</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dedicated partner support desk for patient case coordination and fast approvals.
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                <span>Direct Line:</span>
                <span className="font-semibold text-white">+880 1700 000000</span>
              </div>
            </Card>
          </div>

          {/* Right Column: Detailed Cards */}
          <div className="md:col-span-2 space-y-6">
            {/* Agency & Personal Details */}
            <Card className="p-6 sm:p-7 bg-white rounded-3xl border border-slate-200/80 shadow-2xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      Agency & Contact Details
                    </h3>
                    <p className="text-xs text-slate-400">
                      Primary contact information and registered agency name
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>Full Name</span>
                  </span>
                  <p className="font-bold text-slate-900 text-sm">
                    {profile.fullName || "—"}
                  </p>
                </div>

                {/* Agency Name */}
                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Agency Name</span>
                  </span>
                  <p className="font-bold text-slate-900 text-sm">
                    {profile.agencyName || "—"}
                  </p>
                </div>

                {/* Email Address */}
                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>Email Address</span>
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-slate-900 text-sm truncate">
                      {profile.email || "—"}
                    </p>
                    {profile.email && (
                      <button
                        onClick={() => copyToClipboard(profile.email, "Email")}
                        className="text-slate-400 hover:text-blue-600 p-1 transition-colors"
                        title="Copy email"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Phone Number */}
                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Phone Number</span>
                  </span>
                  <p className="font-semibold text-slate-900 text-sm">
                    {profile.phone || "—"}
                  </p>
                </div>
              </div>
            </Card>

            {/* Account Identifiers & Metadata */}
            <Card className="p-6 sm:p-7 bg-white rounded-3xl border border-slate-200/80 shadow-2xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      Account Credentials & Security
                    </h3>
                    <p className="text-xs text-slate-400">
                      System identification tags and activity records
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* User ID */}
                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Partner User ID
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <code className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50/80 px-2 py-0.5 rounded-md truncate">
                      {profile.userId || profile._id || "—"}
                    </code>
                    {(profile.userId || profile._id) && (
                      <button
                        onClick={() =>
                          copyToClipboard(
                            profile.userId || profile._id,
                            "User ID"
                          )
                        }
                        className="text-slate-400 hover:text-indigo-600 p-1 transition-colors"
                        title="Copy ID"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Approval Status */}
                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Approval Status
                  </span>
                  <p className="font-bold text-sm capitalize">
                    {profile.approvalStatus === "approved" ? (
                      <span className="text-emerald-700">Approved</span>
                    ) : (
                      <span className="text-amber-700">
                        {profile.approvalStatus || "Pending"}
                      </span>
                    )}
                  </p>
                </div>

                {/* Account Created At */}
                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Registered Date</span>
                  </span>
                  <p className="font-semibold text-slate-800 text-xs">
                    {formatDateTime(profile.createdAt)}
                  </p>
                </div>

                {/* Last Login At */}
                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Last Login</span>
                  </span>
                  <p className="font-semibold text-slate-800 text-xs">
                    {formatDateTime(profile.lastLoginAt)}
                  </p>
                </div>
              </div>
            </Card>

            {/* Payout & Banking Settlement Card */}
            <Card className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <TkIcon className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      Commission Settlement & Payouts
                    </h3>
                    <p className="text-xs text-slate-400">
                      Standard payout currency: Bangladeshi Taka (TK)
                    </p>
                  </div>
                </div>
                <span className="font-bold text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                  Settlement Active
                </span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Channel Partner commission is credited upon successful patient admission & treatment completion. All earnings are calculated in Bangladeshi Taka (TK).
              </p>

              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-emerald-900 font-bold block">
                    Direct Bank Transfer & Wire Settlement
                  </span>
                  <span className="text-emerald-700/80 text-[11px]">
                    Automatic monthly payout to verified business account
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-md shadow-2xs border border-emerald-100">
                    Currency: TK (৳)
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
