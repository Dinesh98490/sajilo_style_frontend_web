import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllPaymentsService,
  getOnePaymentService,
  createPaymentService,
  updatePaymentService,
  deletePaymentService,
} from "../services/paymentService";

// --- Query Hooks (Read operations) ---

/**
 * Hook to fetch all payments.
 */
export const useGetPayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: getAllPaymentsService,
  });
};

/**
 * Hook to fetch a single payment by ID.
 * @param {string | null} paymentId - The ID of the payment to fetch.
 */
export const useGetPayment = (paymentId) => {
  return useQuery({
    queryKey: ["payment", paymentId],
    queryFn: () => getOnePaymentService(paymentId),
    enabled: !!paymentId,
  });
};

// --- Mutation Hooks (Write operations with Optimistic Updates) ---

const PAYMENTS_QUERY_KEY = ["payments"];

/**
 * Hook to create a new payment.
 */
export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPaymentService,
    onMutate: async (newPayment) => {
      await queryClient.cancelQueries({ queryKey: PAYMENTS_QUERY_KEY });
      const previousPayments = queryClient.getQueryData(PAYMENTS_QUERY_KEY);

      queryClient.setQueryData(PAYMENTS_QUERY_KEY, (oldData) => {
        const oldPayments = oldData?.payments || [];
        return {
          ...oldData,
          payments: [...oldPayments, { ...newPayment, id: `temp-${Date.now()}` }],
        };
      });

      return { previousPayments };
    },
    onError: (err, newPayment, context) => {
      queryClient.setQueryData(PAYMENTS_QUERY_KEY, context.previousPayments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENTS_QUERY_KEY });
    },
  });
};

/**
 * Hook to update a payment.
 */
export const useUpdatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) => updatePaymentService(id, formData),
    onMutate: async ({ id, formData }) => {
      await queryClient.cancelQueries({ queryKey: PAYMENTS_QUERY_KEY });
      const previousPayments = queryClient.getQueryData(PAYMENTS_QUERY_KEY);

      queryClient.setQueryData(PAYMENTS_QUERY_KEY, (oldData) => {
        const oldPayments = oldData?.payments || [];
        return {
          ...oldData,
          payments: oldPayments.map((p) => (p.id === id ? { ...p, ...formData } : p)),
        };
      });

      return { previousPayments };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(PAYMENTS_QUERY_KEY, context.previousPayments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENTS_QUERY_KEY });
    },
  });
};

/**
 * Hook to delete a payment.
 */
export const useDeletePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePaymentService,
    onMutate: async (paymentId) => {
      await queryClient.cancelQueries({ queryKey: PAYMENTS_QUERY_KEY });
      const previousPayments = queryClient.getQueryData(PAYMENTS_QUERY_KEY);

      queryClient.setQueryData(PAYMENTS_QUERY_KEY, (oldData) => {
        const oldPayments = oldData?.payments || [];
        return {
          ...oldData,
          payments: oldPayments.filter((p) => p.id !== paymentId),
        };
      });

      return { previousPayments };
    },
    onError: (err, paymentId, context) => {
      queryClient.setQueryData(PAYMENTS_QUERY_KEY, context.previousPayments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENTS_QUERY_KEY });
    },
  });
};
