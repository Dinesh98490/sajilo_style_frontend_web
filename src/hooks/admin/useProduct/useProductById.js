import { useQuery } from "@tanstack/react-query";
import { getProductByIdService } from "../../../services/admin/productService/getProductByIdService";

export const useProductById = (id) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductByIdService(id),
    enabled: !!id,
  });
