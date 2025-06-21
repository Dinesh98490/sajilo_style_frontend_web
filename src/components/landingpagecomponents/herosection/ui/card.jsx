// src/components/landingpagecomponents/herosection/ui/card.jsx
import React from "react";

function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function CardContent({ className = "", children, ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

function CardHeader({ className = "", children, ...props }) {
  return (
    <div className={`px-6 pt-6 pb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ className = "", children, ...props }) {
  return (
    <h2
      className={`text-lg font-semibold text-gray-900 ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

export { Card, CardContent, CardHeader, CardTitle };
