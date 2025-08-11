// components/news/NewsTicker.tsx
"use client";

import { motion } from "framer-motion";

interface NewsTickerProps {
  items: string[];
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ items }) => {
  const duplicatedItems = [...items, ...items];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative bg-gradient-to-r from-red-600 to-black text-white py-2.5 lg:py-4 rounded-2xl overflow-hidden mb-10 lg:mb-16 shadow-xl"
    >
      <div className="flex items-center">
        {/* Breaking News Label */}
        <div className="hidden lg:block bg-white/20 backdrop-blur-sm px-6 py-2 text-sm lg:font-bold uppercase tracking-wider flex-shrink-0 rounded-r-xl">
          Latest Updates
        </div>

        {/* Scrolling Content */}
        <div className="flex-1 overflow-hidden ml-4">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{
              x: "-100%",
            }}
            transition={{
              duration: 80,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicatedItems.map((item, index) => (
              <span
                key={index}
                className="inline-block px-8 text-sm md:text-base font-medium"
              >
                {item}
                {index < duplicatedItems.length - 1 && (
                  <span className="mx-6 text-white/60">•</span>
                )}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gradient Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-red-600 to-transparent pointer-events-none" />
    </motion.div>
  );
};
