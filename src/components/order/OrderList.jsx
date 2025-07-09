import React, { useState } from "react";
import { OrderCard } from "./OrderCard";
import OrderDetails from "./OrderDetails";
import { OrderForm } from "./OrderForm";

import { Input } from "../landingpagecomponents/herosection/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../landingpagecomponents/herosection/ui/Select"; // Now uses the full component

import {
  Dialog,
  DialogContent,
} from "../landingpagecomponents/herosection/ui/Dialog";

import { Search } from "lucide-react";

export function OrderList({ orders, onUpdateOrder, onDeleteOrder, onCreateOrder }) {
  const [searchTerm, setSearchTerm] = useState("");
  // This is the ONLY state needed for the filter. It works instantly.
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.user_id.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product_id.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  
  // --- All your handler functions below are correct and need no changes ---

  const handleSubmitForm = (formData) => {
    if (editingOrder?._id) {
      onUpdateOrder(editingOrder._id, formData);
    } else {
      onCreateOrder(formData);
    }
    setEditingOrder(null);
  };
  
  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setSelectedOrder(null);
  };

  const handleDuplicateOrder = (order) => {
    const { _id, createdAt, updatedAt, ...orderData } = order;
    const duplicatedOrder = {
      ...orderData,
      status: "Pending",
    };
    setEditingOrder(duplicatedOrder);
    setSelectedOrder(null);
  };
  
  const handleInlineUpdate = (orderId, updates) => {
    onUpdateOrder(orderId, updates);
    if (selectedOrder && selectedOrder._id === orderId) {
      setSelectedOrder({ ...selectedOrder, ...updates });
    }
  };


  return (
    <div className="space-y-6">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search orders by customer, product, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-gray-900 border-orange-200 focus:border-orange-300"
          />
        </div>

        {/* This Select will now work perfectly */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px] border-orange-200 focus:border-orange-300">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          
          {/* THE SCROLLABLE FIX: By default, the new component has overflow handling,
              but we can explicitly set a max-height just in case. */}
          <SelectContent className="max-h-80">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Processing">Processing</SelectItem>
            <SelectItem value="Shipped">Shipped</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      <div className="grid gap-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No orders found matching your criteria.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onView={() => setSelectedOrder(order)}
              onUpdateStatus={(status) => onUpdateOrder(order._id, { status })}
              onDelete={() => onDeleteOrder(order._id)}
            />
          ))
        )}
      </div>

      {/* Dialogs (No changes needed) */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-6xl max-h-[95vh] p-0">
          {selectedOrder && (
            <OrderDetails
              order={selectedOrder}
              onUpdateStatus={(status) => handleInlineUpdate(selectedOrder._id, { status })}
              onEdit={() => handleEditOrder(selectedOrder)}
              onDelete={() => {
                onDeleteOrder(selectedOrder._id);
                setSelectedOrder(null);
              }}
              onDuplicate={() => handleDuplicateOrder(selectedOrder)}
            />
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={!!editingOrder} onOpenChange={() => setEditingOrder(null)}>
        <DialogContent className="max-w-5xl max-h-[95vh] p-0">
          {editingOrder && (
            <OrderForm
              onSubmit={handleSubmitForm}
              initialData={editingOrder}
              onCancel={() => setEditingOrder(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OrderList;