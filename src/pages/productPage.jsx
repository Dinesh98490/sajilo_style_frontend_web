import { useState } from "react";
import { Button } from "../components/landingpagecomponents/herosection/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/landingpagecomponents/herosection/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/landingpagecomponents/herosection/ui/tabs";
import { Package, AlertCircle, X, DollarSign, Palette, Ruler } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/landingpagecomponents/herosection/ui/Dialog";
import { Badge } from "../components/landingpagecomponents/herosection/ui/badge";

import ProductTable from "../components/products/ProductTable";
import ProductFormModal from "../components/products/productFormModal";

import {
  useGetProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "../hooks/admin/useProduct/productHooks";

export default function ProductPage() {
  const [formState, setFormState] = useState({ mode: 'closed', product: null });
  const [viewingProduct, setViewingProduct] = useState(null);

  const { data: productsData, isLoading, error: queryError } = useGetProducts();
  const products = Array.isArray(productsData?.data) ? productsData.data : [];

  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const isMutating = createProductMutation.isPending || updateProductMutation.isPending;
  const mutationError = createProductMutation.error || updateProductMutation.error || deleteProductMutation.error;

  const handleAddNewClick = () => {
    setFormState({ mode: 'adding', product: null });
  };

  const handleEditClick = (product) => {
    setFormState({ mode: 'editing', product: product });
  };
  
  const handleFormCancel = () => {
    setFormState({ mode: 'closed', product: null });
  };

  const handleFormSubmit = (formData) => {
    if (formState.mode === 'editing') {
      updateProductMutation.mutate({ id: formState.product._id, formData }, {
        onSuccess: () => handleFormCancel(),
      });
    } else if (formState.mode === 'adding') {
      createProductMutation.mutate(formData, {
        onSuccess: () => handleFormCancel(),
      });
    }
  };
  
  const handleDeleteProduct = (id) => {
    deleteProductMutation.mutate(id);
  };
  
  const handleViewClick = (product) => {
    setViewingProduct(product);
  };

  const runningShoes = products.filter(p => p.category?.name === "Running Shoes");
  const casualShoes = products.filter(p => p.category?.name === "Casual Shoes");
  const formalShoes = products.filter(p => p.category?.name === "Formal Shoes");
  const sportsShoes = products.filter(p => p.category?.name === "Sports Shoes");

  if (isLoading) return <div className="p-8 text-center">Loading products...</div>;
  if (queryError) return <div className="p-8 text-center text-red-500">Error: {queryError.message}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <header className="bg-white border-b border-orange-200 px-6 py-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Product Management
            </h1>
          </div>
          <Button onClick={handleAddNewClick} className="h-12 px-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
            Add New Product
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {mutationError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 border-l-4 border-red-500 rounded-md flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>An error occurred: {mutationError.response?.data?.message || mutationError.message}</span>
          </div>
        )}

        <Tabs defaultValue="running" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white border-2 border-orange-200 p-1 rounded-xl shadow-lg">
            <TabsTrigger value="running" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Running</TabsTrigger>
            <TabsTrigger value="casual" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Casual</TabsTrigger>
            <TabsTrigger value="formal" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Formal</TabsTrigger>
            <TabsTrigger value="sports" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Sports</TabsTrigger>
          </TabsList>

          <TabsContent value="running"><ProductTable products={runningShoes} onView={handleViewClick} onEdit={handleEditClick} onDelete={handleDeleteProduct} /></TabsContent>
          <TabsContent value="casual"><ProductTable products={casualShoes} onView={handleViewClick} onEdit={handleEditClick} onDelete={handleDeleteProduct} /></TabsContent>
          <TabsContent value="formal"><ProductTable products={formalShoes} onView={handleViewClick} onEdit={handleEditClick} onDelete={handleDeleteProduct} /></TabsContent>
          <TabsContent value="sports"><ProductTable products={sportsShoes} onView={handleViewClick} onEdit={handleEditClick} onDelete={handleDeleteProduct} /></TabsContent>
        </Tabs>
      </main>

      <ProductFormModal
        open={formState.mode !== 'closed'}
        onOpenChange={(isOpen) => !isOpen && handleFormCancel()}
        initialData={formState.product}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
        isSubmitting={isMutating}
      />

      <Dialog open={!!viewingProduct} onOpenChange={() => setViewingProduct(null)}>
        <DialogContent className="sm:max-w-2xl bg-white p-0">
          {viewingProduct && (
            <>
              <Button variant="ghost" onClick={() => setViewingProduct(null)} className="absolute right-4 top-4 rounded-full h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
              <DialogHeader className="p-6 pb-4 border-b">
                <DialogTitle className="text-2xl font-bold text-orange-600">{viewingProduct.title}</DialogTitle>
                <DialogDescription>
                  <Badge variant="outline">{viewingProduct.category?.name}</Badge>
                </DialogDescription>
              </DialogHeader>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-semibold text-gray-500 flex items-center gap-2"><DollarSign size={14} /> Price</div>
                    <div className="text-gray-900 font-medium">${viewingProduct.price?.toFixed(2)}</div>

                    <div className="font-semibold text-gray-500 flex items-center gap-2"><Palette size={14} /> Color</div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border" style={{backgroundColor: viewingProduct.color?.toLowerCase()}}/>
                      {viewingProduct.color}
                    </div>

                    <div className="font-semibold text-gray-500 flex items-center gap-2"><Ruler size={14} /> Size</div>
                    <div className="text-gray-900">{viewingProduct.size}</div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-gray-700">Description</h4>
                    <p className="text-sm text-gray-600">{viewingProduct.desc}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700 mb-2">Image</h4>
                  {/* --- CORRECTED: Display a single image using imageUrl --- */}
                  {viewingProduct.imageUrl ? (
                    <img 
                      src={viewingProduct.imageUrl} 
                      alt={viewingProduct.title} 
                      className="rounded-lg object-cover w-full h-auto max-h-80 border"
                    />
                  ) : (
                    <p className="text-sm text-gray-500">No image available.</p>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}