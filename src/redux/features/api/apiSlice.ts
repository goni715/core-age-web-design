/* eslint-disable @next/next/no-location-assign-relative-destination */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BASE_URL } from "@/constants/global.constant";
import TagTypes from "@/constants/tagType.constant";
import { getToken, removeToken, setToken } from "@/helpers/SessionHelper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: async (headers) => {
        const token = getToken();
        if (token) {
            headers.set("Authorization", `${token}`);
        }
        return headers;
    },
});

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);
        if (result?.error?.status === 401) {
            //console.log(`Sending Refresh Token`);
            const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
                method: 'POST',
                credentials: 'include'
            });

            const data = await res.json();

            if (data?.data?.accessToken) {
                setToken(data?.data?.accessToken);
                // Retry the original query with the new access token
                result = await baseQuery(args, api, extraOptions);
            }
            else {
                //invalid or expired refreshToken
                removeToken()
                window.location.href = "/login";
            }
        }
        return result;
    },
    tagTypes: Object.values(TagTypes), //TagS WhiteLists
    endpoints: (_builder) => ({}),
});