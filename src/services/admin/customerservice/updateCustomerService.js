import { updateCustomerApi } from "../../../api/amdin/customerApi";

export const updateCustomerService = async (id, formData) => {
  try {
    const res = await updateCustomerApi(id, formData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Updating customer failed" };
  }
};
