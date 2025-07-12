import axios from "../api";

export const postProductApi = (formData) =>
  axios.post("/admin/product", formData,{
    headers: { "Content-Type": "multipart/form-data" },
  });


export const getAllProductApi = () => axios.get("/admin/product");

export const getProductByIdApi = (id) => axios.get(`/admin/product/${id}`);

export const updateProductApi = (id, formData) =>
  axios.put(`/admin/product/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteProductApi = (id) => axios.delete(`/admin/product/${id}`);
