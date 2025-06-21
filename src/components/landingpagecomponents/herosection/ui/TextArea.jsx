import React from "react";

export function Textarea({ id, placeholder, rows = 4, value, onChange, className = "" }) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      rows={rows}
      value={value}
      onChange={onChange}
      className={`w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none ${className}`}
    />
  );
}
