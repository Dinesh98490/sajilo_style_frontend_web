import { toast } from "react-toastify";
import { loginUserService, requestResetPasswordService, resetPasswordService } from "../services/authService";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../auth/authProvider";
import { useContext } from "react";
// import { useNavigate } from "react-router-dom";

export const useLoginUser = () => {
    // const navigate=useNavigate()
    
    // logics of the login user 
    const { login } = useContext(AuthContext)


    return useMutation(
        {
            mutationFn: loginUserService,
            mutationKey: ['Login-key'],
            onSuccess: (data) => { 
                login(data?.data, data?.token)
                // toast.success(data?.message || "Login Success")
                // navigate('/admin/dashboard')

            },
            onError: (err) => {
                toast.error(err?.message || "Login Failed")
            }
        }
    )
}


export const useRequestResetPassword = () => {
    return useMutation({
      mutationFn: requestResetPasswordService,
      mutationKey: ["request-reset"],
      onSuccess: (data) => {
        toast.success(data.message || "Email Sent ");
      },
      onError: (error) => {
        toast.error(error.message || "Request Failed");
      },
    });
  };


  export const useResetPassword = () => {
    return useMutation({
      mutationKey: ['reset-password'],
      mutationFn: ({ password, token }) => resetPasswordService({ password }, token),
      onSuccess: (data) => {
        toast.success(data.message || "Reset password successful");
      },
      onError: (error) => {
        toast.error(error.message || "Reset password failed");
      },
    });
  };
  




