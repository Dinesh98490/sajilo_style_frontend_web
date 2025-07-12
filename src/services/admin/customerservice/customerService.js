// src/services/admin/customerService.js

// 1. All API function imports are consolidated at the top.
// NOTE: I corrected the typo 'amdin' to 'admin'.
// Please ensure your folder path is correct (e.g., /src/api/admin/customerApi.js).
import {
    postCustomerApi,
    getAllCustomerApi,
    getOneCustomerApi,
    updateCustomerApi,
    deleteCustomerApi,
  } from "../../../api/amdin/customerApi";
  
 
  export const createCustomerService = async (formData) => {
    try {
      const res = await postCustomerApi(formData);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Customer creation failed" };
    }
  };
  
 
  export const getAllCustomerService = async () => {
    try {
      const res = await getAllCustomerApi();
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Fetching customers failed" };
    }
  };
  
 
  export const getOneCustomerService = async (id) => {
    try {
      // Note: getOneCustomerApi likely only needs the 'id'
      const res = await getOneCustomerApi(id);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Fetching customer failed" };
    }
  };
  
 
  export const updateCustomerService = async (id, formData) => {
    try {
      const res = await updateCustomerApi(id, formData);
      return res.data;
    } catch (err)
   {
      throw err.response?.data || { message: "Updating customer failed" };
    }
  };
  

  export const deleteCustomerService = async (id) => {
    try {
      const res = await deleteCustomerApi(id);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Deleting customer failed" };
    }
  };