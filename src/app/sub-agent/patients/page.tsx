"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Check,
  Plus,
  Loader2,
  FileText,
  ArrowRight,
  Edit3,
  X,
  Link as LinkIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  useGetPatientsBySubAgentQuery,
  useUpdatePatientBySubAgentMutation,
  IAgentPatientItem,
} from "@/redux/features/agentPatient/agentPatientApi";
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
  "India",
  "Thailand",
  "Singapore",
  "Malaysia",
  "Turkey",
  "United Arab Emirates",
  "China",
];

export default function SubAgentPatientsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const { data: patientsResponse, isLoading } = useGetPatientsBySubAgentQuery({
    searchTerm: searchQuery,
    status: activeTab === "all" ? undefined : activeTab,
    preferredCountry: selectedCountry === "all" ? undefined : selectedCountry,
  });

  const [updatePatient, { isLoading: isUpdatingPatient }] =
    useUpdatePatientBySubAgentMutation();

  const [editModalPatient, setEditModalPatient] = useState<IAgentPatientItem | null>(null);
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    phone: "",
    age: "",
    gender: "male",
    treatmentType: "",
    symptoms: "",
    preferredCountry: "",
    budgetRange: "",
    driveLink: "",
  });
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});

  const handleOpenEdit = (patient: IAgentPatientItem) => {
    setEditModalPatient(patient);
    setEditFormData({
      fullName: patient.fullName || "",
      phone: patient.phone || "",
      age: patient.age !== undefined && patient.age !== null ? String(patient.age) : "",
      gender: (patient.gender || "male").toLowerCase(),
      treatmentType: patient.treatmentType || TREATMENT_CATEGORIES[0],
      symptoms: patient.symptoms || "",
      preferredCountry: patient.preferredCountry || "India",
      budgetRange: patient.budgetRange || "$3,000 - $8,000",
      driveLink: patient.driveLink || "",
    });
    setEditErrors({});
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
    if (editErrors[name]) {
      setEditErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalPatient) return;

    const newErrors: Record<string, string> = {};
    if (!editFormData.fullName.trim()) {
      newErrors.fullName = "Patient full name is required";
    }
    const cleanPhone = editFormData.phone.replace(/[\s\-()]/g, "");
    if (!cleanPhone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?\d{6,14}$/.test(cleanPhone)) {
      newErrors.phone = "Enter a valid phone number";
    }
    const ageNum = Number(editFormData.age);
    if (!editFormData.age || isNaN(ageNum)) {
      newErrors.age = "Valid age is required";
    } else if (ageNum < 1 || ageNum > 120) {
      newErrors.age = "Age must be between 1 and 120";
    }
    if (!editFormData.treatmentType.trim()) {
      newErrors.treatmentType = "Treatment category is required";
    }
    if (!editFormData.symptoms.trim()) {
      newErrors.symptoms = "Symptoms & details are required";
    }
    if (editFormData.driveLink.trim()) {
      try {
        new URL(editFormData.driveLink.trim());
      } catch {
        newErrors.driveLink = "Enter a valid URL (e.g. https://drive.google.com/...)";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setEditErrors(newErrors);
      ErrorToast("Please fix validation errors.");
      return;
    }

    try {
      const payload: {
        fullName: string;
        phone: string;
        age: number;
        gender: string;
        treatmentType: string;
        symptoms: string;
        preferredCountry: string;
        budgetRange: string;
        driveLink?: string;
      } = {
        fullName: editFormData.fullName.trim(),
        phone: cleanPhone,
        age: Math.floor(Number(editFormData.age)),
        gender: editFormData.gender.toLowerCase(),
        treatmentType: editFormData.treatmentType.trim(),
        symptoms: editFormData.symptoms.trim(),
        preferredCountry: editFormData.preferredCountry.trim(),
        budgetRange: editFormData.budgetRange.trim(),
      };

      if (editFormData.driveLink.trim()) {
        payload.driveLink = editFormData.driveLink.trim();
      }

      await updatePatient({
        patientId: editModalPatient._id,
        data: payload,
      }).unwrap();

      SuccessToast("Patient case updated successfully!");
      setEditModalPatient(null);
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to update patient. Please try again.";
      ErrorToast(errorMsg);
    }
  };

  const patientsList: IAgentPatientItem[] = patientsResponse?.data || [];

  const counts = patientsResponse?.statusCounts || {
    all: patientsResponse?.meta?.total ?? patientsList.length,
    submitted: 0,
    under_review: 0,
    confirmed: 0,
    ongoing: 0,
    completed: 0,
    cancelled: 0,
  };

  const tabs = [
    { label: `All (${counts.all})`, key: "all" },
    { label: `Submitted (${counts.submitted})`, key: "submitted" },
    { label: `Under review (${counts.under_review})`, key: "under_review" },
    { label: `Confirmed (${counts.confirmed})`, key: "confirmed" },
    { label: `Ongoing (${counts.ongoing})`, key: "ongoing" },
    { label: `Completed (${counts.completed})`, key: "completed" },
  ];

  const selectedPatient =
    patientsList.find((p) => (p.caseId || p._id) === selectedCaseId) ||
    patientsList[0] ||
    null;

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "ongoing":
        return "bg-teal-50 text-teal-700 border-teal-200";
      case "under_review":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "completed":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "submitted":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.key
                  ? "bg-[#0d9488] text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Link
          href="/sub-agent/submit-patient"
          style={{ background: "linear-gradient(135deg, #0d9488, #059669)" }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white font-bold text-xs sm:text-sm shadow-xs hover:opacity-95 active:scale-[0.99] transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Patient</span>
        </Link>
      </div>

      {/* Filter Row */}
      <div className="bg-white rounded-2xl border border-teal-100 p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search my cases by patient name, case ID, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>

        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 font-medium focus:outline-hidden"
        >
          <option value="all">All Destinations</option>
          <option value="India">India</option>
          <option value="Thailand">Thailand</option>
          <option value="Singapore">Singapore</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Turkey">Turkey</option>
        </select>
      </div>

      {/* Master Detail View: Table on Left + Case Timeline on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Cases Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-teal-100 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-6">Patient Name</th>
                  <th className="py-3 px-4">Treatment / Destination</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Referral Reward</th>
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-teal-600" />
                      Loading your referred cases...
                    </td>
                  </tr>
                ) : patientsList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
                          <FileText className="w-6 h-6" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 mb-1">No Referred Cases Yet</h4>
                        <p className="text-xs text-slate-500 mb-4">
                          You haven&apos;t referred any patients yet. Submit a patient case to track treatment progress and referral rewards.
                        </p>
                        <Link
                          href="/sub-agent/submit-patient"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Submit Patient</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  patientsList.map((p) => {
                    const id = p.caseId || p._id;
                    const isSelected = selectedCaseId === id;
                    const isFinal = p.status === "completed" || p.status === "cancelled";

                    return (
                      <tr
                        key={p._id}
                        onClick={() => setSelectedCaseId(id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-teal-50/80 hover:bg-teal-50"
                            : "hover:bg-slate-50/60"
                        }`}
                      >
                        <td className="py-4 px-6">
                          <div className="font-bold text-slate-900 text-sm">
                            {p.fullName}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400">
                            {p.caseId || "CS-" + p._id.slice(-4)}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-medium text-slate-800 text-xs sm:text-sm">
                            {p.treatmentType}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {p.preferredCountry || "India"}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(
                              p.status
                            )}`}
                          >
                            {p.status}
                          </span>
                        </td>

                        <td className="py-4 px-4 font-extrabold text-teal-800 text-sm">
                          {p.status === "completed"
                            ? p.commissionAmount
                              ? `TK ${Number(p.commissionAmount).toLocaleString()}`
                              : "TK Earned"
                            : "Estimated on admission"}
                        </td>

                        <td className="py-4 px-6 text-right">
                          {!isFinal ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenEdit(p);
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors cursor-pointer"
                              title="Edit patient"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-300">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Selected Case Details & Progress */}
        {selectedPatient ? (
          (() => {
            const isFinal =
              selectedPatient.status === "completed" ||
              selectedPatient.status === "cancelled";

            return (
              <div className="bg-white rounded-3xl border border-teal-100 shadow-2xs p-6 space-y-5">
                <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/60">
                      {selectedPatient.caseId || "CASE FILE"}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1.5">
                      {selectedPatient.fullName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {selectedPatient.phone || "No phone provided"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isFinal && (
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(selectedPatient)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors cursor-pointer shadow-2xs"
                        title="Edit patient details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                    )}
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getStatusBadge(
                        selectedPatient.status
                      )}`}
                    >
                      {selectedPatient.status}
                    </span>
                  </div>
                </div>

                {/* Case Meta Box */}
                <div className="bg-teal-50/50 rounded-2xl p-4 text-xs space-y-2.5 border border-teal-100">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Treatment:</span>
                    <span className="font-bold text-slate-800">
                      {selectedPatient.treatmentType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Destination:</span>
                    <span className="font-semibold text-slate-800">
                      {selectedPatient.preferredCountry || "India"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Medical Coordinator:</span>
                    <span className="font-semibold text-teal-800">
                      3S Care Desk
                    </span>
                  </div>
                </div>

                {/* Treatment Milestones Timeline */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Treatment Milestones
                  </h4>
                  <div className="space-y-3">
                    {Array.isArray(selectedPatient.timeline) && selectedPatient.timeline.length > 0 ? (
                      selectedPatient.timeline.map((step: { title: string; date: string }, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 text-xs">
                          <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <div className="flex-1 flex justify-between">
                            <span className="font-semibold text-slate-800">
                              {step.title}
                            </span>
                            <span className="text-slate-400 font-mono text-[11px]">
                              {step.date}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-slate-400">
                        Case submitted to 3S international medical board.
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/sub-agent/submit-patient`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold text-xs transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Submit Another Patient Case</span>
                  </Link>
                </div>
              </div>
            );
          })()
        ) : (
          <div className="bg-white rounded-3xl border border-teal-100 shadow-2xs p-8 text-center flex flex-col items-center justify-center min-h-[320px]">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-3">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Case Selected</h3>
            <p className="text-xs text-slate-500 max-w-[220px] mt-1 mb-4">
              Submit your patient cases to track medical milestones and referral earnings in real time.
            </p>
            <Link
              href="/sub-agent/submit-patient"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit Patient</span>
            </Link>
          </div>
        )}
      </div>

      {/* Edit Patient Pop-up Modal */}
      {editModalPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 flex flex-col max-h-[85vh] overflow-hidden">
            {/* Modal Header (Fixed at top) */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100 shrink-0 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Edit Patient Details
                  </h3>
                  <p className="text-xs text-slate-400">
                    Case {editModalPatient.caseId || "CS-" + editModalPatient._id.slice(-4)} &bull; Referral Partner Referral
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditModalPatient(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveEdit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              {/* Scrollable Form Body */}
              <div className="p-6 overflow-y-auto space-y-4 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={editFormData.fullName}
                      onChange={handleEditInputChange}
                      placeholder="Enter patient full name"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 ${
                        editErrors.fullName
                          ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                          : "border-slate-200 focus:ring-teal-500/20 focus:border-teal-500"
                      }`}
                    />
                    {editErrors.fullName && (
                      <p className="text-rose-500 text-[11px]">{editErrors.fullName}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleEditInputChange}
                      placeholder="01700000000"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 ${
                        editErrors.phone
                          ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                          : "border-slate-200 focus:ring-teal-500/20 focus:border-teal-500"
                      }`}
                    />
                    {editErrors.phone && (
                      <p className="text-rose-500 text-[11px]">{editErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Age */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Age <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      min={1}
                      max={120}
                      value={editFormData.age}
                      onChange={handleEditInputChange}
                      placeholder="e.g. 45"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 ${
                        editErrors.age
                          ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                          : "border-slate-200 focus:ring-teal-500/20 focus:border-teal-500"
                      }`}
                    />
                    {editErrors.age && (
                      <p className="text-rose-500 text-[11px]">{editErrors.age}</p>
                    )}
                  </div>

                  {/* Gender */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Gender <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["male", "female", "other"] as const).map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() =>
                            setEditFormData((prev) => ({ ...prev, gender: g }))
                          }
                          className={`py-2 px-3 rounded-xl text-xs font-semibold border capitalize transition-all cursor-pointer text-center ${
                            editFormData.gender === g
                              ? "bg-teal-50 border-teal-600 text-teal-800 font-bold ring-1 ring-teal-600/30"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Treatment Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Treatment Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="treatmentType"
                      value={editFormData.treatmentType}
                      onChange={handleEditInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                    >
                      {TREATMENT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Country */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Preferred Country <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="preferredCountry"
                      value={editFormData.preferredCountry}
                      onChange={handleEditInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                    >
                      {DESTINATION_COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Budget Range */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Budget Range <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="budgetRange"
                    value={editFormData.budgetRange}
                    onChange={handleEditInputChange}
                    placeholder="e.g. 5-10 thousands BDT or $3,000 - $8,000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                {/* Symptoms */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Symptoms & Clinical Notes <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="symptoms"
                    rows={3}
                    value={editFormData.symptoms}
                    onChange={handleEditInputChange}
                    placeholder="Describe patient's symptoms, diagnosis, and doctor notes..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 leading-relaxed ${
                      editErrors.symptoms
                        ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                        : "border-slate-200 focus:ring-teal-500/20 focus:border-teal-500"
                    }`}
                  />
                  {editErrors.symptoms && (
                    <p className="text-rose-500 text-[11px]">{editErrors.symptoms}</p>
                  )}
                </div>

                {/* Drive Link */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5 text-teal-600" />
                    <span>Google Drive Link (Optional)</span>
                  </label>
                  <input
                    type="url"
                    name="driveLink"
                    value={editFormData.driveLink}
                    onChange={handleEditInputChange}
                    placeholder="https://drive.google.com/..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 ${
                      editErrors.driveLink
                        ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                        : "border-slate-200 focus:ring-teal-500/20 focus:border-teal-500"
                    }`}
                  />
                  {editErrors.driveLink && (
                    <p className="text-rose-500 text-[11px]">{editErrors.driveLink}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons (Fixed Footer) */}
              <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-100 bg-slate-50/70 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditModalPatient(null)}
                  disabled={isUpdatingPatient}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingPatient}
                  style={{ background: "linear-gradient(135deg, #0d9488, #059669)" }}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-md hover:opacity-95 flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isUpdatingPatient ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <span>Save Patient Changes</span>
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
