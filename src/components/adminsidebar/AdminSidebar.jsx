import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGE_PATHS } from '../../common/imageConstant';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Truck,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

function AdminSidebar({ activeItem, setActiveItem }) {
  const navigationItems = [
    { icon: Package, label: "Products", route: "/admin/product" },
    { icon: Users, label: "Customers" , route: "/admin/customer"},
    { icon: ShoppingCart, label: "Orders", route: "/admin/order" },
    // { icon: Truck, label: "Shipments" },
    { icon: CreditCard, label: "Transactions" },
    { icon: Settings, label: "Settings" },
  ];

  const navigate = useNavigate();

  return (
    // admin sidebar
    <div className="w-64 bg-white shadow-xl border-r border-gray-100 h-screen flex flex-col">
      {/* Logo */}
      <div className="flex items-center p-4 h-20">
      <img
            src={IMAGE_PATHS.logo}
            alt="SajiloStyle"
            className="h-10 object-contain"
          />
      </div>

      {/* Navigation */}
      <nav className="px-4 space-y-2 mt-4 flex-1 overflow-auto">
        {/* Dashboard */}
        <div
          className={`flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
            activeItem === "Dashboard"
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
              : "text-gray-600 hover:bg-gradient-to-r hover:from-orange-100 hover:to-orange-200 hover:text-orange-700"
          }`}
          onClick={() => {
            setActiveItem("Dashboard");
            navigate("/admin/dashboard");
            navigate("/admin/product");
            navigate("/admin/customer");
            navigate("/admin/order");
          }}
        >
          <LayoutDashboard
            className={`w-5 h-5 ${
              activeItem === "Dashboard"
                ? ""
                : "group-hover:text-orange-500 transition-colors duration-200"
            }`}
          />
          <span className="font-semibold">Dashboard</span>
        </div>

        {/* Other items */}
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group ${
                activeItem === item.label
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gradient-to-r hover:from-orange-100 hover:to-orange-200 hover:text-orange-700"
              }`}
              onClick={() => {
                setActiveItem(item.label);
                if (item.route) {
                  navigate(item.route);
                }
              }}
            >
              <Icon
                className={`w-5 h-5 ${
                  activeItem === item.label
                    ? ""
                    : "group-hover:text-orange-500 transition-colors duration-200"
                }`}
              />
              <span className="font-medium">{item.label}</span>
            </div>
          );
        })}

        {/* Logout */}
        <div className="pt-4 mt-6 border-t border-gray-100">
          <div
            className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl cursor-pointer transition-all duration-200 group"
            onClick={() => navigate('/')}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AdminSidebar;
