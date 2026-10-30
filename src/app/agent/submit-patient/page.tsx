"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Upload,
  UserPlus,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  Loader2,
  Building2,
  Stethoscope,
  Globe,
  DollarSign,
  Info,
  ShieldCheck,
  FileCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useSubmitPatientByAgentMutation } from "@/redux/features/agentPatient/agentPatientApi";
import { useGetMyNetworksQuery } from "@/redux/features/referralPartner/referralPartnerApi";
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

export default function AgentSubmitPatientPage() {
  const router = useRouter();
  const [submitPatient, { isLoading: isSubmitting }] =
    useSubmitPatientByAgentMutation();
  const { data: networkData } = useGetMyNetworksQuery();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    age: "",
    gender: "male", // must be lowercase: "male" | "female" | "other"
    treatmentType: TREATMENT_CATEGORIES[0],
    preferredCountry: "India",
    budgetRange: "$5,000 - $10,000",
    symptoms: "",
    subAgentId: "",
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [customBudget, setCustomBudget] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
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

  const processFiles = (incomingFiles: File[]) => {
    if (!incomingFiles || incomingFiles.length === 0) return;

    const validFiles: File[] = [];

    for (const file of incomingFiles) {
      const isPdf =
        file.name.toLowerCase().endsWith(".pdf") ||
        file.type.toLowerCase().includes("pdf") ||
        file.type === "application/x-pdf" ||
        file.type === "application/octet-stream";

      if (!isPdf) {
        ErrorToast(`"${file.name}" is not a PDF file. Please upload PDF format only.`);
        continue;
      }

      if (file.size > 10 * 1024 * 1024) {
        ErrorToast(`"${file.name}" exceeds the 10MB limit.`);
        continue;
      }

      const isDuplicate = files.some(
        (existing) => existing.name === file.name && existing.size === file.size
      );
      if (isDuplicate) {
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    const combined = [...files, ...validFiles];
    if (combined.length > 2) {
      ErrorToast("Maximum 2 PDF reports allowed. Retaining first 2 files.");
      setFiles(combined.slice(0, 2));
    } else {
      setFiles(combined);
    }

    if (errors.reports) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.reports;
        return updated;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
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

    if (files.length === 0) {
      newErrors.reports = "At least 1 medical report (PDF format, max 2) is required";
    } else if (files.length > 2) {
      newErrors.reports = "Maximum 2 PDF files are allowed";
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
      const formPayload = new FormData();

      formPayload.append("fullName", formData.fullName.trim());
      formPayload.append("phone", cleanPhone);
      formPayload.append("age", String(Math.floor(Number(formData.age))));
      formPayload.append("gender", formData.gender.toLowerCase());
      formPayload.append("treatmentType", formData.treatmentType.trim());
      formPayload.append("preferredCountry", formData.preferredCountry.trim());
      formPayload.append("budgetRange", formData.budgetRange.trim());
      formPayload.append("symptoms", formData.symptoms.trim());

      if (formData.subAgentId && formData.subAgentId !== "direct") {
        formPayload.append("subAgentId", formData.subAgentId);
      }

      files.forEach((file) => {
        formPayload.append("reports", file);
      });

      await submitPatient(formPayload).unwrap();
      SuccessToast("Patient case submitted successfully!");
      router.push("/agent/patients");
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
  const isReportsComplete = files.length > 0 && files.length <= 2;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/60">
              Master Channel Partner Desk
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Submit New Patient Case
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5 max-w-2xl">
            Register patient medical travel records for hospital quotations, visa issuance, and referral partner tracking. All fields are required.
          </p>
        </div>

        <Link
          href="/agent/patients"
          className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1.5 shrink-0"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>View all submitted cases</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Patient Personal Information */}
          <Card className="p-6 md:p-7 bg-white rounded-3xl border border-slate-200/90 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
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
                  placeholder="e.g. Manik Islam"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 ${
                    errors.fullName
                      ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                      : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
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
                    placeholder="e.g. 01788888888 or +8801788888888"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 ${
                      errors.phone
                        ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                        : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
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
                    placeholder="e.g. 32"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 ${
                      errors.age
                        ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                        : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
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
                            ? "bg-blue-50 border-blue-600 text-blue-700 shadow-2xs ring-1 ring-blue-600/30"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                        <span>{g.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Section 2: Medical Condition & Destination Preferences */}
          <Card className="p-6 md:p-7 bg-white rounded-3xl border border-slate-200/90 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
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
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
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
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
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
                    className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
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
                              ? "bg-blue-50 border-blue-600 text-blue-700 shadow-2xs font-bold ring-1 ring-blue-600/30"
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
                    placeholder="e.g. 5-10 thousands BDT or $4,000 - $7,000"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
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
                      : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
                  }`}
                />
              </div>
            </div>
          </Card>

          {/* Section 3: Diagnostic Reports (PDF only, max 2) */}
          <Card className="p-6 md:p-7 bg-white rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Medical Reports & Prescriptions
                  </h3>
                  <p className="text-xs text-slate-400">
                    PDF files only • Maximum 2 files • Required
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                {files.length} / 2 attached
              </span>
            </div>

            {/* Hidden Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              multiple
              disabled={files.length >= 2}
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Clickable & Drag-Droppable Upload Box */}
            <div
              onClick={() => {
                if (files.length < 2) {
                  fileInputRef.current?.click();
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (files.length < 2) setIsDragging(true);
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (files.length < 2) setIsDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(false);
                if (files.length >= 2) {
                  ErrorToast("Maximum 2 PDF reports already attached.");
                  return;
                }
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  processFiles(Array.from(e.dataTransfer.files));
                }
              }}
              className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center transition-all ${
                isDragging
                  ? "border-blue-600 bg-blue-50/70 scale-[1.01] shadow-md ring-4 ring-blue-500/10 cursor-copy"
                  : errors.reports
                  ? "border-rose-300 bg-rose-50/30 cursor-pointer"
                  : files.length >= 2
                  ? "border-slate-200 bg-slate-50/60 opacity-80 cursor-default"
                  : "border-blue-200/90 bg-blue-50/20 hover:border-blue-500 hover:bg-blue-50/40 cursor-pointer"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-100/70 text-blue-600 flex items-center justify-center mx-auto mb-3 shadow-2xs">
                <Upload className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <div className="text-sm font-bold text-slate-800">
                  {files.length >= 2 ? (
                    <span className="text-slate-500">
                      Maximum limit of 2 reports reached
                    </span>
                  ) : isDragging ? (
                    <span className="text-blue-600 font-extrabold">
                      Drop PDF files now to attach
                    </span>
                  ) : (
                    <span>
                      Click anywhere or drag & drop PDF files here
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  Prescriptions, laboratory test results, or doctor recommendations
                </p>
              </div>

              {files.length < 2 && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-blue-200 text-blue-700 font-bold text-xs hover:bg-blue-50 hover:border-blue-300 transition-all shadow-2xs cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Select PDF File</span>
                  </button>
                </div>
              )}

              <p className="text-[11px] text-slate-400 mt-3">
                Accepted: <strong>PDF format only</strong> (Up to 2 files, max 10MB each)
              </p>
            </div>

            {errors.reports && (
              <p className="text-rose-500 text-xs flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.reports}</span>
              </p>
            )}

            {/* Uploaded File List */}
            {files.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="text-xs font-bold text-slate-700">
                  Attached Reports:
                </div>
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-800 truncate">
                          {file.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB • PDF Document
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <FileCheck className="w-3 h-3" />
                        <span>Ready</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Submit Action directly below Reports */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ background: "linear-gradient(135deg, #0062c4, #1d4ed8)" }}
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
              By submitting, patient records will be routed to 3S specialist hospitals for evaluation.
            </p>
          </div>
        </div>

        {/* Right Sticky Sidebar (1 col) */}
        <div className="space-y-6">
          {/* Referral Assignment Card */}
          <Card className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Building2 className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm">
                Referral Partner Attribution
              </h3>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Credit Case To:
              </label>
              <select
                name="subAgentId"
                value={formData.subAgentId}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
              >
                <option value="direct">
                  Direct Agency Case (No Sub-Agent)
                </option>
                {networkData?.data?.map((partner) => (
                  <option key={partner._id} value={partner._id}>
                    {partner.fullName} ({partner.refCode || "Partner"})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                If this case was referred through one of your sub-agents, select them to automatically record their referral commission.
              </p>
            </div>

            {/* Checklist */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
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
                    isReportsComplete ? "text-emerald-500" : "text-slate-300"
                  }`}
                />
                <span className={isReportsComplete ? "text-slate-700 font-medium" : "text-slate-400"}>
                  Diagnostic PDF reports (1-2 files)
                </span>
              </div>
            </div>
          </Card>

          {/* Process Card */}
          <Card className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-100 text-xs space-y-2 text-slate-600">
            <div className="flex items-center gap-1.5 text-blue-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Partner Workflow</span>
            </div>
            <p className="leading-relaxed">
              1. <strong>Clinical Board Review:</strong> 3S medical team verifies diagnosis & hospital match within 24h.
            </p>
            <p className="leading-relaxed">
              2. <strong>Quotation & Travel:</strong> Hospital estimate & visa invitation sent to you and the patient.
            </p>
            <p className="leading-relaxed">
              3. <strong>Payout Settlement:</strong> Commission credited automatically upon hospital admission.
            </p>
          </Card>
        </div>
      </form>
    </div>
  );
}
