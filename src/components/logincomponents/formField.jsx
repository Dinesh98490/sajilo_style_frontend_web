import { Eye, EyeOff, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function FormFields({ email, setEmail, password, setPassword }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <label htmlFor="email" className="block text-gray-700 font-medium">
          Email
        </label>
        <div className="relative group">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="username@gmail.com"
            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 pr-12 pl-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
          />
          <Mail
            size={20}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300"
          />
        </div>
      </motion.div>

      <motion.div
        className="space-y-2 mt-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <label htmlFor="password" className="block text-gray-700 font-medium">
          Password
        </label>
        <div className="relative group">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
    </>
  );
}
