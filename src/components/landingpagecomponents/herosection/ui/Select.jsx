import React, { useState, useEffect, useRef } from "react";

export function Select({
  value,
  onValueChange,
  children,
  disabled = false,
  className = "",
}) {
  // This is a wrapper for the Select functionality
  return <div className={`relative inline-block w-full ${className}`}>{children}</div>;
}

export function SelectTrigger({ children, className = "", onClick }) {
  return (
    <button
      type="button"
      className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function SelectValue({ placeholder, children }) {
  return <span className={`block truncate text-gray-900`}>{children || placeholder}</span>;
}

export function SelectContent({ children, className = "" }) {
  return (
    <ul
      className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 text-sm shadow-lg focus:outline-none ${className}`}
      tabIndex={-1}
      role="listbox"
    >
      {children}
    </ul>
  );
}

export function SelectItem({ value, children, onSelect }) {
  return (
    <li
      role="option"
      className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-600 hover:text-white"
      onClick={() => onSelect && onSelect(value)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect && onSelect(value);
        }
      }}
    >
      {children}
    </li>
  );
}
