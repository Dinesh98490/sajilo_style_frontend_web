// components/shared/StatusFilter.jsx
import React from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../landingpagecomponents/herosection/ui/Select"
import { Filter } from "lucide-react"

export default function StatusFilter({ statusFilter, setStatusFilter }) {
  return (
    <Select value={statusFilter} onValueChange={setStatusFilter}>
      <SelectTrigger className="w-[130px] focus:ring-orange-500 focus:border-orange-500">
        <Filter className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Status</SelectItem>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="inactive">Inactive</SelectItem>
        <SelectItem value="suspended">Suspended</SelectItem>
      </SelectContent>
    </Select>
  )
}
