import { useState } from "react"
import { Button } from "../components/landingpagecomponents/herosection/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/landingpagecomponents/herosection/ui/card"
import { Input } from "../components/landingpagecomponents/herosection/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/landingpagecomponents/herosection/ui/Select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/landingpagecomponents/herosection/ui/tabs"
import { Search } from "lucide-react"

import ProductFormModal from "../components/products/productFormModal"
import ProductInfoModal from "../components/products/productInfoModal"
import ShoeTable from "../components/products/shoeTable"
import {
  runningShoes as initialRunningShoes,
  casualShoes as initialCasualShoes,
  formalShoes as initialFormalShoes,
  sportsShoes as initialSportsShoes,
} from "../components/products/ShoeData"
import EditProductModal from "../components/products/editProductModal"

export default function ProductPage() {
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [showProductInfo, setShowProductInfo] = useState(false)
  const [addedProduct, setAddedProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBrand, setFilterBrand] = useState("all")
  const [filterColor, setFilterColor] = useState("all")
  const [editingProduct, setEditingProduct] = useState(null)

  // State for shoe data
  const [runningShoes, setRunningShoes] = useState(initialRunningShoes)
  const [casualShoes, setCasualShoes] = useState(initialCasualShoes)
  const [formalShoes, setFormalShoes] = useState(initialFormalShoes)
  const [sportsShoes, setSportsShoes] = useState(initialSportsShoes)

  const allShoes = [...runningShoes, ...casualShoes, ...formalShoes, ...sportsShoes]
  const brands = [...new Set(allShoes.map((shoe) => shoe.brand))]
  const colors = [...new Set(allShoes.map((shoe) => shoe.color))]

  const handleProductAdded = (product) => {
    setAddedProduct(product)
    setShowProductInfo(true)

    // Add to appropriate category based on type
    switch (product.type) {
      case "Running":
        setRunningShoes((prev) => [...prev, product])
        break
      case "Casual":
        setCasualShoes((prev) => [...prev, product])
        break
      case "Formal":
        setFormalShoes((prev) => [...prev, product])
        break
      case "Basketball":
      case "Soccer":
      case "Cross Training":
        setSportsShoes((prev) => [...prev, product])
        break
      default:
        setCasualShoes((prev) => [...prev, product])
    }
  }

  const handleDeleteShoe = (id) => {
    setRunningShoes((prev) => prev.filter((shoe) => shoe._id !== id))
    setCasualShoes((prev) => prev.filter((shoe) => shoe._id !== id))
    setFormalShoes((prev) => prev.filter((shoe) => shoe._id !== id))
    setSportsShoes((prev) => prev.filter((shoe) => shoe._id !== id))
  }

  const handleEditShoe = (updatedProduct) => {
    const updateInCategory = (shoes, setShoes) => {
      setShoes((prev) => prev.map((shoe) => (shoe._id === updatedProduct._id ? updatedProduct : shoe)))
    }

    updateInCategory(runningShoes, setRunningShoes)
    updateInCategory(casualShoes, setCasualShoes)
    updateInCategory(formalShoes, setFormalShoes)
    updateInCategory(sportsShoes, setSportsShoes)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header with Add Product Button */}
      <header className="bg-white border-b border-orange-200 px-6 py-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Shoe Collections
            </h1>
          </div>
          <Button
            onClick={() => setShowAddProductModal(true)}
            className="h-12 px-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Add Product
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Filters */}
        <Card className="mb-6 border-orange-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
            <CardTitle className="text-orange-800">Filters & Search</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                <Input
                  placeholder="Search Shoes by Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-2 border-orange-200 focus:border-orange-400 hover:border-orange-300 transition-all duration-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shoe Category Tabs */}
        <Tabs defaultValue="running" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border-2 border-orange-200 p-1 rounded-xl shadow-lg">
            <TabsTrigger
              value="running"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white font-semibold transition-all duration-200"
            >
              Running Shoes
            </TabsTrigger>
            <TabsTrigger
              value="casual"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white font-semibold transition-all duration-200"
            >
              Casual Shoes
            </TabsTrigger>
            <TabsTrigger
              value="formal"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white font-semibold transition-all duration-200"
            >
              Formal Shoes
            </TabsTrigger>
            <TabsTrigger
              value="sports"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white font-semibold transition-all duration-200"
            >
              Sports Shoes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="running">
            <ShoeTable
              shoes={runningShoes}
              title="Running Shoes"
              searchTerm={searchTerm}
              filterBrand={filterBrand}
              filterColor={filterColor}
              onDeleteShoe={handleDeleteShoe}
              onEditShoe={(shoe) => setEditingProduct(shoe)}
            />
          </TabsContent>

          <TabsContent value="casual">
            <ShoeTable
              shoes={casualShoes}
              title="Casual Shoes"
              searchTerm={searchTerm}
              filterBrand={filterBrand}
              filterColor={filterColor}
              onDeleteShoe={handleDeleteShoe}
              onEditShoe={(shoe) => setEditingProduct(shoe)}
            />
          </TabsContent>

          <TabsContent value="formal">
            <ShoeTable
              shoes={formalShoes}
              title="Formal Shoes"
              searchTerm={searchTerm}
              filterBrand={filterBrand}
              filterColor={filterColor}
              onDeleteShoe={handleDeleteShoe}
              onEditShoe={(shoe) => setEditingProduct(shoe)}
            />
          </TabsContent>

          <TabsContent value="sports">
            <ShoeTable
              shoes={sportsShoes}
              title="Sports Shoes"
              searchTerm={searchTerm}
              filterBrand={filterBrand}
              filterColor={filterColor}
              onDeleteShoe={handleDeleteShoe}
              onEditShoe={(shoe) => setEditingProduct(shoe)}
            />
          </TabsContent>
        </Tabs>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          {[ 
            { title: "Running Shoes", shoes: runningShoes },
            { title: "Casual Shoes", shoes: casualShoes },
            { title: "Formal Shoes", shoes: formalShoes },
            { title: "Sports Shoes", shoes: sportsShoes },
          ].map(({ title, shoes }) => (
            <Card key={title} className="border-orange-200 shadow-lg hover:shadow-xl transition-all duration-200">
              <CardHeader className="pb-2 bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="text-sm font-medium text-orange-800">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{shoes.length}</div>
                <p className="text-xs text-orange-500">
                  Avg: $
                  {shoes.length > 0
                    ? (shoes.reduce((sum, shoe) => sum + shoe.price, 0) / shoes.length).toFixed(2)
                    : "0.00"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Modals */}
      <ProductFormModal
        open={showAddProductModal}
        onOpenChange={setShowAddProductModal}
        onProductAdded={handleProductAdded}
      />

      <ProductInfoModal open={showProductInfo} onOpenChange={setShowProductInfo} product={addedProduct} />

      <EditProductModal
        open={!!editingProduct}
        onOpenChange={() => setEditingProduct(null)}
        product={editingProduct}
        onProductUpdated={handleEditShoe}
      />
    </div>
  )
}
