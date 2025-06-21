import React from "react";
import { Star } from "lucide-react";
import { Button } from "../herosection/ui/button";
import { Card, CardContent } from "../herosection/ui/card";
import { Badge } from "../herosection/ui/badge";

export function ProductCard({ product }) {
  return (
    <Card className="group relative overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      {product.discount && (
        <Badge className="absolute top-2 left-2 z-10 bg-orange-500 hover:bg-orange-600 text-white text-xs px-2 py-0.5">
          Disc {product.discount}
        </Badge>
      )}

      <CardContent className="p-4">
        <div className="aspect-square relative mb-3 bg-gray-50 rounded-lg overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="object-contain group-hover:scale-105 transition-transform duration-200 w-full h-full"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-gray-900 line-clamp-2 text-sm min-h-[1rem]">
            {product.name}
          </h3>

          <p className="text-base font-semibold text-gray-900">
            Rs. {product.price.toLocaleString()}
          </p>

          <div className="flex items-center justify-between">
            {product.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
                <span className="text-xs font-medium text-gray-700">
                  {product.rating}/5
                </span>
              </div>
            )}

            {product.hasShopNow && (
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 text-xs rounded-full"
              >
                Shop Now
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
