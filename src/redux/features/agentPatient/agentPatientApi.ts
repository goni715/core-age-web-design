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
  documentSource?: "google_drive" | "whatsapp" | string;
  link?: string;
  commissionAmount?: number | string;
  reports?: string[];
  driveLink?: string;
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

export interface IMonthlyEarning {
  month: string;
  earnings: number;
  commission: number;
}

export interface ICommissionStatsData {
  totalCommission: number;
  pendingCommission: number;
  paidCommission: number;
  pending: number;
  paid: number;
  monthlyEarnings: IMonthlyEarning[];
}

export interface ICommissionStatsQueryParams {
  year?: number | string;
}

export interface ICommissionStatsResponse {
  success: boolean;
  message: string;
  data: ICommissionStatsData;
}

export interface IAgentCommissionItem {
  _id: string;
  caseId: string;
  fullName?: string;
  patientName?: string;
  agentCommissionFee?: number;
  commission?: number;
  commissionFee?: number;
  paymentStatus?: "pending" | "paid" | "unpaid" | string;
  status?: string;
  patientStatus?: string;
  hospital?: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAgentCommissionsQueryParams {
  searchTerm?: string;
  paymentStatus?: string;
  status?: string;
  page?: number | string;
  limit?: number | string;
}

export interface IAgentCommissionsResponse {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    totalPages: number;
    total: number;
  };
  statusCounts?: {
    all: number;
    pending: number;
    paid: number;
    unpaid: number;
  };
  data: IAgentCommissionItem[];
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
  documentSource?: "google_drive" | "whatsapp" | string;
  link?: string;
  subAgentId?: string;
  driveLink?: string;
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
      invalidatesTags: [TagTypes.PATIENT_CASES, TagTypes.DASHBOARD],
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

    updatePatientByAgent: builder.mutation<
      { success: boolean; message: string; data?: unknown },
      {
        patientId: string;
        data: Partial<ISubmitPatientPayload>;
      }
    >({
      query: ({ patientId, data }) => ({
        url: `/agent-patient/update-patient/by-agent/${patientId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [TagTypes.PATIENT_CASES, TagTypes.MY_NETWORKS],
    }),

    updatePatientBySubAgent: builder.mutation<
      { success: boolean; message: string; data?: unknown },
      {
        patientId: string;
        data: Partial<ISubmitPatientPayload>;
      }
    >({
      query: ({ patientId, data }) => ({
        url: `/agent-patient/update-patient/by-sub-agent/${patientId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [TagTypes.PATIENT_CASES, TagTypes.DASHBOARD],
    }),

    getCommissionStatsByAgent: builder.query<
      ICommissionStatsResponse,
      ICommissionStatsQueryParams | number | string | void
    >({
      query: (args) => {
        let yearParam: number | string | undefined;
        if (typeof args === "number" || typeof args === "string") {
          yearParam = args;
        } else if (args && typeof args === "object") {
          yearParam = args.year;
        }

        const params = new URLSearchParams();
        if (yearParam !== undefined && yearParam !== null && yearParam !== "") {
          params.append("year", String(yearParam));
        }

        return {
          url: "/agent-patient/commission-stats/by-agent",
          method: "GET",
          params,
        };
      },
      providesTags: [TagTypes.PATIENT_CASES, TagTypes.MY_NETWORKS],
    }),

    getAllCommissionsByAgent: builder.query<
      IAgentCommissionsResponse,
      IAgentCommissionsQueryParams | void
    >({
      query: (args) => {
        const params = new URLSearchParams();
        if (args && typeof args === "object") {
          Object.entries(args).forEach(([key, val]) => {
            if (val !== undefined && val !== null && val !== "" && val !== "all" && val !== "All") {
              params.append(key, String(val));
            }
          });
        }
        return {
          url: "/agent-patient/all-commissions/by-agent",
          method: "GET",
          params,
        };
      },
      providesTags: [TagTypes.PATIENT_CASES, TagTypes.MY_NETWORKS],
    }),

    getCommissionStatsBySubAgent: builder.query<
      ICommissionStatsResponse,
      ICommissionStatsQueryParams | number | string | void
    >({
      query: (args) => {
        let yearParam: number | string | undefined;
        if (typeof args === "number" || typeof args === "string") {
          yearParam = args;
        } else if (args && typeof args === "object") {
          yearParam = args.year;
        }

        const params = new URLSearchParams();
        if (yearParam !== undefined && yearParam !== null && yearParam !== "") {
          params.append("year", String(yearParam));
        }

        return {
          url: "/agent-patient/commission-stats/by-sub-agent",
          method: "GET",
          params,
        };
      },
      providesTags: [TagTypes.PATIENT_CASES],
    }),

    getAllCommissionsBySubAgent: builder.query<
      IAgentCommissionsResponse,
      IAgentCommissionsQueryParams | void
    >({
      query: (args) => {
        const params = new URLSearchParams();
        if (args && typeof args === "object") {
          Object.entries(args).forEach(([key, val]) => {
            if (val !== undefined && val !== null && val !== "" && val !== "all" && val !== "All") {
              params.append(key, String(val));
            }
          });
        }
        return {
          url: "/agent-patient/all-commissions/by-sub-agent",
          method: "GET",
          params,
        };
      },
      providesTags: [TagTypes.PATIENT_CASES],
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
  useUpdatePatientByAgentMutation,
  useUpdatePatientBySubAgentMutation,
  useGetCommissionStatsByAgentQuery,
  useGetAllCommissionsByAgentQuery,
  useGetCommissionStatsBySubAgentQuery,
  useGetAllCommissionsBySubAgentQuery,
} = agentPatientApi;
