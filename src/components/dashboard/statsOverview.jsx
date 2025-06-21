import React from "react";
import { MoreVertical } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../dashboard/card";
import { Button } from "../landingpagecomponents/herosection/ui/button";

function StatsOverview() {
  const demographics = [
    { label: "Women", percentage: 63, color: "bg-orange-400" },
    { label: "Men", percentage: 88, color: "bg-red-400" },
    { label: "Kids", percentage: 38, color: "bg-purple-400" },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Stats Overview</CardTitle>
          <p className="text-sm text-gray-500">Information about store visits</p>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {demographics.map((demo, index) => (
          <div key={index}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{demo.label}</span>
              <span className="text-sm font-bold">{demo.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className={`${demo.color} h-2 rounded-full`}
                style={{ width: `${demo.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default StatsOverview;
