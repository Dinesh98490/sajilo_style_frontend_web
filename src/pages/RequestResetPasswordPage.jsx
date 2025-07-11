import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useRequestResetPassword } from "../hooks/useLoginUser"; // Assuming this is a react-query hook
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";

/**
 * A professional and user-friendly "Forgot Password" page with a clean white background
 * and a vibrant orange theme. It preserves all advanced UI states for a great user experience.
 */
export default function RequestResetPasswordPage() {
  const navigate = useNavigate();
  
  // States for a better user experience
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);

  // We keep your original hook call
  const requestResetPassword = useRequestResetPassword();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email address is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setApiError(null);
      try {
        await requestResetPassword.mutateAsync(values);
        setIsSuccess(true);
      } catch (error) {
        const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
        setApiError(errorMessage);
        console.error("Error requesting reset password:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  // --- Success View ---
  if (isSuccess) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl border border-gray-100">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-2xl font-bold text-gray-800">Request Sent!</h2>
          <p className="mt-2 text-gray-600">
            If an account with that email exists, we've sent a link to reset your password.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-orange-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // --- Main Form View ---
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">Forgot Password?</h1>
          <p className="mt-2 text-gray-500">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          {apiError && (
            <div className="rounded-md bg-red-50 p-4 text-center text-sm font-medium text-red-700">
              {apiError}
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`block w-full rounded-lg border bg-gray-50 py-3 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500 ring-red-500"
                    : "border-gray-300 focus:ring-orange-500"
                }`}
                disabled={isLoading}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1.5 text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white shadow-sm transition-all duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          <Link to="/login" className="inline-flex items-center gap-1 font-semibold text-orange-500 hover:text-orange-400">
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}