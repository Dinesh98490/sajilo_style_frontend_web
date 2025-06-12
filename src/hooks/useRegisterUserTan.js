import {useMutation} from "@tanstack/react-query";

// useMutation for (POST/UPDATE/PATCH/DELETE)

import { registerUserService } from "../services/authService";
import { toast } from "react-toastify";
import { data } from "react-router-dom";

export  const useRegisterUserTan = () => {
    return useMutation(
        {
            mutationFn: registerUserService,// which functions to run 
            mutationKey: ['register'], //key for this hook
            onSuccess: (date) => {
                toast.success(data.message || "Registration Successfull")
            },
            onError: (err) => {
                toast.error(err.message || "Registration Failed")
            }
        },
        
    )
}

// mutationFn : (formData) =>  registerUserService(formData)
