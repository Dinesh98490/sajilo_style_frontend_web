// import { useQuery } from '@tanstack/react-query';
// import { useGetCategoriesService , useGetCategoryByIdService,useCreateCategoryService,useUpdateCategoryService, useDeleteCategoryService } from '../../../services/admin/categoryservice/categoryService';

// export const useGetCategories = () => {
//     return useQuery({
//       queryKey: ["customers"],
//       queryFn: useGetCategoriesService,
     
      
//     });





//   };

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useGetCategoriesService,
  useGetCategoryByIdService,
  useCreateCategoryService,
  useUpdateCategoryService,
  useDeleteCategoryService,
} from "../../../services/admin/categoryservice/categoryService";

// hook to get all categories
export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],  // fixed key from "customers" to "categories"
    queryFn: useGetCategoriesService,
  });
};

// Hook to get category by id
export const useGetCategoryById = (id) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => useGetCategoryByIdService(id),
    enabled: !!id,
  });
};

// create a hook category
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => useCreateCategoryService(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};

// hook to update the category
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => useUpdateCategoryService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};

// Hook to delete a category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => useDeleteCategoryService(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};


