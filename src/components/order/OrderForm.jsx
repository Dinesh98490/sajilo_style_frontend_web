import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Package, User, CreditCard, MapPin, DollarSign, Hash, Mail, Save, X, Loader2, ClipboardList
} from "lucide-react";

// import { useGetProduct } from "../../hooks/admin/useProduct/productHooks";
// import { use}

// --- Validation Schema using Yup (No changes) ---
const validationSchema = Yup.object({
  product_id: Yup.object({
    name: Yup.string().min(3, "Must be at least 3 characters").required("Product name is required"),
  }),
  user_id: Yup.object({
    name: Yup.string().min(2, "Must be at least 2 characters").required("Customer name is required"),
    email: Yup.string().email("Invalid email address").required("Customer email is required"),
  }),
  payment_id: Yup.object({
    method: Yup.string().required("A payment method is required"),
  }),
  address: Yup.string().min(10, "Must be at least 10 characters").required("Shipping address is required"),
  price: Yup.number().positive("Price must be a positive number").required("Price is required"),
  quantity: Yup.number().integer().min(1, "Quantity must be at least 1").required("Quantity is required"),
  status: Yup.string().required("Order status is required"),
});

// --- Reusable Helper Components ---
const FormError = ({ name }) => (
  <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
);

const FormikInput = ({ name, label, icon: Icon, className, ...props }) => (
  <div className="space-y-1">
    <label htmlFor={name} className="text-sm font-semibold text-gray-600 flex items-center">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      <Field
        id={name}
        name={name}
        // THE FIX: Added `text-gray-900` to ensure text is dark and visible.
        className={`block w-full h-11 rounded-lg border-gray-300 shadow-sm pl-10 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 sm:text-sm transition-all ${className || ''}`}
        {...props}
      />
    </div>
    <FormError name={name} />
  </div>
);

const FormikSelect = ({ name, label, children }) => (
   <div className="space-y-1">
    <label htmlFor={name} className="text-sm font-semibold text-gray-600 flex items-center">
      {label}
    </label>
    <Field
      as="select"
      id={name}
      name={name}
      // THE FIX: Added `text-gray-900` here as well.
      className="block w-full h-11 rounded-lg border-gray-300 shadow-sm px-3 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 sm:text-sm transition-all"
    >
      {children}
    </Field>
    <FormError name={name} />
  </div>
);

// --- The Main Form Component ---
export function OrderForm({ onSubmit, initialData, onCancel, isSubmitting }) {
  const isEditing = !!initialData;

  const initialValues = {
    product_id: { name: initialData?.product_id?.name || "" },
    user_id: { name: initialData?.user_id?.name || "", email: initialData?.user_id?.email || "" },
    payment_id: {
      method: initialData?.payment_id?.method || "",
      transaction_id: initialData?.payment_id?.transaction_id || `TXN${Date.now()}`,
    },
    address: initialData?.address || "",
    price: initialData?.price || "",
    quantity: initialData?.quantity || 1,
    status: initialData?.status || "Pending",
  };
  
  return (
    <div className="flex flex-col h-full max-h-[95vh] bg-gradient-to-br from-orange-50 to-gray-50">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onSubmit(values)}
        enableReinitialize
      >
        {({ values }) => {
          const totalAmount = (parseFloat(values.price) || 0) * values.quantity;
          return (
            <Form id="order-form" className="flex flex-col h-full">
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-6 text-center shadow-lg z-10">
                 <div className="inline-block p-3 bg-orange-500/90 rounded-full mb-3 shadow-md">
                   <ClipboardList className="w-8 h-8 text-white" />
                 </div>
                 <h2 className="text-2xl font-bold tracking-tight">{isEditing ? "Update Order" : "Create New Order"}</h2>
                 <p className="text-slate-300 text-sm">Manage order details with precision</p>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-8">
                <div className="space-y-8 max-w-2xl mx-auto">
                  
                  {/* Product & Pricing Section */}
                  <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md space-y-4">
                    <h3 className="text-lg font-bold text-slate-700 border-b pb-2 mb-4">Product & Pricing</h3>
                    <FormikInput name="product_id.name" label="Product Name" icon={Package} placeholder="e.g., Premium Leather Wallet" />
                    <div className="grid grid-cols-2 gap-4">
                      <FormikInput name="price" label="Unit Price" icon={DollarSign} type="number" step="0.01" placeholder="0.00" />
                      <FormikInput name="quantity" label="Quantity" icon={Hash} type="number" min="1" placeholder="1" />
                    </div>
                    {totalAmount > 0 && (
                      <div className="mt-4 bg-orange-100/50 p-4 rounded-lg border border-orange-200">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-700">Total Amount:</span>
                          <span className="text-2xl font-bold text-orange-600">${totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Customer Info Section */}
                  <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md space-y-4">
                     <h3 className="text-lg font-bold text-slate-700 border-b pb-2 mb-4">Customer Information</h3>
                     <FormikInput name="user_id.name" label="Customer Name" icon={User} placeholder="e.g., Jane Doe" />
                     <FormikInput name="user_id.email" label="Customer Email" icon={Mail} type="email" placeholder="jane.doe@example.com" />
                  </div>

                  {/* Shipping & Status Section */}
                  <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md space-y-4">
                    <h3 className="text-lg font-bold text-slate-700 border-b pb-2 mb-4">Shipping & Status</h3>
                    <FormikInput 
                      as="textarea" 
                      name="address" 
                      label="Shipping Address" 
                      icon={MapPin} 
                      placeholder="123 Main Street, Anytown, USA 12345" 
                      rows={4} 
                      className="pt-2 resize-none" 
                    />
                    <FormikSelect name="status" label="Order Status">
                      <option value="Pending">⏳ Pending</option>
                      <option value="Processing">⚙️ Processing</option>
                      <option value="Shipped">🚚 Shipped</option>
                      <option value="Delivered">✅ Delivered</option>
                      <option value="Cancelled">❌ Cancelled</option>
                    </FormikSelect>
                  </div>
                  
                  {/* Payment Info Section */}
                  <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md space-y-4">
                    <h3 className="text-lg font-bold text-slate-700 border-b pb-2 mb-4">Payment Details</h3>
                    <FormikSelect name="payment_id.method" label="Payment Method">
                      <option value="">Select a method...</option>
                      <option value="Credit Card">💳 Credit Card</option>
                      <option value="PayPal">🅿️ PayPal</option>
                      <option value="Bank Transfer">🏦 Bank Transfer</option>
                    </FormikSelect>
                    <div className="mt-4 bg-gray-100/80 p-3 rounded-lg border border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Transaction ID</p>
                      <p className="font-mono text-sm text-gray-600 bg-white px-3 py-2 rounded-md border">{values.payment_id.transaction_id}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Footer with Buttons */}
              <div className="p-6 bg-white/80 backdrop-blur-sm border-t border-gray-200 flex justify-end items-center space-x-4">
                {onCancel && (
                  <button type="button" onClick={onCancel} disabled={isSubmitting} className="px-6 py-3 font-semibold text-gray-700 bg-gray-200/70 hover:bg-gray-300 rounded-lg transition-all flex items-center disabled:opacity-50">
                    <X className="w-5 h-5 mr-2" /> Cancel
                  </button>
                )}
                <button type="submit" form="order-form" disabled={isSubmitting} className="inline-flex items-center justify-center px-8 py-3 font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:from-gray-400 disabled:to-gray-500 disabled:scale-100 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <> <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving... </>
                  ) : (
                    <> <Save className="w-5 h-5 mr-2" /> {isEditing ? "Save Changes" : "Create Order"} </>
                  )}
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  );
}