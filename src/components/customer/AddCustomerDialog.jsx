import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./Dialog"; 

import { Button } from "../landingpagecomponents/herosection/ui/button";
import { Label } from "../landingpagecomponents/herosection/ui/Label";
import { Input } from "../landingpagecomponents/herosection/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../landingpagecomponents/herosection/ui/Select";
import { Edit2, X } from "lucide-react"; // Added X icon

export default function AddCustomerDialog({
  open,
  setOpen,
  customers,
  setCustomers,
  toast,
}) {
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
    avatar: "/placeholder.svg",
  });

  const [showStatusSelect, setShowStatusSelect] = useState(false);

  const handleSave = () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
      toast({
        title: "Please fill all fields",
        description: "Name, email, and phone are required.",
        className: "border-red-200 bg-red-50 text-red-800",
        duration: 3000,
      });
      return;
    }

    const nextId = (customers.length + 1).toString();
    setCustomers([
      ...customers,
      {
        ...newCustomer,
        id: nextId,
        joinDate: new Date().toISOString().split("T")[0],
        lastActive: new Date().toISOString().split("T")[0],
        totalOrders: 0,
        totalSpent: "$0.00",
      },
    ]);

    toast({
      title: "Customer added!",
      description: `${newCustomer.name} added successfully.`,
      className: "border-green-200 bg-green-50 text-green-800",
      duration: 2000,
    });

    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      status: "Active",
      avatar: "/placeholder.svg",
    });
    setShowStatusSelect(false);
    setOpen(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewCustomer({ ...newCustomer, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] mx-auto relative">
        {/* X Close Button */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition focus:outline-none"
          style={{ zIndex: 10 }}
        >
          <X className="h-6 w-6" />
        </button>

        <DialogHeader>
          <DialogTitle className="text-center">Add New Customer</DialogTitle>
          <DialogDescription className="text-center">
            Fill in the customer information below.
          </DialogDescription>
        </DialogHeader>

        {/* Image Upload */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="relative group">
            <img
              src={newCustomer.avatar}
              alt="Avatar"
              className="h-24 w-24 object-cover rounded-md ring-2 ring-orange-500 cursor-pointer"
              onClick={() => document.getElementById("avatar-upload").click()}
            />
            <div
              className="flex items-center justify-center gap-1 text-sm text-orange-600 font-medium mt-1 cursor-pointer hover:underline"
              onClick={() => document.getElementById("avatar-upload").click()}
            >
              <Edit2 className="w-4 h-4" />
              Click to upload the image
            </div>
            <input
              type="file"
              accept="image/*"
              id="avatar-upload"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid gap-4 mt-6">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter full name"
              value={newCustomer.name}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, name: e.target.value })
              }
              className="border border-gray-300 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              value={newCustomer.email}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, email: e.target.value })
              }
              className="border border-gray-300 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="Enter phone number"
              value={newCustomer.phone}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, phone: e.target.value })
              }
              className="border border-gray-300 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            {!showStatusSelect ? (
              <div
                onClick={() => setShowStatusSelect(true)}
                className="cursor-pointer bg-orange-100 px-4 py-2 text-sm rounded text-orange-700 hover:bg-orange-200 transition w-full"
              >
                {newCustomer.status} (Click to change)
              </div>
            ) : (
              <Select
                value={newCustomer.status}
                onValueChange={(value) =>
                  setNewCustomer({ ...newCustomer, status: value })
                }
              >
                <SelectTrigger className="border border-gray-300 w-full px-4 py-2 focus:ring-2 focus:ring-orange-500">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-orange-600 hover:bg-orange-700"
            disabled={!newCustomer.name || !newCustomer.email || !newCustomer.phone}
          >
            Add Customer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
