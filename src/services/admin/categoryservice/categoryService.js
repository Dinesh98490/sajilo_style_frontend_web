import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategoriesApi,
  getCategoryByIdApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "../../../api/amdin/categoryApi";

// Fetch all
export const useGetCategoriesService = async (formData) => {
    try{
        const res = await getCategoriesApi(formData);
        return res.data.data;
        
    } catch(err){
        throw err.response?.data ||  { message: "Fetching categorries failed"}
    }
  
};


// Fetch one
export const useGetCategoryByIdService = (id) => {
  return useQuery(["category", id], () => getCategoryByIdApi(id), {
    enabled: !!id,
  });
};

// Create
export const useCreateCategoryService =  async (formData) => {
    try {
        const res = await createCategoryApi(formData);
        toast.success(res?.data?.message || "Category created successfully");
       
          
        return res.data;
      } catch (err) {
        throw err.response?.data || { message: "Category creation failed" };
      }
    };
    

// Update
export const useUpdateCategoryService= () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }) => updateCategoryApi(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};

// Delete
export const useDeleteCategoryService = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCategoryApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};
