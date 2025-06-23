// src/components/customer/CustomerForm.jsx

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { User, Mail, Phone, MapPin, Image as ImageIcon, Loader2, Save, UploadCloud } from "lucide-react";

// --- Constants for Validation ---
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

// 1. Update the validation schema to include the image
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters.")
    .required("Name is required."),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  phone: Yup.string()
    .matches(/^\+?[1-9]\d{7,14}$/, "A valid phone number is required.")
    .required("Phone number is required."),
  address: Yup.string()
    .min(5, "Address must be at least 5 characters long.")
    .required("Address is required."),
  // Add validation for the image field
  image: Yup.mixed()
    .required("A profile image is required.")
    .test(
      "fileSize",
      "File is too large (max 2MB)",
      (value) => value && value.size <= MAX_FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported file format (use JPG, PNG, GIF)",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});

const FormError = ({ name }) => (
  <ErrorMessage name={name}>
    {(msg) => <div className="text-red-500 text-sm mt-1">{msg}</div>}
  </ErrorMessage>
);

const inputClasses = "block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm";
const inputErrorClasses = "border-red-500";

export default function CustomerForm({ initialData, onSubmit, onCancel, isSubmitting }) {
  const isEditing = !!initialData;
  const img = initialData?.image ? `${import.meta.env.VITE_API_BASE_IMAGE_URL}/${initialData?.image}`:""

  
  // 2. Update initial values
  const formInitialValues = {
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    // Use null for the image initially. We will handle the preview logic below.
    image: img || null,
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-orange-200 rounded-xl shadow-lg shadow-orange-500/10 overflow-hidden">
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <div className="p-6 pt-0 space-y-6 mt-6">
              {/* --- IMAGE UPLOAD FIELD --- */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Profile Image</label>
                <div className="flex items-center gap-4">
                  {/* Image Preview */}
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden flex items-center justify-center">
                    {values.image ? (
                      <img
                        // Create a temporary URL for preview if it's a File object, otherwise use the string URL from initialData
                        src={typeof values.image === 'object' ? URL.createObjectURL(values.image) : values.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                  {/* File Input */}
                  <div className="w-full">
                    <label
                      htmlFor="image"
                      className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <UploadCloud className="mr-2 h-4 w-4" />
                      Change Image
                    </label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      // Use setFieldValue to update Formik's state with the File object
                      onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
                      className="hidden" // Hide the default ugly input
                      accept="image/*"
                    />
                    <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 2MB.</p>
                  </div>
                </div>
                <FormError name="image" />
              </div>

              {/* Text Fields (Name, Email, etc.) */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Field
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className={`${inputClasses} pl-9 ${touched.name && errors.name ? inputErrorClasses : 'border-gray-300'}`}
                  />
                </div>
                <FormError name="name" />
              </div>

              {/* ...other fields (email, phone, address) remain the same... */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    className={`${inputClasses} pl-9 ${touched.email && errors.email ? inputErrorClasses : 'border-gray-300'}`}
                  />
                </div>
                <FormError name="email" />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Field
                    id="phone"
                    name="phone"
                    placeholder="+1 234 567 8900"
                    className={`${inputClasses} pl-9 ${touched.phone && errors.phone ? inputErrorClasses : 'border-gray-300'}`}
                  />
                </div>
                <FormError name="phone" />
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium text-gray-700">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Field
                    id="address"
                    name="address"
                    placeholder="123 Main St, Anytown, USA"
                    className={`${inputClasses} pl-9 ${touched.address && errors.address ? inputErrorClasses : 'border-gray-300'}`}
                  />
                </div>
                <FormError name="address" />
              </div>
            </div>

            <div className="flex justify-end gap-4 p-6 bg-gray-50 border-t border-gray-100">
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ minWidth: '140px' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    <span>{isEditing ? "Save Changes" : "Create Customer"}</span>
                  </>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}