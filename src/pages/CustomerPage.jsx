import { useState } from "react";
import CustomerStats from "../components/customer/customerStats";
import CustomerTable from "../components/customer/CustomerTable";
import AddCustomerDialog from "../components/customer/AddCustomerDialog";
import EditCustomerDialog from "../components/customer/EditCustomerDialog";
import ViewCustomerDialog from "../components/customer/ViewCustomerDialog";
import DeleteCustomerDialog from "../components/customer/DeleteCustomerDialog";
import SearchBar from "../components/customer/SearchBar";
import { Button } from "../components/landingpagecomponents/herosection/ui/button";
import { UserPlus } from "lucide-react";
import initialCustomers from "../components/customer/initialCustomer";

export default function CustomerPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [viewingCustomer, setViewingCustomer] = useState(null);
  const [deletingCustomer, setDeletingCustomer] = useState(null);
  const [addingCustomer, setAddingCustomer] = useState(false);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      customer.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-orange-50 via-white to-orange-50 p-6">
      <CustomerStats customers={customers} />

      <div className="flex flex-col sm:flex-row justify-between mt-8 gap-6 max-w-5xl mx-auto">
        <div className="flex gap-4 w-full sm:max-w-xl">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            className="shadow-md rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-orange-400 transition"
          />

          {/* Stylish status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700 font-medium shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer transition"
            aria-label="Filter customers by status"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <Button
          className="bg-orange-600 hover:bg-orange-700 shadow-lg transition duration-300 flex items-center justify-center gap-2 px-6 py-3 rounded-md"
          onClick={() => setAddingCustomer(true)}
        >
          <UserPlus className="h-5 w-5" />
          Add Customer
        </Button>
      </div>

      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <CustomerTable
          customers={filteredCustomers}
          onEdit={setEditingCustomer}
          onDelete={setDeletingCustomer}
          onView={setViewingCustomer}
        />
      </div>

      <AddCustomerDialog
        open={addingCustomer}
        setOpen={setAddingCustomer}
        setCustomers={setCustomers}
        customers={customers}
      />

      <EditCustomerDialog
        customer={editingCustomer}
        setCustomer={setEditingCustomer}
        setCustomers={setCustomers}
        customers={customers}
      />

      <ViewCustomerDialog
        customer={viewingCustomer}
        setCustomer={setViewingCustomer}
        onEdit={setEditingCustomer}
      />

      <DeleteCustomerDialog
        customer={deletingCustomer}
        setCustomer={setDeletingCustomer}
        setCustomers={setCustomers}
        customers={customers}
      />
    </div>
  );
}
