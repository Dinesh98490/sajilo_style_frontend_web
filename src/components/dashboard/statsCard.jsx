import React from "react";
import { Eye, ShoppingBag, DollarSign, CheckCircle } from "lucide-react";
import { Card, CardContent } from "../landingpagecomponents/herosection/ui/card";


// statscards
function StatsCards() {
  const statsData = [
    {
      icon: Eye,
      label: "Total Visits",
      value: "10.8m",
      bgColor: "bg-orange-50",
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: ShoppingBag,
      label: "Total Sales",
      value: "100,345",
      bgColor: "bg-purple-50",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: DollarSign,
      label: "Total Made",
      value: "$200k",
      bgColor: "bg-orange-50",
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: CheckCircle,
      label: "Orders Completed",
      value: "98,771",
      bgColor: "bg-red-50",
      iconBgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className={stat.bgColor}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${stat.iconBgColor} rounded-full flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-lg font-semibold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default StatsCards;
