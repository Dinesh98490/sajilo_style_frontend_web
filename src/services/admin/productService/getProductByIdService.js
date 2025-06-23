import { getProductByIdApi } from "../../../api/amdin/productApi";

export const getProductByIdService = async (id) => {
  try {
    const res = await getProductByIdApi(id);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching product failed" };
  }
};
