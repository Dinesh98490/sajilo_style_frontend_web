import axios from "../api";

//  Create a new order
export const postCustomerApi = (params) => axios.post("/admin/customer", params,{
    headers: { "Content-Type": "multipart/form-data" },
});

// Get all orders
export const getAllCustomerApi = () => axios.get("/admin/customer");


//Get an order by Id
export const getOneCustomerApi = () => axios.get(`/admin/customer/${id}`, params);

// Update an order by ID
export const updateCustomerApi = (id, params) => axios.put(`/admin/customer/${id}`, params,{
    headers: { "Content-Type": "multipart/form-data" },
});

//  Delete an order by ID
export const deleteCustomerApi = (id) => axios.delete(`/admin/customer/${id}`);

