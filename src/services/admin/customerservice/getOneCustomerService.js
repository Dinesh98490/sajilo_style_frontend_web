import { getOneCustomerApi } from "../../../api/amdin/customerApi";

export const getOneCustomerService = async (id, formData) => {
  try {
    const res = await getOneCustomerApi(id, formData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching customers failed" };
  }
};
