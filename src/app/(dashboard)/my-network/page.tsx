"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronRight, Check, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useGenerateInvitationLinkMutation } from "@/redux/features/referralPartner/referralPartnerApi";
import { SuccessToast, ErrorToast } from "@/helpers/ValidationHelper";

export default function MyNetworkPage() {
  const [activeTab, setActiveTab] = useState("All (24)");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [invitationLink, setInvitationLink] = useState<string>("");

  const [generateInvitationLink, { isLoading: isGeneratingLink }] =
    useGenerateInvitationLinkMutation();

  // Auto-fetch the referral invitation link when the page loads
  useEffect(() => {
    let isMounted = true;
    const fetchLink = async () => {
      try {
        const res = await generateInvitationLink().unwrap();
        if (isMounted && res?.data?.invitationLink) {
          setInvitationLink(res.data.invitationLink);
        }
      } catch {
        // Fallback placeholder if not generated yet
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

  const tabs = [
    { label: "All (24)", key: "All" },
    { label: "Active (21)", key: "Active" },
    { label: "Invited (3)", key: "Invited" },
    { label: "Paused (0)", key: "Paused" },
  ];


  const partners = [
    {
      initials: "NJ",
      name: "Nusrat Jahan",
      id: "RP-0112",
      joined: "Jan 2026",
      cases: 64,
      ongoing: 7,
      done: 57,
      earnings: "$1,980",
      status: "Active",
      statusBadge: "bg-[#d1fae5] text-[#059669]",
    },
    {
      initials: "IH",
      name: "Imran Hossain",
      id: "RP-0107",
      joined: "Dec 2025",
      cases: 51,
      ongoing: 5,
      done: 46,
      earnings: "$1,620",
      status: "Active",
      statusBadge: "bg-[#d1fae5] text-[#059669]",
    },
    {
      initials: "FA",
      name: "Farhana Akter",
      id: "RP-0121",
      joined: "Feb 2026",
      cases: 43,
      ongoing: 6,
      done: 37,
      earnings: "$1,310",
      status: "Active",
      statusBadge: "bg-[#d1fae5] text-[#059669]",
    },
    {
      initials: "RC",
      name: "Rakib Chowdhury",
      id: "RP-0130",
      joined: "Mar 2026",
      cases: 29,
      ongoing: 3,
      done: 26,
      earnings: "$890",
      status: "Active",
      statusBadge: "bg-[#d1fae5] text-[#059669]",
    },
    {
      initials: "MH",
      name: "Mahmudul Hasan",
      id: "RP-0136",
      joined: "Apr 2026",
      cases: 22,
      ongoing: 4,
      done: 18,
      earnings: "$640",
      status: "Active",
      statusBadge: "bg-[#d1fae5] text-[#059669]",
    },
    {
      initials: "TS",
      name: "Tasnim Sultana",
      id: "RP-0139",
      joined: "May 2026",
      cases: 14,
      ongoing: 2,
      done: 12,
      earnings: "$410",
      status: "Active",
      statusBadge: "bg-[#d1fae5] text-[#059669]",
    },
    {
      initials: "SR",
      name: "Sadia Rahman",
      id: "RP-0142",
      joined: "Invited",
      cases: 0,
      ongoing: 0,
      done: 0,
      earnings: "$0",
      status: "Invited",
      statusBadge: "bg-[#ffedd5] text-[#d97706]",
    },
  ];

  const filteredPartners = partners.filter((p) => {
    const tabMatch =
      activeTab === "All (24)" ||
      (activeTab === "Active (21)" && p.status === "Active") ||
      (activeTab === "Invited (3)" && p.status === "Invited") ||
      (activeTab === "Paused (0)" && p.status === "Paused");
    const searchMatch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    return tabMatch && searchMatch;
  });

  return (
    <div className="max-w-[1360px] mx-auto space-y-6">
      {/* 1. Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <Card className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            24
          </div>
          <div className="text-xs text-slate-500 font-normal mt-1">
            Referral partners
          </div>
        </Card>

        <Card className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            17
          </div>
          <div className="text-xs text-slate-500 font-normal mt-1">
            Active this month
          </div>
        </Card>

        <Card className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            386
          </div>
          <div className="text-xs text-slate-500 font-normal mt-1">
            Cases in network
          </div>
        </Card>

        <Card className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            $8,900
          </div>
          <div className="text-xs text-slate-500 font-normal mt-1">
            Network earnings
          </div>
        </Card>
      </div>

      {/* 2. Referral Partners Table Card */}
      <Card className="bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs space-y-5">
        {/* Controls: Filter Pills & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.label
                    ? "bg-[#005ca9] text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or ID"
              className="bg-white border border-slate-200/90 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500 w-full sm:w-64 md:w-72 shadow-2xs"
            />
          </div>
        </div>

        {/* Partners Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  REFERRAL PARTNER
                </th>
                <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  JOINED
                </th>
                <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  CASES
                </th>
                <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  ONGOING
                </th>
                <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  DONE
                </th>
                <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  YOUR EARNINGS
                </th>
                <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  STATUS
                </th>
                <th className="pb-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase text-right">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPartners.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  {/* Referral Partner Info */}
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#e8f1fc] text-[#2563eb] font-semibold text-xs flex items-center justify-center shrink-0">
                        {item.initials}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-400 font-normal">
                          {item.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Joined Date */}
                  <td className="py-3.5 px-3 text-xs sm:text-sm text-slate-600 font-normal whitespace-nowrap">
                    {item.joined}
                  </td>

                  {/* Cases */}
                  <td className="py-3.5 px-3 text-xs sm:text-sm font-bold text-slate-900">
                    {item.cases}
                  </td>

                  {/* Ongoing */}
                  <td className="py-3.5 px-3 text-xs sm:text-sm text-slate-600 font-normal">
                    {item.ongoing}
                  </td>

                  {/* Done */}
                  <td className="py-3.5 px-3 text-xs sm:text-sm text-slate-600 font-normal">
                    {item.done}
                  </td>

                  {/* Your Earnings */}
                  <td className="py-3.5 px-3 text-xs sm:text-sm font-bold text-slate-900">
                    {item.earnings}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${item.statusBadge} min-w-[75px] text-center`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Action Button */}
                  <td className="py-3.5 pl-3 text-right">
                    <Link
                      href={`/patients?partner=${item.id}`}
                      className="w-7 h-7 rounded-lg border border-slate-200/80 inline-flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
                      title="View cases"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer: Count & Pagination */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
          <span className="text-xs text-slate-400 font-normal">
            Showing {filteredPartners.length} of 24 referral partners
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Previous page")}
              className="border border-slate-200/90 text-slate-600 hover:bg-slate-50 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors shadow-2xs cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => alert("Next page")}
              className="border border-slate-200/90 text-slate-600 hover:bg-slate-50 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors shadow-2xs cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </Card>

      {/* 3. Bottom "Grow your network" Card */}
      <Card className="bg-[#eaf3fd] rounded-2xl p-6 border border-blue-100/60 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <h3 className="font-bold text-slate-900 text-base mb-1">
            Grow your network
          </h3>
          <p className="text-xs text-slate-600 max-w-xl leading-relaxed font-normal">
            Send an invitation link. Anyone who signs up through it is linked to you as their Channel Partner and appears in this list.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <input
            type="text"
            readOnly
            value={
              isGeneratingLink && !invitationLink
                ? "Generating invitation link..."
                : invitationLink || "Click 'Copy link' to generate link"
            }
            onClick={(e) => (e.target as HTMLInputElement).select()}
            className="bg-white border border-slate-200/90 rounded-xl px-4 py-2.5 text-xs text-slate-700 font-medium w-full sm:w-72 md:w-80 shadow-2xs focus:outline-hidden select-all"
          />

          <button
            onClick={handleCopyLink}
            disabled={isGeneratingLink && !invitationLink}
            className="bg-[#005ca9] hover:bg-[#004e90] text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors shrink-0 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : isGeneratingLink && !invitationLink ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <span>Copy link</span>
            )}
          </button>
        </div>
      </Card>

    </div>
  );
}
