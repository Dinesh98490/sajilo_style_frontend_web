// components/customer/CustomerTable.jsx
import React from "react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../landingpagecomponents/herosection/ui/Table"
import { Button } from "../landingpagecomponents/herosection/ui/button"
import { Eye, Edit, Trash2 } from "lucide-react"
import CustomerBadge from "./CustomerBadge"

export default function CustomerTable({ customers, onView, onEdit, onDelete }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-orange-600 font-semibold">Customer</TableHead>
          <TableHead className="text-orange-600 font-semibold">Status</TableHead>
          <TableHead className="text-orange-600 font-semibold">Orders</TableHead>
          <TableHead className="text-orange-600 font-semibold">Total Spent</TableHead>
          <TableHead className="text-orange-600 font-semibold">Last Active</TableHead>
          <TableHead className="text-right text-orange-600 font-semibold">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map(c => (
          <TableRow key={c.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <img src={c.avatar} width={32} height={32} className="rounded-full" alt={c.name} />
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-sm text-muted-foreground">{c.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell><CustomerBadge status={c.status} /></TableCell>
            <TableCell>{c.totalOrders}</TableCell>
            <TableCell>{c.totalSpent}</TableCell>
            <TableCell>{c.lastActive}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={() => onView(c)} className="h-8 w-8 text-gray-600 hover:text-orange-600 hover:bg-orange-50">
                  <Eye className="h-4 w-4" /><span className="sr-only">View</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onEdit(c)} className="h-8 w-8 text-gray-600 hover:text-orange-600 hover:bg-orange-50">
                  <Edit className="h-4 w-4" /><span className="sr-only">Edit</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(c)} className="h-8 w-8 text-gray-600 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" /><span className="sr-only">Delete</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
