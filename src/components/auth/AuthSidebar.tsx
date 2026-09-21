import { Users, Building2, Globe2, CheckCircle2 } from "lucide-react";
import { ReactNode } from "react";

interface AuthSidebarProps {
  title: ReactNode;
  subtitle: ReactNode;
  securityBanner: ReactNode;
}

export default function AuthSidebar({ title, subtitle, securityBanner }: AuthSidebarProps) {
  return (
    <div className="flex flex-col gap-8 w-full max-w-lg">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
          {title}
        </h1>
        <p className="text-slate-500 text-base md:text-lg">
          {subtitle}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">500+</h3>
            <p className="text-xs text-slate-500">Expert Doctors</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">150+</h3>
            <p className="text-xs text-slate-500">Partner Hospitals</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            <Globe2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">6</h3>
            <p className="text-xs text-slate-500">Countries</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-500 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">24/7</h3>
            <p className="text-xs text-slate-500">Bengali Support</p>
          </div>
        </div>
      </div>

      {securityBanner}
    </div>
  );
}
