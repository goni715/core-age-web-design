"use client";

import React, { useState } from "react";
import {
  Lock,
  ShieldCheck,
  Laptop,
  Smartphone,
  Check,
  AlertCircle,
  KeyRound,
  LogOut,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ProfileSecurityPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    setPasswordUpdated(true);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setPasswordUpdated(false), 3000);
  };

  return (
    <div className="space-y-6">
      {passwordUpdated && (
        <div className="bg-[#dcfce7] border border-[#86efac] text-[#15803d] rounded-2xl p-4 flex items-center justify-between shadow-2xs animate-in fade-in">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-semibold">
              Password updated successfully! Your account credentials have been changed.
            </span>
          </div>
          <button
            onClick={() => setPasswordUpdated(false)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Two Factor Authentication & Password Form (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Two Factor Authentication Card */}
          <Card className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">Two-Factor Authentication (2FA)</h3>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        twoFactorEnabled
                          ? "bg-[#dcfce7] text-[#15803d]"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {twoFactorEnabled ? "Active & Protected" : "Disabled"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-md leading-relaxed">
                    Require a single-use OTP verification code sent to your registered WhatsApp/SMS whenever signing into your agent dashboard.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  twoFactorEnabled
                    ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    : "bg-[#005ca9] text-white hover:bg-[#004e90]"
                }`}
              >
                {twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
              </button>
            </div>
          </Card>

          {/* Change Password Card */}
          <Card className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-2xs">
            <div className="pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#0062c4]" />
                <h3 className="text-sm font-bold text-slate-900">Change Password</h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Ensure your password is at least 8 characters long with a combination of uppercase, lowercase and numbers
              </p>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#005ca9] hover:bg-[#004e90] text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </form>
          </Card>
        </div>

        {/* Right Column: Active Sessions & Audit */}
        <div className="space-y-6">
          <Card className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Active Login Sessions</h3>
              <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                2 devices
              </span>
            </div>

            {/* Session 1 */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0062c4] flex items-center justify-center">
                  <Laptop className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Chrome on Windows 11</span>
                  <span className="text-slate-400 text-[11px]">Dhaka, BD · Current session</span>
                </div>
              </div>
              <span className="bg-[#dcfce7] text-[#15803d] font-semibold text-[10px] px-2 py-0.5 rounded-full">
                Active Now
              </span>
            </div>

            {/* Session 2 */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Safari on iPhone 15</span>
                  <span className="text-slate-400 text-[11px]">Dhaka, BD · Active 2h ago</span>
                </div>
              </div>
              <span className="text-slate-400 text-[10px]">Logged in</span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => alert("Successfully logged out from other devices.")}
                className="w-full flex items-center justify-center gap-2 border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-600 font-semibold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log out from all other devices</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
