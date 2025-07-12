import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useResetPassword } from "../hooks/useLoginUser";
import { Lock, ArrowLeft, Loader2, CheckCircle } from "lucide-react";

/**
 * A professional and user-friendly "Reset Password" page, styled consistently
 * with the "Forgot Password" flow. Features a clean white background, an orange theme,
 * and clear states for loading, success, and error.
 */
export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  // States for a better user experience
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Your original hook call remains the same
  const resetPassword = useResetPassword();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your new password"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      setApiError(null);
      resetPassword.mutate(
        { password: values.password, token },
        {
          onSuccess: () => {
            setIsSuccess(true); // Show success screen
          },
          onError: (error) => {
            const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
            setApiError(errorMessage);
            console.error("Reset error:", error);
          },
          onSettled: () => {
            setIsLoading(false); // Stop loading state
          },
        }
      );
    },
  });

  // --- Success View ---
  if (isSuccess) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl border border-gray-100">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-2xl font-bold text-gray-800">Password Reset!</h2>
          <p className="mt-2 text-gray-600">
            Your password has been changed successfully. You can now log in with your new password.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-orange-600"
          >
            Go to Login
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
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">Set New Password</h1>
          <p className="mt-2 text-gray-500">
            Create a strong new password for your account.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          {apiError && (
            <div className="rounded-md bg-red-50 p-4 text-center text-sm font-medium text-red-700">
              {apiError}
            </div>
          )}

          {/* New Password Field */}
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter new password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`block w-full rounded-lg border bg-gray-50 py-3 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500 ring-red-500"
                    : "border-gray-300 focus:ring-orange-500"
                }`}
                disabled={isLoading}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1.5 text-sm text-red-600">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className={`block w-full rounded-lg border bg-gray-50 py-3 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? "border-red-500 ring-red-500"
                    : "border-gray-300 focus:ring-orange-500"
                }`}
                disabled={isLoading}
              />
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="mt-1.5 text-sm text-red-600">{formik.errors.confirmPassword}</p>
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
                <span>Resetting...</span>
              </>
            ) : (
              "Reset Password"
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