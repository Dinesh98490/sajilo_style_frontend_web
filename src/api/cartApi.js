import axios from "../api/api";

// export const getCartApi = (data) => {
//   return axios.get("/customer/cart",data);
// };

export const getCartApi = () => {
  return axios.get("/customer/cart");
};


// Get cart by ID
export const getCartByIdApi = (id) => {
  return axios.get(`/customer/cart/${id}`);
};

// Create new cart
export const createCartApi = (data) => {
  return axios.post("/customer/cart", data);
};

// Update cart by ID
export const updateCartApi = (id, data) => {
  return axios.put(`/customer/cart/${id}`, data);
};

// Delete cart by ID
export const deleteCartApi = (id) => {
  return axios.delete(`/customer/cart/${id}`);
};
