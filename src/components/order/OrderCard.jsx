import React from "react"
import { Card, CardContent, CardHeader } from "../landingpagecomponents/herosection/ui/card"
import { Button } from "../landingpagecomponents/herosection/ui/button"
import {OrderStatus} from "./OrderStatus"
import { Avatar, AvatarFallback, AvatarImage } from "../customer/avatar"
import * as Lucide from "lucide-react" 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropDownMenu"

export function OrderCard({ order, onView, onUpdateStatus, onDelete }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const totalAmount = order.price * order.quantity

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-orange-200 hover:border-orange-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={order.product_id.image || "/placeholder.svg"} alt={order.product_id.name} />
              <AvatarFallback>{order.product_id.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{order.product_id.name}</h3>
              <p className="text-sm text-muted-foreground">Order #{order._id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <OrderStatus status={order.status} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50" aria-label="Order options">
                  <Lucide.Eye className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onView}>View Details</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdateStatus("Processing")}>Mark as Processing</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdateStatus("Shipped")}>Mark as Shipped</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdateStatus("Delivered")}>Mark as Delivered</DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="text-destructive">
                  <Lucide.Trash2 className="h-4 w-4 mr-2" />
                  Delete Order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium">Customer</p>
            <p className="text-sm text-muted-foreground">{order.user_id.name}</p>
            <p className="text-xs text-muted-foreground">{order.user_id.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Quantity & Price</p>
            <p className="text-sm text-muted-foreground">
              {order.quantity} × ${order.price.toFixed(2)}
            </p>
            <p className="text-sm font-semibold text-orange-600">${totalAmount.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Payment</p>
            <p className="text-sm text-muted-foreground">{order.payment_id.method}</p>
            <p className="text-xs text-muted-foreground">{order.payment_id.transaction_id}</p>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Lucide.MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
          <p className="text-sm text-muted-foreground">{order.address}</p>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Lucide.Calendar className="h-3 w-3" />
            <span>Created: {formatDate(order.createdAt)}</span>
          </div>
          <span>Updated: {formatDate(order.updatedAt)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
