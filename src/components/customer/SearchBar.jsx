// components/shared/SearchBar.jsx
import React from "react"
import { Input } from "../landingpagecomponents/herosection/ui/input"
import { Search } from "lucide-react"

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative flex-1 md:max-w-sm">
      <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search customers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-8 focus:ring-orange-500 focus:border-orange-500"
      />
    </div>
  )
}
