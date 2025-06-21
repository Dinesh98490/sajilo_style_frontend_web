// CustomerBadge.jsx
import React from "react";

export function getStatusColor(status) {
  if (!status) return "bg-gray-200 text-gray-700"; // default color for undefined

  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-yellow-100 text-yellow-800";
    case "suspended":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-200 text-gray-700";
  }
}

export default function CustomerBadge({ status }) {
  const safeStatus = status || "Unknown";

  return (
    <span
      className={`inline-block px-2 py-1 rounded text-sm font-semibold ${getStatusColor(
        safeStatus
      )}`}
    >
      {safeStatus}
    </span>
  );
}
