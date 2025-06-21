import React from "react";

export function Alert({ variant = "default", children, className = "" }) {
  // Variants: default, destructive (red)
  const baseClasses = "flex items-center gap-2 rounded-md border p-4 text-sm";
  const variantClasses =
    variant === "destructive"
      ? "bg-red-50 border-red-500 text-red-700"
      : "bg-gray-50 border-gray-300 text-gray-700";

  return <div className={`${baseClasses} ${variantClasses} ${className}`}>{children}</div>;
}

export function AlertDescription({ children }) {
  return <p className="ml-1">{children}</p>;
}
