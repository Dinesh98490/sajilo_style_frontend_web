import React from 'react';
import { MoreVertical } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '../dashboard/card';
import { Button } from '../landingpagecomponents/herosection/ui/button';
import CircularProgress from './circularProgress';

function CustomerMetrics() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Customers</CardTitle>
          <p className="text-sm text-gray-500">
            Information About your Customers
          </p>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <CircularProgress
            percentage={85}
            color="#8b5cf6"
            label="Current Customers"
            sublabel=""
          />
          <CircularProgress
            percentage={66}
            color="#f59e0b"
            label="New Customers"
            sublabel=""
          />
          <CircularProgress
            percentage={90}
            color="#f97316"
            label="Target Customers"
            sublabel=""
          />
          <CircularProgress
            percentage={30}
            color="#ef4444"
            label="Retarget Customers"
            sublabel=""
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default CustomerMetrics;
