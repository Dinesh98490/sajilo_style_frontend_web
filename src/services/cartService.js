// src/hooks/customer/useCartService.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCartApi,
  getCartByIdApi,
  createCartApi,
  updateCartApi,
  deleteCartApi,
} from "../api/cartApi";

// ✅ Fetch all carts
export const useGetCartsService = async () => {
  try {
    const res = await getCartApi();
    return res.data.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching carts failed" };
  }
};

// ✅ Fetch a single cart by ID
export const useGetCartByIdService = (id) => {
  return useQuery(["cart", id], () => getCartByIdApi(id), {
    enabled: !!id,
  });
};

// ✅ Create a new cart
export const useCreateCartService = async (formData) => {
  try {
    const res = await createCartApi(formData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Creating cart failed" };
  }
};

// ✅ Update a cart
export const useUpdateCartService = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }) => updateCartApi(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
    },
  });
};

// ✅ Delete a cart
export const useDeleteCartService = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCartApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
    },
  });
};
