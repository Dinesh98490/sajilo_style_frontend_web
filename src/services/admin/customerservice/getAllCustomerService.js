// import { getAllCustomerApi } from "../../api/admin/customerApi";
import { getAllCustomerApi } from "../../../api/amdin/customerApi";

export const getAllCustomerService = async () => {
  try {
    const res = await getAllCustomerApi();
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching customers failed" };
  }
};
