import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRegisterUserTan } from '../../hooks/useRegisterUserTan';

export default function RegisterForm() {
  const { mutate, data, error, isPending, isSuccess, isError } = useRegisterUserTan();

  const validationSchema = Yup.object({
    fullname: Yup.string().required('Full name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .matches(/@email\.com$/, 'Email should be in @email.com format')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    role: Yup.string().required('Role is required'),
  });

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
      phone: '',
      role: '',
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg p-8 rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Register</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {[
          { name: 'fullname', placeholder: 'Full Name' },
          { name: 'email', placeholder: 'Email' },
          { name: 'phone', placeholder: 'Phone Number' },
          { name: 'role', placeholder: 'Role' },
        ].map(({ name, placeholder }) => (
          <div key={name}>
            <input
              name={name}
              placeholder={placeholder}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik.touched[name] && formik.errors[name] && (
              <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>
            )}
          </div>
        ))}

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
        >
          {isPending ? 'Registering...' : 'Register'}
        </button>
      </form>

      {isError && <p className="text-red-600 text-center mt-4">{error?.message}</p>}
      {isSuccess && <p className="text-green-600 text-center mt-4">{data?.message || 'Registration successful!'}</p>}
    </div>
  );
}
