// components/customer/CustomerStats.jsx
import React from "react"
import { Card, CardHeader, CardContent, CardTitle } from "../landingpagecomponents/herosection/ui/card"
import { Users, CreditCard, Package } from "lucide-react"

export default function CustomerStats({ customers }) {
  const total = customers.length
  const active = customers.filter(c => c.status === "Active").length
  const revenue = "$10,690"
  const avgOrder = "$190"

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm">Total Customers</CardTitle>
          <Users className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
          <p className="text-xs text-muted-foreground">+2 from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm">Active Customers</CardTitle>
          <Users className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{active}</div>
          <p className="text-xs text-muted-foreground">+1 from last week</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm">Total Revenue</CardTitle>
          <CreditCard className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{revenue}</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm">Avg. Order Value</CardTitle>
          <Package className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgOrder}</div>
          <p className="text-xs text-muted-foreground">+5% from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}
