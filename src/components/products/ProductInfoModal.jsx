import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../landingpagecomponents/herosection/ui/Dialog";
import { Button } from "../landingpagecomponents/herosection/ui/button";

const categories = [
  { _id: "64a1b2c3d4e5f6789012345a", name: "Electronics" },
  { _id: "64a1b2c3d4e5f6789012345b", name: "Clothing" },
  { _id: "64a1b2c3d4e5f6789012345c", name: "Books" },
  { _id: "64a1b2c3d4e5f6789012345d", name: "Home & Garden" },
  { _id: "64a1b2c3d4e5f6789012345e", name: "Sports" },
];

const sampleProduct = {
  title: "Wireless Headphones",
  price: 199.99,
  desc: "Noise-cancelling over-ear headphones.",
  categoryId: "64a1b2c3d4e5f6789012345a",
  color: "Black",
  size: "One Size",
  images: [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150/000000",
  ],
};

export default function ProductInfoModalDemo() {
  const [open, setOpen] = useState(false);

  const selectedCategory = categories.find(
    (cat) => cat._id === sampleProduct.categoryId
  );

  return (
    <div className="p-6">
      {/* <Button onClick={() => setOpen(true)}>Show Product Info</Button> */}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto p-6 space-y-6">
          <DialogHeader>
            <DialogTitle>Product Added Successfully!</DialogTitle>
            <DialogDescription>
              Your product has been saved. Here are the details:
            </DialogDescription>
          </DialogHeader>

          {/* Basic Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-muted-foreground">Title</p>
                <p className="font-medium">
                  {sampleProduct.title || "Not provided"}
                </p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Price</p>
                <p className="font-medium text-green-600">
                  {sampleProduct.price
                    ? `$${Number(sampleProduct.price).toFixed(2)}`
                    : "Not provided"}
                </p>
              </div>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Description</p>
              <p className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                {sampleProduct.desc || "No description provided"}
              </p>
            </div>
          </div>

          {/* Attributes */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Product Attributes</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-muted-foreground">Category</p>
                <p className="font-medium">
                  {selectedCategory?.name || "Not selected"}
                </p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Color</p>
                <div className="flex items-center gap-2">
                  {sampleProduct.color && (
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{
                        backgroundColor: sampleProduct.color.toLowerCase(),
                      }}
                    />
                  )}
                  <p className="font-medium">
                    {sampleProduct.color || "Not selected"}
                  </p>
                </div>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Size</p>
                <p className="font-medium">
                  {sampleProduct.size || "Not selected"}
                </p>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">
              Product Images ({sampleProduct.images?.length || 0})
            </h3>
            {sampleProduct.images && sampleProduct.images.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {sampleProduct.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Product ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border"
                    />
                    <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-1 rounded">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No images added</p>
            )}
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <Button
              onClick={() => setOpen(false)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
