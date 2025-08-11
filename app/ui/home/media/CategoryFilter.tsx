

// components/media/CategoryFilter.tsx
'use client';

import { motion } from 'framer-motion';

interface Category {
  id: string;
  label: string;
  count: number;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
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
        <h3 className="text-2xl font-bold text-white mb-4">Browse by Category</h3>
        <p className="text-gray-400">Explore speeches and interviews organized by venue and format</p>
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
                ? 'bg-gradient-to-r from-red-800 to-black/50 text-white shadow-xl'
                : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 border border-white/20'
            }`}
          >
            {category.label}
            <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
              {category.count}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
