import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export function HeroContent() {
  const text = "Discover Our Latest Collection";
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const handleShopNow = () => {
    console.log("Navigate to shop");
  };

  const handleLearnMore = () => {
    console.log("Navigate to learn more");
  };

  // Buttons have transparent bg and orange text initially; on hover bg and text change
  const buttonClasses =
    "inline-flex items-center gap-2 text-orange-500 font-medium px-6 py-3 rounded-full transition delay-150 duration-300 ease-in-out hover:bg-orange-500 hover:text-white";

  return (
    <div className="flex flex-col justify-center space-y-4">
      <motion.h1
        className="text-[1.25rem] font-bold tracking-tighter sm:text-[2rem] md:text-[3.75rem] lg:text-[2.75rem] flex flex-wrap text-orange-500"
        variants={container}
        initial="hidden"
        animate="visible"
        aria-label={text}
        role="heading"
        aria-level={1}
      >
        {letters.map((letter, index) => (
          <motion.span key={index} variants={child} className="inline-block">
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h1>

      <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
        Elevate your style with our premium quality products designed for comfort and elegance.
      </p>

      <div className="flex space-x-4">
        <button onClick={handleShopNow} className={buttonClasses}>
          <ShoppingBag className="h-5 w-5" />
          Shop Now
        </button>

        <button onClick={handleLearnMore} className={buttonClasses}>
          Learn More
        </button>
      </div>
    </div>
  );
}
