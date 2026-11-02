import React from "react";

export function TkIcon({
  className = "w-4 h-4",
  size,
  strokeWidth = 2,
}: {
  className?: string;
  size?: number | string;
  strokeWidth?: number;
}) {
  return (
    <span
      style={size ? { fontSize: typeof size === "number" ? `${size}px` : size } : undefined}
      className={`inline-flex items-center justify-center font-bold tracking-tight select-none font-sans ${className}`}
      aria-label="TK"
    >
      ৳
    </span>
  );
}

export default TkIcon;

