import { useState } from "react"
import { Card, CardContent } from "../landingpagecomponents/herosection/ui/card"
import { Button } from "../landingpagecomponents/herosection/ui/button"
import { Badge } from "../landingpagecomponents/herosection/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Input } from "../landingpagecomponents/herosection/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../landingpagecomponents/herosection/ui/Table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./Dialog"
import { Edit3, Trash2, Search, User, Mail, Phone, Calendar, Eye } from "lucide-react"

// 1. Accept the 'onView' prop here
export default function CustomerTable({ customers, onEdit, onDelete, onView }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.phone && customer.phone.includes(searchTerm)), // Added a check for customer.phone
  )

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getStatusBadge = (status) => {
    return status === "Active" ? (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 font-medium">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
        Active
      </Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100 font-medium">
        <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
        Inactive
      </Badge>
    )
  }

  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardContent className="p-0">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white"
            />
          </div>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="text-center py-20">
            <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">
              {searchTerm ? "No customers found" : "No customers yet"}
            </h3>
            <p className="text-gray-500 text-lg">
              {searchTerm ? "Try adjusting your search terms" : "Click 'Add New Customer' to get started"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="text-gray-700 font-semibold py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Customer
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold py-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Contact
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold py-4">Status</TableHead>
                  <TableHead className="text-gray-700 font-semibold py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Created
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold text-center py-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer._id} className="hover:bg-orange-50/30 transition-colors">
                    <TableCell className="py-5">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12 border-2 border-orange-100">

                        <AvatarImage
                          src={customer.image ? `${import.meta.env.VITE_API_BASE_IMAGE_URL}/${customer.image}` : "/placeholder.svg"}
                          alt={customer.name}
                        />
                        {!customer.image && (
                          <AvatarFallback className="bg-orange-100 text-orange-600 font-semibold">
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                        )}
                          
                        </Avatar>
                        <div>
                          <div className="font-semibold text-gray-900 text-base">{customer.name}</div>
                          <div className="text-sm text-gray-500">ID: #{customer._id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-900">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600">{customer.phone || 'N/A'}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-5">{getStatusBadge(customer.status)}</TableCell>
                    <TableCell className="py-5">
                      <div className="text-sm text-gray-600">{formatDate(customer.createdAt)}</div>
                    </TableCell>
                    <TableCell className="py-5">
                      <div className="flex items-center justify-center gap-2">
                        {/* 2. Add the onClick handler to call the onView prop with the current customer */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onView(customer)}
                          className="h-9 w-9 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(customer)}
                          className="h-9 w-9 p-0 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg"
                          title="Edit Customer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-9 w-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                              title="Delete Customer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="max-w-md">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center gap-2">
                                <Trash2 className="w-5 h-5 text-red-500" />
                                Delete Customer
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete <strong>{customer.name}</strong>? This action cannot
                                be undone and will permanently remove all customer data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-gray-300">Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onDelete(customer._id)}
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}