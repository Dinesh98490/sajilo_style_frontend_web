import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductService } from "../../../services/admin/productService/createProductService";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductService,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};
