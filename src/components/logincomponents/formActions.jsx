import { Button } from "../../components/landingpagecomponents/herosection/ui/button";
import { motion } from "framer-motion";

export function FormActions() {
  return (
    <>
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <Button className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105">
          Sign in
        </Button>
      </motion.div>

      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <p className="text-gray-600 text-sm">
          {"Don't have an account yet? "}
          <a
            href="#"
            className="text-orange-500 font-medium hover:text-orange-600 transition-colors duration-300"
          >
            Register for free
          </a>
        </p>
      </motion.div>
    </>
  );
}
