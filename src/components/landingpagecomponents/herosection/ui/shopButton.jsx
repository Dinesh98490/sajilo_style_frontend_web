import React from "react";
import { ShoppingBag } from "lucide-react";

// Custom Shop Button specifically for the hero section
export function ShopButton({ onClick, className = "", children = "Shop Now" }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${className}`}
    >
      <ShoppingBag className="h-5 w-5" />
      {children}
    </button>
  );
}
