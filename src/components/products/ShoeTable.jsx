import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../landingpagecomponents/herosection/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../landingpagecomponents/herosection/ui/Table";
import { Badge } from "../landingpagecomponents/herosection/ui/badge";
import { Button } from "../landingpagecomponents/herosection/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../landingpagecomponents/herosection/ui/Dialog";
import { Alert, AlertDescription } from "../landingpagecomponents/herosection/ui/Alert";
import EditProductModal from "./editProductModal";

export default function ShoeTable({
  shoes,
  title,
  searchTerm,
  filterBrand,
  filterColor,
  onDeleteShoe,
  onEditShoe,
}) {
  const [viewProduct, setViewProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  const filterShoes = (shoes) => {
    return shoes.filter((shoe) => {
      const matchesSearch =
        shoe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shoe.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = filterBrand === "all" || shoe.brand === filterBrand;
      const matchesColor = filterColor === "all" || shoe.color === filterColor;
      return matchesSearch && matchesBrand && matchesColor;
    });
  };

  const handleView = (shoe) => setViewProduct(shoe);
  const handleEdit = (shoe) => setEditProduct(shoe);
  const handleDelete = (id) => setShowDeleteConfirm(id);

  const confirmDelete = () => {
    if (showDeleteConfirm) {
      onDeleteShoe(showDeleteConfirm);
      setShowDeleteConfirm(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {title}
            <Badge variant="secondary">{filterShoes(shoes).length} items</Badge>
          </CardTitle>
          {/* Replaced CardDescription with a paragraph */}
          {/* <p className="text-sm text-muted-foreground">
            Manage your {title.toLowerCase()} inventory
          </p> */}
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filterShoes(shoes).map((shoe) => (
                  <TableRow key={shoe._id}>
                    <TableCell>
                      <img
                        src={shoe.images[0] || "/placeholder.svg?height=50&width=50"}
                        alt={shoe.title}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{shoe.title}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {shoe.desc}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{shoe.brand}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${shoe.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{
                            backgroundColor: shoe.color.toLowerCase().includes("/")
                              ? shoe.color.split("/")[0].toLowerCase()
                              : shoe.color.toLowerCase(),
                          }}
                        />
                        {shoe.color}
                      </div>
                    </TableCell>
                    <TableCell>{shoe.size}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{shoe.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(shoe)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(shoe)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(shoe._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Dialog open={!!viewProduct} onOpenChange={() => setViewProduct(null)}>
  <DialogContent className="max-w-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 shadow-xl rounded-xl p-6">
    <DialogHeader>
      <DialogTitle className="text-2xl font-bold text-orange-600">Product Details</DialogTitle>
    
    </DialogHeader>

    {viewProduct && (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-orange-700">Product Information</h4>
            <p><span className="font-medium text-gray-700">Title:</span> {viewProduct.title}</p>
            <p><span className="font-medium text-gray-700">Brand:</span> {viewProduct.brand}</p>
            <p><span className="font-medium text-gray-700">Price:</span> ${viewProduct.price.toFixed(2)}</p>
            <p><span className="font-medium text-gray-700">Type:</span> {viewProduct.type}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-orange-700">Specifications</h4>
            <p><span className="font-medium text-gray-700">Color:</span> {viewProduct.color}</p>
            <p><span className="font-medium text-gray-700">Size:</span> {viewProduct.size}</p>
            <p><span className="font-medium text-gray-700">Material:</span> {viewProduct.material}</p>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-orange-700">Description</h4>
          <p className="text-sm text-gray-600">{viewProduct.desc}</p>
        </div>

        {viewProduct.images && viewProduct.images.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-orange-700">Images</h4>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {viewProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`Product ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-orange-200 shadow-sm hover:scale-105 transition-transform duration-200"
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-orange-200">
          <Button
            onClick={() => setViewProduct(null)}
            className="h-11 px-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
          >
            Close
          </Button>
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>


     
    {/* Delete Confirmation Modal */}
<Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
  <DialogContent className="max-w-md bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl shadow-lg p-6">
    <DialogHeader>
      <DialogTitle className="text-2xl font-bold text-orange-700">
        Confirm Delete
      </DialogTitle>
      <DialogDescription className="text-orange-600">
        Are you sure you want to delete this product? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>

    <Alert variant="destructive" className="bg-orange-100 text-orange-800 border border-orange-300 mt-4">
      <AlertDescription>
        This will permanently delete the product from your inventory.
      </AlertDescription>
    </Alert>

    <div className="flex justify-end gap-3 mt-6">
      <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>
        Cancel
      </Button>
      <Button
        onClick={confirmDelete}
        className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-sm font-semibold"
      >
        Delete Product
      </Button>
    </div>
  </DialogContent>
</Dialog>


      {/* Edit Product Modal */}
      <EditProductModal
        open={!!editProduct}
        onOpenChange={() => setEditProduct(null)}
        product={editProduct}
        onProductUpdated={(updatedProduct) => {
          onEditShoe(updatedProduct);
          setEditProduct(null);
        }}
      />
    </>
  );
}
