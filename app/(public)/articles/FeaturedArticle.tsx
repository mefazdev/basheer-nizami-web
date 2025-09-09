// components/articles/FeaturedArticle.tsx
'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, Eye, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import {Article} from '@/lib/types/article'
import Link from 'next/link';
 

interface FeaturedArticleProps {
  article: Article;
  index: number;
}

 
export const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article, index }) => {
  
  return (
   <Link href={`/articles/${article?.slug}`}>
 <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group cursor-pointer"
    >
      <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
        {/* Article Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {article?.image && <Image fill
            src={article?.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Featured Badge */}
          <div className="absolute top-3 lg:top-6 left-6 lg:left-6">
            <span className="bg-gradient-to-r from-red-600 to-gray-800 text-white px-4 py-2 rounded-full text-sm lg:font-bold">
           Featured
            </span>
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-3 lg:top-6 right-6 lg:right-6">
            <span className={`px-3 py-1 rounded-full text-sm lg:font-semibold borde `}>
              {article?.category?.replace('-', ' ').toUpperCase()}
            </span>
          </div>
        </div>
        
        {/* Article Content */}
        <div className="p-4 lg:p-8 mt-6 lg:mt-0">
          {/* Metadata */}
          <div className=" hidden md:flex items-center gap-6 mb-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(article?.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {article.readTime}
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {article?.views?.toLocaleString()} views
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
            {article.title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            {article.excerpt}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.slice(0, 4).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Read More Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-gray-800 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group"
          >
            Read Full Article
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>
        </div>
      </div>
    </motion.article>   
   </Link>
  );
};