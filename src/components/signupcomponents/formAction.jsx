import { motion } from "framer-motion"

export function FormActions() {
  return (
    <motion.div
      className="mt-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.0 }}
    >
      <p className="text-gray-600 text-sm">
        Already have an account?{" "}
        <a
          href="#"
          className="text-orange-500 font-medium hover:text-orange-600 transition-colors duration-300"
        >
          Sign in
        </a>
      </p>
    </motion.div>
  );
}
