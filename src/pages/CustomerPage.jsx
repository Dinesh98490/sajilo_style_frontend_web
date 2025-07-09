import { useState } from "react";
import CustomerForm from "../components/customer/CustomerForm";
import CustomerTable from "../components/customer/CustomerTable";
import { Users, UserPlus, X, AlertCircle, Mail, Phone, Calendar, MapPin, ZoomIn } from "lucide-react";
import { Button } from "../components/landingpagecomponents/herosection/ui/button";
import {
  useGetCustomers,
  useCreateCustomer,
  useUpdateCustomer,
  useDeleteCustomer,
} from "../hooks/admin/usecustomer/customerHooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/landingpagecomponents/herosection/ui/Dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../components/customer/avatar";
import { Badge } from "../components/landingpagecomponents/herosection/ui/badge";

export default function CustomerPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [viewingCustomer, setViewingCustomer] = useState(null);
  const [imageViewerSrc, setImageViewerSrc] = useState(null);

  // --- Data Fetching ---
  const { data, isLoading, error: queryError } = useGetCustomers();
  const customers = Array.isArray(data?.data) ? data.data : [];

  // --- Mutations ---
  const createCustomerMutation = useCreateCustomer();
  const updateCustomerMutation = useUpdateCustomer();
  const deleteCustomerMutation = useDeleteCustomer();

  const isMutating =
    createCustomerMutation.isPending ||
    updateCustomerMutation.isPending ||
    deleteCustomerMutation.isPending;

  const mutationError =
    createCustomerMutation.error ||
    updateCustomerMutation.error ||
    deleteCustomerMutation.error;

  // --- Event Handlers ---
  const handleAddCustomer = (formData) => {
    createCustomerMutation.mutate(formData, {
      onSuccess: () => {
        setShowForm(false);
      },
    });
  };

  const handleUpdateCustomer = (id, formData) => {
    updateCustomerMutation.mutate({ id, formData }, {
      onSuccess: () => {
        setShowForm(false);
        setEditingCustomer(null);
      },
    });
  };

  const handleDeleteCustomer = (id) => {
    deleteCustomerMutation.mutate(id);
  };

  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleViewClick = (customer) => {
    setViewingCustomer(customer);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCustomer(null);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      Active: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
      Inactive: { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" },
    };
    const currentStatus = statusMap[status] || statusMap.Inactive;
    return (
      <Badge className={`${currentStatus.bg} ${currentStatus.text} hover:${currentStatus.bg} font-medium`}>
        <div className={`w-2 h-2 ${currentStatus.dot} rounded-full mr-2`}></div>
        {status}
      </Badge>
    );
  };

  // --- Render Logic ---
  if (isLoading) return <div className="p-8 text-center">Loading customers...</div>;
  if (queryError) return <div className="p-8 text-center text-red-500">Error: {queryError.message}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="container mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500 rounded-xl">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
              <p className="text-gray-600 mt-1">Manage your customers efficiently in one place</p>
            </div>
          </div>
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3"
              size="lg"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Add New Customer
            </Button>
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {mutationError && (
          <div className="max-w-2xl mx-auto mb-4 p-4 bg-red-100 text-red-700 border border-red-200 rounded-md flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>An error occurred: {mutationError.response?.data?.message || mutationError.message}</span>
          </div>
        )}

        {showForm ? (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingCustomer ? "Edit Customer" : "Add New Customer"}
              </h2>
              <Button variant="ghost" size="sm" onClick={handleFormCancel}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <CustomerForm
              initialData={editingCustomer}
              onSubmit={editingCustomer ? (data) => handleUpdateCustomer(editingCustomer._id, data) : handleAddCustomer}
              onCancel={handleFormCancel}
              isSubmitting={isMutating}
            />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Customer List</h2>
            <p className="text-sm text-gray-500 mb-6">{customers.length} total customers</p>
            <CustomerTable
              customers={customers}
              onEdit={handleEditClick}
              onView={handleViewClick}
              onDelete={handleDeleteCustomer}
              isProcessing={isMutating}
            />
          </div>
        )}
      </div>

      {/* --- CUSTOMER DETAILS DIALOG --- */}
      <Dialog
        open={!!viewingCustomer}
        onOpenChange={(isOpen) => !isOpen && setViewingCustomer(null)}
      >
        <DialogContent className="sm:max-w-lg bg-white p-0">
          {viewingCustomer && (
            <>
              <Button
                variant="ghost"
                onClick={() => setViewingCustomer(null)}
                className="absolute right-4 top-4 rounded-full h-8 w-8 p-0 text-gray-500 hover:bg-orange-100 hover:text-orange-600 transition-colors"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
              
              <DialogHeader className="text-left p-6 pb-4">
                <DialogTitle className="text-2xl font-bold text-gray-900">Customer Details</DialogTitle>
                <DialogDescription>Full information for {viewingCustomer.name}.</DialogDescription>
              </DialogHeader>

              <div className="px-6 space-y-6">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (viewingCustomer.image) {
                        setImageViewerSrc(`${import.meta.env.VITE_API_BASE_IMAGE_URL}/${viewingCustomer.image}`);
                      }
                    }}
                    className="relative group flex-shrink-0"
                    disabled={!viewingCustomer.image}
                  >
                    <Avatar className="w-20 h-20 border-4 border-orange-100">
                      <AvatarImage
                        src={viewingCustomer.image ? `${import.meta.env.VITE_API_BASE_IMAGE_URL}/${viewingCustomer.image}` : "/placeholder.svg"}
                        alt={viewingCustomer.name}
                      />
                      <AvatarFallback className="bg-orange-100 text-orange-600 font-bold text-2xl">
                        {viewingCustomer.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {viewingCustomer.image && (
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <ZoomIn className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </button>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{viewingCustomer.name}</h3>
                    <p className="text-sm text-gray-500">ID: #{viewingCustomer._id}</p>
                    <div className="mt-2">{getStatusBadge(viewingCustomer.status)}</div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div className="grid grid-cols-1 gap-4 text-sm">
                  <h4 className="font-semibold text-gray-700 mb-1">Contact Information</h4>
                  <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-gray-400" /><span className="text-gray-800">{viewingCustomer.email}</span></div>
                  <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-gray-400" /><span className="text-gray-800">{viewingCustomer.phone || "Not provided"}</span></div>
                  <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-gray-400" /><span className="text-gray-800">{viewingCustomer.address || "Not provided"}</span></div>
                </div>

                <hr className="border-gray-100" />

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">System Information</h4>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <span className="text-gray-500">Customer since: </span>
                      <span className="text-gray-800 font-medium">{formatDate(viewingCustomer.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gray-50 border-t border-gray-200 flex justify-end">
                <Button 
                  type="button" 
                  onClick={() => setViewingCustomer(null)}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* --- FULL IMAGE VIEWER DIALOG --- */}
      <Dialog
        open={!!imageViewerSrc}
        onOpenChange={(isOpen) => !isOpen && setImageViewerSrc(null)}
      >
        <DialogContent className="max-w-2xl bg-transparent shadow-none border-none p-0">
            {/* FIX: Added z-10 to ensure the button is always on top of the image */}
            <Button
              variant="ghost"
              onClick={() => setImageViewerSrc(null)}
              className="absolute right-2 top-2 z-10 rounded-full h-9 w-9 p-0 bg-black/40 hover:bg-black/60 text-white hover:text-white"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
            <img 
              src={imageViewerSrc} 
              alt="Customer full-size" 
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg" 
            />
        </DialogContent>
      </Dialog>
    </div>
  );
}