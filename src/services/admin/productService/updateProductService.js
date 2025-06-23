import { updateProductApi } from "../../../api/amdin/productApi";

export const updateProductService = async (id, formData) => {
  try {
    const res = await updateProductApi(id, formData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Product update failed" };
  }
};
