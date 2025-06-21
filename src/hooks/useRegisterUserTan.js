import {useMutation} from "@tanstack/react-query";

// useMutation for (POST/UPDATE/PATCH/DELETE)

import { registerUserService } from "../services/authService";
import { toast } from "react-toastify";
import { data, useNavigate } from "react-router-dom";

export  const useRegisterUserTan = () => {
    const navigate=useNavigate()
    return useMutation(
        {
            mutationFn: registerUserService,// which functions to run 
            mutationKey: ['register'], //key for this hook
            onSuccess: (date) => {
                toast.success(data.message || "Registration Successfull")
                navigate('/login')  // after the register success, naviagte to the landing page
            },
            onError: (err) => {
                toast.error(err.message || "Registration Failed")
            }
        },
        
    )
}


