import {
    createCustomerApi,
    getAllCustomersApi,
    getCustomerByIdApi,
    updateCustomerApi,
    deleteCustomerApi,
  } from "../../api/amdin/customerApi";
  
  // Just forwarding calls for now (you can add logic/transformations here later)
  export const createCustomer = createCustomerApi;
  export const fetchCustomers = getAllCustomersApi;
  export const getCustomerById = getCustomerByIdApi;
  export const updateCustomer = updateCustomerApi;
  export const deleteCustomer = deleteCustomerApi;
  