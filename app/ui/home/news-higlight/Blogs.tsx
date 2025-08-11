// components/news/PublicationShowcase.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Blogs {
  id: string;
  title: string;
  journal: string;
  date: string;
  coAuthors?: string[];
  abstract: string;
  link?: string;
  citations?: number;
  image?: string;
}

interface BlogsProps {
  blogs: Blogs[];
}

export const Blogs: React.FC<BlogsProps> = ({ blogs }) => {
  return (
    <div className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Recent Blogs
        </h3>
        {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Peer-reviewed research contributing to the advancement of educational science and practice
        </p> */}
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group cursor-pointer"
          >
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              {/* Publication Image */}
              {blog.image && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.journal}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Citations Badge */}
                  {/* {blog.citations && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm font-bold text-gray-900">
                        {blog.citations} citations
                      </span>
                    </div>
                  )} */}
                </div>
              )}

              <div className="p-6">
                {/* Journal and Date */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600 font-semibold text-sm">
                    {blog.journal}
                  </span>
                  <time className="text-gray-500 text-sm">
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  </time>
                </div>

                {/* Title */}
                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {blog.title}
                </h4>

                {/* Co-authors */}
                {blog.coAuthors && (
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-semibold">Co-authors:</span>{" "}
                    {blog.coAuthors.join(", ")}
                  </p>
                )}

                {/* Abstract */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {blog.abstract}
                </p>

                {/* Read More Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-red-600 to-black text-white font-semibold py-2 rounded-lg hover:from-red-700 hover:to-black/80 transition-all duration-300"
                >
                  Read More
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
