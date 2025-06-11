import React from "react";

function Card({ className = "", ...props }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}
      {...props}
    />
  );
}

function CardContent({ className = "", ...props }) {
  return <div className={`p-6 ${className}`} {...props} />;
}

export { Card, CardContent };
