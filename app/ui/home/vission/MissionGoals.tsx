// components/vision-mission/MissionGoals.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";

interface MissionGoal {
  icon: string;
  title: string;
  description: string;
  metric?: string;
}

interface MissionGoalsProps {
  title: string;
  subtitle: string;
  goals: MissionGoal[];
}

export const MissionGoals: React.FC<MissionGoalsProps> = ({
 
  goals,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateX: 45,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div>
      {/* Mission Header */}
      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h3 className="text-4xl  font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
          {title}
        </h3>
        <p className="text-slate-300 text-xl max-w-4xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </motion.div> */}

      {/* Premium Mission Goals Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {goals.map((goal, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              z: 50,
            }}
            className="group perspective-1000"
          >
            <div className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 shadow-xl hover:shadow-2xl overflow-hidden">
              {/* Animated Background */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: hoveredIndex === index ? 0.1 : 0,
                  scale: hoveredIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-br from-black to-gray-800 rounded-2xl"
              />

              {/* Goal Icon */}
              <motion.div
                whileHover={{
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 0.6 }}
                className="relative z-10 text-6xl mb-6 inline-block"
              >
                {/* {goal.icon} */}
              </motion.div>

              {/* Metric Badge */}
              {goal.metric && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                  viewport={{ once: true }}
                  className="absolute top-6  bg-gradient-to-r from-black to-gray-800 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
                >
                  <span className="text-xs font-semibold text-white">
                    {goal.metric}
                  </span>
                </motion.div>
              )}

              {/* Goal Title */}
              <h4 className="relative z-10 mt-4 text-xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors">
                {goal.title}
              </h4>

              {/* Goal Description */}
              <p className="relative z-10 text-slate-300 leading-relaxed mb-6">
                {goal.description}
              </p>

              {/* Progress Indicator */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: index * 0.1 + 0.8 }}
                viewport={{ once: true }}
                className="relative z-10 w-full h-1 bg-gradient-to-r from-black  to-gray-700 rounded-full origin-left"
              />

              {/* Interactive Glow Effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredIndex === index ? 0.3 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-r from-black to-slate-600 rounded-2xl blur-xl -z-10"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Premium Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-20"
      >
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center px-12 py-4 bg-gradient-to-r from-slate-600 to-black text-white font-bold rounded-full hover:from-red-700 hover:to-gray-700 transition-all duration-300 shadow-xl overflow-hidden"
        >
          <span className="relative z-10 ">Collaborate With Us</span>
          <motion.svg
            className="relative z-10 ml-3 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </motion.svg>

          <motion.div
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          />
        </motion.button>
      </motion.div>
    </div>
  );
};
