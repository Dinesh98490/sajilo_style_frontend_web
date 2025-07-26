import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '../dashboard/card';
import { Badge } from '../landingpagecomponents/herosection/ui/badge';

function RevenueChart() {

  // review the code of the revenue chart
  const revenueData = [
    { month: "Jan", value: 65 },
    { month: "Feb", value: 85 },
    { month: "Mar", value: 95 },
    { month: "Apr", value: 75 },
    { month: "May", value: 100 },
    { month: "Jun", value: 90 },
    { month: "Jul", value: 80 },
    { month: "Aug", value: 70 },
    { month: "Sep", value: 85 },
    { month: "Oct", value: 75 },
    { month: "Nov", value: 60 },
    { month: "Dec", value: 50 },
  ];

  return (
    <Card className="border-2 border-blue-200 p-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-gray-500 font-normal">Total Revenue</CardTitle>
          <div className="text-3xl font-bold text-gray-900 mt-1">$980,273.00</div>
        </div>
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
          THIS YEAR
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="flex items-end justify-between h-64 space-x-2">
          {revenueData.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-full bg-orange-400 rounded-t-sm"
                style={{ height: `${item.value * 2}px` }}
              ></div>
              <span className="text-xs text-gray-500 mt-2">{item.month}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default RevenueChart;
