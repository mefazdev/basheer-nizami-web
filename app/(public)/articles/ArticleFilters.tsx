// components/articles/ArticleFilters.tsx
'use client';

import { motion } from 'framer-motion';

interface Category {
  id: string;
  label: string;
  count: number;
}

interface ArticleFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const ArticleFilters: React.FC<ArticleFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
    >
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full py-4 px-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 font-medium"
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.label} ({category.count})
          </option>
        ))}
      </select>
    </motion.div>
  );
};