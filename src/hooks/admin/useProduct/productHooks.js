
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  getAllProductService, 
  getOneProductService, 
  updateProductService, 
  deleteProductService, 
  createProductService 
} from "../../../services/admin/productService/productService";

// --- Query Hooks (for reading data) ---

const PRODUCTS_QUERY_KEY = ["products"];


export const useGetProducts = () => {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: getAllProductService,
    
  });
};


export const useGetProduct = (productId) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getOneProductService(productId),
    enabled: !!productId, // The query will not run until a productId is provided.
  });
};


// --- Mutation Hooks (for creating, updating, deleting data) ---

/**
 * Hook to create a new product with optimistic updates.
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductService,
    onMutate: async (newProductData) => {
      await queryClient.cancelQueries({ queryKey: PRODUCTS_QUERY_KEY });

      const previousProducts = queryClient.getQueryData(PRODUCTS_QUERY_KEY);

      queryClient.setQueryData(PRODUCTS_QUERY_KEY, (oldData) => {
        const oldProductsArray = oldData?.data || [];
        
  
        const newImageFiles = newProductData.getAll('images');
        
       console.log("test for new product",newProductData)
        const newImagePreviews = newImageFiles.map(file => {
         
          if (file instanceof File) {
            return URL.createObjectURL(file);
          }
          return null;
        }).filter(Boolean); 

        
        const optimisticProduct = {
          
          ...Object.fromEntries(newProductData.entries()),
          _id: `temp-${Date.now()}`,
          
         
          images: newImagePreviews, 
        };
        
        
        delete optimisticProduct.images; 
        optimisticProduct.images = newImagePreviews;

        // --- FIX ENDS HERE ---

        return { ...oldData, data: [...oldProductsArray, optimisticProduct] };
      });

      
      return { previousProducts };
    },
    
    onError: (err, newProduct, context) => {
      queryClient.setQueryData(PRODUCTS_QUERY_KEY, context.previousProducts);
    },
  
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });
};

/**
 * Hook to update a product with optimistic updates.
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) => updateProductService(id, formData),
    onMutate: async ({ id, formData }) => {
      await queryClient.cancelQueries({ queryKey: PRODUCTS_QUERY_KEY });
      const previousProducts = queryClient.getQueryData(PRODUCTS_QUERY_KEY);
      
      const optimisticUpdateData = Object.fromEntries(formData.entries());

      queryClient.setQueryData(PRODUCTS_QUERY_KEY, (oldData) => {
        const oldProductsArray = oldData?.data || [];
        return {
          ...oldData,
          data: oldProductsArray.map(p => 
            p._id === id ? { ...p, ...optimisticUpdateData } : p
          ),
        };
      });
      return { previousProducts };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(PRODUCTS_QUERY_KEY, context.previousProducts);
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
    },
  });
};

/**
 * Hook to delete a product with optimistic updates.
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductService,
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: PRODUCTS_QUERY_KEY });
      const previousProducts = queryClient.getQueryData(PRODUCTS_QUERY_KEY);
      
      queryClient.setQueryData(PRODUCTS_QUERY_KEY, (oldData) => {
        const oldProductsArray = oldData?.data || [];
        return {
          ...oldData,
          data: oldProductsArray.filter(p => p._id !== productId),
        };
      });
      return { previousProducts };
    },
    onError: (err, productId, context) => {
      queryClient.setQueryData(PRODUCTS_QUERY_KEY, context.previousProducts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });
};