import { motion } from "framer-motion";
import { IMAGE_PATHS } from "../../common/imageConstant"; 

export function AnimatedLogo() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Bouncing Logo */}
      <motion.img
        src={IMAGE_PATHS.logo}
        alt="Logo"
        className="h-20 w-20 mb-1"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
