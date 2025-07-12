import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { User, Mail, Phone, MapPin, Loader2, Save, UploadCloud, Edit2, X } from "lucide-react";

// --- Constants for Validation (No changes here) ---
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

// --- Validation Schema (No changes here) ---
const validationSchema = (isEditing) => Yup.object({
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
  image: Yup.mixed()
    .when([], {
      is: () => !isEditing,
      then: (schema) => schema.required("A profile image is required."),
      otherwise: (schema) => schema.notRequired(),
    })
    .test(
      "fileSize",
      "File is too large (max 2MB)",
      (value) => !value || (value && value.size <= MAX_FILE_SIZE)
    )
    .test(
      "fileFormat",
      "Unsupported file format (use JPG, PNG, GIF)",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    ),
});

const FormError = ({ name }) => (
  <ErrorMessage name={name}>
    {(msg) => <div className="text-red-500 text-sm mt-1">{msg}</div>}
  </ErrorMessage>
);

// --- Refined Input Styles (No changes here) ---
const inputClasses = "block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 sm:text-sm transition-all";
const inputErrorClasses = "border-red-500 focus:border-red-500 focus:ring-red-500";

export default function CustomerForm({ initialData, onSubmit, onCancel, isSubmitting }) {
  const isEditing = !!initialData;
  const existingImageUrl = initialData?.image ? `${import.meta.env.VITE_API_BASE_IMAGE_URL}/${initialData.image}` : "";

  const formInitialValues = {
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    image: existingImageUrl || null,
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-orange-200/50 rounded-xl shadow-lg shadow-orange-500/10 overflow-hidden">
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSchema(isEditing)}
        onSubmit={(values) => {
          if (typeof values.image === 'string') {
            values.image = null;
          }
          onSubmit(values);
        }}
        enableReinitialize
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            {/* --- NEW: INTEGRATED FORM HEADER --- */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                {isEditing ? "Edit Customer" : "Add New Customer"}
              </h2>
              <button
                type="button"
                onClick={onCancel}
                className="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Image Upload Field */}
              <div className="flex flex-col items-center space-y-2">
                <label
                  htmlFor="image"
                  className="relative group w-32 h-32 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300"
                >
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={(event) => {
                      setFieldValue("image", event.currentTarget.files[0]);
                    }}
                    className="hidden"
                    accept="image/*"
                  />
                  {values.image ? (
                    <img
                      src={typeof values.image === 'object' ? URL.createObjectURL(values.image) : values.image}
                      alt="Preview"
                      className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center group-hover:border-orange-400 transition-colors">
                      <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-orange-500 transition-colors" />
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="text-center text-white">
                      <Edit2 className="w-6 h-6 mx-auto" />
                      <span className="text-xs font-semibold">Change</span>
                    </div>
                  </div>
                </label>
                <FormError name="image" />
              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Field
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      className={`${inputClasses} pl-10 ${touched.name && errors.name ? inputErrorClasses : ''}`}
                    />
                  </div>
                  <FormError name="name" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      className={`${inputClasses} pl-10 ${touched.email && errors.email ? inputErrorClasses : ''}`}
                    />
                  </div>
                  <FormError name="email" />
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Field
                      id="phone"
                      name="phone"
                      placeholder="+1 234 567 8900"
                      className={`${inputClasses} pl-10 ${touched.phone && errors.phone ? inputErrorClasses : ''}`}
                    />
                  </div>
                  <FormError name="phone" />
                </div>
                <div>
                  <label htmlFor="address" className="text-sm font-medium text-gray-700">Address</label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Field
                      id="address"
                      name="address"
                      placeholder="123 Main St, Anytown, USA"
                      className={`${inputClasses} pl-10 ${touched.address && errors.address ? inputErrorClasses : ''}`}
                    />
                  </div>
                  <FormError name="address" />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 p-6 bg-gray-50/70 border-t border-gray-200/80">
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-orange-500 border border-transparent rounded-lg shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed transition-all"
                style={{ minWidth: '150px' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
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