import React, { useState } from "react"
import { OrderList } from "./OrderList" 
import { OrderForm } from "./OrderForm"
import { OrderStats } from "./OrderStats"
import { Button } from "../landingpagecomponents/herosection/ui/button"
import { Plus, Sparkles } from "lucide-react"
import {
  Dialog,
  DialogContent,
} from "../landingpagecomponents/herosection/ui/Dialog"

export function OrderDashboard({ initialOrders = [] }) {
  const [orders, setOrders] = useState(initialOrders)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleCreateOrder = (newOrder) => {
    const now = Date.now()
    const order = {
      ...newOrder,
      _id: now.toString(),
      payment_id: {
        ...newOrder.payment_id,
        _id: `pay_${now}`,
      },
      product_id: {
        ...newOrder.product_id,
        _id: newOrder.product_id._id || `prod_${now}`,
      },
      user_id: {
        ...newOrder.user_id,
        _id: newOrder.user_id._id || `user_${now}`,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setOrders([order, ...orders])
    setIsFormOpen(false)
  }

  const handleUpdateOrder = (orderId, updates) => {
    setOrders(
      orders.map((order) =>
        order._id === orderId
          ? { ...order, ...updates, updatedAt: new Date().toISOString() }
          : order,
      ),
    )
  }

  const handleDeleteOrder = (orderId) => {
    setOrders(orders.filter((order) => order._id !== orderId))
  }

  return (
    <div className="container mx-auto p-6 space-y-8 bg-gradient-to-br from-orange-50 to-orange-100/50 backdrop-blur-sm rounded-xl">
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-6 rounded-lg mb-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
              <p className="text-orange-100">
                Manage and track all your orders in one place
              </p>
            </div>
          </div>

          
          <div>
            
            <Button
              onClick={() => setIsFormOpen(true)}
              className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Order
            </Button>

            {/* THE DIALOG ONLY WRAPS THE CONTENT THAT NEEDS TO POP UP */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogContent className="max-w-5xl max-h-[95vh] p-0 bg-gradient-to-br from-white to-orange-50 border-2 border-orange-200 shadow-2xl">
                <OrderForm
                  onSubmit={handleCreateOrder}
                  onCancel={() => setIsFormOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <OrderStats orders={orders} />

      <OrderList
        orders={orders}
        onUpdateOrder={handleUpdateOrder}
        onDeleteOrder={handleDeleteOrder}
      />
    </div>
  )
}