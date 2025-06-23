
import { postProductApi } from "../../../api/amdin/productApi";

export const createProductService = async (formData) => {
  try {
    const res = await postProductApi(formData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Product creation failed" };
  }
};
