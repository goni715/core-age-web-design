import { apiSlice } from "../api/apiSlice";
import TagTypes from "@/constants/tagType.constant";

export interface IGenerateInvitationLinkResponse {
  success: boolean;
  message: string;
  data: {
    invitationLink: string;
  };
}

export interface IRegisterReferralPartnerPayload {
  referralToken: string;
  fullName: string;
  agencyName: string;
  email: string;
  phone: string;
  password: string;
}

export interface IRegisterReferralPartnerResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface IMyNetworksQuery {
  searchTerm?: string;
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: "asc" | "desc" | string;
  status?: string;
}

export interface INetworkPartner {
  _id: string;
  refCode?: string;
  partnerId?: string;
  fullName: string;
  name?: string;
  agencyName?: string;
  email: string;
  phone?: string;
  initials?: string;
  joinedDate?: string;
  cases?: number;
  ongoing?: number;
  done?: number;
  earnings?: string | number;
  status?: string;
  inviteToken?: string;
  inviteLink?: string;
  notes?: string;
  lastActiveAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IMyNetworksResponse {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    totalPages: number;
    total: number;
  };
  data: INetworkPartner[];
}

export interface INetworkOverviewStats {
  referralPartners: number;
  activeThisMonth: number;
  casesInNetwork: number;
  networkEarnings: number;
  formattedEarnings: string;
}

export interface INetworkStatusCounts {
  all: number;
  active: number;
  invited: number;
  paused: number;
}

export interface INetworkStatsData {
  overviewStats: INetworkOverviewStats;
  statusCounts: INetworkStatusCounts;
}

export interface INetworkStatsResponse {
  success: boolean;
  message: string;
  data: INetworkStatsData;
}

export const referralPartnerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generateInvitationLink: builder.mutation<
      IGenerateInvitationLinkResponse,
      void
    >({
      query: () => ({
        url: "/referral-partner/generate-link",
        method: "POST",
      }),
      invalidatesTags: [TagTypes.REFERRAL_PARTNER, TagTypes.MY_NETWORKS],
    }),

    registerReferralPartner: builder.mutation<
      IRegisterReferralPartnerResponse,
      IRegisterReferralPartnerPayload
    >({
      query: (body) => ({
        url: "/referral-partner/register",
        method: "POST",
        body,
      }),
      invalidatesTags: [TagTypes.REFERRAL_PARTNER, TagTypes.MY_NETWORKS],
    }),

    getMyNetworks: builder.query<IMyNetworksResponse, IMyNetworksQuery | void>({
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
          url: "/referral-partner/my-networks",
          method: "GET",
          params,
        };
      },
      providesTags: [TagTypes.MY_NETWORKS],
    }),

    getReferralPartnerStats: builder.query<INetworkStatsResponse, void>({
      query: () => ({
        url: "/referral-partner/stats",
        method: "GET",
      }),
      providesTags: [TagTypes.MY_NETWORKS, TagTypes.REFERRAL_PARTNER],
    }),
  }),
});

export const {
  useGenerateInvitationLinkMutation,
  useRegisterReferralPartnerMutation,
  useGetMyNetworksQuery,
  useGetReferralPartnerStatsQuery,
} = referralPartnerApi;
