import React from "react";
import { Package, DollarSign, Clock, CheckCircle } from "lucide-react";

export function OrderStats({ orders }) {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.price * order.quantity, 0);
  const pendingOrders = orders.filter((order) => order.status === "Pending").length;
  const deliveredOrders = orders.filter((order) => order.status === "Delivered").length;

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <Package className="h-4 w-4 text-orange-600" />,
      bgColor: "bg-orange-100",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: <DollarSign className="h-4 w-4 text-emerald-600" />,
      bgColor: "bg-emerald-100",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: <Clock className="h-4 w-4 text-amber-600" />,
      bgColor: "bg-amber-100",
    },
    {
      title: "Delivered Orders",
      value: deliveredOrders,
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
      bgColor: "bg-green-100",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
        >
          <div className="flex flex-row items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">{stat.title}</h4>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>{stat.icon}</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}

export default OrderStats;
