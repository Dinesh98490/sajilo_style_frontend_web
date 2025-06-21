import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCustomer,
  fetchCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../../services/admin/customerService";

//  Fetch all customers
export const useCustomers = () =>
  useQuery({
    queryKey: ["customer"],
    queryFn: fetchCustomers,
  });

//  Create customer
export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries(["customer"]);
    },
  });
};

//  Get single customer
export const useCustomerById = (id) =>
  useQuery({
    queryKey: ["customer", id],
    queryFn: () => getCustomerById(id),
    enabled: !!id,
  });

//  Update customer
export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => updateCustomer(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["customer"]);
    },
  });
};

//  Delete customer
export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries(["customer"]);
    },
  });
};
