import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductService } from "../../../services/admin/productService/updateProductService";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) => updateProductService(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};
