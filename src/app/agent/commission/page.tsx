"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  TrendingUp,
  ArrowRight,
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Layers,
  Calendar,
} from "lucide-react";
import TkIcon from "@/components/icons/TkIcon";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  useGetCommissionStatsByAgentQuery,
  useGetAllCommissionsByAgentQuery,
  IAgentCommissionItem,
} from "@/redux/features/agentPatient/agentPatientApi";

export default function AgentCommissionPage() {
  const currentYear = new Date().getFullYear(); // e.g. 2026
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Available year options: 2026, 2027, 2028, 2029, 2030
  const yearOptions = [2026, 2027, 2028, 2029, 2030];

  // 1. Fetch Stats & Monthly Earnings with year filter
  const { data: statsResponse, isLoading: isStatsLoading } =
    useGetCommissionStatsByAgentQuery({ year: selectedYear });

  // 2. Fetch Commissions Table Data
  const { data: commissionsResponse, isLoading: isCommissionsLoading } =
    useGetAllCommissionsByAgentQuery({
      searchTerm: searchQuery || undefined,
      paymentStatus: activeTab !== "all" ? activeTab : undefined,
      page: currentPage,
      limit,
    });

  const stats = statsResponse?.data;
  const statusCounts = commissionsResponse?.statusCounts;
  const commissionsList: IAgentCommissionItem[] = commissionsResponse?.data || [];
  const meta = commissionsResponse?.meta;

  const summary = [
    {
      label: "Total Commission",
      value: `TK ${(stats?.totalCommission ?? 0).toLocaleString()}`,
      icon: TkIcon,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Pending Commission",
      value: `TK ${(stats?.pendingCommission ?? stats?.pending ?? 0).toLocaleString()}`,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      label: "Paid Commission",
      value: `TK ${(stats?.paidCommission ?? stats?.paid ?? 0).toLocaleString()}`,
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      label: "Completed Payouts",
      value: `${statusCounts?.paid ?? 0} Cases`,
      icon: TrendingUp,
      color: "text-teal-500",
      bg: "bg-teal-50",
    },
  ];

  const tabs = [
    { label: `All (${statusCounts?.all ?? commissionsList.length})`, key: "all" },
    { label: `Pending (${statusCounts?.pending ?? 0})`, key: "pending" },
    { label: `Paid (${statusCounts?.paid ?? 0})`, key: "paid" },
    { label: `Unpaid (${statusCounts?.unpaid ?? 0})`, key: "unpaid" },
  ];

  const monthlyData =
    stats?.monthlyEarnings && stats.monthlyEarnings.length > 0
      ? stats.monthlyEarnings.map((m) => ({
          name: m.month,
          earnings: m.earnings ?? m.commission ?? 0,
        }))
      : [
          { name: "Jan", earnings: 0 },
          { name: "Feb", earnings: 0 },
          { name: "Mar", earnings: 0 },
          { name: "Apr", earnings: 0 },
          { name: "May", earnings: 0 },
          { name: "Jun", earnings: 0 },
          { name: "Jul", earnings: 0 },
          { name: "Aug", earnings: 0 },
          { name: "Sep", earnings: 0 },
          { name: "Oct", earnings: 0 },
          { name: "Nov", earnings: 0 },
          { name: "Dec", earnings: 0 },
        ];

  const getStatusBadge = (status?: string) => {
    switch ((status || "").toLowerCase()) {
      case "paid":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "unpaid":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Channel Commission & Revenue
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Track your earnings, referral commissions, and monthly payout statistics
          </p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md shadow-amber-200 text-sm shrink-0 cursor-pointer">
          <TkIcon className="w-4 h-4 mr-1.5" /> Request Payout
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((stat, idx) => (
          <Card
            key={idx}
            className="p-5 border border-slate-200/80 shadow-2xs rounded-3xl bg-white space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </span>
              <div
                className={`w-9 h-9 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center shrink-0`}
              >
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isStatsLoading ? (
                <div className="h-8 w-24 bg-slate-100 rounded-lg animate-pulse" />
              ) : (
                stat.value
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Monthly Earnings Chart */}
      <Card className="p-6 md:p-8 border border-slate-200/80 shadow-2xs rounded-3xl bg-white space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Monthly Earnings & Commission Growth</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Annual performance view based on confirmed patient cases
            </p>
          </div>
          <div className="relative inline-flex items-center self-start sm:self-auto">
            <Calendar className="w-3.5 h-3.5 text-blue-600 absolute left-3 pointer-events-none" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              aria-label="Select year for commission stats"
              className="pl-8 pr-8 py-1.5 bg-blue-50/80 hover:bg-blue-100/70 text-blue-700 text-xs font-bold rounded-full border border-blue-200 transition-colors cursor-pointer appearance-none focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            >
              {yearOptions.map((yr) => (
                <option key={yr} value={yr} className="bg-white text-slate-800 font-semibold">
                  {yr === currentYear ? `${yr} (Current Year)` : yr}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-blue-600 absolute right-2.5 pointer-events-none" />
          </div>
        </div>

        <div className="h-[260px] sm:h-[300px] w-full pt-2">
          {isStatsLoading ? (
            <div className="h-full flex items-center justify-center text-slate-400 text-xs">
              <Loader2 className="w-6 h-6 animate-spin mr-2 text-blue-600" />
              Loading chart data...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
                  tickFormatter={(val) => `TK ${val}`}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    backgroundColor: "#ffffff",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                  itemStyle={{ color: "#0062c4" }}
                  formatter={(value: unknown) => [
                    `TK ${Number(value || 0).toLocaleString()}`,
                    "Commission",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#0062c4"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#0062c4", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 6, fill: "#1d4ed8" }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>

      {/* Commissions Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
        {/* Table Filter & Search Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.key
                    ? "bg-[#0a2540] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by case ID or patient..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6">Patient & Case ID</th>
                <th className="py-3 px-4">Case Status</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-6 text-right">Commission Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isCommissionsLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
                    Loading commissions...
                  </td>
                </tr>
              ) : commissionsList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 text-xs">
                    No commission records found.
                  </td>
                </tr>
              ) : (
                commissionsList.map((c, i) => {
                  const patientName = c.fullName || c.patientName || "Unnamed Patient";
                  const amount =
                    c.commission ??
                    c.commissionFee ??
                    c.agentCommissionFee ??
                    0;
                  const paymentStatus = c.paymentStatus || c.status || "pending";
                  const caseStatus = c.patientStatus || "submitted";
                  const recordDate = c.date || c.updatedAt || c.createdAt;

                  return (
                    <tr key={c._id || i} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900 text-sm">
                          {patientName}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          {c.caseId || "CS-" + (c._id ? c._id.slice(-4) : "0000")}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold capitalize bg-slate-100 text-slate-700 border border-slate-200">
                          {caseStatus.replace("_", " ")}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold capitalize border ${getStatusBadge(
                            paymentStatus
                          )}`}
                        >
                          {paymentStatus}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-xs text-slate-500 font-medium">
                        {formatDate(recordDate)}
                      </td>

                      <td className="py-4 px-6 text-right font-black text-slate-900 text-base">
                        TK {amount.toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {meta && meta.totalPages > 1 && (
          <div className="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between gap-3 text-xs text-slate-500">
            <div>
              Showing Page <strong>{meta.page}</strong> of{" "}
              <strong>{meta.totalPages}</strong> ({meta.total} total cases)
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1 || isCommissionsLoading}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((p) => Math.min(meta.totalPages, p + 1))
                }
                disabled={currentPage >= meta.totalPages || isCommissionsLoading}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
