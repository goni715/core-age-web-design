"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Building2,
  CheckCircle2,
  AlertCircle,
  Download,
  DollarSign,
  Calendar,
  Lock,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function BankPayoutPage() {
  const [showEditBank, setShowEditBank] = useState(false);
  const [bankSaved, setBankSaved] = useState(false);

  const [bankData, setBankData] = useState({
    accountName: "Ahmed Rahman",
    bankName: "Standard Chartered Bank (SCB)",
    branchName: "Gulshan North Branch, Dhaka",
    accountNumber: "•••• •••• •••• 8841",
    swiftCode: "SCBLBDDX",
    routingNumber: "215273184",
    currency: "USD / BDT Automated Wire",
  });

  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault();
    setBankSaved(true);
    setShowEditBank(false);
    setTimeout(() => setBankSaved(false), 3000);
  };

  const payoutHistory = [
    {
      id: "PO-99120",
      date: "Sep 28, 2026",
      amount: "$4,200.00",
      cases: "6 cases cleared",
      method: "SCB Wire #***8841",
      status: "Paid",
    },
    {
      id: "PO-98402",
      date: "Sep 14, 2026",
      amount: "$3,850.00",
      cases: "5 cases cleared",
      method: "SCB Wire #***8841",
      status: "Paid",
    },
    {
      id: "PO-97118",
      date: "Aug 30, 2026",
      amount: "$5,100.00",
      cases: "7 cases cleared",
      method: "SCB Wire #***8841",
      status: "Paid",
    },
    {
      id: "PO-96245",
      date: "Aug 15, 2026",
      amount: "$2,900.00",
      cases: "4 cases cleared",
      method: "SCB Wire #***8841",
      status: "Paid",
    },
  ];

  return (
    <div className="space-y-6">
      {bankSaved && (
        <div className="bg-[#dcfce7] border border-[#86efac] text-[#15803d] rounded-2xl p-4 flex items-center justify-between shadow-2xs animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-semibold">
              Bank information updated! Verified compliance team has registered your new payout route.
            </span>
          </div>
          <button
            onClick={() => setBankSaved(false)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Cards: Bank Card Visual + Active Method */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Premium Debit / Corporate Payout Card */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-tr from-slate-900 via-[#004e90] to-[#0062c4] rounded-3xl p-6 text-white shadow-md relative overflow-hidden flex flex-col justify-between min-h-[230px]">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold tracking-widest text-blue-200">
                SCB EXPRESS PAYOUT
              </span>
              <span className="w-8 h-6 bg-amber-400/80 rounded-md block border border-amber-300" />
            </div>

            <div className="py-4">
              <span className="text-lg sm:text-xl font-mono tracking-widest block font-bold text-slate-100">
                4219 •••• •••• 8841
              </span>
              <span className="text-[10px] text-blue-200 uppercase tracking-wider block mt-1">
                Standard Chartered Bangladesh
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
              <div>
                <span className="text-[9px] uppercase text-blue-200/80 block">Account Holder</span>
                <span className="font-bold tracking-wide text-white">AHMED RAHMAN</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] uppercase text-blue-200/80 block">Direct Wire</span>
                <span className="font-bold text-emerald-300">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bank & Payout Details Card */}
        <div className="lg:col-span-2">
          <Card className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-2xs h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#0062c4]" />
                  <h2 className="text-base font-bold text-slate-900">Registered Bank Account</h2>
                  <span className="bg-[#dcfce7] text-[#15803d] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>
                <button
                  onClick={() => setShowEditBank(!showEditBank)}
                  className="text-xs font-semibold text-[#0062c4] hover:underline cursor-pointer"
                >
                  {showEditBank ? "Close Form" : "Change Bank"}
                </button>
              </div>

              {showEditBank ? (
                <form onSubmit={handleSaveBank} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-slate-700 font-semibold block mb-1">Account Holder Name</label>
                    <input
                      type="text"
                      defaultValue={bankData.accountName}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-semibold block mb-1">Bank Name</label>
                    <input
                      type="text"
                      defaultValue={bankData.bankName}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-semibold block mb-1">Account Number / IBAN</label>
                    <input
                      type="text"
                      placeholder="Account Number"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-semibold block mb-1">SWIFT / BIC Code</label>
                    <input
                      type="text"
                      defaultValue={bankData.swiftCode}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowEditBank(false)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#005ca9] hover:bg-[#004e90] text-white font-semibold px-5 py-2 rounded-xl"
                    >
                      Save Account
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6 text-xs">
                  <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 block font-medium text-[11px]">Beneficiary Name</span>
                    <span className="text-slate-900 font-bold mt-0.5 block">{bankData.accountName}</span>
                  </div>
                  <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 block font-medium text-[11px]">Bank Name</span>
                    <span className="text-slate-900 font-bold mt-0.5 block">{bankData.bankName}</span>
                  </div>
                  <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 block font-medium text-[11px]">Account Number</span>
                    <span className="text-slate-900 font-mono font-bold mt-0.5 block">{bankData.accountNumber}</span>
                  </div>
                  <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 block font-medium text-[11px]">SWIFT Code</span>
                    <span className="text-slate-900 font-mono font-bold mt-0.5 block">{bankData.swiftCode}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" /> Bank wire encrypted and secured via SWIFT
              </span>
              <span className="font-semibold text-slate-700">Next Payout: Oct 15, 2026</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Payout History Table */}
      <Card className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-2xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Payout Settlements</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Direct wire transfers cleared to your registered bank account
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Total Disbursed: $24,850.00
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="pb-3 pl-2">Payout ID</th>
                <th className="pb-3">Disbursement Date</th>
                <th className="pb-3">Referred Cases</th>
                <th className="pb-3">Method</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3 text-right pr-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payoutHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 pl-2 font-mono font-bold text-slate-900">{item.id}</td>
                  <td className="py-3 text-slate-600">{item.date}</td>
                  <td className="py-3 text-slate-600">{item.cases}</td>
                  <td className="py-3 text-slate-600">{item.method}</td>
                  <td className="py-3 font-bold text-slate-900">{item.amount}</td>
                  <td className="py-3 text-right pr-2">
                    <span className="bg-[#dcfce7] text-[#15803d] font-semibold text-[11px] px-2.5 py-0.5 rounded-full inline-block">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
