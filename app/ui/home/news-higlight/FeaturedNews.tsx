// components/news/FeaturedNews.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
  source?: string;
  link?: string;
  tags: string[];
}

interface FeaturedNewsProps {
  news: NewsItem;
}

const categoryStyles = {
  media: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
  publication: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-200",
  },
  speaking: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
  },
  award: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-200",
  },
  research: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    border: "border-purple-200",
  },
  announcement: {
    bg: "bg-indigo-100",
    text: "text-indigo-800",
    border: "border-indigo-200",
  },
};

export const FeaturedNews: React.FC<FeaturedNewsProps> = ({ news }) => {
  const categoryStyle =
    categoryStyles[news.category as keyof typeof categoryStyles] ||
    categoryStyles.announcement;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="mb-16 lg:mb-20"
    >
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all duration-500">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-64 lg:h-auto">
            {news.image && (
              <Image
                src={news.image}
                alt={news.title}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Featured Badge */}
            <div className="absolute top-6 left-6">
              <span className="bg-gradient-to-r from-red-600 to-black text-white px-4 py-2 rounded-full text-sm lg:font-bold shadow-lg">
                Featured
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
              >
                {news.category.toUpperCase()}
              </span>
              <time className="text-gray-500 text-sm">
                {new Date(news.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <h3 className="text-xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {news.title}
            </h3>

            <p className="lg:text-lg text-gray-600 leading-relaxed mb-6">
              {news.excerpt}
            </p>

            {news.source && (
              <p className="text-sm text-gray-500 mb-6">
                <span className="font-semibold">Source:</span> {news.source}
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {news.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="self-start px-8 py-3 bg-gradient-to-r from-red-600 to-black text-white font-bold rounded-xl hover:from-red-600 hover:to-gray-700 transition-all duration-300 shadow-lg"
            >
              Read Full Article
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
