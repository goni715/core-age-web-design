import { apiSlice } from "../api/apiSlice";
import TagTypes from "@/constants/tagType.constant";

export interface IAgentPatientQueryParams {
  searchTerm?: string;
  status?: string;
  preferredCountry?: string;
  country?: string;
  treatmentType?: string;
  gender?: string;
  partnerId?: string;
  partner?: string;
  subAgentId?: string;
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: "asc" | "desc" | string;
}

export interface IAgentPatientItem {
  _id: string;
  caseId: string;
  agentUserId: string;
  subAgentId?: string;
  subAgent?: {
    _id: string;
    refCode?: string;
    fullName: string;
    email: string;
    phone?: string;
    agencyName?: string;
  } | null;
  agent?: {
    _id: string;
    fullName: string;
    email: string;
    phone?: string;
  } | null;
  fullName: string;
  phone?: string;
  age?: number | string;
  gender?: string;
  treatmentType?: string;
  symptoms?: string;
  preferredCountry?: string;
  budgetRange?: string;
  reports?: string[];
  status: "submitted" | "under_review" | "confirmed" | "ongoing" | "completed" | "cancelled" | string;
  timeline?: {
    submittedAt?: string | null;
    underReviewAt?: string | null;
    confirmedAt?: string | null;
    ongoingAt?: string | null;
    completedAt?: string | null;
    cancelledAt?: string | null;
  } | Array<{
    title: string;
    date: string;
    note?: string;
  }> | any;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPatientStatusCounts {
  all: number;
  submitted: number;
  under_review: number;
  confirmed: number;
  ongoing: number;
  completed: number;
  cancelled: number;
}

export interface IAgentPatientsResponse {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    totalPages: number;
    total: number;
  };
  statusCounts?: IPatientStatusCounts;
  data: IAgentPatientItem[];
}

export interface ISubmitPatientPayload {
  fullName: string;
  phone: string;
  age?: number | string;
  gender?: string;
  treatmentType: string;
  symptoms?: string;
  preferredCountry?: string;
  budgetRange?: string;
  subAgentId?: string;
  reports?: File[] | string[];
}

export const agentPatientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatientsByAgent: builder.query<IAgentPatientsResponse, IAgentPatientQueryParams | void>({
      query: (args) => {
        const params = new URLSearchParams();
        if (args && typeof args === "object") {
          Object.entries(args).forEach(([key, val]) => {
            if (val !== undefined && val !== null && val !== "" && val !== "all") {
              params.append(key, String(val));
            }
          });
        }
        return {
          url: "/agent-patient/all-patients/by-agent",
          method: "GET",
          params,
        };
      },
      providesTags: [TagTypes.PATIENT_CASES],
    }),

    getPatientsBySubAgent: builder.query<IAgentPatientsResponse, IAgentPatientQueryParams | void>({
      query: (args) => {
        const params = new URLSearchParams();
        if (args && typeof args === "object") {
          Object.entries(args).forEach(([key, val]) => {
            if (val !== undefined && val !== null && val !== "" && val !== "all") {
              params.append(key, String(val));
            }
          });
        }
        return {
          url: "/agent-patient/all-patients/by-sub-agent",
          method: "GET",
          params,
        };
      },
      providesTags: [TagTypes.PATIENT_CASES],
    }),

    getStatusStatsByAgent: builder.query<{ success: boolean; data: IPatientStatusCounts }, void>({
      query: () => ({
        url: "/agent-patient/status-stats/by-agent",
        method: "GET",
      }),
      providesTags: [TagTypes.PATIENT_CASES],
    }),

    submitPatientByAgent: builder.mutation<{ success: boolean; message: string; data?: unknown }, FormData | ISubmitPatientPayload>({
      query: (body) => ({
        url: "/agent-patient/submit-patient/by-agent",
        method: "POST",
        body,
      }),
      invalidatesTags: [TagTypes.PATIENT_CASES, TagTypes.MY_NETWORKS],
    }),

    submitPatientBySubAgent: builder.mutation<{ success: boolean; message: string; data?: unknown }, FormData | ISubmitPatientPayload>({
      query: (body) => ({
        url: "/agent-patient/submit-patient/by-sub-agent",
        method: "POST",
        body,
      }),
      invalidatesTags: [TagTypes.PATIENT_CASES],
    }),

    getPatientById: builder.query<{ success: boolean; data: IAgentPatientItem }, string>({
      query: (id) => ({
        url: `/agent-patient/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.PATIENT_CASES],
    }),

    updatePatientStatus: builder.mutation<
      { success: boolean; message: string; data?: unknown },
      { patientId: string; status: string }
    >({
      query: ({ patientId, status }) => ({
        url: `/agent-patient/update-status/${patientId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: [TagTypes.PATIENT_CASES, TagTypes.MY_NETWORKS],
    }),
  }),
});

export const {
  useGetPatientsByAgentQuery,
  useGetPatientsBySubAgentQuery,
  useGetStatusStatsByAgentQuery,
  useSubmitPatientByAgentMutation,
  useSubmitPatientBySubAgentMutation,
  useGetPatientByIdQuery,
  useUpdatePatientStatusMutation,
} = agentPatientApi;
