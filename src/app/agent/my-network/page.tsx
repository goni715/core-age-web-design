"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronRight, Check, Loader2, Users, Clock, Share2 } from "lucide-react";
import TkIcon from "@/components/icons/TkIcon";
import { Card } from "@/components/ui/card";
import {
  useGenerateInvitationLinkMutation,
  useGetMyNetworksQuery,
  useGetReferralPartnerStatsQuery,
  INetworkPartner,
} from "@/redux/features/referralPartner/referralPartnerApi";
import { SuccessToast, ErrorToast } from "@/helpers/ValidationHelper";

export default function AgentMyNetworkPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [invitationLink, setInvitationLink] = useState<string>("");

  const { data: networkData, isLoading: isLoadingNetworks } = useGetMyNetworksQuery({
    searchTerm: searchQuery,
    status: activeTab === "all" ? undefined : activeTab,
  });

  const { data: statsData, isLoading: isLoadingStats } = useGetReferralPartnerStatsQuery();

  const [generateInvitationLink, { isLoading: isGeneratingLink }] =
    useGenerateInvitationLinkMutation();

  useEffect(() => {
    let isMounted = true;
    const fetchLink = async () => {
      try {
        const res = await generateInvitationLink().unwrap();
        if (isMounted && res?.data?.invitationLink) {
          setInvitationLink(res.data.invitationLink);
        }
      } catch {
        // Ignored
      }
    };
    fetchLink();
    return () => {
      isMounted = false;
    };
  }, [generateInvitationLink]);

  const handleCopyLink = async () => {
    let linkToCopy = invitationLink;
    if (!linkToCopy) {
      try {
        const res = await generateInvitationLink().unwrap();
        if (res?.data?.invitationLink) {
          linkToCopy = res.data.invitationLink;
          setInvitationLink(linkToCopy);
        }
      } catch {
        ErrorToast("Failed to generate invitation link. Please try again.");
        return;
      }
    }

    if (linkToCopy) {
      try {
        await navigator.clipboard?.writeText(linkToCopy);
        setCopiedLink(true);
        SuccessToast("Invitation link copied to clipboard!");
        setTimeout(() => setCopiedLink(false), 2000);
      } catch {
        ErrorToast("Failed to copy link to clipboard");
      }
    }
  };

  // Sample fallback partners if no live partners yet
  const samplePartners: INetworkPartner[] = [
    {
      _id: "1",
      initials: "NJ",
      fullName: "Nusrat Jahan",
      refCode: "RP-0112",
      partnerId: "RP-0112",
      joinedDate: "Jan 2026",
      cases: 64,
      ongoing: 7,
      done: 57,
      earnings: "TK 1,980",
      status: "active",
      email: "nusrat@example.com",
    },
    {
      _id: "2",
      initials: "IH",
      fullName: "Imran Hossain",
      refCode: "RP-0107",
      partnerId: "RP-0107",
      joinedDate: "Dec 2025",
      cases: 51,
      ongoing: 5,
      done: 46,
      earnings: "TK 1,620",
      status: "active",
      email: "imran@example.com",
    },
    {
      _id: "3",
      initials: "FA",
      fullName: "Farhana Akter",
      refCode: "RP-0121",
      partnerId: "RP-0121",
      joinedDate: "Feb 2026",
      cases: 43,
      ongoing: 6,
      done: 37,
      earnings: "TK 1,310",
      status: "active",
      email: "farhana@example.com",
    },
    {
      _id: "4",
      initials: "RC",
      fullName: "Rakib Chowdhury",
      refCode: "RP-0130",
      partnerId: "RP-0130",
      joinedDate: "Mar 2026",
      cases: 29,
      ongoing: 3,
      done: 26,
      earnings: "TK 890",
      status: "active",
      email: "rakib@example.com",
    },
    {
      _id: "5",
      initials: "MH",
      fullName: "Mahmudul Hasan",
      refCode: "RP-0136",
      partnerId: "RP-0136",
      joinedDate: "Apr 2026",
      cases: 22,
      ongoing: 4,
      done: 18,
      earnings: "TK 640",
      status: "active",
      email: "hasan@example.com",
    },
  ];

  const partners: INetworkPartner[] =
    networkData?.data !== undefined ? networkData.data : samplePartners;

  const overviewStats = statsData?.data?.overviewStats;
  const statusCounts = statsData?.data?.statusCounts;

  const referralPartnersCount =
    overviewStats?.referralPartners ??
    statusCounts?.all ??
    networkData?.meta?.total ??
    partners.length;

  const activeThisMonthCount =
    overviewStats?.activeThisMonth ??
    statusCounts?.active ??
    partners.filter((p) => (p.status || "active").toLowerCase() === "active").length;

  const casesInNetworkCount = overviewStats?.casesInNetwork ?? 0;

  const networkEarnings =
    overviewStats?.formattedEarnings?.replace("$", "TK ") ??
    (overviewStats?.networkEarnings !== undefined
      ? `TK ${overviewStats.networkEarnings.toLocaleString()}`
      : "TK 0");

  const allCount =
    statusCounts?.all ?? networkData?.meta?.total ?? partners.length;
  const activeCount =
    statusCounts?.active ??
    partners.filter((p) => (p.status || "active").toLowerCase() === "active").length;
  const invitedCount = statusCounts?.invited ?? 0;
  const pausedCount = statusCounts?.paused ?? 0;

  const tabs = [
    { label: `All (${allCount})`, key: "all" },
    { label: `Active (${activeCount})`, key: "active" },
    { label: `Invited (${invitedCount})`, key: "invited" },
    { label: `Paused (${pausedCount})`, key: "paused" },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border border-slate-200/80 bg-white rounded-2xl shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
              Referral Partners
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            {isLoadingStats ? (
              <span className="inline-block w-12 h-8 bg-slate-200 animate-pulse rounded-md" />
            ) : (
              referralPartnersCount
            )}
          </div>
          <div className="text-xs text-slate-500 mt-1">Total onboarded sub-agents</div>
        </Card>

        <Card className="p-5 border border-slate-200/80 bg-white rounded-2xl shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
              Active This Month
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            {isLoadingStats ? (
              <span className="inline-block w-12 h-8 bg-slate-200 animate-pulse rounded-md" />
            ) : (
              activeThisMonthCount
            )}
          </div>
          <div className="text-xs text-slate-500 mt-1">Partners submitting cases</div>
        </Card>

        <Card className="p-5 border border-slate-200/80 bg-white rounded-2xl shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
              Cases in Network
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            {isLoadingStats ? (
              <span className="inline-block w-12 h-8 bg-slate-200 animate-pulse rounded-md" />
            ) : (
              casesInNetworkCount
            )}
          </div>
          <div className="text-xs text-slate-500 mt-1">Referred patient cases</div>
        </Card>

        <Card className="p-5 border border-slate-200/80 bg-white rounded-2xl shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
              Network Earnings
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TkIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            {isLoadingStats ? (
              <span className="inline-block w-16 h-8 bg-slate-200 animate-pulse rounded-md" />
            ) : (
              networkEarnings
            )}
          </div>
          <div className="text-xs text-slate-500 mt-1">Multi-tier commission share</div>
        </Card>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
        {/* Filter Bar & Search */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-[#0a2540] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: "#0a2540", color: "#ffffff" }
                      : undefined
                  }
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name or ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <button
              onClick={handleCopyLink}
              disabled={isGeneratingLink}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {isGeneratingLink ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : copiedLink ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Share2 className="w-3.5 h-3.5" />
              )}
              <span>{copiedLink ? "Link Copied" : "Copy Invite Link"}</span>
            </button>
          </div>
        </div>

        {/* Partners Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6">Referral Partner</th>
                <th className="py-3 px-4">Joined</th>
                <th className="py-3 px-4 text-center">Cases</th>
                <th className="py-3 px-4 text-center">Ongoing</th>
                <th className="py-3 px-4 text-center">Done</th>
                <th className="py-3 px-4">Your Earnings</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoadingNetworks ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
                    Loading referral partners...
                  </td>
                </tr>
              ) : partners.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No referral partners found matching your search.
                  </td>
                </tr>
              ) : (
                partners.map((partner, index) => {
                  const name = partner.fullName || partner.name || "Partner";
                  const partnerId = partner.refCode || partner.partnerId || `RP-${100 + index}`;
                  const initials =
                    partner.initials ||
                    name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();
                  const casesCount = partner.cases ?? (Number(partner.ongoing || 0) + Number(partner.done || 0));
                  const ongoingCount = partner.ongoing ?? 0;
                  const doneCount = partner.done ?? 0;
                  const earnings = typeof partner.earnings === "string" ? partner.earnings.replace("$", "TK ") : (partner.earnings !== undefined ? `TK ${partner.earnings}` : "TK 0");
                  const status = (partner.status || "active").toLowerCase();

                  return (
                    <tr
                      key={partner._id || index}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-100/70 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                            {initials}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">
                              {name}
                            </div>
                            <div className="text-[11px] font-mono text-slate-400">
                              {partnerId}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-xs text-slate-500 font-medium">
                        {partner.joinedDate || "Recent"}
                      </td>

                      <td className="py-4 px-4 text-center font-bold text-slate-900 text-sm">
                        {casesCount}
                      </td>

                      <td className="py-4 px-4 text-center text-xs font-semibold text-amber-600">
                        {ongoingCount}
                      </td>

                      <td className="py-4 px-4 text-center text-xs font-semibold text-emerald-600">
                        {doneCount}
                      </td>

                      <td className="py-4 px-4 font-bold text-slate-900 text-sm">
                        {earnings}
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            status === "active"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {status === "active" ? "Active" : partner.status || "Invited"}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <Link
                          href={`/agent/patients?partnerId=${partner._id || partnerId}`}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors"
                          title="View Partner Cases"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
