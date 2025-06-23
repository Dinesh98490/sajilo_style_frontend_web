import { useState } from "react";
import CustomerForm from "../components/customer/CustomerForm";
import CustomerTable from "../components/customer/CustomerTable";
import { Users, UserPlus, X, AlertCircle } from "lucide-react";
import { Button } from "../components/landingpagecomponents/herosection/ui/button";
// Corrected imports to use our new hooks file
import {
  useGetCustomers,
  useCreateCustomer,
  useUpdateCustomer,
  useDeleteCustomer,
} from "../hooks/admin/usecustomer/customerHooks";

export default function CustomerPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // --- Data Fetching ---
  const { data, isLoading, error: queryError } = useGetCustomers();
  // Ensure customers is always an array to prevent crashes\
  const customers = Array.isArray(data?.data) ? data.data : [];
  console.log("data for log",customers)

  // --- Mutations ---
  const createCustomerMutation = useCreateCustomer();
  const updateCustomerMutation = useUpdateCustomer();
  const deleteCustomerMutation = useDeleteCustomer();

  // Combine mutation states for unified UI feedback
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
    // This now works because the hook handles the FormData conversion
    createCustomerMutation.mutate(formData, {
      onSuccess: () => {
        setShowForm(false);
      },
    });
  };

  const handleUpdateCustomer = (id, formData) => {
    // This also works because the hook handles the FormData conversion
    updateCustomerMutation.mutate({ id, formData }, {
      onSuccess: () => {
        setShowForm(false);
        setEditingCustomer(null);
      },
    });
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      deleteCustomerMutation.mutate(id);
    }
  };

  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
    console.log("update test:",customer);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCustomer(null);
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
                <AlertCircle className="w-5 h-5"/>
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
              // Use _id from MongoDB. If you aliased it to 'id', you can use that.
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
              onDelete={handleDeleteCustomer}
              isProcessing={isMutating}
            />
          </div>
        )}
      </div>
    </div>
  );
}