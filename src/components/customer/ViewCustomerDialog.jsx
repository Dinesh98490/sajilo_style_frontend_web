import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./Dialog";
import { Button } from "../landingpagecomponents/herosection/ui/button";
import { Edit, Mail, Phone, X } from "lucide-react"; // Added X icon import
import Separator from "./Seperator";
import { Label } from "../landingpagecomponents/herosection/ui/Label";
import CustomerBadge from "./CustomerBadge";

export default function ViewCustomerDialog({ customer, setCustomer, onEdit }) {
  return (
    <Dialog open={!!customer} onOpenChange={() => setCustomer(null)}>
      <DialogContent className="relative sm:max-w-[600px]">
        {/* Close Button top-right */}
        <button
          onClick={() => setCustomer(null)}
          aria-label="Close"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition focus:outline-none"
          style={{ zIndex: 10 }}
        >
          <X className="h-5 w-5" />
        </button>

        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
          <DialogDescription>View and manage customer information</DialogDescription>
        </DialogHeader>

        {customer && (
          <div className="grid gap-6 py-4">
            <div className="flex items-center gap-4">
              <img
                src={customer.avatar || "/placeholder.svg"}
                width={80}
                height={80}
                className="rounded-full border-2 border-gray-200"
                alt={customer.name}
              />
              <div>
                <h3 className="text-xl font-semibold">{customer.name}</h3>
                <p className="text-sm text-muted-foreground">{customer.email}</p>
              </div>
            </div>

            <Separator />

            <div className="grid gap-6">
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <div className="mt-1">
                  <CustomerBadge status={customer.status} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Phone Number
                  </Label>
                  <p className="text-sm font-medium mt-1">{customer.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Join Date</Label>
                  <p className="text-sm font-medium mt-1">{customer.joinDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Total Orders</Label>
                  <p className="text-lg font-bold text-orange-600 mt-1">{customer.totalOrders}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Total Spent</Label>
                  <p className="text-lg font-bold text-orange-600 mt-1">{customer.totalSpent}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Last Active</Label>
                <p className="text-sm font-medium mt-1">{customer.lastActive}</p>
              </div>
            </div>

            <Separator />

            <div className="flex gap-3">
              <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700">
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-orange-200 text-orange-700 hover:bg-orange-50"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-orange-200 text-orange-700 hover:bg-orange-50"
                onClick={() => {
                  setCustomer(null);
                  onEdit(customer);
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
