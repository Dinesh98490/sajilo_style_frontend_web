import React from "react";
import { Card, CardHeader, CardTitle, CardContent} from "../dashboard/card";


// top products 
function TopProducts() {
  const products = [
    {
      name: "Air max",
      variant: "Pink - 50 orders",
      bgColor: "bg-pink-100",
      productColor: "bg-pink-500",
      inventory: "700",
      sale: "$1,000.60",
      price: "$1,300.92",
      today: "$17,000.92",
    },
    {
      name: "Nike shoes",
      variant: "Black - 25 orders",
      bgColor: "bg-gray-800",
      productColor: "bg-gray-600",
      inventory: "200",
      sale: "$1,200.60",
      price: "$1,500.92",
      today: "$12,000.82",
    },
  ];


  //top products of the dashboard
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 ${product.bgColor} rounded-lg flex items-center justify-center`}
                >
                  <div className={`w-6 h-6 ${product.productColor} rounded`}></div>
                </div>
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.variant}</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-8 text-sm">
                <div>
                  <p className="text-gray-500">Inventory</p>
                  <p className="font-medium">{product.inventory}</p>
                </div>
                <div>
                  <p className="text-gray-500">Sale</p>
                  <p className="font-medium">{product.sale}</p>
                </div>
                <div>
                  <p className="text-gray-500">Price</p>
                  <p className="font-medium">{product.price}</p>
                </div>
                <div>
                  <p className="text-gray-500">Today</p>
                  <p className="font-medium">{product.today}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default TopProducts;
