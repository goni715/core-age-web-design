import type React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

type TProps = {
  isLoading: boolean;
  loadingTitle?: string;
  type?: "submit" | "button";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "default" | "xs" | "sm" | "lg" | "icon";
};

const SubmitButton = ({
  isLoading,
  loadingTitle = "Processing...",
  type = "submit",
  children,
  className,
  style,
  disabled = false,
  variant = "default",
  size = "lg",
}: TProps) => {
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      style={style}
      disabled={isLoading || disabled}
      className={cn(
        "w-full font-medium text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2",
        className
      )}
    >
      {isLoading ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          <span>{loadingTitle}</span>
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
};

export default SubmitButton;