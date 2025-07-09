
import { useState } from "react";
import { Card, CardContent } from "../landingpagecomponents/herosection/ui/card";
import { Button } from "../landingpagecomponents/herosection/ui/button";
import { Badge } from "../landingpagecomponents/herosection/ui/badge";
import { Input } from "../landingpagecomponents/herosection/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../landingpagecomponents/herosection/ui/Table";
import { Edit3, Trash2, Search, Package, DollarSign, Palette, Ruler, Eye } from "lucide-react";
import { useGetProducts } from "../../hooks/admin/useProduct/productHooks";



export default function ProductTable({ onEdit, onDelete, onView }) {
  const { data: fetchProducts = []} = useGetProducts()
  console.log(fetchProducts);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(fetchProducts)

  const filteredProducts = fetchProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category?.name && product.category.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  

  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardContent className="p-0">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by product title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white"
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">
              {searchTerm ? "No products found" : "No products yet"}
            </h3>
            <p className="text-gray-500 text-lg">
              {searchTerm ? "Try adjusting your search terms." : "Click 'Add New Product' to get started."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="text-gray-700 font-semibold py-4">
                    <div className="flex items-center gap-2"><Package className="w-4 h-4" /> Product</div>
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold py-4">Category</TableHead>
                  <TableHead className="text-gray-700 font-semibold py-4">
                    <div className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> Price</div>
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold py-4">
                    <div className="flex items-center gap-2"><Palette className="w-4 h-4" /> Color</div>
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold py-4">
                    <div className="flex items-center gap-2"><Ruler className="w-4 h-4" /> Size</div>
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold text-center py-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product._id} className="hover:bg-orange-50/30 transition-colors">
                    <TableCell className="py-4">
                      <div className="flex items-center gap-4">
                        <img
                          // --- CORRECTED: Use `imageUrl` from the backend API ---
                          src={`http://localhost:5050/${product.image}`}
                          alt={product.title}
                          className="w-14 h-14 object-cover rounded-lg border-2 border-orange-100"
                        />
                        <div>
                          <div className="font-semibold text-gray-900 text-base">{product.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-[200px]">{product.desc}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.categoryId?.title || "N/A"}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: product.color.toLowerCase() }}
                        />
                        {product.color}
                      </div>
                    </TableCell>
                    <TableCell>{product.size}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => onView(product)} className="h-9 w-9 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg" title="View Details">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => onEdit(product)} className="h-9 w-9 p-0 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg" title="Edit Product">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => { if (window.confirm(`Are you sure you want to delete "${product.title}"? This action cannot be undone.`)) { onDelete(product._id); } }} className="h-9 w-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg" title="Delete Product">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}