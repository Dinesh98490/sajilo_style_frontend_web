import axios from "../api";

// Get all payments
export const getPaymentsApi = () => {
  return axios.get("/customer/payment");
};

// Get a single payment by ID
export const getPaymentByIdApi = (id) => {
  return axios.get(`/customer/payment${id}`);
};

// Create a new payment
export const createPaymentApi = (data) => {
  return axios.post("/customer/payment", data);
};

// Update an existing payment
export const updatePaymentApi = (id, data) => {
  return axios.put(`/customer/payment${id}`, data);
};

// Delete a payment
export const deletePaymentApi = (id) => {
  return axios.delete(`/customer/payment${id}`);
};
