"use client";

import { motion } from "framer-motion";

interface Value {
  title: string;
  description: string;
  icon: string;
}

interface CoreValuesProps {
  values: Value[];
}

export const CoreValues: React.FC<CoreValuesProps> = ({ values }) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Core Values & Principles
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          The fundamental beliefs that guide our approach to education and
          leadership
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
              {/* Icon */}
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {/* {value.icon} */}
              </div>

              {/* Title */}
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                {/* {value.title} */}
              </h4>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>

              {/* Decorative line */}
              <div className="w-12 h-1 bg-blue-600 mx-auto mt-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
