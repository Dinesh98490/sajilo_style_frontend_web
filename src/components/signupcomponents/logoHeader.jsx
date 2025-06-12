import { motion } from "framer-motion"
import { IMAGE_PATHS } from "../../common/imageConstant"

export function LogoHeader() {
  return (
    <div className="mb- text-center">
      <motion.div
        className="flex items-center justify-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
       
          {/* Bouncing Logo Image */}
          <motion.img
            src={IMAGE_PATHS.logo}
            alt="Featured product"
            className="h-10 w-50 mb-1"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        
      </motion.div>

      <motion.h1
        className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          textShadow: [
            "0 0 0px rgba(249, 115, 22, 0)",
            "0 0 10px rgba(249, 115, 22, 0.5)",
            "0 0 0px rgba(249, 115, 22, 0)",
          ],
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: "easeOut",
          textShadow: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
      >
        Sign Up
      </motion.h1>
    </div>
  )
}
