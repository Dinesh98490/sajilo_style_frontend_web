import React, { useState } from "react";
import RevenueChart from "../components/dashboard/revenueChart";
import CustomerMetrics from "../components/dashboard/customerMetrics";
import StatsCards from "../components/dashboard/statsCard";
import TopProducts from "../components/dashboard/topProducts";
import StatsOverview from "../components/dashboard/statsOverview";

function Dashboard() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    

     
        <main className="flex-1 p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            <CustomerMetrics />
          </div>

          <StatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TopProducts />
            </div>
            <StatsOverview />
          </div>
        </main>
   
   
  );
}

export default Dashboard;
