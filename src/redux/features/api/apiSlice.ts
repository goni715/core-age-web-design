/* eslint-disable @next/next/no-location-assign-relative-destination */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BASE_URL } from "@/constants/global.constant";
import TagTypes from "@/constants/tagType.constant";
import {
  getToken,
  getRefreshToken,
  setToken,
  setRefreshToken,
  clearSession,
} from "@/helpers/SessionHelper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: async (headers) => {
    const token = getToken();
    if (token) {
      const authHeader = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;
      headers.set("Authorization", authHeader);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
      // Refresh Token automatically included in cookies or called
      try {
        const refreshToken = getRefreshToken();
        const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(refreshToken
              ? {
                  Authorization: refreshToken.startsWith("Bearer ")
                    ? refreshToken
                    : `Bearer ${refreshToken}`,
                }
              : {}),
          },
          body: JSON.stringify({ refreshToken }),
          credentials: "include",
        });

        const data = await res.json();

        if (data?.data?.accessToken) {
          setToken(data?.data?.accessToken);
          if (data?.data?.refreshToken) {
            setRefreshToken(data?.data?.refreshToken);
          }
          // Retry the original query with the new access token
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Invalid or expired refreshToken
          clearSession();
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
      } catch {
        clearSession();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }
    return result;
  },
  tagTypes: Object.values(TagTypes), //TagS WhiteLists
  endpoints: (_builder) => ({}),
});