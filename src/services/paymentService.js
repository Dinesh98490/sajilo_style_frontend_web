import {
    getPaymentsApi,
    getPaymentByIdApi,
    createPaymentApi,
    updatePaymentApi,
    deletePaymentApi,
  } from "../api/paymentApi";
  
  // 1. Create a new payment
  export const createPaymentService = async (formData) => {
    try {
      const res = await createPaymentApi(formData);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Payment creation failed" };
    }
  };
  
  // 2. Get all payments
  export const getAllPaymentsService = async () => {
    try {
      const res = await getPaymentsApi();
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Fetching payments failed" };
    }
  };
  
  // 3. Get a single payment by ID
  export const getOnePaymentService = async (id) => {
    try {
      const res = await getPaymentByIdApi(id);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Fetching payment failed" };
    }
  };
  
  // 4. Update a payment
  export const updatePaymentService = async (id, formData) => {
    try {
      const res = await updatePaymentApi(id, formData);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Updating payment failed" };
    }
  };
  
  // 5. Delete a payment
  export const deletePaymentService = async (id) => {
    try {
      const res = await deletePaymentApi(id);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Deleting payment failed" };
    }
  };
  