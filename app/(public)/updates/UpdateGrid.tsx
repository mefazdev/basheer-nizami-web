// components/articles/ArticleGrid.tsx
"use client";

import { UpdateItem } from "@/lib/types/updates";

// import { NewsItem } from '@/lib/types/sanity';
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface UpdatesGridProps {
  updates: UpdateItem[];
}

export const UpdatesGrid: React.FC<UpdatesGridProps> = ({ updates }) => {
  if (updates.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-20"
      >
        <div className="text-6xl mb-6">📝</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          No updates found
        </h3>
        <p className="text-gray-600">
          Try adjusting your search terms or category filter.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {updates.map((update, index) => {
        // const categoryStyle = categoryColors[article.category as keyof typeof categoryColors] || categoryColors.education;

        return (
          <Link key={update._id} href={`/updates/${update?.slug}`}>
            <motion.article
              onClick={() => console.log(update.category)}
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
                  {update.image && (
                    <Image
                      fill
                      src={update?.image}
                      alt={update?.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border bg-gradient-to-r from-red-600 to-black text-gray-200 `}
                    >
                      {update?.category?.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-4 lg:p-6 flex-1 flex flex-col">
                  {/* Metadata */}
                  <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(update.publishedAt)?.toLocaleDateString()}
                    </div>
                    {/* <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {update.readTime}
                  </div> */}
                    {/* <div className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {article?.views?.toLocaleString()}
                  </div> */}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors line-clamp-2">
                    {update.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-3 text-sm">
                    {update.excerpt}
                  </p>

                  {/* Read More Button */}
        
                 <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center text-gray-600 font-semibold hover:text-gray-700 transition-colors group"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.button>
               
                </div>
              </div>
            </motion.article>
          </Link>
        );
      })}
    </div>
  );
};
