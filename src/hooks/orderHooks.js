import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllCustomerOrdersService,
  getOneCustomerOrderService,
  createCustomerOrderService,
  updateCustomerOrderService,
  deleteCustomerOrderService,
} from "../services/orderService";

// --- Query Hooks (Read operations) ---

/**
 * Hook to fetch all customer orders.
 */
export const useGetCustomerOrders = () => {
  return useQuery({
    queryKey: ["customerOrders"],
    queryFn: getAllCustomerOrdersService,
  });
};

/**
 * Hook to fetch a single customer order by ID.
 * @param {string | null} orderId - The ID of the order to fetch.
 */
export const useGetCustomerOrder = (orderId) => {
  return useQuery({
    queryKey: ["customerOrder", orderId],
    queryFn: () => getOneCustomerOrderService(orderId),
    enabled: !!orderId,
  });
};

// --- Mutation Hooks (Write operations with Optimistic Updates) ---

const CUSTOMER_ORDERS_QUERY_KEY = ["customerOrders"];

/**
 * Hook to create a new customer order.
 */
export const useCreateCustomerOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomerOrderService,
    onMutate: async (newOrder) => {
      await queryClient.cancelQueries({ queryKey: CUSTOMER_ORDERS_QUERY_KEY });
      const previousOrders = queryClient.getQueryData(CUSTOMER_ORDERS_QUERY_KEY);

      queryClient.setQueryData(CUSTOMER_ORDERS_QUERY_KEY, (oldData) => {
        const oldOrders = oldData?.orders || [];
        return {
          ...oldData,
          orders: [...oldOrders, { ...newOrder, id: `temp-${Date.now()}` }],
        };
      });

      return { previousOrders };
    },
    onError: (err, newOrder, context) => {
      queryClient.setQueryData(CUSTOMER_ORDERS_QUERY_KEY, context.previousOrders);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_ORDERS_QUERY_KEY });
    },
  });
};

/**
 * Hook to update a customer order.
 */
export const useUpdateCustomerOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) => updateCustomerOrderService(id, formData),
    onMutate: async ({ id, formData }) => {
      await queryClient.cancelQueries({ queryKey: CUSTOMER_ORDERS_QUERY_KEY });
      const previousOrders = queryClient.getQueryData(CUSTOMER_ORDERS_QUERY_KEY);

      queryClient.setQueryData(CUSTOMER_ORDERS_QUERY_KEY, (oldData) => {
        const oldOrders = oldData?.orders || [];
        return {
          ...oldData,
          orders: oldOrders.map((order) =>
            order.id === id ? { ...order, ...formData } : order
          ),
        };
      });

      return { previousOrders };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(CUSTOMER_ORDERS_QUERY_KEY, context.previousOrders);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_ORDERS_QUERY_KEY });
    },
  });
};

/**
 * Hook to delete a customer order.
 */
export const useDeleteCustomerOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomerOrderService,
    onMutate: async (orderId) => {
      await queryClient.cancelQueries({ queryKey: CUSTOMER_ORDERS_QUERY_KEY });
      const previousOrders = queryClient.getQueryData(CUSTOMER_ORDERS_QUERY_KEY);

      queryClient.setQueryData(CUSTOMER_ORDERS_QUERY_KEY, (oldData) => {
        const oldOrders = oldData?.orders || [];
        return {
          ...oldData,
          orders: oldOrders.filter((order) => order.id !== orderId),
        };
      });

      return { previousOrders };
    },
    onError: (err, orderId, context) => {
      queryClient.setQueryData(CUSTOMER_ORDERS_QUERY_KEY, context.previousOrders);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_ORDERS_QUERY_KEY });
    },
  });
};
