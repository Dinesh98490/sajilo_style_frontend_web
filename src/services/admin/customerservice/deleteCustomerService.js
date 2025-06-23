import { deleteCustomerApi } from "../../../api/amdin/customerApi";

export const deleteCustomerService = async (id) => {
  try {
    const res = await deleteCustomerApi(id);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Deleting customer failed" };
  }
};
