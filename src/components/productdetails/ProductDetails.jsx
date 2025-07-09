import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Heart,
  Star,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Button } from "../landingpagecomponents/herosection/ui/button";
import { Badge } from "../landingpagecomponents/herosection/ui/badge";
import {
  Card,
  CardContent,
} from "../landingpagecomponents/herosection/ui/card";
import Separator from "./Seperator";

const availableColors = ["Navy Blue", "Black", "White", "Gray", "Red"];
const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductDetailsPage() {
  const { id } = useParams();
  console.log(id)
  const [productData, setProductData] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/admin/product/${id}`);
        console.log(res.data.data)
        setProductData(res.data.data);
        setSelectedColor(res.data.data.color || "Navy Blue");
        setSelectedSize(res.data.data.size || "M");
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!productData) {
    return <div className="text-center py-20 text-gray-600">Loading...</div>;
  }

  const handleAddToCart = () => {
    console.log("Add to Cart:", {
      id: productData._id,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-white shadow-sm">
              <img
                src={`http://localhost:5050/${productData.image}`}
                alt={productData.title}
                className="object-contain w-full h-full"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit">
              {productData.categoryId?.name || "Category"}
            </Badge>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {productData.title}
              </h1>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.0) • 128 reviews</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-900">
                  Rs. {productData.price.toLocaleString()}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  Rs. {(productData.price * 1.2).toFixed(2)}
                </span>
                <Badge variant="destructive">20% OFF</Badge>
              </div>
              <p className="text-sm text-green-600">Free shipping on orders over Rs. 1000</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-gray-600 leading-relaxed">{productData.desc}</p>
            </div>

            <Separator />

            {/* Color */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">
                Color: <span className="font-normal">{selectedColor}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-md border-2 text-sm font-medium transition-colors ${
                      selectedColor === color
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">
                Size: <span className="font-normal">{selectedSize}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-md border-2 text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button onClick={handleAddToCart} className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={handleWishlist}
                  className="rounded-full px-5"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted ? "fill-current text-red-500" : ""
                    }`}
                  />
                </Button>
              </div>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6">
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <Card>
                <CardContent className="flex items-center space-x-2 p-4">
                  <Truck className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-gray-500">On orders over Rs. 1000</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center space-x-2 p-4">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Easy Returns</p>
                    <p className="text-xs text-gray-500">30-day return policy</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center space-x-2 p-4">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium">Secure Payment</p>
                    <p className="text-xs text-gray-500">SSL encrypted</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Meta */}
            <div className="pt-6 text-sm text-gray-500 space-y-1">
              <p>Product ID: {productData._id}</p>
              <p>Added: {new Date(productData.createdAt).toLocaleDateString()}</p>
              <p>Updated: {new Date(productData.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

