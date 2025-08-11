// components/publications/PublicationFilter.tsx
"use client";

import { motion } from "framer-motion";

interface Category {
  id: string;
  label: string;
  count: number;
}

interface PublicationFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const PublicationFilter: React.FC<PublicationFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Browse Publications
        </h3>
        <p className="text-gray-600">
          Explore books, research papers, and academic contributions
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category.id)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              selectedCategory === category.id
                ? "bg-gradient-to-r from-red-600 to-black text-white shadow-xl"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-blue-300"
            }`}
          >
            {category.label}
            <span
              className={`ml-2 px-2 py-1 rounded-full text-xs ${
                selectedCategory === category.id ? "bg-white/20" : "bg-gray-100"
              }`}
            >
              {category.count}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
