import { toast } from "react-toastify";
import { loginUserService } from "../services/authService";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../auth/authProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const useLoginUser = () => {
    const navigate=useNavigate()
    const {login} = useContext(AuthContext)
    return useMutation(
        {
            mutationFn: loginUserService,
            mutationKey: ['Login-key'],
            onSuccess: (data) => { 
                login(data?.data, data?.token)
                toast.success(data?.message || "Login Success")
                navigate('/')

            },
            onError: (err) => {
                toast.error(err?.message || "Login Failed")
            }
        }
    )
}