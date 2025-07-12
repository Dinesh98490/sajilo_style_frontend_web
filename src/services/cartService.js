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
export const useGetCartsService = async (data) => {
  try {
    const res = await getCartApi(data);
    console.log(res.data.data)
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
    console.log("Creating cart with data:", formData);
    const res = await createCartApi(formData);
    console.log("Cart creation response:", res);
    return res.data;
  } catch (err) {
    console.error("Cart creation error:", err);
    console.error("Error response:", err.response);
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
export const useDeleteCartService = async (id) => {
  try {
    const res = await deleteCartApi(id);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Deleting cart failed" };
  }
};
