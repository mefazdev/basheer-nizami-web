// components/news/FeaturedNews.tsx
"use client";

import { useFeaturedArticles } from "@/hooks/sanity/useArticles";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

 
//  kjdnjkdnjkandf
// dssdsdd
 
export const HomeFeaturedArticle =  ( ) => {
  // const categoryStyle =
  //   // categoryStyles[news.category as keyof typeof categoryStyles] ||
  //   categoryStyles.announcement;

   const { featuredArticles } = useFeaturedArticles()
   const data = featuredArticles[0]
   if(!data){
    return null
   }
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
            {data?.image && (
              <Image
              
                src={data?.image }
                alt={data?.title}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Featured Badge */}
            <div className="absolute top-6 left-6">
              <span    className="bg-gradient-to-r from-red-600 to-black text-white px-4 py-2 rounded-full text-sm lg:font-bold shadow-lg">
                Featured
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border border-gray-300 text-gray-500`}
              >
                {data?.category?.toUpperCase()}
              </span>
              <time className="text-gray-500 text-sm">
                {new Date(data?.publishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <h3 className="text-xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {data?.title}
            </h3>

            <p className="lg:text-lg text-gray-600 leading-relaxed mb-6">
              {data?.excerpt}
            </p>

             

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {data?.tags.map((tag, index) => (
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
                  className="inline-flex items-center text-gray-600 font-semibold hover:text-gray-700 transition-colors group"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
