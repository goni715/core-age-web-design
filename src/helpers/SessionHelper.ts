class SessionHelper {
  setToken = (token: string) => {
    if (!token || typeof token !== "string" || !token.trim()) {
      return;
    }

    if (typeof window !== "undefined") {
      if (window.localStorage) {
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", "true");
      }
      // Store in cookie for Next.js middleware
      document.cookie = `token=${encodeURIComponent(token)}; path=/; max-age=2592000; SameSite=Lax`;
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

  removeToken = () => {
    if (typeof window !== "undefined") {
      if (window.localStorage) {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
      }
      document.cookie = "token=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    }
  };

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    return Boolean(token && token.trim().length > 0);
  };

  setUserInfo = (userInfo: { fullName: string; email: string; profileImg: string; role: string }) => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("fullName", userInfo?.fullName || "");
      localStorage.setItem("email", userInfo?.email || "");
      localStorage.setItem("profileImg", userInfo?.profileImg || "");
      localStorage.setItem("role", userInfo?.role || "");
    }
  };

  getUserInfo = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      return {
        fullName: localStorage.getItem("fullName") || "",
        email: localStorage.getItem("email") || "",
        profileImg: localStorage.getItem("profileImg") || "",
        role: localStorage.getItem("role") || "",
      };
    }
    return { fullName: "", email: "", profileImg: "", role: "" };
  };

  removeUserInfo = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("fullName");
      localStorage.removeItem("email");
      localStorage.removeItem("profileImg");
      localStorage.removeItem("role");
    }
  };

  clearSession = () => {
    this.removeToken();
    this.removeUserInfo();
  };
}

const sessionHelper = new SessionHelper();

export const {
  setToken,
  getToken,
  removeToken,
  isLoggedIn,
  setUserInfo,
  getUserInfo,
  removeUserInfo,
  clearSession,
} = sessionHelper;

export default sessionHelper;
