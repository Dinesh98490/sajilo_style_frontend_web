import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Badge({ children, className, variant }) {
  const baseStyle = "inline-flex items-center px-3 py-1 text-sm font-medium rounded-full";
  const variantStyle = variant === "secondary" ? "" : "";
  return <span className={cn(baseStyle, variantStyle, className)}>{children}</span>;
}

export function OrderStatus({ status, className }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200";
      case "Processing":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200";
      case "Shipped":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200";
      case "Delivered":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200";
    }
  };

  return (
    <Badge variant="secondary" className={cn(getStatusColor(status), "border", className)}>
      {status}
    </Badge>
  );
}

export default OrderStatus;
