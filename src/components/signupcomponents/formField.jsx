import { Eye, EyeOff, Mail, Phone, User } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { useRegisterUserTan } from "../../hooks/useRegisterUserTan"


import { toast } from "react-toastify"

export function FormFields() {
  // handle the logics of the form fields
  const [showPassword, setShowPassword] = useState(false)
  

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phone_number: '',
    role: '',
  })

  const { mutate, isLoading } = useRegisterUserTan()

  const handleChange = (e) => {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e) => {
    console.log("Register payload:", form);
    e.preventDefault()
    mutate(form, {
      onSuccess: () => {
        setForm({
          fullName: '',
          email: '',
          password: '',
          phone_number: '',
          role: '',
        })
      },
      onError: (error) => {
        toast.error(error.message || "Registration failed")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name */}
      <motion.div className="space-y-1 max-w-xl w-full" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <label htmlFor="fullName" className="block text-gray-700 font-medium">Full Name</label>
        <div className="relative group">
          <input
            id="fullName"
            type="text"
            placeholder="John Doe"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 pr-12 pl-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
          />
          <User size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300" />
        </div>
      </motion.div>

      {/* Email */}
      <motion.div className="space-y-1 mt-1 max-w-xl w-full" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
        <div className="relative group">
          <input
            id="email"
            type="email"
            placeholder="username@gmail.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 pr-12 pl-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
          />
          <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300" />
        </div>
      </motion.div>

      {/* Password */}
      <motion.div className="space-y-1 mt-1 max-w-xl w-full" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
        <div className="relative group">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 pr-12 pl-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors duration-300"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Phone */}
      <motion.div className="space-y-1 mt-1 max-w-xl w-full" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
        <label htmlFor="phone_number" className="block text-gray-700 font-medium">Phone Number</label>
        <div className="relative group">
          <input
            id="phone_number"
            type="tel"
            placeholder="9876543210"
            value={form.phone_number}
            onChange={handleChange}
            required
            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 pr-12 pl-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
          />
          <Phone size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300" />
        </div>
      </motion.div>

      {/* Role */}
      <motion.div className="space-y-1 mt-1 max-w-xl w-full" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
        <label htmlFor="role" className="block text-gray-700 font-medium">Role</label>
        <select
          id="role"
          value={form.role}
          onChange={handleChange}
          required
          className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 pl-4 pr-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
        >
          <option value="">Select your role</option>
          <option value="Admin">Admin</option>
          <option value="Customer">Customer</option>
        </select>
      </motion.div>

      {/* Submit Button */}
      <div className="max-w-xl w-full mt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orange-500 text-white font-semibold py-3 rounded-xl hover:bg-orange-600 transition-all duration-300"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </div>
    </form>
  )
}

