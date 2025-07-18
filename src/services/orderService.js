// 1. Import all customer order API functions (make sure the path is correct)
import {
    createCustomerOrderApi,
    getCustomerOrdersApi,
    getCustomerOrderByIdApi,
    updateCustomerOrderApi,
    deleteCustomerOrderApi,
  } from "../api/orderApi";
  
  // 2. Create a customer order
  export const createCustomerOrderService = async (formData) => {
    try {
      const res = await createCustomerOrderApi(formData);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Customer order creation failed" };
    }
  };
  
  // 3. Get all customer orders
  export const getAllCustomerOrdersService = async () => {
    try {
      const res = await getCustomerOrdersApi();
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Fetching customer orders failed" };
    }
  };
  
  // 4. Get a single customer order by ID
  export const getOneCustomerOrderService = async (id) => {
    try {
      const res = await getCustomerOrderByIdApi(id);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Fetching customer order failed" };
    }
  };
  
  // 5. Update a customer order
  export const updateCustomerOrderService = async (id, formData) => {
    try {
      const res = await updateCustomerOrderApi(id, formData);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Updating customer order failed" };
    }
  };
  
  // 6. Delete a customer order
  export const deleteCustomerOrderService = async (id) => {
    try {
      const res = await deleteCustomerOrderApi(id);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Deleting customer order failed" };
    }
  };
  