"use client";

import React from "react";
import { AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ErrorAlertProps = {
  message?: string | null;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
};

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  onClose,
  className,
  children,
}) => {
  const content = message || children;
  if (!content) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "flex items-start gap-3 p-3.5 rounded-xl border",
        "bg-red-50/90 border-red-200 text-red-700",
        "dark:bg-red-950/40 dark:border-red-900/60 dark:text-red-300",
        "shadow-xs transition-all animate-in fade-in slide-in-from-top-1 duration-200",
        className
      )}
    >
      <AlertCircle className="w-5 h-5 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />

      <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
        {content}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 p-1 -mr-1 -mt-1 rounded-md text-red-500/80 hover:text-red-700 hover:bg-red-100/70 dark:text-red-400/80 dark:hover:text-red-200 dark:hover:bg-red-900/40 transition-colors cursor-pointer"
          aria-label="Dismiss error"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;
