import { useState } from "react"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
  Badge, Button,
  Tabs, TabsContent, TabsList, TabsTrigger
} from "../landingpagecomponents/herosection/ui"
import { Plus, Edit, Trash2, Eye } from "lucide-react"

const runningShoes = []
const casualShoes = []
const formalShoes = []
const sportsShoes = []

export default function ShoeTables() {
  const ShoeTable = ({ shoes, title }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <Badge variant="secondary">{shoes.length} items</Badge>
        </CardTitle>
        <CardDescription>Manage your {title.toLowerCase()} Shoes</CardDescription>
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
                <TableHead>Material</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shoes.map((shoe) => (
                <TableRow key={shoe._id}>
                  <TableCell>
                    <img
                      src={shoe.images[0] || "/placeholder.svg"}
                      alt={shoe.title}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{shoe.title}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-[200px]">{shoe.desc}</p>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="outline">{shoe.brand}</Badge></TableCell>
                  <TableCell className="font-medium">${shoe.price.toFixed(2)}</TableCell>
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
                  <TableCell>{shoe.material}</TableCell>
                  <TableCell><Badge variant="secondary">{shoe.type}</Badge></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline"><Eye className="w-4 h-4" /></Button>
                      <Button size="sm" variant="outline"><Edit className="w-4 h-4" /></Button>
                      <Button size="sm" variant="outline"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Shoe Collections</h1>
          <Button><Plus className="w-4 h-4 mr-2" />Add New Shoe</Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="running" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="running"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Running Shoes
            </TabsTrigger>
            <TabsTrigger
              value="casual"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Casual Shoes
            </TabsTrigger>
            <TabsTrigger
              value="formal"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Formal Shoes
            </TabsTrigger>
            <TabsTrigger
              value="sports"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Sports Shoes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="running">
            <ShoeTable shoes={runningShoes} title="Running Shoes" />
          </TabsContent>
          <TabsContent value="casual">
            <ShoeTable shoes={casualShoes} title="Casual Shoes" />
          </TabsContent>
          <TabsContent value="formal">
            <ShoeTable shoes={formalShoes} title="Formal Shoes" />
          </TabsContent>
          <TabsContent value="sports">
            <ShoeTable shoes={sportsShoes} title="Sports Shoes" />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
