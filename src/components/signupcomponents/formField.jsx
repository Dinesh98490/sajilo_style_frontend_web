import { Eye, EyeOff, Mail, Phone, User } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export function FormFields() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      {/* Full Name */}
      <motion.div
        className="space-y-1 max-w-xl w-full" // ⬅️ Reduced from space-y-2 to space-y-1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <label htmlFor="fullname" className="block text-gray-700 font-medium">
          Full Name
        </label>
        <div className="relative group">
          <input
            id="fullname"
            type="text"
            placeholder="John Doe"
            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 pr-12 pl-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
          />
          <User
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300"
          />
        </div>
      </motion.div>

      {/* Email */}
      <motion.div
        className="space-y-1 mt-1 max-w-xl w-full" // ⬅️ Reduced from space-y-2 to space-y-1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <label htmlFor="email" className="block text-gray-700 font-medium">
          Email
        </label>
        <div className="relative group">
          <input
            id="email"
            type="email"
            placeholder="username@gmail.com"
            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 pr-12 pl-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
          />
          <Mail
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300"
          />
        </div>
      </motion.div>

      {/* Password */}
      <motion.div
        className="space-y-1 mt-1 max-w-xl w-full" // ⬅️ Reduced from space-y-2 to space-y-1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <label htmlFor="password" className="block text-gray-700 font-medium">
          Password
        </label>
        <div className="relative group">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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

      {/* Phone Number */}
      <motion.div
        className="space-y-1 mt-1 max-w-xl w-full" // ⬅️ Reduced from space-y-2 to space-y-1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <label htmlFor="phone" className="block text-gray-700 font-medium">
          Phone Number
        </label>
        <div className="relative group">
          <input
            id="phone"
            type="tel"
            placeholder="9876543210"
            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 pr-12 pl-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
          />
          <Phone
            size={20}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300"
          />
        </div>
      </motion.div>

      {/* Role */}
      <motion.div
        className="space-y-1 mt-1 max-w-xl w-full" // ⬅️ Kept consistent spacing
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <label htmlFor="role" className="block text-gray-700 font-medium">
          Role
        </label>
        <select
          id="role"
          className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 pl-4 pr-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
        >
          <option value="">Select your role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </motion.div>
    </>
  )
}
