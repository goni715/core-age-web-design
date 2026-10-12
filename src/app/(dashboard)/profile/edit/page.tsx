"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, AlertCircle, Save, ArrowLeft, User, Phone, Mail, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function EditProfilePage() {
  const router = useRouter();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Ahmed",
    lastName: "Rahman",
    email: "ahmed.rahman@medicare.bd",
    phone: "+880 1712-345678",
    whatsapp: "+880 1712-345678",
    nidPassport: "NID-19882691234509",
    agencyName: "Rahman Health Care Consultancies",
    address: "House 42, Road 11, Block D, Banani",
    city: "Dhaka",
    postalCode: "1213",
    country: "Bangladesh",
    emergencyContact: "+880 1819-998877 (Operations Desk)",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {saveSuccess && (
        <div className="bg-[#dcfce7] border border-[#86efac] text-[#15803d] rounded-2xl p-4 flex items-center justify-between shadow-2xs animate-in fade-in">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-semibold">
              Profile details updated successfully! Your updated information has been submitted.
            </span>
          </div>
          <button
            onClick={() => setSaveSuccess(false)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      <Card className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Edit Partner Details</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Keep your contact and business details up to date for medical case notifications and invoices
            </p>
          </div>
          <Link
            href="/profile"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-200/80 px-3.5 py-1.5 rounded-full transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </Link>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-6">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>Personal Identification</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">National ID / Passport</label>
                <input
                  type="text"
                  name="nidPassport"
                  value={formData.nidPassport}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Contact Numbers */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Contact Channels</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Phone Number (Calling)</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">WhatsApp Number (Direct Case Updates)</label>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Emergency Operations Hotline</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Business Address */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>Operating Address</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Consultancy / Business Name</label>
                <input
                  type="text"
                  name="agencyName"
                  value={formData.agencyName}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link
              href="/profile"
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-[#005ca9] hover:bg-[#004e90] text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
