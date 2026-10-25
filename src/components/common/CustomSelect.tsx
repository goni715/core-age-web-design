/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Controller } from "react-hook-form";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type IconComponent = LucideIcon | React.ComponentType<{ className?: string }>;

export type TSelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type TProps = {
  label?: string;
  name: string;
  control: any;
  options: TSelectOption[];
  placeholder?: string;
  icon?: IconComponent;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  helperText?: string;
  blankOption?: boolean | string;
};

const CustomSelect = ({
  label,
  name,
  control,
  options = [],
  placeholder = "Select an option",
  icon: Icon,
  disabled = false,
  required = false,
  className,
  triggerClassName,
  contentClassName,
  helperText,
  blankOption,
}: TProps) => {
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
          const currentValue =
            field.value !== undefined && field.value !== null && field.value !== ""
              ? String(field.value)
              : null;

          return (
            <div className="relative">
              <Select
                value={currentValue}
                onValueChange={(val) => field.onChange(val ?? "")}
                disabled={disabled}
              >
                <SelectTrigger
                  id={name}
                  aria-invalid={!!error}
                  className={cn(
                    "h-10 data-[size=default]:h-10 min-h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm transition-colors outline-none cursor-pointer",
                    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
                    "dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
                    triggerClassName
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    {Icon && (
                      <Icon className="size-4 text-muted-foreground/80 shrink-0" />
                    )}
                    <SelectValue placeholder={placeholder}>
                      {(val) => {
                        if (val === null || val === undefined || val === "") {
                          return placeholder;
                        }
                        const found = options.find((opt) => String(opt.value) === String(val));
                        return found ? found.label : String(val);
                      }}
                    </SelectValue>
                  </div>
                </SelectTrigger>

                <SelectContent
                  className={cn(
                    "z-50 min-w-(--anchor-width) max-h-60 rounded-lg border border-border bg-popover text-popover-foreground shadow-md",
                    contentClassName
                  )}
                >
                  <SelectGroup>
                    {blankOption && (
                      <SelectItem
                        value=""
                        className="text-xs sm:text-sm cursor-pointer text-muted-foreground"
                      >
                        {typeof blankOption === "string" ? blankOption : "None"}
                      </SelectItem>
                    )}
                    {options?.map(({ value, label: optionLabel, disabled: optionDisabled }) => (
                      <SelectItem
                        key={value}
                        value={value}
                        disabled={optionDisabled}
                        className="text-xs sm:text-sm cursor-pointer"
                      >
                        {optionLabel}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Error Message */}
              {error && (
                <p className="text-destructive text-xs font-medium mt-1.5 animate-in fade-in duration-150">
                  {error.message}
                </p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default CustomSelect;
