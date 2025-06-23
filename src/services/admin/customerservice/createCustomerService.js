import { postCustomerApi } from "../../../api/amdin/customerApi";

export const createCustomerService = async (formData) => {
  try {
    const res = await postCustomerApi(formData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Customer creation failed" };
  }
};
