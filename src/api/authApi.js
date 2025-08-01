import axios  from "./api"

export const registerUserApi = (data) => {
  console.log("Register Data:", JSON.stringify(data, null, 2));
  return axios.post("/auth/register", data)
}
export const loginUserApi = (data) => axios.post("/auth/login", data)



export const requestResetPasswordApi = (data) => axios.post("/auth/request-reset", data)

export const resetPasswordApi = (data, token) => {
    return axios.post(`/auth/reset-password/${token}`, data);
  };



