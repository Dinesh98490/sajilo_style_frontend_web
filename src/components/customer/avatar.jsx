import React from "react";

export function Avatar({ className = "", children }) {
  return (
    <div className={`relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full ${className}`}>
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt = "avatar", className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover w-full h-full ${className}`}
      onError={(e) => (e.target.style.display = "none")}
    />
  );
}

export function AvatarFallback({ children, className = "" }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gray-200 text-gray-600 text-sm font-medium ${className}`}
    >
      {children}
    </div>
  );
}
