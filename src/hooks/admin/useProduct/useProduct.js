import { useQuery } from "@tanstack/react-query";
import { getAllProductService } from "../../../services/admin/productService/getAllProductService";

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: getAllProductService,
  });
