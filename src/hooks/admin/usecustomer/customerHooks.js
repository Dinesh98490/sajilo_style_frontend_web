import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCustomerService } from "../../../services/admin/customerservice/getAllCustomerService";
import { getOneCustomerService } from "../../../services/admin/customerservice/getOneCustomerService";
import { updateCustomerService } from "../../../services/admin/customerservice/updateCustomerService";
import { deleteCustomerService } from "../../../services/admin/customerservice/deleteCustomerService";
import { createCustomerService } from "../../../services/admin/customerservice/createCustomerService";


// --- Query Hooks (Read operations) ---

/**
 * Hook to fetch all customers.
 */
export const useGetCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomerService,
    // Optional: Add staleTime to avoid refetching too often
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook to fetch a single customer by their ID.
 * @param {string | null} customerId - The ID of the customer to fetch.
 */
export const useGetCustomer = (customerId) => {
  return useQuery({
    // The query key includes the ID to uniquely identify this query
    queryKey: ["customer", customerId],
    // The query function receives the queryKey and can extract the ID
    queryFn: () => getOneCustomerService(customerId),
    // This query will only run if customerId is not null
    enabled: !!customerId,
  });
};


// --- Mutation Hooks (Write operations with Optimistic Updates) ---

const CUSTOMERS_QUERY_KEY = ["customers"];

/**
 * Hook to create a new customer with optimistic update.
 */
export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomerService,
    // Optimistic Update Logic
    onMutate: async (newCustomer) => {
      // 1. Cancel any outgoing refetches to prevent overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: CUSTOMERS_QUERY_KEY });

      // 2. Snapshot the previous value
      const previousCustomers = queryClient.getQueryData(CUSTOMERS_QUERY_KEY);

      // 3. Optimistically update to the new value
      queryClient.setQueryData(CUSTOMERS_QUERY_KEY, (oldData) => {
        const oldCustomers = oldData?.customers || [];
        // NOTE: We add a temporary ID. The server will return the real one.
        return { ...oldData, customers: [...oldCustomers, { ...newCustomer, id: `temp-${Date.now()}` }] };
      });

      // 4. Return a context object with the snapshotted value
      return { previousCustomers };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newCustomer, context) => {
      queryClient.setQueryData(CUSTOMERS_QUERY_KEY, context.previousCustomers);
    },
    // Always refetch after error or success to ensure data consistency
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY });
    },
  });
};


/**
 * Hook to update a customer with optimistic update.
 */
export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) => updateCustomerService(id, formData),
    onMutate: async ({ id, formData }) => {
      await queryClient.cancelQueries({ queryKey: CUSTOMERS_QUERY_KEY });
      const previousCustomers = queryClient.getQueryData(CUSTOMERS_QUERY_KEY);

      queryClient.setQueryData(CUSTOMERS_QUERY_KEY, (oldData) => {
        const oldCustomers = oldData?.customers || [];
        return {
            ...oldData,
            customers: oldCustomers.map(c => c.id === id ? { ...c, ...formData } : c),
        };
      });
      return { previousCustomers };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(CUSTOMERS_QUERY_KEY, context.previousCustomers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY });
    },
  });
};



export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomerService, // Assumes it takes the ID as an argument
    onMutate: async (customerId) => {
      await queryClient.cancelQueries({ queryKey: CUSTOMERS_QUERY_KEY });
      const previousCustomers = queryClient.getQueryData(CUSTOMERS_QUERY_KEY);
      
      queryClient.setQueryData(CUSTOMERS_QUERY_KEY, (oldData) => {
        const oldCustomers = oldData?.customers || [];
        return {
            ...oldData,
            customers: oldCustomers.filter(c => c.id !== customerId),
        };
      });
      return { previousCustomers };
    },
    onError: (err, customerId, context) => {
      queryClient.setQueryData(CUSTOMERS_QUERY_KEY, context.previousCustomers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY });
    },
  });
};