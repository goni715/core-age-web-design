/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Controller } from "react-hook-form";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type IconComponent = LucideIcon | React.ComponentType<{ className?: string }>;

type TProps = {
  label?: string;
  name: string;
  control: any;
  placeholder?: string;
  rows?: number;
  icon?: IconComponent;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  textareaClassName?: string;
  helperText?: string;
  maxLength?: number;
  showCount?: boolean;
  resize?: "none" | "y" | "both" | "x";
  onInput?: React.FormEventHandler<HTMLTextAreaElement>;
};

const CustomTextArea = ({
  label,
  name,
  control,
  placeholder = "",
  rows = 3,
  icon: Icon,
  disabled = false,
  required = false,
  className,
  textareaClassName,
  helperText,
  maxLength,
  showCount = false,
  resize = "y",
  onInput,
}: TProps) => {
  const resizeClass = {
    none: "resize-none",
    y: "resize-y",
    both: "resize",
    x: "resize-x",
  }[resize];

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
        render={({ field, fieldState: { error } }) => {
          const currentLength = (field.value ?? "").toString().length;

          return (
            <div>
              <div className="relative">
                {/* Optional Top-Left Icon */}
                {Icon && (
                  <span className="absolute left-3.5 top-3 text-muted-foreground pointer-events-none z-10 flex items-center">
                    <Icon className="size-4 shrink-0" />
                  </span>
                )}

                {/* shadcn Textarea Component */}
                <Textarea
                  id={name}
                  {...field}
                  rows={rows}
                  maxLength={maxLength}
                  disabled={disabled}
                  onInput={onInput}
                  value={field.value ?? ""}
                  placeholder={placeholder}
                  aria-invalid={!!error}
                  className={cn(
                    "min-h-20 w-full rounded-lg border border-input bg-transparent py-2 text-sm transition-colors outline-none",
                    "placeholder:text-muted-foreground",
                    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                    "disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",
                    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
                    "dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
                    resizeClass,
                    Icon ? "pl-10 pr-3.5" : "px-3.5",
                    textareaClassName
                  )}
                />
              </div>

              {/* Bottom Row: Error Message & Character Counter */}
              <div className="flex items-center justify-between gap-2 mt-1.5">
                {error ? (
                  <p className="text-destructive text-xs font-medium animate-in fade-in duration-150">
                    {error.message}
                  </p>
                ) : (
                  <div />
                )}

                {(showCount || maxLength) && (
                  <span
                    className={cn(
                      "text-[11px] text-muted-foreground ml-auto select-none transition-colors",
                      maxLength && currentLength >= maxLength && "text-destructive font-medium"
                    )}
                  >
                    {currentLength}
                    {maxLength ? `/${maxLength}` : ""}
                  </span>
                )}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default CustomTextArea;