import axios from "../api";

export const getCategoriesApi = () => {
    return axios.get("/admin/category");
  };
  
  export const getCategoryByIdApi = (id) => {
    return axios.get(`/admin/category/${id}`);
  };
  
  export const createCategoryApi = (data) => {
    return axios.post("/admin/category", data);
  };
  
  export const updateCategoryApi = (id, data) => {
    return axios.put(`/admin/category/${id}`, data);
  };
  
  export const deleteCategoryApi = (id) => {
    return axios.delete(`/admin/category/${id}`);
  };