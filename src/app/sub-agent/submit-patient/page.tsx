"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Link as LinkIcon,
  UserPlus,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  Loader2,
  Building2,
  Sparkles,
  ShieldCheck,
  FileCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useSubmitPatientBySubAgentMutation } from "@/redux/features/agentPatient/agentPatientApi";
import { SuccessToast, ErrorToast } from "@/helpers/ValidationHelper";

const TREATMENT_CATEGORIES = [
  "Cardiac Surgery & Cardiology",
  "Orthopedic & Joint Replacement",
  "Oncology & Cancer Care",
  "Neurology & Neurosurgery",
  "Organ Transplant (Liver / Kidney / Bone Marrow)",
  "Gastroenterology & Hepatology",
  "Ophthalmology & Eye Surgery",
  "Dental Care & Implants",
  "Executive Health Screening",
  "Other Specialist Treatment",
];

const DESTINATION_COUNTRIES = [
  { name: "India", hospitals: "Apollo, Fortis, Max, Medanta" },
  { name: "Thailand", hospitals: "Bumrungrad, Bangkok Hospital" },
  { name: "Singapore", hospitals: "Mount Elizabeth, Gleneagles" },
  { name: "Malaysia", hospitals: "Prince Court, Gleneagles KL" },
  { name: "Turkey", hospitals: "Acibadem, Memorial Healthcare" },
  { name: "United Arab Emirates", hospitals: "American Hospital Dubai" },
];

const BUDGET_PRESETS = [
  "Under $2,000",
  "$2,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $20,000",
  "$20,000+",
];

export default function SubAgentSubmitPatientPage() {
  const router = useRouter();
  const [submitPatient, { isLoading: isSubmitting }] =
    useSubmitPatientBySubAgentMutation();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    age: "",
    gender: "male", // must be lowercase: "male" | "female" | "other"
    treatmentType: TREATMENT_CATEGORIES[0],
    preferredCountry: "India",
    budgetRange: "$3,000 - $8,000",
    symptoms: "",
    driveLink: "",
  });

  const [customBudget, setCustomBudget] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Patient full name is required";
    }

    const cleanPhone = formData.phone.replace(/[\s\-()]/g, "");
    if (!cleanPhone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?\d{6,14}$/.test(cleanPhone)) {
      newErrors.phone = "Enter a valid phone number (e.g. +8801700000000 or 01700000000)";
    }

    const ageNum = Number(formData.age);
    if (!formData.age || isNaN(ageNum)) {
      newErrors.age = "Valid age is required";
    } else if (ageNum < 1 || ageNum > 120) {
      newErrors.age = "Age must be between 1 and 120";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.treatmentType.trim()) {
      newErrors.treatmentType = "Treatment category is required";
    }

    if (!formData.preferredCountry.trim()) {
      newErrors.preferredCountry = "Preferred country is required";
    }

    if (!formData.budgetRange.trim()) {
      newErrors.budgetRange = "Budget range is required";
    }

    if (!formData.symptoms.trim()) {
      newErrors.symptoms = "Symptoms & clinical details are required";
    } else if (formData.symptoms.trim().length < 5) {
      newErrors.symptoms = "Please provide more details about the symptoms (min 5 characters)";
    }

    if (formData.driveLink.trim()) {
      try {
        new URL(formData.driveLink.trim());
      } catch {
        newErrors.driveLink = "Please enter a valid URL (e.g. https://drive.google.com/...)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      ErrorToast("Please complete all required fields correctly.");
      return;
    }

    try {
      const cleanPhone = formData.phone.replace(/[\s\-()]/g, "");
      const payload: {
        fullName: string;
        phone: string;
        age: number;
        gender: string;
        treatmentType: string;
        preferredCountry: string;
        budgetRange: string;
        symptoms: string;
        driveLink?: string;
      } = {
        fullName: formData.fullName.trim(),
        phone: cleanPhone,
        age: Math.floor(Number(formData.age)),
        gender: formData.gender.toLowerCase(),
        treatmentType: formData.treatmentType.trim(),
        preferredCountry: formData.preferredCountry.trim(),
        budgetRange: formData.budgetRange.trim(),
        symptoms: formData.symptoms.trim(),
      };

      if (formData.driveLink.trim()) {
        payload.driveLink = formData.driveLink.trim();
      }

      await submitPatient(payload).unwrap();
      SuccessToast("Patient case submitted successfully!");
      router.push("/sub-agent/patients");
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to submit patient. Please verify details and try again.";
      ErrorToast(errorMsg);
    }
  };

  // Completion checklist helper
  const isPersonalComplete = Boolean(
    formData.fullName.trim() &&
      formData.phone.trim() &&
      formData.age &&
      formData.gender
  );
  const isMedicalComplete = Boolean(
    formData.treatmentType.trim() &&
      formData.preferredCountry.trim() &&
      formData.budgetRange.trim() &&
      formData.symptoms.trim().length >= 5
  );
  const isDriveLinkProvided = Boolean(formData.driveLink.trim());

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-teal-200/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200">
              Sub-Agent Referral Network
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Submit New Patient Case
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5 max-w-2xl">
            Refer your patient for international medical travel, specialist consultation & hospital quotes. All fields are required.
          </p>
        </div>

        <Link
          href="/sub-agent/patients"
          className="text-xs font-bold text-teal-700 hover:text-teal-800 hover:underline flex items-center gap-1.5 shrink-0"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>View my submitted cases</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Patient Personal Information */}
          <Card className="p-6 md:p-7 bg-white rounded-3xl border border-teal-100 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Patient Personal Information
                  </h3>
                  <p className="text-xs text-slate-400">
                    Primary contact and demographic details
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-rose-500 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                All fields required
              </span>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>
                    Patient Full Name <span className="text-rose-500">*</span>
                  </span>
                  {errors.fullName && (
                    <span className="text-rose-500 text-[11px] font-normal flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName}
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Mostafizur Rahman"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 ${
                    errors.fullName
                      ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                      : "border-slate-200 focus:ring-teal-500/20 focus:border-teal-500"
                  }`}
                />
              </div>

              {/* Phone and Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>
                      Phone Number <span className="text-rose-500">*</span>
                    </span>
                    {errors.phone && (
                      <span className="text-rose-500 text-[11px] font-normal">
                        Invalid
                      </span>
                    )}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 01777777777 or +8801777777777"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 ${
                      errors.phone
                        ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                        : "border-slate-200 focus:ring-teal-500/20 focus:border-teal-500"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-rose-500 text-[11px] mt-0.5">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>
                      Patient Age <span className="text-rose-500">*</span>
                    </span>
                    {errors.age && (
                      <span className="text-rose-500 text-[11px] font-normal">
                        {errors.age}
                      </span>
                    )}
                  </label>
                  <input
                    type="number"
                    name="age"
                    min="1"
                    max="120"
                    required
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="e.g. 28"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 ${
                      errors.age
                        ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                        : "border-slate-200 focus:ring-teal-500/20 focus:border-teal-500"
                    }`}
                  />
                </div>
              </div>

              {/* Gender Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Gender <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Male", val: "male" },
                    { label: "Female", val: "female" },
                    { label: "Other", val: "other" },
                  ].map((g) => {
                    const isSelected = formData.gender === g.val;
                    return (
                      <button
                        key={g.val}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, gender: g.val }))
                        }
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? "bg-teal-50 border-teal-600 text-teal-800 shadow-2xs ring-1 ring-teal-600/30"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />}
                        <span>{g.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Section 2: Medical Condition & Destination Preferences */}
          <Card className="p-6 md:p-7 bg-white rounded-3xl border border-teal-100 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Medical Condition & Treatment Preferences
                  </h3>
                  <p className="text-xs text-slate-400">
                    Clinical specialty, destination country, and budget
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Treatment Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>
                      Treatment Category <span className="text-rose-500">*</span>
                    </span>
                  </label>
                  <select
                    name="treatmentType"
                    required
                    value={formData.treatmentType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                  >
                    {TREATMENT_CATEGORIES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Country */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>
                      Preferred Destination <span className="text-rose-500">*</span>
                    </span>
                  </label>
                  <select
                    name="preferredCountry"
                    required
                    value={formData.preferredCountry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                  >
                    {DESTINATION_COUNTRIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name} ({c.hospitals})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget Range */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Estimated Budget Range <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setCustomBudget(!customBudget)}
                    className="text-[11px] font-semibold text-teal-700 hover:underline cursor-pointer"
                  >
                    {customBudget ? "Use preset budgets" : "Type custom budget"}
                  </button>
                </div>

                {!customBudget ? (
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {BUDGET_PRESETS.map((b) => {
                      const isSelected = formData.budgetRange === b;
                      return (
                        <button
                          key={b}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, budgetRange: b }))
                          }
                          className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                            isSelected
                              ? "bg-teal-50 border-teal-600 text-teal-800 shadow-2xs font-bold ring-1 ring-teal-600/30"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {b}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <input
                    type="text"
                    name="budgetRange"
                    required
                    value={formData.budgetRange}
                    onChange={handleInputChange}
                    placeholder="e.g. 5-10 thousands BDT or $3,000 - $8,000"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                )}
                {errors.budgetRange && (
                  <p className="text-rose-500 text-[11px]">{errors.budgetRange}</p>
                )}
              </div>

              {/* Symptoms / Clinical Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>
                    Symptoms, Diagnosis & Doctor Notes{" "}
                    <span className="text-rose-500">*</span>
                  </span>
                  {errors.symptoms && (
                    <span className="text-rose-500 text-[11px] font-normal">
                      {errors.symptoms}
                    </span>
                  )}
                </label>
                <textarea
                  name="symptoms"
                  required
                  rows={3}
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  placeholder="Describe patient's current symptoms, diagnostic findings, previous surgery history, and doctor recommendations..."
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 leading-relaxed ${
                    errors.symptoms
                      ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                      : "border-slate-200 focus:ring-teal-500/20 focus:border-teal-500"
                  }`}
                />
              </div>
            </div>
          </Card>

          {/* Section 3: Diagnostic Reports / Drive Link */}
          <Card className="p-6 md:p-7 bg-white rounded-3xl border border-teal-100 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Medical Reports & Documents (Google Drive Link)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Provide a Google Drive or cloud storage link for medical documents
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-teal-600" />
                  <span>Google Drive Link</span>
                </span>
                {errors.driveLink && (
                  <span className="text-rose-500 text-[11px] font-normal">
                    {errors.driveLink}
                  </span>
                )}
              </label>
              <input
                type="url"
                name="driveLink"
                value={formData.driveLink}
                onChange={handleInputChange}
                placeholder="https://drive.google.com/drive/folders/..."
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 ${
                  errors.driveLink
                    ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                    : "border-slate-200 focus:ring-teal-500/20 focus:border-teal-500"
                }`}
              />
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Make sure the Drive link permissions are set to <strong>&quot;Anyone with the link can view&quot;</strong> so our medical review team can access the files.
              </p>
            </div>
          </Card>

          {/* Submit Action directly below Reports */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ background: "linear-gradient(135deg, #0d9488, #059669)" }}
              className="w-full h-12 text-white font-bold text-sm sm:text-base rounded-2xl shadow-md hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2.5 border-0 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting Patient Case...</span>
                </>
              ) : (
                <>
                  <span>Submit Patient Case</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-400 mt-2">
              By submitting, patient case will be credited to your account and forwarded to 3S clinical desk.
            </p>
          </div>
        </div>

        {/* Right Sticky Sidebar (1 col) */}
        <div className="space-y-6">
          {/* Automatic Credit & Tracking Card */}
          <Card className="p-6 bg-white rounded-3xl border border-teal-100 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <h3 className="font-bold text-slate-900 text-sm">
                Direct Referral Tracking
              </h3>
            </div>

            <div className="bg-teal-50/70 p-3.5 rounded-2xl border border-teal-100 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Credited To:</span>
                <span className="font-bold text-teal-900">Your Account (SA)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Master Agency:</span>
                <span className="font-semibold text-slate-800">3S Medi Care Int</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md shadow-2xs">
                  Direct Commission
                </span>
              </div>
              <p className="text-[11px] text-teal-700/90 leading-relaxed pt-1 border-t border-teal-100/60">
                This case will be linked to your profile and verified by your Master Channel Partner for payment upon patient hospital admission.
              </p>
            </div>

            {/* Checklist */}
            <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
              <div className="font-bold text-slate-700 mb-1">
                Submission Checklist:
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className={`w-4 h-4 ${
                    isPersonalComplete ? "text-emerald-500" : "text-slate-300"
                  }`}
                />
                <span className={isPersonalComplete ? "text-slate-700 font-medium" : "text-slate-400"}>
                  Patient name, phone & age
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className={`w-4 h-4 ${
                    isMedicalComplete ? "text-emerald-500" : "text-slate-300"
                  }`}
                />
                <span className={isMedicalComplete ? "text-slate-700 font-medium" : "text-slate-400"}>
                  Treatment, country & symptoms
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className={`w-4 h-4 ${
                    isDriveLinkProvided ? "text-emerald-500" : "text-slate-300"
                  }`}
                />
                <span className={isDriveLinkProvided ? "text-slate-700 font-medium" : "text-slate-400"}>
                  Google Drive link (optional)
                </span>
              </div>
            </div>
          </Card>

          {/* Process Card */}
          <Card className="p-5 bg-teal-50/80 rounded-2xl border border-teal-100 text-xs space-y-2 text-slate-700 shadow-2xs">
            <div className="flex items-center gap-1.5 text-teal-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Sub-Agent Workflow</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              1. <strong>Records Evaluation:</strong> 3S clinical board reviews documents within 24h.
            </p>
            <p className="leading-relaxed text-slate-600">
              2. <strong>Quotation Provided:</strong> Treatment plan and quotes are shared with you and your patient.
            </p>
            <p className="leading-relaxed text-slate-600">
              3. <strong>Direct Payout:</strong> Referral earnings credited upon hospital admission.
            </p>
          </Card>
        </div>
      </form>
    </div>
  );
}
