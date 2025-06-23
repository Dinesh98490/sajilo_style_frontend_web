import { deleteProductApi } from "../../../api/amdin/productApi";
export const deleteProductService = async (id) => {
  try {
    const res = await deleteProductApi(id);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Product deletion failed" };
  }
};
