// components/vision-mission/VisionStatement.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface VisionStatementProps {
  title: string;
  subtitle?: string;
  statement: string;
}

export const VisionStatement: React.FC<VisionStatementProps> = ({
   
  statement,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [45, 0, -45]);

  return (
    <div ref={ref} className="mb-20 lg:mb-32">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-4xl   font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
            {title}
          </h3>
          {subtitle && (
            <p className="text-slate-400 text-lg font-medium">{subtitle}</p>
          )}
        </motion.div> */}

        {/* Premium Vision Statement */}
        <motion.div
          style={{ scale, rotateX }}
          className="relative perspective-1000"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Main Statement Container */}
            <div className="relative bg-gradient-to-b from-slate-800   backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-white/20 shadow-2xl overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-gray-800 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

              {/* Decorative Elements */}
              <div className="absolute top-8 left-8 text-6xl text-gray-400/30 font-serif select-none">
                &quot;
              </div>
              <div className="absolute bottom-8 right-8 text-6xl text-gray-400/30 font-serif select-none transform rotate-180">
                &quot;
              </div>

              {/* Statement Text */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="relative z-10 text-xl md:text-2xl   text-white leading-relaxed font-light text-center italic"
              >
                {statement}
              </motion.p>

              {/* Signature Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
                viewport={{ once: true }}
                className="mt-12 flex justify-center"
              >
                <div className="w-32 h-0.5 bg-gradient-to-r from-gray-800 to-gray-400 rounded-full" />
              </motion.div>
            </div>

            {/* Floating Decorative Elements */}
            {/* <motion.div
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-slate-500 to-slate-800 rounded-full blur-xl"
            /> */}
            {/* <motion.div
              animate={{
                y: [10, -10, 10],
                rotate: [0, -5, 0],
                scale: [1.1, 1, 1.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-white/30 to-black/60  rounded-full blur-lg"
            /> */}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
