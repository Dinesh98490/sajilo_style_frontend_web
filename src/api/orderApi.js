import axios from "./api";

// Get all customer orders
export const getCustomerOrdersApi = () => {
  return axios.get("/customer/order");
};

// Get a single customer order by ID
export const getCustomerOrderByIdApi = (id) => {
  return axios.get(`/customer/order/${id}`);
};

// Create a new customer order
export const createCustomerOrderApi = (data) => {
  return axios.post("/customer/order", data);
};

// Update an existing customer order
export const updateCustomerOrderApi = (id, data) => {
  return axios.put(`/customer/order/${id}`, data);
};

// Delete a customer order
export const deleteCustomerOrderApi = (id) => {
  return axios.delete(`/customer/order/${id}`);
};
