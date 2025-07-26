// src/hooks/customer/useCartHooks.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    useGetCartsService,
    useGetCartByIdService,
    useCreateCartService,
    useUpdateCartService,
    useDeleteCartService ,
} from "../services/cartService";

// get carts
export const useGetCarts = (data) => {
  return useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
      const res = await useGetCartsService(data);
      return res;
    },
  });
};

// 🔹 Get Cart by ID
export const useGetCartById = (id) => {
  return useQuery({
    queryKey: ["cart", id],
    queryFn: async () => {
      const res = await useGetCartByIdService(id);
      return res.data.data;
    },
    enabled: !!id,
  });
};

// 🔹 Create New Cart
export const useCreateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const res = await useCreateCartService(formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
    },
  });
};

// 🔹 Update Cart
export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await useUpdateCartService(id, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
    },
  });
};

// 🔹 Delete Cart
export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await useDeleteCartService(id);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
    },
  });
};
