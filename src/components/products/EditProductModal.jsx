import React, { useState, useEffect } from "react";
import { Button } from "../landingpagecomponents/herosection/ui/button";
import { Input } from "../landingpagecomponents/herosection/ui/input";
import { Label } from "../landingpagecomponents/herosection/ui/Label";
import { Textarea } from "../landingpagecomponents/herosection/ui/TextArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../landingpagecomponents/herosection/ui/Select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../landingpagecomponents/herosection/ui/Dialog";
import { Upload, X, Plus, Save, AlertCircle } from "lucide-react";
import {
  Alert,
  AlertDescription,
} from "../landingpagecomponents/herosection/ui/Alert";

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
];

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

export default function EditProductModal({
  open,
  onOpenChange,
  product,
  onProductUpdated,
}) {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    price: "",
    images: [],
    color: "",
    size: "",
    categoryId: "",
    brand: "",
    type: "",
  });

  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  // Visibility toggles for selects
  const [categorySelectVisible, setCategorySelectVisible] = useState(false);
  const [colorSelectVisible, setColorSelectVisible] = useState(false);
  const [sizeSelectVisible, setSizeSelectVisible] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        desc: product.desc || "",
        price: product.price !== undefined ? product.price.toString() : "",
        images: product.images || [],
        color: product.color || "",
        size: product.size || "",
        categoryId: product.categoryId || "",
        brand: product.brand || "",
        type: product.type || "",
      });
      setErrors({});
      setImageUrl("");
      // Reset select visibility on product load
      setCategorySelectVisible(false);
      setColorSelectVisible(false);
      setSizeSelectVisible(false);
    }
  }, [product]);

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

    const updatedProduct = {
      ...product,
      ...formData,
      price: Number(formData.price),
    };

    onProductUpdated(updatedProduct);
    setErrors({});
    onOpenChange(false);
  };

  const handleCancel = () => {
    if (product) {
      setFormData({
        title: product.title || "",
        desc: product.desc || "",
        price: product.price !== undefined ? product.price.toString() : "",
        images: product.images || [],
        color: product.color || "",
        size: product.size || "",
        categoryId: product.categoryId || "",
        brand: product.brand || "",
        type: product.type || "",
      });
    }
    setErrors({});
    onOpenChange(false);
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        style={{ maxWidth: "900px" }}
        className="max-h-[90vh] overflow-y-auto bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-1">
            Edit Product
          </DialogTitle>
          <DialogDescription className="text-gray-600 mb-4">
            Update the product information below
          </DialogDescription>
        </DialogHeader>

        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive" className="mb-6 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please fix the following errors before saving the product.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">
                  Product Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-title"
                  placeholder="Enter product title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-price">
                  Price ($) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-price"
                  type="number"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-brand">Brand</Label>
                <Input
                  id="edit-brand"
                  placeholder="Enter brand name"
                  value={formData.brand}
                  onChange={(e) => handleInputChange("brand", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-type">Type</Label>
                <Input
                  id="edit-type"
                  placeholder="Enter product type"
                  value={formData.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-desc">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="edit-desc"
                placeholder="Enter product description"
                rows={4}
                value={formData.desc}
                onChange={(e) => handleInputChange("desc", e.target.value)}
                className={errors.desc ? "border-red-500" : ""}
              />
              {errors.desc && (
                <p className="text-sm text-red-500">{errors.desc}</p>
              )}
            </div>
          </div>

          {/* Product Attributes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              Product Attributes
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="edit-category">
                  Category <span className="text-red-500">*</span>
                </Label>

                {!categorySelectVisible ? (
                  <button
                    type="button"
                    className="w-full h-12 border-2 border-orange-200 rounded-md text-left px-3 flex items-center justify-between hover:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    onClick={() => setCategorySelectVisible(true)}
                  >
                    {formData.categoryId
                      ? categories.find((c) => c._id === formData.categoryId)
                          ?.name
                      : "Choose Category"}
                    <span className="text-orange-500 font-semibold">▼</span>
                  </button>
                ) : (
                  <Select
                    value={formData.categoryId || ""}
                    onValueChange={(value) => {
                      handleInputChange("categoryId", value);
                      setCategorySelectVisible(false);
                    }}
                  >
                    <SelectTrigger
                      className={`h-12 border-2 rounded-md transition-all duration-200 ${
                        errors.categoryId
                          ? "border-red-400 focus:border-red-500"
                          : "border-orange-200 focus:border-orange-400 hover:border-orange-300"
                      }`}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {errors.categoryId && (
                  <p className="text-sm text-red-500">{errors.categoryId}</p>
                )}
              </div>

              {/* Color */}
              <div className="space-y-2">
                <Label htmlFor="edit-color">
                  Color <span className="text-red-500">*</span>
                </Label>

                {!colorSelectVisible ? (
                  <button
                    type="button"
                    className="w-full h-12 border-2 border-orange-200 rounded-md text-left px-3 flex items-center justify-between hover:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    onClick={() => setColorSelectVisible(true)}
                  >
                    {formData.color || "Choose Color"}
                    <span className="text-orange-500 font-semibold">▼</span>
                  </button>
                ) : (
                  <Select
                    value={formData.color || ""}
                    onValueChange={(value) => {
                      handleInputChange("color", value);
                      setColorSelectVisible(false);
                    }}
                  >
                    <SelectTrigger
                      className={`h-12 border-2 rounded-md transition-all duration-200 ${
                        errors.color
                          ? "border-red-400 focus:border-red-500"
                          : "border-orange-200 focus:border-orange-400 hover:border-orange-300"
                      }`}
                    >
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((color) => (
                        <SelectItem key={color} value={color}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: color.toLowerCase() }}
                            />
                            {color}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {errors.color && (
                  <p className="text-sm text-red-500">{errors.color}</p>
                )}
              </div>

              {/* Size */}
              <div className="space-y-2">
                <Label htmlFor="edit-size">
                  Size <span className="text-red-500">*</span>
                </Label>

                {!sizeSelectVisible ? (
                  <button
                    type="button"
                    className="w-full h-12 border-2 border-orange-200 rounded-md text-left px-3 flex items-center justify-between hover:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    onClick={() => setSizeSelectVisible(true)}
                  >
                    {formData.size || "Choose Size"}
                    <span className="text-orange-500 font-semibold">▼</span>
                  </button>
                ) : (
                  <Select
                    value={formData.size || ""}
                    onValueChange={(value) => {
                      handleInputChange("size", value);
                      setSizeSelectVisible(false);
                    }}
                  >
                    <SelectTrigger
                      className={`h-12 border-2 rounded-md transition-all duration-200 ${
                        errors.size
                          ? "border-red-400 focus:border-red-500"
                          : "border-orange-200 focus:border-orange-400 hover:border-orange-300"
                      }`}
                    >
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizeOptions.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {errors.size && (
                  <p className="text-sm text-red-500">{errors.size}</p>
                )}
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              Product Images <span className="text-red-500">*</span>
            </h3>

            <div className="flex gap-2">
              <Input
                placeholder="Enter image URL (https://...)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addImageUrl();
                  }
                }}
                className="h-12 border-2 border-orange-200 focus:border-orange-400 hover:border-orange-300 rounded-md transition-all duration-200"
              />
              <Button type="button" onClick={addImageUrl} size="sm">
                <Plus className="size-4 mr-2" />
                Add
              </Button>
            </div>

            {errors.images && (
              <p className="text-sm text-red-500">{errors.images}</p>
            )}

            {formData.images.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image || "/placeholder.svg?height=150&width=150"}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                      onError={(e) => {
                        e.target.src =
                          "/placeholder.svg?height=150&width=150&text=Invalid+URL";
                      }}
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 size-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="size-3" />
                    </Button>
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-orange-300 rounded-lg p-8 text-center bg-gradient-to-br from-orange-50 to-amber-50">
                <Upload className="size-8 mx-auto mb-2 text-orange-600" />
                <p className="text-orange-700 font-semibold">
                  No images added yet
                </p>
                <p className="text-sm text-orange-600">
                  Add image URLs using the input above
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-orange-200">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="h-12 px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="h-12 px-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <Save className="size-5 mr-2" />
              Update Product
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
