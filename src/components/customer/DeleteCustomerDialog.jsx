import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./Dialog";
import { Button } from "../landingpagecomponents/herosection/ui/button";
import { AlertTriangle, X } from "lucide-react";

export default function DeleteCustomerDialog({ customer, setCustomer, setCustomers, customers }) {
  const confirmDelete = () => {
    if (customer) {
      setCustomers(customers.filter((c) => c.id !== customer.id));
      setCustomer(null);
    }
  };

  return (
    <Dialog open={!!customer} onOpenChange={() => setCustomer(null)}>
      <DialogContent
        className="relative w-full h-full max-w-none bg-white border-0 p-0 flex flex-col items-center justify-center overflow-auto"
      >
        {/* Close Button */}
        <button
          onClick={() => setCustomer(null)}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition z-10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Main Content */}
        <div className="text-center px-6 py-8 w-full max-w-md">
          <AlertTriangle className="mx-auto h-10 w-10 text-red-600 mb-4" />

          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-700">
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-gray-700 text-base mt-2">
              You're about to permanently delete this customer. This action is irreversible.
            </DialogDescription>
          </DialogHeader>

          {/* Customer card */}
          {customer && (
            <div className="mt-8 border rounded-lg p-4 bg-gray-50 shadow-sm">
              <img
                src={customer.avatar || "/placeholder.svg"}
                alt={customer.name}
                className="mx-auto h-20 w-20 rounded-full border-4 border-orange-400 bg-orange-100 shadow-md"
              />
              <h2 className="mt-4 text-lg font-semibold text-gray-900">{customer.name}</h2>
              <p className="text-sm text-gray-600">{customer.email}</p>
            </div>
          )}

          {/* Confirmation text */}
          <p className="mt-6 text-sm text-gray-700 font-medium">
            Are you sure you want to delete this customer from the system?
          </p>

          {/* Footer buttons */}
          <DialogFooter className="mt-8 flex justify-center gap-6">
            <Button
              onClick={() => setCustomer(null)}
              className="px-8 py-2 text-gray-700 border border-gray-300 hover:bg-gray-100 transition bg-white"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              className="px-8 py-2 bg-red-600 hover:bg-red-700 text-white shadow-md transition"
            >
              Delete
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
