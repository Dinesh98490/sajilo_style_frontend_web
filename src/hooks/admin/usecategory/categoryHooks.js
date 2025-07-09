import { useQuery } from '@tanstack/react-query';
import { useGetCategoriesService } from '../../../services/admin/categoryservice/categoryService';

export const useGetCategories = () => {
    return useQuery({
      queryKey: ["customers"],
      queryFn: useGetCategoriesService,
     
      
    });
  };
  