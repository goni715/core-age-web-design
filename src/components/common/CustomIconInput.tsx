/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

type IconComponent = LucideIcon | React.ComponentType<{ className?: string }>;

type TProps = {
  label?: string;
  name: string;
  control: any;
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
  placeholder?: string;
  icon?: IconComponent;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  helperText?: string;
  autoComplete?: string;
  onInput?: React.FormEventHandler<HTMLInputElement>;
};

const CustomIconInput = ({
  label,
  name,
  type = "text",
  control,
  placeholder = "",
  icon: Icon,
  disabled = false,
  required = false,
  className,
  inputClassName,
  helperText,
  autoComplete,
  onInput,
}: TProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={cn("space-y-1.5 text-left", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <Label
            htmlFor={name}
            className="text-xs sm:text-sm font-medium text-foreground/90 cursor-pointer select-none"
          >
            {label}
            {required && <span className="text-destructive ml-0.5">*</span>}
          </Label>
          {helperText && (
            <span className="text-[11px] text-muted-foreground">{helperText}</span>
          )}
        </div>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <div className="relative w-full">
            <div className="relative w-full flex items-center">
              {/* Optional Leading Icon (Left) */}
              {Icon && (
                <div
                  style={{ position: "absolute", left: 0, top: 0, bottom: 0, paddingLeft: "0.875rem" }}
                  className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground z-10"
                >
                  <Icon className="size-4 shrink-0" />
                </div>
              )}

              {/* shadcn Aligned Input */}
              <input
                id={name}
                type={inputType}
                data-slot="input"
                aria-invalid={!!error}
                disabled={disabled}
                placeholder={placeholder}
                autoComplete={autoComplete}
                onInput={onInput}
                {...field}
                value={field.value ?? ""}
                className={cn(
                  "h-11 w-full min-w-0 rounded-xl border border-input bg-transparent py-2 text-sm transition-colors outline-none",
                  "placeholder:text-muted-foreground",
                  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",
                  "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
                  "dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
                  Icon ? "pl-10" : "pl-3.5",
                  isPassword ? "pr-10" : "pr-3.5",
                  inputClassName
                )}
              />

              {/* Password Visibility Toggle (Right) */}
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 0, top: 0, bottom: 0, paddingRight: "0.875rem" }}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center justify-center z-10 text-muted-foreground/80 hover:text-foreground transition-colors outline-none cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="size-4 shrink-0" />
                  ) : (
                    <Eye className="size-4 shrink-0" />
                  )}
                </button>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-destructive text-xs font-medium mt-1.5 animate-in fade-in duration-150">
                {error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default CustomIconInput;