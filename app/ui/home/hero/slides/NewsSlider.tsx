// components/slides/NewsSlide.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { NewsTicker } from "../NewsTicker";
import Link from "next/link";
 

type NewsTickers={
  id: string;
  text: string;
    published: boolean;
    sort_order: number;
    starts_at: string | null;
    ends_at: string | null;
    created_at: string;
    updated_at:string
 }

interface NewsSlideProps {
  title: string;
  summary: string;
  image: string ;
  date: string;
  slug: string;
  tickerItems?: NewsTickers[];
}

export const NewsSlide: React.FC<NewsSlideProps> = ({
  title,
  summary,
  image,
  date,
  tickerItems,
  slug
}) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className=" md:pt-20 lg:pt-0 relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-slate-900 ">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12 scale-150" />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-4 lg:gap-12 items-center">
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative aspect-[5/3] md:aspect-[6/3] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                 {image &&  <Image
                    src={image}
                    alt="News image"
                    fill
                    className="object-cover"
                  />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30" />
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="hidden lg:grid text-sm font-medium text-gray-300 uppercase tracking-wider"
                >
                  Latest News
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-xl md:text-2xl lg:text-5xl font-bold leading-tight"
                >
                  {title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="hidden lg:grid text-lg lg:text-xl text-gray-300 leading-relaxed"
                >
                  {summary}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="hidde  md:flex items-center space-x-4 text-sm text-gray-400"
                >
                  <time>{formattedDate}</time>
                  {/* <span>•</span> */}
                  {/* <span>Breaking News</span> */}
                </motion.div>

               <Link href={`/updates/${slug}`}> <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center border border-gray-500  md:border-none  md:text-black px-4 md:px-8 py-2 md:py-3 md:bg-white hover:bg-white/60 text-gray-200  md:font-semibold rounded-lg transition-colors"
                >
                  Read More
                </motion.button></Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* News Ticker */}
        <NewsTicker  data={tickerItems} />
      </div>
    </div>
  );
};
