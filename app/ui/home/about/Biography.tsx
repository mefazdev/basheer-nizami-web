"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface BiographyProps {
  title: string;
  content: string[];
}

export const Biography: React.FC<BiographyProps> = ({ title, content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="  lg:space-y-6"
    >
      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
        Basheer Ahmed Nizami
      </h3>
      <h4 className="text-xl md:text-2xl mt-1 lg:mt-0 font-bold text-gray-700 leading-tight">
        {title}
      </h4>

      <div className="space-y-4">
        {content.map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="mt-4 lg:mt-0 lg:text-lg text-gray-700 leading-relaxed"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="pt-4"
      >
        {/* <button className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300 transform hover:scale-105">
         Watch Luctures
        </button> */}
        <Link
          href="/videos"
          className="px-6 py-2 bg-gradient-to-r from-red-600 to-black hover:bg-red-700 text-white font-medium rounded-lg inline-flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
          </svg>
          Watch Luctures
        </Link>
      </motion.div>
    </motion.div>
  );
};
