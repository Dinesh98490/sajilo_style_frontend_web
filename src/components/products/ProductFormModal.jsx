import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { Button } from "../landingpagecomponents/herosection/ui/button";
import { Input } from "../landingpagecomponents/herosection/ui/input";
import { Label } from "../landingpagecomponents/herosection/ui/Label";
import { Textarea } from "../landingpagecomponents/herosection/ui/TextArea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../landingpagecomponents/herosection/ui/Dialog";
import { Save, Loader2, ImagePlus, X } from "lucide-react";
import { useGetCategories } from "../../hooks/admin/usecategory/categoryHooks";
import { useCreateProduct } from "../../hooks/admin/useProduct/productHooks";
import { useUpdateProduct } from "../../hooks/admin/useProduct/productHooks";


const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; 

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Title is required."),
  desc: Yup.string()
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .required("Description is required."),
  price: Yup.number()
    .positive("Price must be a positive number.")
    .required("Price is required."),
  quantity: Yup.number()
    .integer("Quantity must be an integer.")
    .min(0, "Quantity cannot be negative.")
    .required("Quantity is required."),
  image: Yup.mixed()
    .nullable() 
    .required("An image is required.")
    .test("fileOrUrl", "Unsupported file format or invalid image", (value) => {
      if (!value) return false;
      if (typeof value === "string") return true;
      if (value instanceof File) {
        return (
          value.size <= MAX_FILE_SIZE && SUPPORTED_FORMATS.includes(value.type)
        );
      }
      return false;
    }),
  color: Yup.string().trim().required("Color is required."),
  size: Yup.string().trim().required("Size is required."),
  categoryId: Yup.string().required("Category is required."),
});

const FormError = ({ name }) => (
  <ErrorMessage
    name={name}
    component="p"
    className="text-sm text-red-500 font-medium"
  />
);

export default function ProductFormModal({
  open,
  onOpenChange,
  initialData,
  onCancel,
}) {
  const isEditing = !!initialData;
  const { data: category = [] } = useGetCategories();
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct(); 
  const isSubmitting = isCreating || isUpdating;

  const [isDragging, setIsDragging] = useState(false);

  const formInitialValues = {
    title: initialData?.title || "",
    desc: initialData?.desc || "",
    price: initialData?.price || "",
    quantity: initialData?.quantity || 0,
    image: initialData?.imageUrl || null, // FIX: Use imageUrl from data
    color: initialData?.color || "",
    size: initialData?.size || "",
    categoryId: initialData?.category?._id || initialData?.categoryId || "",
  };

  // --- FIX: The entire submission handler is refactored ---
  const handleFormSubmit = (values, { resetForm }) => {
    const formData = new FormData();
  
    formData.append("title", values.title);
    formData.append("desc", values.desc);
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    formData.append("color", values.color);
    formData.append("size", values.size);
    formData.append("categoryId", values.categoryId);
  
    if (values.image instanceof File) {
      formData.append("image", values.image);
    } else {
      console.warn("Invalid or missing image:", values.image);
      toast.error("Please upload a valid image.");
      return;
    }
  
    // Debug formData
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    const mutationOptions = {
      onSuccess: () => {
        resetForm();
        toast.success(`Product ${isEditing ? 'updated' : 'created'} successfully!`);
        onOpenChange(false);
      },
      onError: () => {
        toast.error(`Failed to ${isEditing ? 'update' : 'create'} product.`);
      },
    };
  
    if (isEditing) {
      updateProduct({ id: initialData._id, formData }, mutationOptions);
    } else {
      createProduct(formData, mutationOptions);
    }
  };
  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="relative max-w-screen-2xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 p-0">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="absolute right-4 top-4 z-10 rounded-full h-8 w-8 p-0 text-black hover:bg-gray-200/75 transition-colors"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>

        <Formik
          initialValues={formInitialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
          enableReinitialize
        >
          {({ errors, touched, values, setFieldValue }) => {
            const handleFileSelect = (fileList) => {
              const file = fileList?.[0];
              if (file) {
                setFieldValue("image", file);
              }
            };

            const removeImage = () => {
              setFieldValue("image", null);
            };

            let imageUrlForPreview = null;
            if (values.image) {
              imageUrlForPreview =
                typeof values.image === "string"
                  ? values.image
                  : URL.createObjectURL(values.image);
            }

            return (
              <Form>
                <DialogHeader className="text-center p-6 border-b border-orange-200">
                  <DialogTitle className="text-3xl font-bold tracking-wide bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
                    {isEditing ? "Edit Product" : "Create a New Product"}
                  </DialogTitle>
                </DialogHeader>

                <div className="p-8 space-y-8">
                  {/* ... (Your form sections are fine, no changes needed here) ... */}
                  {/* Basic Info */}
                  <section className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Product Title <span className="text-orange-500">*</span></Label>
                        <Field id="title" name="title" as={Input} className={`h-12 border-2 ${touched.title && errors.title && "border-red-400"}`}/>
                        <FormError name="title" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($) <span className="text-orange-500">*</span></Label>
                        <Field id="price" name="price" type="number" as={Input} className={`h-12 border-2 ${touched.price && errors.price && "border-red-400"}`}/>
                        <FormError name="price" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity <span className="text-orange-500">*</span></Label>
                        <Field id="quantity" name="quantity" type="number" as={Input} className={`h-12 border-2 ${touched.quantity && errors.quantity && "border-red-400"}`}/>
                        <FormError name="quantity" />
                      </div>
                    </div>
                    <div className="space-y-2 mt-6">
                      <Label htmlFor="desc">Description <span className="text-orange-500">*</span></Label>
                      <Field id="desc" name="desc" as={Textarea} rows={4} className={`border-2 resize-none ${touched.desc && errors.desc && "border-red-400"}`}/>
                      <FormError name="desc" />
                    </div>
                  </section>
                  {/* Attributes */}
                  <section className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
                     <h3 className="text-xl font-bold text-gray-800 mb-6">Product Attributes</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                           <Label htmlFor="categoryId">Category <span className="text-orange-500">*</span></Label>
                           <Field as="select" id="categoryId" name="categoryId" className={`w-full h-12 border-2 rounded-md px-3 bg-white ${touched.categoryId && errors.categoryId && "border-red-400"}`}>
                              <option value="">Select Category</option>
                              {category.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.title}</option>
                              ))}
                           </Field>
                           <FormError name="categoryId" />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="color">Color <span className="text-orange-500">*</span></Label>
                           <Field id="color" name="color" as={Input} className={`h-12 border-2 ${touched.color && errors.color && "border-red-400"}`}/>
                           <FormError name="color" />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="size">Size <span className="text-orange-500">*</span></Label>
                           <Field id="size" name="size" as={Input} className={`h-12 border-2 ${touched.size && errors.size && "border-red-400"}`}/>
                           <FormError name="size" />
                        </div>
                     </div>
                  </section>
                  {/* Image Upload */}
                  <section className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Product Image <span className="text-orange-500">*</span></h3>
                    <input id="file-upload" type="file" accept="image/*" onChange={(e) => handleFileSelect(e.target.files)} className="hidden"/>
                    {!values.image && (
                      <label htmlFor="file-upload" onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileSelect(e.dataTransfer.files);}}
                        className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${ isDragging ? "border-orange-500 bg-orange-100" : "border-orange-300 bg-orange-50/50 hover:bg-orange-100"}`}>
                        <ImagePlus className={`w-10 h-10 mb-2 ${isDragging && "scale-110"}`} />
                        <span className="font-semibold text-orange-700">Drag & Drop an image here</span>
                        <span className="text-sm text-gray-500">or click to browse</span>
                      </label>
                    )}
                    <FormError name="image" />
                    {imageUrlForPreview && (
                      <div className="mt-6">
                        <p className="text-sm font-medium text-gray-600 mb-2">Image Preview:</p>
                        <div className="relative group w-48">
                          <img src={imageUrlForPreview} alt="Preview" onLoad={() => values.image instanceof File && URL.revokeObjectURL(imageUrlForPreview)} className="w-full h-48 object-cover rounded-xl border-2 border-orange-200"/>
                          <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity" onClick={removeImage}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </section>
                </div>

                <div className="flex justify-end gap-4 p-6 border-t border-orange-200 mt-8">
                  <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting} className="h-12 px-8 border-2">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="h-12 px-8 bg-orange-500 hover:bg-orange-600 text-white" style={{ minWidth: "180px" }}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-5 mr-2 animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <Save className="size-5 mr-2" />{" "}
                        {isEditing ? "Save Changes" : "Create Product"}
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}