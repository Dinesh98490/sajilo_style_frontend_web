import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./Dialog"
import { Input } from "../landingpagecomponents/herosection/ui/input"
import { Label } from "../landingpagecomponents/herosection/ui/Label"
import { Button } from "../landingpagecomponents/herosection/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../landingpagecomponents/herosection/ui/Select"
import { X } from "lucide-react"

export default function EditCustomerDialog({ customer, setCustomer, customers, setCustomers }) {
  const [editingStatus, setEditingStatus] = useState(false)

  const handleSave = () => {
    if (customer) {
      const updated = customers.map((c) => (c.id === customer.id ? customer : c))
      setCustomers(updated)
      setCustomer(null)
      setEditingStatus(false)
    }
  }

  const handleCancel = () => {
    setCustomer(null)
    setEditingStatus(false)
  }

  return (
    <Dialog open={!!customer} onOpenChange={() => setCustomer(null)}>
      <DialogContent className="relative">
        {/* Close (X) icon top-right */}
        <button
          onClick={() => setCustomer(null)}
          aria-label="Close"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <X className="h-5 w-5" />
        </button>

        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogDescription>Make changes to the customer details.</DialogDescription>
        </DialogHeader>
        {customer && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <div className="col-span-3">
                {!editingStatus ? (
                  <p
                    onClick={() => setEditingStatus(true)}
                    className="cursor-pointer select-none px-3 py-2 border border-gray-300 rounded-md hover:border-orange-500"
                    title="Click to edit status"
                  >
                    {customer.status || "No status"}
                  </p>
                ) : (
                  <Select
                    value={customer.status}
                    onValueChange={(value) => setCustomer({ ...customer, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
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
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
