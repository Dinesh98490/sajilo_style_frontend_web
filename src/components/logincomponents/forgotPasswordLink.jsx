import { motion } from "framer-motion";

export function ForgotPasswordLink() {
  return (
    <motion.div
      className="text-right"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <a
        href="#"
        className="text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors duration-300"
      >
        Forgot Password?
      </a>
    </motion.div>
  );
}
