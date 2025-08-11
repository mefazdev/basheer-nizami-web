// components/articles/ArticleGrid.tsx
'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, Eye, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  views: number;
}

interface ArticleGridProps {
  articles: Article[];
}

const categoryColors = {
  leadership: 'bg-blue-100 text-blue-800 border-blue-200',
  spirituality: 'bg-purple-100 text-purple-800 border-purple-200',
  education: 'bg-green-100 text-green-800 border-green-200',
  'personal-growth': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  innovation: 'bg-red-100 text-red-800 border-red-200'
};

export const ArticleGrid: React.FC<ArticleGridProps> = ({ articles }) => {
  if (articles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-20"
      >
        <div className="text-6xl mb-6">📝</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
        <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
      </motion.div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, index) => {
        const categoryStyle = categoryColors[article.category as keyof typeof categoryColors] || categoryColors.education;
        
        return (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group cursor-pointer"
          >
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 h-full flex flex-col">
              {/* Article Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image fill
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryStyle}`}>
                    {article.category.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
              
              {/* Article Content */}
              <div className="p-4 lg:p-6 flex-1 flex flex-col">
                {/* Metadata */}
                <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(article.publishDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {article.readTime}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {article.views.toLocaleString()}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-3 text-sm">
                  {article.excerpt}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {article.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      +{article.tags.length - 3}
                    </span>
                  )}
                </div>
                
                {/* Read More Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center text-gray-600 font-semibold hover:text-gray-700 transition-colors group"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
};