import { getAllProductApi } from "../../../api/amdin/productApi";

export const getAllProductService = async () => {
  try {
    const res = await getAllProductApi();
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching products failed" };
  }
};
