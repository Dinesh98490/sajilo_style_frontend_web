import React, { useState } from "react";
import { Button } from "../landingpagecomponents/herosection/ui/button";
import { Input } from "../landingpagecomponents/herosection/ui/input";
import { Label } from "../landingpagecomponents/herosection/ui/Label";
import { Textarea } from "../landingpagecomponents/herosection/ui/TextArea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../landingpagecomponents/herosection/ui/Dialog";
import { Upload, X, Plus, Save, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../landingpagecomponents/herosection/ui/Alert";

const categories = [
  { _id: "64a1b2c3d4e5f6789012345a", name: "Sports Shoes" },
  { _id: "64a1b2c3d4e5f6789012345b", name: "Formal Shoes" },
  { _id: "64a1b2c3d4e5f6789012345c", name: "Running Shoes" },
  { _id: "64a1b2c3d4e5f6789012345d", name: "Casual Shoes" },
];

const colorOptions = [
  "Red",
  "Blue",
  "Green",
  "Black",
  "White",
  "Yellow",
  "Purple",
  "Navy",
];

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", ];

export default function ProductFormModal({ open, onOpenChange, onProductAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    price: "",
    images: [],
    color: "",
    size: "",
    categoryId: "",
  });

  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addImageUrl = () => {
    const trimmed = imageUrl.trim();
    if (trimmed && !formData.images.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, trimmed],
      }));
      setImageUrl("");
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.desc.trim()) newErrors.desc = "Description is required";
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = "Price must be greater than 0";
    if (formData.images.length === 0)
      newErrors.images = "At least one image is required";
    if (!formData.color) newErrors.color = "Color is required";
    if (!formData.size) newErrors.size = "Size is required";
    if (!formData.categoryId) newErrors.categoryId = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newProduct = {
      _id: Date.now().toString(),
      ...formData,
      price: Number(formData.price),
      brand: "Custom Brand",
      type: "Custom",
      material: "Various",
      createdAt: new Date().toISOString(),
    };

    onProductAdded(newProduct);

    setFormData({
      title: "",
      desc: "",
      price: "",
      images: [],
      color: "",
      size: "",
      categoryId: "",
    });
    setErrors({});
    onOpenChange(false);
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      desc: "",
      price: "",
      images: [],
      color: "",
      size: "",
      categoryId: "",
    });
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-2xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
      <DialogHeader className="text-center pb-8">
  <DialogTitle className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent animate-pulse">
    Create a new product
  </DialogTitle>
</DialogHeader>


        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive" className="mb-6 border-red-300 bg-red-50 flex items-center gap-2 p-4 rounded">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please fix the highlighted errors before creating your product.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-8 w-full max-w-screen-xl mx-auto">
          {/* Basic Info */}
          <section className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
                  Product Title <span className="text-orange-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Enter an amazing product title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={`h-12 border-2 transition-all duration-200 ${
                    errors.title
                      ? "border-red-400 focus:border-red-500"
                      : "border-orange-200 focus:border-orange-400 hover:border-orange-300"
                  }`}
                />
                {errors.title && (
                  <p className="text-sm text-red-500 font-medium">{errors.title}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="price" className="text-sm font-semibold text-gray-700">
                  Price ($) <span className="text-orange-500">*</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className={`h-12 border-2 transition-all duration-200 ${
                    errors.price
                      ? "border-red-400 focus:border-red-500"
                      : "border-orange-200 focus:border-orange-400 hover:border-orange-300"
                  }`}
                />
                {errors.price && (
                  <p className="text-sm text-red-500 font-medium">{errors.price}</p>
                )}
              </div>
            </div>

            <div className="space-y-3 mt-6">
              <Label htmlFor="desc" className="text-sm font-semibold text-gray-700">
                Description <span className="text-orange-500">*</span>
              </Label>
              <Textarea
                id="desc"
                placeholder="Describe what makes your product special..."
                rows={4}
                value={formData.desc}
                onChange={(e) => handleInputChange("desc", e.target.value)}
                className={`border-2 transition-all duration-200 resize-none ${
                  errors.desc
                    ? "border-red-400 focus:border-red-500"
                    : "border-orange-200 focus:border-orange-400 hover:border-orange-300"
                }`}
              />
              {errors.desc && (
                <p className="text-sm text-red-500 font-medium">{errors.desc}</p>
              )}
            </div>
          </section>

          {/* Attributes */}
          <section className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Product Attributes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category */}
              <div className="space-y-3">
                <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
                  Category <span className="text-orange-500">*</span>
                </Label>
                <select
                  id="category"
                  value={formData.categoryId}
                  onChange={(e) => handleInputChange("categoryId", e.target.value)}
                  className={`h-12 w-full border-2 rounded-md transition-all duration-200 ${
                    errors.categoryId
                      ? "border-red-400 focus:border-red-500"
                      : "border-orange-200 focus:border-orange-400 hover:border-orange-300"
                  }`}
                >
                  <option value="" disabled>
                    Choose a category
                  </option>
                  {categories.map(({ _id, name }) => (
                    <option key={_id} value={_id}>
                      {name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-sm text-red-500 font-medium">{errors.categoryId}</p>
                )}
              </div>

              {/* Color */}
              <div className="space-y-3">
                <Label htmlFor="color" className="text-sm font-semibold text-gray-700">
                  Color <span className="text-orange-500">*</span>
                </Label>
                <select
                  id="color"
                  value={formData.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  className={`h-12 w-full border-2 rounded-md transition-all duration-200 ${
                    errors.color
                      ? "border-red-400 focus:border-red-500"
                      : "border-orange-200 focus:border-orange-400 hover:border-orange-300"
                  }`}
                >
                  <option value="" disabled>
                    Pick a color
                  </option>
                  {colorOptions.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
                {errors.color && (
                  <p className="text-sm text-red-500 font-medium">{errors.color}</p>
                )}
              </div>

              {/* Size */}
              <div className="space-y-3">
                <Label htmlFor="size" className="text-sm font-semibold text-gray-700">
                  Size <span className="text-orange-500">*</span>
                </Label>
                <select
                  id="size"
                  value={formData.size}
                  onChange={(e) => handleInputChange("size", e.target.value)}
                  className={`h-12 w-full border-2 rounded-md transition-all duration-200 ${
                    errors.size
                      ? "border-red-400 focus:border-red-500"
                      : "border-orange-200 focus:border-orange-400 hover:border-orange-300"
                  }`}
                >
                  <option value="" disabled>
                    Select size
                  </option>
                  {sizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                {errors.size && (
                  <p className="text-sm text-red-500 font-medium">{errors.size}</p>
                )}
              </div>
            </div>
          </section>

          {/* Images */}
          <section className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Product Images <span className="text-orange-500">*</span>
            </h3>

            <div className="flex gap-3 mb-4">
              <Input
                placeholder="Paste your image URL here (https://...)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addImageUrl();
                  }
                }}
                className="h-12 border-2 border-orange-200 focus:border-orange-400 hover:border-orange-300 transition-all duration-200"
              />
              <Button
                type="button"
                onClick={addImageUrl}
                className="h-12 px-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg transition-all duration-200"
              >
                <Plus className="size-4 mr-2" />
                Add Image
              </Button>
            </div>

            {errors.images && (
              <p className="text-sm text-red-500 font-medium mb-4">{errors.images}</p>
            )}

            {formData.images.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image || "/placeholder.svg?height=150&width=150"}
                      alt={`Product ${index + 1}`}
                      className="w-full h-36 object-cover rounded-xl border-2 border-orange-200 shadow-md transition-all duration-200 group-hover:shadow-lg"
                      onError={(e) => {
                        e.target.src =
                          "/placeholder.svg?height=150&width=150&text=Invalid+URL";
                      }}
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 size-8 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                      onClick={() => removeImage(index)}
                    >
                      <X className="size-4" />
                    </Button>
                    <div className="absolute bottom-2 left-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm px-3 py-1 rounded-full font-semibold shadow-lg">
                      #{index + 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-orange-300 rounded-xl p-12 text-center bg-gradient-to-br from-orange-50 to-amber-50">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="size-8 text-orange-600" />
                </div>
                <p className="text-lg font-semibold text-orange-700 mb-2">
                  No images added yet
                </p>
                <p className="text-sm text-orange-600">
                  Add stunning images to showcase your product
                </p>
              </div>
            )}
          </section>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-orange-200">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="h-12 px-8 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="h-12 px-8 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <Save className="size-5 mr-2" />
              Create Product
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
