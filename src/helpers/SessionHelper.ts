class SessionHelper {
  setToken = (token: string, refreshToken?: string) => {
    if (!token || typeof token !== "string" || !token.trim()) {
      return;
    }

    if (typeof window !== "undefined") {
      if (window.localStorage) {
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", "true");
      }
      // Store accessToken in cookie for middleware & SSR
      document.cookie = `token=${encodeURIComponent(token)}; path=/; max-age=2592000; SameSite=Lax`;
    }

    if (refreshToken) {
      this.setRefreshToken(refreshToken);
    }
  };

  getToken = (): string => {
    if (typeof window !== "undefined") {
      if (window.localStorage) {
        const token = localStorage.getItem("token");
        if (token && token !== "undefined" && token !== "null" && token.trim().length > 0) {
          return token;
        }
      }
      const match = document.cookie.match(/(^|;\s*)token=([^;]*)/);
      if (match && match[2]) {
        return decodeURIComponent(match[2]);
      }
    }
    return "";
  };

  setRefreshToken = (refreshToken: string) => {
    if (!refreshToken || typeof refreshToken !== "string" || !refreshToken.trim()) {
      return;
    }

    if (typeof window !== "undefined") {
      if (window.localStorage) {
        localStorage.setItem("refreshToken", refreshToken);
      }
      // Automatically store in cookie for automatic server authentication & refresh
      document.cookie = `refreshToken=${encodeURIComponent(refreshToken)}; path=/; max-age=2592000; SameSite=Lax`;
    }
  };

  getRefreshToken = (): string => {
    if (typeof window !== "undefined") {
      if (window.localStorage) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken && refreshToken !== "undefined" && refreshToken !== "null" && refreshToken.trim().length > 0) {
          return refreshToken;
        }
      }
      const match = document.cookie.match(/(^|;\s*)refreshToken=([^;]*)/);
      if (match && match[2]) {
        return decodeURIComponent(match[2]);
      }
    }
    return "";
  };

  removeRefreshToken = () => {
    if (typeof window !== "undefined") {
      if (window.localStorage) {
        localStorage.removeItem("refreshToken");
      }
      document.cookie = "refreshToken=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    }
  };

  removeToken = () => {
    if (typeof window !== "undefined") {
      if (window.localStorage) {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
      }
      document.cookie = "token=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
      this.removeRefreshToken();
    }
  };

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    return Boolean(token && token.trim().length > 0);
  };

  setUserInfo = (userInfo: {
    fullName?: string;
    email?: string;
    profileImg?: string;
    role?: string;
    phone?: string;
    _id?: string;
    userId?: string;
  }) => {
    if (typeof window !== "undefined" && window.localStorage) {
      if (userInfo?.fullName !== undefined) localStorage.setItem("fullName", userInfo.fullName || "");
      if (userInfo?.email !== undefined) localStorage.setItem("email", userInfo.email || "");
      if (userInfo?.profileImg !== undefined) localStorage.setItem("profileImg", userInfo.profileImg || "");
      if (userInfo?.role !== undefined) localStorage.setItem("role", userInfo.role || "");
      if (userInfo?.phone !== undefined) localStorage.setItem("phone", userInfo.phone || "");
      const id = userInfo?._id || userInfo?.userId;
      if (id !== undefined) localStorage.setItem("userId", id || "");
    }
  };

  getUserInfo = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      return {
        fullName: localStorage.getItem("fullName") || "",
        email: localStorage.getItem("email") || "",
        profileImg: localStorage.getItem("profileImg") || "",
        role: localStorage.getItem("role") || "",
        phone: localStorage.getItem("phone") || "",
        userId: localStorage.getItem("userId") || "",
      };
    }
    return { fullName: "", email: "", profileImg: "", role: "", phone: "", userId: "" };
  };

  removeUserInfo = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("fullName");
      localStorage.removeItem("email");
      localStorage.removeItem("profileImg");
      localStorage.removeItem("role");
      localStorage.removeItem("phone");
      localStorage.removeItem("userId");
    }
  };

  getUserRole = (): string => {
    const info = this.getUserInfo();
    return (info?.role || "").toLowerCase();
  };

  isSubAgent = (): boolean => {
    const role = this.getUserRole();
    return role === "sub_agent" || role === "sub-agent";
  };

  isAgent = (): boolean => {
    const role = this.getUserRole();
    if (this.isSubAgent()) return false;
    return role === "agent" || role === "admin" || this.isLoggedIn();
  };

  clearSession = () => {
    this.removeToken();
    this.removeRefreshToken();
    this.removeUserInfo();
  };
}

const sessionHelper = new SessionHelper();

export const {
  setToken,
  getToken,
  removeToken,
  setRefreshToken,
  getRefreshToken,
  removeRefreshToken,
  isLoggedIn,
  setUserInfo,
  getUserInfo,
  removeUserInfo,
  getUserRole,
  isSubAgent,
  isAgent,
  clearSession,
} = sessionHelper;

export default sessionHelper;
