import {
    postProductApi,
    getAllProductApi,
    getProductByIdApi,
    updateProductApi,
    deleteProductApi,
  } from "../../../api/amdin/productApi"; 
  
  /**
   * Creates a new product.
   * @param {FormData} formData - The product data, including the image file.
   * @returns {Promise<object>} The created product data.
   */
  export const createProductService = async (formData) => {
    try {
      const res = await postProductApi(formData);
      console.log(res.data);
      return res.data;
      
    } catch (err) {
      throw err.response?.data || { message: "Product creation failed" };
    }
  };
  
  
  /**
   * Fetches all products.
   * @returns {Promise<Array>} A list of all products.
   */
  export const getAllProductService = async () => {
    try {
      const res = await getAllProductApi();
      // console.log(res.data.data);
      return res.data.data;
      
    } catch (err) {
      throw err.response?.data || { message: "Fetching products failed" };
    }
  };
  
  /**
   * Fetches a single product by its ID.
   * @param {string} id - The ID of the product.
   * @returns {Promise<object>} The product data.
   */
  export const getOneProductService = async (id) => {
    try {
      const res = await getProductByIdApi(id);
      return res.data;
      console.log``
    } catch (err) {
      throw err.response?.data || { message: "Fetching product failed" };
    }
  };
  
  /**
   * Updates an existing product.
   * @param {string} id - The ID of the product to update.
   * @param {FormData} formData - The updated product data.
   * @returns {Promise<object>} The updated product data.
   */
  export const updateProductService = async (id, formData) => {
    try {
      const res = await updateProductApi(id, formData);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Updating product failed" };
    }
  };
  
  /**
   * Deletes a product by its ID.
   * @param {string} id - The ID of the product to delete.
   * @returns {Promise<object>} A success message.
   */
  export const deleteProductService = async (id) => {
    try {
      const res = await deleteProductApi(id);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Deleting product failed" };
    }
  };