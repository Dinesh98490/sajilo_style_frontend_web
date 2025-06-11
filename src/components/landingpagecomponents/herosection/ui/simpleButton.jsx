import React from "react";

export function SimpleButton({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  disabled = false,
  ...props
}) {
  const getVariantClasses = (variant) => {
    switch (variant) {
      case "outline":
        return "border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50";
      case "secondary":
        return "bg-gray-200 text-gray-900 hover:bg-gray-300";
      case "destructive":
        return "bg-red-600 text-white hover:bg-red-700";
      case "ghost":
        return "bg-transparent text-gray-700 hover:bg-gray-100";
      case "link":
        return "bg-transparent text-blue-600 underline hover:text-blue-800";
      default:
        return "bg-blue-600 text-white hover:bg-blue-700";
    }
  };

  const getSizeClasses = (size) => {
    switch (size) {
      case "sm":
        return "px-3 py-1.5 text-sm";
      case "lg":
        return "px-8 py-3 text-lg";
      case "icon":
        return "p-2 w-10 h-10";
      default:
        return "px-4 py-2 text-base";
    }
  };

  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
