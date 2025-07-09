"use client"
import React, { useState } from "react"
import {
  Package,
  CreditCard,
  MapPin,
  DollarSign,
  Hash,
  Edit,
  Trash2,
  Copy,
  Download,
  X,
  Check,
} from "lucide-react"

const Card = ({ children, className }) => (
  <div className={`rounded-lg border border-orange-200 shadow-sm bg-white/80 ${className}`}>{children}</div>
)

const CardHeader = ({ children, className }) => (
  <div className={`p-4 border-b border-orange-200 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className }) => (
  <h3 className={`font-semibold text-gray-700 text-base ${className}`}>{children}</h3>
)

const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>{children}</div>
)

const Avatar = ({ src, alt, fallback }) => (
  <div className="inline-flex items-center justify-center h-14 w-14 rounded-full border border-orange-200 bg-orange-50 text-orange-600 font-semibold text-lg select-none overflow-hidden">
    {src ? <img src={src} alt={alt} className="h-full w-full object-cover" /> : fallback}
  </div>
)

const Button = ({ children, onClick, variant = "default", size = "md", className = "", ...props }) => {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
  const variants = {
    default: "bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500",
    ghost: "bg-transparent hover:bg-orange-100 text-orange-700 hover:text-orange-900 focus:ring-orange-300",
    outline: "border border-orange-600 text-orange-600 hover:bg-orange-50 focus:ring-orange-500",
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
  }
  return (
    <button
      onClick={onClick}
      className={`${base} ${
        variant === "ghost" || variant === "outline" ? variants[variant] : variants["default"]
      } ${size === "sm" ? variants.sm : variants.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

const Input = ({ value, onChange, placeholder, type = "text", className }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`border border-orange-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm ${className}`}
  />
)

const Textarea = ({ value, onChange, placeholder, rows = 2, className }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className={`border border-orange-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm ${className}`}
  />
)

const Select = ({ value, onChange, children, className }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`border border-orange-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm ${className}`}
  >
    {children}
  </select>
)

const SelectItem = ({ value, children }) => <option value={value}>{children}</option>

const ScrollArea = ({ children, className }) => (
  <div className={`overflow-auto flex-1 p-6 ${className}`} style={{ maxHeight: "70vh" }}>
    {children}
  </div>
)

const OrderStatus = ({ status }) => {
  const colors = {
    Pending: "bg-yellow-200 text-yellow-800",
    Processing: "bg-blue-200 text-blue-800",
    Shipped: "bg-purple-200 text-purple-800",
    Delivered: "bg-green-200 text-green-800",
    Cancelled: "bg-red-200 text-red-800",
  }
  return (
    <span
      className={`px-3 py-1 rounded-full font-semibold text-xs select-none ${colors[status] || "bg-gray-200 text-gray-800"}`}
    >
      {status}
    </span>
  )
}

export default function OrderDetails({ order, onUpdateStatus, onUpdateOrder, onEdit, onDelete, onDuplicate }) {
  const [editingField, setEditingField] = useState(null)
  const [editValues, setEditValues] = useState({})

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const totalAmount = order.price * order.quantity

  const handleCopyOrderId = () => navigator.clipboard.writeText(order._id)
  const handlePrintOrder = () => window.print()

  const startEditing = (field, currentValue) => {
    setEditingField(field)
    setEditValues({ [field]: currentValue })
  }

  const cancelEditing = () => {
    setEditingField(null)
    setEditValues({})
  }

  const saveField = (field) => {
    if (onUpdateOrder) {
      const updates = {}
      if (field.includes(".")) {
        const [parent, child] = field.split(".")
        updates[parent] = { ...order[parent], [child]: editValues[field] }
      } else {
        updates[field] = editValues[field]
      }
      onUpdateOrder(updates)
    }
    setEditingField(null)
    setEditValues({})
  }

  const EditableField = ({ field, value, type = "text", placeholder = "" }) => {
    const isEditing = editingField === field
    return isEditing ? (
      <div className="flex items-center space-x-2">
        {type === "textarea" ? (
          <Textarea
            value={editValues[field] || value}
            onChange={(e) => setEditValues({ ...editValues, [field]: e.target.value })}
            placeholder={placeholder}
            rows={2}
            className="flex-1"
          />
        ) : (
          <Input
            type={type}
            value={editValues[field] || value}
            onChange={(e) => setEditValues({ ...editValues, [field]: e.target.value })}
            placeholder={placeholder}
            className="flex-1"
          />
        )}
        <Button size="sm" onClick={() => saveField(field)} className="bg-green-500 hover:bg-green-600 text-white">
          <Check className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={cancelEditing}>
          <X className="w-4 h-4" />
        </Button>
      </div>
    ) : (
      <div className="flex items-center justify-between group">
        <span className="text-gray-800">{value}</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => startEditing(field, value)}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Edit className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full max-h-[90vh] bg-gradient-to-br from-orange-25 to-orange-50 rounded-lg shadow-md">
      <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white p-6 rounded-t-lg shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-orange-100 rounded-full">
            <Package className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold">Order #{order._id}</h2>
              <Button variant="ghost" size="sm" onClick={handleCopyOrderId} className="text-white hover:bg-white/20">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-slate-200 text-sm">Created on {formatDate(order.createdAt)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <OrderStatus status={order.status} />
          <Select
            value={order.status}
            onChange={onUpdateStatus}
            className="bg-white/10 border-white/20 text-white rounded"
          >
            <SelectItem value="Pending">⏳ Pending</SelectItem>
            <SelectItem value="Processing">⚙️ Processing</SelectItem>
            <SelectItem value="Shipped">🚚 Shipped</SelectItem>
            <SelectItem value="Delivered">✅ Delivered</SelectItem>
            <SelectItem value="Cancelled">❌ Cancelled</SelectItem>
          </Select>
          <Button variant="ghost" className="text-white hover:bg-white/20" onClick={onEdit}>
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/20" onClick={onDuplicate}>
            <Copy className="w-4 h-4 mr-1" />
            Duplicate
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/20" onClick={handlePrintOrder}>
            <Download className="w-4 h-4 mr-1" />
            Print
          </Button>
          <Button variant="ghost" className="text-red-400 hover:bg-red-600" onClick={onDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <ScrollArea>
        <div className="space-y-6">
          <Card>
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-25">
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-orange-500" />
                <span>Order Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-orange-25 rounded-lg border border-orange-200">
                  <p className="text-sm font-medium text-gray-600">Quantity</p>
                  <div className="text-2xl font-semibold text-orange-600">
                    <EditableField field="quantity" value={order.quantity} type="number" />
                  </div>
                </div>
                <div className="text-center p-4 bg-orange-25 rounded-lg border border-orange-200">
                  <p className="text-sm font-medium text-gray-600">Unit Price</p>
                  <div className="text-2xl font-semibold text-green-600">
                    <EditableField field="price" value={order.price} type="number" />
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg border border-orange-300">
                  <p className="text-sm font-medium text-gray-600">Total Amount</p>
                  <p className="text-2xl font-semibold text-orange-600">${totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-25">
              <CardTitle className="flex items-center space-x-3 text-base">
                <div className="p-2 bg-blue-200 rounded-lg">
                  <Package className="h-4 w-4 text-blue-700" />
                </div>
                <span className="text-gray-700">Product Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar
                  src={order.product_id.image}
                  alt={order.product_id.name}
                  fallback={order.product_id.name.charAt(0)}
                />
                <div className="flex-1">
                  <div className="font-semibold text-lg text-gray-800 mb-2">
                    <EditableField field="product_id.name" value={order.product_id.name} placeholder="Product name" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Hash className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600">Product ID: {order.product_id._id}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}
