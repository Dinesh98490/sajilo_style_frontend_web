import React from "react";
import { Card, CardContent } from "../herosection/ui/card";
import { Button } from "../herosection/ui/button";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Card className="group relative overflow-hidden bg-white shadow-md rounded-xl hover:shadow-xl transition-shadow duration-300 max-w-[250px] mx-auto cursor-pointer">
      <CardContent className="p-3">
        <div className="aspect-square relative mb-3 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={`http://localhost:5050/${product.image}`}
            alt={product.title}
            className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Info */}
        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-gray-900 line-clamp-1">
            {product.title}
          </h3>

          <div className="text-sm font-bold text-gray-900">
            Rs. {product.price.toLocaleString()}
          </div>

          <div className="flex items-center justify-between mt-2">
            <Button
              size="xs"
              className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] px-1.5 w-fit rounded-full transition-colors duration-200"
            >
              Add to Cart
            </Button>

            <Link
              to={`/productdetails/${product._id}`}
              className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
            >
              View Details
            </Link>

            {product.rating && (
              <div className="flex items-center gap-1 text-[11px] text-orange-600 select-none">
                <Star className="h-4 w-4 fill-orange-400" />
                {product.rating}/5
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
