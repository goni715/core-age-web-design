/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type TProps = {
  name: string;
  label?: React.ReactNode;
  control: any;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  description?: React.ReactNode;
  className?: string;
  labelClassName?: string;
};

const CustomCheckbox = ({
  name,
  label,
  control,
  id,
  disabled = false,
  required = false,
  description,
  className,
  labelClassName,
}: TProps) => {
  const inputId = id || name;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref, ...rest }, fieldState: { error } }) => (
        <div className={cn("space-y-1.5", className)}>
          <div className="flex items-start gap-2 select-none group">
            <Checkbox
              id={inputId}
              checked={Boolean(value)}
              onCheckedChange={(checked) => onChange(Boolean(checked))}
              disabled={disabled}
              ref={ref}
              aria-invalid={!!error}
              className={cn(
                "cursor-pointer mt-0.5",
                error && "border-destructive focus-visible:ring-destructive/20"
              )}
              {...rest}
            />
            {label && (
              <div className="grid gap-1 leading-none">
                <Label
                  htmlFor={inputId}
                  className={cn(
                    "text-xs sm:text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors cursor-pointer select-none leading-tight",
                    disabled && "cursor-not-allowed opacity-70",
                    labelClassName
                  )}
                >
                  {label}
                  {required && <span className="text-destructive ml-0.5">*</span>}
                </Label>
                {description && (
                  <p className="text-xs text-muted-foreground">{description}</p>
                )}
              </div>
            )}
          </div>

          {error && (
            <p className="text-destructive text-xs font-medium animate-in fade-in duration-150">
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default CustomCheckbox;
