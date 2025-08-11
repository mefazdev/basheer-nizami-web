// components/projects/ImpactMetrics.tsx
"use client";

import { motion } from "framer-motion";

interface ImpactMetric {
  label: string;
  value: string;
  icon: string;
}

interface ImpactMetricsProps {
  metrics: ImpactMetric[];
}

export const ImpactMetrics: React.FC<ImpactMetricsProps> = ({ metrics }) => {
  return (
    <div className="mb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Impact by the Numbers
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Measurable outcomes that demonstrate the transformative power of
          innovative educational leadership
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.1,
              rotateY: 10,
            }}
            className="group"
          >
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
              {/* Icon */}
              <motion.div
                whileHover={{
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 0.5 }}
                className="text-4xl mb-3"
              >
                {metric.icon}
              </motion.div>

              {/* Value */}
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {metric.value}
              </div>

              {/* Label */}
              <div className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                {metric.label}
              </div>

              {/* Animated Bottom Border */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                viewport={{ once: true }}
                className="mt-4 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full origin-left"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
