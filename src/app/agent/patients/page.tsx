"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  Check,
  UserPlus,
  Plus,
  Loader2,
  FileText,
  Lock,
  AlertTriangle,
  AlertCircle,
  Edit3,
  X,
  Link as LinkIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  useGetPatientsByAgentQuery,
  useUpdatePatientStatusMutation,
  useUpdatePatientByAgentMutation,
  IAgentPatientItem,
} from "@/redux/features/agentPatient/agentPatientApi";
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
  "India",
  "Thailand",
  "Singapore",
  "Malaysia",
  "Turkey",
  "United Arab Emirates",
  "China",
];

export default function AgentPatientsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPartnerId, setSelectedPartnerId] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    targetStatus: string;
    patientId: string;
    patientName: string;
    caseId: string;
  } | null>(null);

  const { data: networkData } = useGetMyNetworksQuery();
  const { data: patientsResponse, isLoading } = useGetPatientsByAgentQuery({
    searchTerm: searchQuery,
    status: activeTab === "all" ? undefined : activeTab,
    subAgentId: selectedPartnerId === "all" ? undefined : selectedPartnerId,
    preferredCountry: selectedCountry === "all" ? undefined : selectedCountry,
  });

  const [updatePatientStatus, { isLoading: isUpdatingStatus }] =
    useUpdatePatientStatusMutation();
  const [updatePatient, { isLoading: isUpdatingPatient }] =
    useUpdatePatientByAgentMutation();

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
      budgetRange: patient.budgetRange || "$5,000 - $10,000",
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
    { label: `Cancelled (${counts.cancelled || 0})`, key: "cancelled" },
  ];

  const selectedPatient =
    patientsList.find((p) => (p.caseId || p._id) === selectedCaseId) ||
    patientsList[0] ||
    null;

  const handleStatusSelectChange = (newStatus: string) => {
    if (!selectedPatient || newStatus === selectedPatient.status) return;

    if (
      selectedPatient.status === "completed" ||
      selectedPatient.status === "cancelled"
    ) {
      ErrorToast(`This case is already ${selectedPatient.status} and cannot be modified.`);
      return;
    }

    if (newStatus === "completed" || newStatus === "cancelled") {
      setConfirmModal({
        isOpen: true,
        targetStatus: newStatus,
        patientId: selectedPatient._id,
        patientName: selectedPatient.fullName,
        caseId: selectedPatient.caseId || "Case",
      });
      return;
    }

    executeStatusUpdate(selectedPatient._id, newStatus);
  };

  const executeStatusUpdate = async (patientId: string, status: string) => {
    try {
      await updatePatientStatus({ patientId, status }).unwrap();
      SuccessToast(`Patient case status updated to "${status.replace("_", " ")}"!`);
      setConfirmModal(null);
    } catch (err: any) {
      ErrorToast(err?.data?.message || "Failed to update status");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "ongoing":
        return "bg-blue-50 text-blue-700 border-blue-200/80";
      case "under_review":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      case "completed":
        return "bg-slate-100 text-slate-700 border-slate-300";
      case "submitted":
        return "bg-purple-50 text-purple-700 border-purple-200/80";
      case "cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200/80";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const formatStepDate = (dateVal?: string | Date | null) => {
    if (!dateVal) return null;
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return null;
      return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return null;
    }
  };

  const getProgressSteps = (patient: IAgentPatientItem) => {
    const rawStatus = (patient.status || "submitted").toLowerCase();
    const isCancelled = rawStatus === "cancelled";

    const statusWeights: Record<string, number> = {
      submitted: 0,
      under_review: 1,
      confirmed: 2,
      ongoing: 3,
      completed: 4,
    };

    const currentWeight = statusWeights[rawStatus] ?? 0;

    let submittedDate: string | null = null;
    let underReviewDate: string | null = null;
    let confirmedDate: string | null = null;
    let ongoingDate: string | null = null;
    let completedDate: string | null = null;
    let cancelledDate: string | null = null;

    if (patient.timeline && typeof patient.timeline === "object" && !Array.isArray(patient.timeline)) {
      submittedDate = formatStepDate(patient.timeline.submittedAt || patient.createdAt);
      underReviewDate = formatStepDate(patient.timeline.underReviewAt);
      confirmedDate = formatStepDate(patient.timeline.confirmedAt);
      ongoingDate = formatStepDate(patient.timeline.ongoingAt);
      completedDate = formatStepDate(patient.timeline.completedAt);
      cancelledDate = formatStepDate(patient.timeline.cancelledAt);
    } else if (Array.isArray(patient.timeline)) {
      for (const item of patient.timeline) {
        const title = (item.title || "").toLowerCase();
        if (title.includes("submit")) submittedDate = item.date;
        else if (title.includes("review")) underReviewDate = item.date;
        else if (title.includes("confirm")) confirmedDate = item.date;
        else if (title.includes("ongoing")) ongoingDate = item.date;
        else if (title.includes("complete")) completedDate = item.date;
        else if (title.includes("cancel")) cancelledDate = item.date;
      }
    }

    if (!submittedDate) {
      submittedDate = formatStepDate(patient.createdAt) || "02 Sep 2026";
    }

    const standardSteps = [
      {
        key: "submitted",
        label: "Submitted",
        date: submittedDate,
        status:
          currentWeight > 0 || rawStatus === "completed"
            ? "completed"
            : currentWeight === 0 && !isCancelled
            ? "current"
            : isCancelled
            ? "completed"
            : "pending",
      },
      {
        key: "under_review",
        label: "Under review",
        date: underReviewDate || (currentWeight >= 1 ? submittedDate : "Not yet"),
        status:
          currentWeight > 1 || rawStatus === "completed"
            ? "completed"
            : currentWeight === 1 && !isCancelled
            ? "current"
            : "pending",
      },
      {
        key: "confirmed",
        label: "Confirmed",
        date: confirmedDate || (currentWeight >= 2 ? underReviewDate || submittedDate : "Not yet"),
        status:
          currentWeight > 2 || rawStatus === "completed"
            ? "completed"
            : currentWeight === 2 && !isCancelled
            ? "current"
            : "pending",
      },
      {
        key: "ongoing",
        label: "Ongoing",
        date: ongoingDate || (currentWeight >= 3 ? confirmedDate || submittedDate : "Not yet"),
        status:
          currentWeight > 3 || rawStatus === "completed"
            ? "completed"
            : currentWeight === 3 && !isCancelled
            ? "current"
            : "pending",
      },
      {
        key: "completed",
        label: "Completed",
        date: completedDate || (rawStatus === "completed" ? ongoingDate || "Completed" : "Not yet"),
        status: rawStatus === "completed" ? "completed" : "pending",
      },
    ];

    if (isCancelled) {
      standardSteps.push({
        key: "cancelled",
        label: "Cancelled",
        date: cancelledDate || "Cancelled",
        status: "cancelled",
      });
    }

    return standardSteps;
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
                  ? "bg-[#0062c4] text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Link
          href="/agent/submit-patient"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Submit Patient</span>
        </Link>
      </div>

      {/* Filter Row: Search + Referral Partner Select + Country Select */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patient by name, case ID, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Filter by Partner */}
        <select
          value={selectedPartnerId}
          onChange={(e) => setSelectedPartnerId(e.target.value)}
          className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 font-medium focus:outline-hidden"
        >
          <option value="all">All Referral Partners (Network)</option>
          {networkData?.data?.map((partner) => (
            <option key={partner._id} value={partner._id}>
              {partner.fullName} ({partner.refCode || "Partner"})
            </option>
          ))}
        </select>

        {/* Filter by Destination Country */}
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 font-medium focus:outline-hidden"
        >
          <option value="all">All Countries</option>
          <option value="India">India</option>
          <option value="Thailand">Thailand</option>
          <option value="Singapore">Singapore</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Turkey">Turkey</option>
        </select>
      </div>

      {/* Master Detail View: Table on Left + Case Timeline on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Patients Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-6">Patient Name</th>
                  <th className="py-3 px-4">Treatment / Country</th>
                  <th className="py-3 px-4">Submitted By</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
                      Loading patients...
                    </td>
                  </tr>
                ) : patientsList.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400">
                      No patients found matching your search.
                    </td>
                  </tr>
                ) : (
                  patientsList.map((p) => {
                    const id = p.caseId || p._id;
                    const isSelected = selectedCaseId === id;
                    const isDirect = !p.subAgentId && !p.subAgent;
                    const submitter = p.subAgent?.fullName
                      ? `${p.subAgent.fullName} (${p.subAgent.refCode || "Partner"})`
                      : "You";

                    return (
                      <tr
                        key={p._id}
                        onClick={() => setSelectedCaseId(id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-blue-50/80 hover:bg-blue-50"
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

                        <td className="py-4 px-4 text-xs">
                          <div className="font-semibold text-slate-800">
                            {submitter}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {p.subAgent?.agencyName}
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
          const isFinalized =
            selectedPatient.status === "completed" ||
            selectedPatient.status === "cancelled";

          const progressSteps = getProgressSteps(selectedPatient);

          return (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 space-y-5">
              {/* Case Header */}
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-slate-500">
                    Case {selectedPatient.caseId || "CS-" + selectedPatient._id.slice(-4)}
                  </span>
                  <div className="flex items-center gap-2">
                    {/* Allow Edit button only for direct cases (no subAgent) and not finalized */}
                    {!selectedPatient.subAgentId && !selectedPatient.subAgent && !isFinalized && (
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(selectedPatient)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer shadow-2xs"
                        title="Edit patient details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                    )}
                    <span
                      className={`text-xs font-semibold px-3 py-0.5 rounded-full capitalize ${
                        selectedPatient.status === "ongoing"
                          ? "bg-[#e0f2fe] text-[#0284c7]"
                          : selectedPatient.status === "completed"
                          ? "bg-slate-100 text-slate-700"
                          : selectedPatient.status === "under_review"
                          ? "bg-[#ffedd5] text-[#d97706]"
                          : selectedPatient.status === "confirmed"
                          ? "bg-[#d1fae5] text-[#059669]"
                          : selectedPatient.status === "cancelled"
                          ? "bg-rose-50 text-rose-700"
                          : "bg-purple-50 text-purple-700"
                      }`}
                    >
                      {selectedPatient.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {selectedPatient.fullName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedPatient.treatmentType}, {selectedPatient.preferredCountry || "India"}
                </p>
              </div>

              {/* Case Origin Box */}
              <div className="bg-[#f8fafc] rounded-2xl p-4 border border-slate-100/90 text-xs space-y-2.5">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-1">
                  CASE ORIGIN
                </span>
                <div className="flex justify-between">
                  <span className="text-slate-500">Submitted by</span>
                  <span className="font-bold text-slate-900">
                    {selectedPatient.subAgent?.fullName
                      ? `${selectedPatient.subAgent.fullName} (${selectedPatient.subAgent.refCode || "RP-0112"})`
                      : "You"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Referral Partner</span>
                  <span className="font-bold text-slate-900">
                    {selectedPatient.subAgent?.agencyName || "Direct"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Onboarding path</span>
                  <span className="font-bold text-slate-900">
                    {selectedPatient.subAgentId ? "Via Referral Partner" : "Direct Onboarding"}
                  </span>
                </div>
              </div>

              {/* Status Action Selector */}
              <div className="bg-slate-50/90 rounded-2xl p-3 border border-slate-200/80 flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  {isFinalized ? (
                    <>
                      <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="text-slate-600 text-xs">
                        Status Locked ({selectedPatient.status})
                      </span>
                    </>
                  ) : (
                    <>
                      <span>Update Status:</span>
                      {isUpdatingStatus && (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                      )}
                    </>
                  )}
                </div>

                <div className="relative">
                  <select
                    value={selectedPatient.status}
                    disabled={isFinalized || isUpdatingStatus}
                    onChange={(e) => handleStatusSelectChange(e.target.value)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all appearance-none pr-8 cursor-pointer ${
                      isFinalized
                        ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-80"
                        : "bg-white text-slate-800 border-slate-300 hover:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                    }`}
                    title={
                      isFinalized
                        ? "This case is finalized and locked"
                        : "Update case status"
                    }
                  >
                    <option value="submitted">Submitted</option>
                    <option value="under_review">Under Review</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed (Finalized)</option>
                    <option value="cancelled">Cancelled (Finalized)</option>
                  </select>
                  {!isFinalized && (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  )}
                </div>
              </div>

              {isFinalized && (
                <p className="text-[11px] text-slate-400 flex items-center gap-1 -mt-2">
                  <AlertCircle className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>This case is finalized and cannot be modified or reopened.</span>
                </p>
              )}

              {/* Progress Stepper (Matching Screenshot) */}
              <div className="pt-1">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-3.5">
                  PROGRESS
                </span>

                <div className="relative pl-6 space-y-4">
                  {progressSteps.map((step, idx) => {
                    const isCompleted = step.status === "completed";
                    const isCurrent = step.status === "current";
                    const isCancelledStep = step.status === "cancelled";
                    const isLast = idx === progressSteps.length - 1;

                    return (
                      <div key={idx} className="relative flex items-start justify-between">
                        {/* Connecting Line */}
                        {!isLast && (
                          <div
                            className={`absolute left-[-15px] top-[14px] w-[2px] h-[calc(100%+8px)] ${
                              isCompleted ? "bg-[#059669]" : "bg-slate-200"
                            }`}
                          />
                        )}

                        {/* Icon / Circle Indicator */}
                        <div className="absolute left-[-22px] top-[1px] flex items-center justify-center">
                          {isCompleted ? (
                            <div className="w-4 h-4 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-2xs">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          ) : isCurrent ? (
                            <div className="w-4 h-4 rounded-full border-2 border-[#0062c4] bg-white flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#0062c4]" />
                            </div>
                          ) : isCancelledStep ? (
                            <div className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold">
                              ✕
                            </div>
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-slate-300 bg-white" />
                          )}
                        </div>

                        {/* Step Labels */}
                        <div>
                          <div
                            className={`text-xs font-bold leading-tight ${
                              isCompleted || isCurrent
                                ? "text-slate-900"
                                : isCancelledStep
                                ? "text-rose-600"
                                : "text-slate-400"
                            }`}
                          >
                            {step.label}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {step.date}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Commission Box & Details Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-slate-400 font-normal block leading-tight">
                    Commission on this case
                  </span>
                  <span className="text-sm font-bold text-slate-900 block mt-0.5">
                    {selectedPatient.status === "completed"
                      ? selectedPatient.commissionAmount
                        ? `Approved (TK ${Number(selectedPatient.commissionAmount).toLocaleString()})`
                        : "Approved"
                      : selectedPatient.status === "cancelled"
                      ? "Cancelled (TK 0)"
                      : "Pending approval"}
                  </span>
                </div>

                <Link
                  href={`/agent/submit-patient`}
                  className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs py-2 px-3.5 rounded-xl transition-colors shrink-0 shadow-2xs"
                >
                  Submit New Case
                </Link>
              </div>
            </div>
          );
        })()
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-8 text-center flex flex-col items-center justify-center min-h-[320px]">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0062c4] flex items-center justify-center mx-auto mb-3">
            <FileText className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Patient Selected</h3>
          <p className="text-xs text-slate-500 max-w-[220px] mt-1 mb-4">
            Patient cases submitted directly or via your Referral Partner network will appear here.
          </p>
          <Link
            href="/agent/submit-patient"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0062c4] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Submit Patient</span>
          </Link>
        </div>
      )}
      </div>

      {/* Confirmation Modal for Finalizing Case (Completed / Cancelled) */}
      {confirmModal && confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                  confirmModal.targetStatus === "cancelled"
                    ? "bg-rose-100 text-rose-600"
                    : "bg-emerald-100 text-emerald-600"
                }`}
              >
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Confirm {confirmModal.targetStatus === "completed" ? "Case Completion" : "Case Cancellation"}
                </h4>
                <p className="text-xs text-slate-500">
                  {confirmModal.patientName} &bull; {confirmModal.caseId}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3.5 text-xs text-slate-600 border border-slate-200/60 leading-relaxed">
              Are you sure you want to change the status of this patient to{" "}
              <strong className="text-slate-900 uppercase">
                {confirmModal.targetStatus}
              </strong>
              ?
              <p className="mt-2 text-amber-700 font-semibold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                Once finalized, this case is locked and its status cannot be changed again.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setConfirmModal(null)}
                disabled={isUpdatingStatus}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() =>
                  executeStatusUpdate(confirmModal.patientId, confirmModal.targetStatus)
                }
                disabled={isUpdatingStatus}
                className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
                  confirmModal.targetStatus === "cancelled"
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {isUpdatingStatus ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <span>
                    Yes, mark as {confirmModal.targetStatus === "completed" ? "Completed" : "Cancelled"}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Patient Pop-up Modal (Only for direct patients without referral partner) */}
      {editModalPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 flex flex-col max-h-[85vh] overflow-hidden">
            {/* Modal Header (Fixed at top) */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100 shrink-0 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Edit Patient Details
                  </h3>
                  <p className="text-xs text-slate-400">
                    Case {editModalPatient.caseId || "CS-" + editModalPatient._id.slice(-4)} &bull; Direct Agency Patient
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
                          : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
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
                          : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
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
                          : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
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
                              ? "bg-blue-50 border-blue-600 text-blue-700 font-bold ring-1 ring-blue-600/30"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
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
                    placeholder="e.g. 5-10 thousands BDT or $5,000 - $10,000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
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
                        : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
                    }`}
                  />
                  {editErrors.symptoms && (
                    <p className="text-rose-500 text-[11px]">{editErrors.symptoms}</p>
                  )}
                </div>

                {/* Drive Link */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
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
                        : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
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
                  style={{ background: "linear-gradient(135deg, #0062c4, #1d4ed8)" }}
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
