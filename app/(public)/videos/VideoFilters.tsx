// components/videos/VideoFilters.tsx
'use client';

import { motion } from 'framer-motion';

interface Category {
  id: string;
  label: string;
  count: number;
}

interface VideoFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const VideoFilters: React.FC<VideoFiltersProps> = ({
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
      className="py-16 bg-slate-800/50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Browse Video Content</h3>
          <p className="text-gray-400">Filter by category to find exactly what you&apos;re looking for</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(category.id)}
              className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl'
                  : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 border border-white/20'
              }`}
            >
              {category.label}
              <span className={`ml-3 px-3 py-1 rounded-full text-sm ${
                selectedCategory === category.id
                  ? 'bg-white/20'
                  : 'bg-gray-700'
              }`}>
                {category.count}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};