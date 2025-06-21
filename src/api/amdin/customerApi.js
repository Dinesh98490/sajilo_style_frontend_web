import axios from "../api";

// 👉 Create a customer (with image)
export const createCustomerApi = async (formData) => {
  return await axios.post(BASE_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 👉 Get all customers
export const getAllCustomersApi = async () => {
  const response = await axios.get(BASE_URL);
  return response.data.data;
};

// 👉 Get customer by ID
export const getCustomerByIdApi = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

// 👉 Update customer (with image)
export const updateCustomerApi = async (id, formData) => {
  return await axios.put(`${BASE_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 👉 Delete customer
export const deleteCustomerApi = async (id) => {
  return await axios.delete(`${BASE_URL}/${id}`);
};
