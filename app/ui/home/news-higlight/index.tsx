// components/NewsHighlightsSection.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { NewsTicker } from "./NewsTicker";
import { UpdatesGrid } from "@/app/(public)/updates/UpdateGrid";
import { useHomepageContent } from "@/hooks/sanity/useHomepage";
import { HomeFeaturedUpdate } from "./HomeFeaturedUpdate";
import { UpdateItem } from "@/lib/types/updates";
import Link from "next/link";

type NewsTickers = {
  id: string;
  text: string;
  published: boolean;
  sort_order: number;
  starts_at: string | null;
  ends_at: string | null;
  created_at: string;
  updated_at: string;
};
interface NewsHighlightsSectionProps {
  featuredUpdates?: UpdateItem[];
  newsTickers?:NewsTickers[]
}

export const NewsHighlightsSection: React.FC<NewsHighlightsSectionProps> = ({
  featuredUpdates,
  newsTickers
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const { updates } = useHomepageContent();

  return (
    <section
      ref={containerRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden"
    >
      {/* Advanced Background Elements */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-40"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl" />
      </motion.div>

      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 60 60"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="news-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="30" cy="30" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#news-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center lg:mb-16"
        >
          {/* <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block mb-6 "
          >
            <span className="bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent text-lg font-semibold tracking-wider uppercase">
              Latest Updates
            </span>
          </motion.div> */}

          <h2
            onClick={() => console.log(updates)}
            className="text-3xl lg:text-5xl    font-bold text-gray-900 mb-3 lg:mb-6"
          >
            Updates
            {/* <span className="block bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
              Highlights
            </span> */}
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-red-600 to-gray-800 mx-auto rounded-full   mb-8"
          />

          {/* <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Stay updated with the latest developments, research publications, media appearances, and insights from the forefront of educational innovation
          </p> */}
        </motion.div>

        {/* News Ticker */}
      <NewsTicker   tickersItems={ newsTickers} />

        {/* Featured News */}
        {/* <FeaturedNews   /> */}
        <HomeFeaturedUpdate featuredUpdates={featuredUpdates} />
        {/* Publication Showcase */}

        {/* News Grid */}
        <UpdatesGrid updates={updates} />

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-10 lg:mt-20"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Link href={'/updates'}> <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-2.5 lg:py-4 bg-gradient-to-r from-red-600 to-black text-white font-bold rounded-full hover:from-red-700 hover:to-gray-700 transition-all duration-300 shadow-xl"
            >
              View All News
            </motion.button></Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-2.5 lg:py-4  bg-white text-gray-900 font-bold rounded-full border-2 border-gray-200 hover:border-red-600 hover:text-gray-800 transition-all duration-300 shadow-lg"
            >
              Subscribe to Updates
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
