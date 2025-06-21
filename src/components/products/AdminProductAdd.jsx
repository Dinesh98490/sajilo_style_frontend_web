import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Alert,
  AlertDescription,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "../landingpagecomponents/herosection/ui";
import {
  Package,
  Upload,
  X,
  Plus,
  Save,
  Eye,
  AlertCircle
} from "lucide-react";

const categories = [
  { _id: "64a1b2c3d4e5f6789012345a", name: "Electronics" },
  { _id: "64a1b2c3d4e5f6789012345b", name: "Clothing" },
  { _id: "64a1b2c3d4e5f6789012345c", name: "Books" },
  { _id: "64a1b2c3d4e5f6789012345d", name: "Home & Garden" },
  { _id: "64a1b2c3d4e5f6789012345e", name: "Sports" }
];

const colorOptions = ["Red", "Blue", "Green", "Black", "White", "Yellow", "Purple", "Orange", "Pink", "Brown", "Gray", "Navy"];
const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "One Size", "Custom"];

export default function ProductFormComponent() {
  const [formData, setFormData] = useState({ title: "", desc: "", price: "", images: [], color: "", size: "", categoryId: "" });
  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [showProductInfo, setShowProductInfo] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const addImageUrl = () => {
    if (imageUrl.trim() && !formData.images.includes(imageUrl.trim())) {
      setFormData(prev => ({ ...prev, images: [...prev.images, imageUrl.trim()] }));
      setImageUrl("");
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.desc.trim()) newErrors.desc = "Description is required";
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = "Price must be greater than 0";
    if (formData.images.length === 0) newErrors.images = "At least one image is required";
    if (!formData.color) newErrors.color = "Color is required";
    if (!formData.size) newErrors.size = "Size is required";
    if (!formData.categoryId) newErrors.categoryId = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert("Product saved successfully!");
      setShowProductInfo(true);
    }
  };

  const selectedCategory = categories.find(cat => cat._id === formData.categoryId);


  // admin porduct add 
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Package className="size-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Add New Product</h1>
              <p className="text-sm text-muted-foreground">Create a new product for your store</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" onClick={handleSubmit}>
              <Save className="size-4 mr-2" /> Add Product
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Please fix the following errors before saving the product.</AlertDescription>
          </Alert>
        )}
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
            <CardDescription>Enter all the details for your new product</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add form inputs here using Input, Select, etc. */}
            {/* Code omitted for brevity (same as provided) */}
          </CardContent>
        </Card>
        <Dialog open={showProductInfo} onOpenChange={setShowProductInfo}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Product Added Successfully!</DialogTitle>
              <DialogDescription>Your product has been saved. Here are the details:</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Show submitted product data here */}
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
