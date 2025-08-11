// components/publications/FeaturedBook.tsx
"use client";

import { motion } from "framer-motion";
import {  Calendar, BookOpen  } from "lucide-react";
import Image from "next/image";

interface Book {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  coverImage: string;
  isbn: string;
  publicationDate: string;
  publisher: string;
  pages: number;
  awards?: string[];
  reviews?: {
    source: string;
    excerpt: string;
    rating?: number;
  }[];
  purchaseLinks: {
    amazon?: string;
    barnes?: string;
    publisher?: string;
    google?: string;
  };
  tags: string[];
}

interface FeaturedBookProps {
  book: Book;
}

export const FeaturedBook: React.FC<FeaturedBookProps> = ({ book }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="mb-20"
    >
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Book Cover */}
          <div className="relative  p-3 lg:p-12 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.5 }}
              className="relative group w-full"
            >
              <div className="relative c w-full  h-[400px] lg:w-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  fill
                />
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12" />
              </div>

              {/* Featured Badge */}
              <div className="absolute top-3 right-2  lg:-top-4 lg:-right-4 bg-gradient-to-r from-red-600 to-black text-white px-4 py-2 rounded-full text-sm lg:font-bold shadow-lg">
                Featured
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-200 rounded-full blur-xl opacity-50"
              />
            </motion.div>
          </div>

          {/* Book Details */}
          <div className="p-4 lg:p-12 flex flex-col justify-center">
            {/* Awards */}
            {/* {book.awards && book.awards.length > 0 && (
              <div className="flex items-center mb-6">
                <Award className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-yellow-600 font-semibold text-sm">
                  {book.awards[0]}
                </span>
              </div>
            )} */}

            <h3 className="text-2xl mt-6 lg:mt-0 lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
              {book.title}
            </h3>

            {book.subtitle && (
              <p className="text-lg lg:text-xl text-gray-600 mb-6 font-medium">
                {book.subtitle}
              </p>
            )}

            <p className="lg:text-lg text-gray-700 leading-relaxed mb-8">
              {book.description}
            </p>

            {/* Book Info */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  Published: {new Date(book.publicationDate).getFullYear()}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <BookOpen className="w-4 h-4 mr-2" />
                <span className="text-sm">{book.pages} pages</span>
              </div>
            </div>

            {/* Publisher and ISBN */}
            <div className="mb-8">
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-semibold">Publisher:</span>{" "}
                {book.publisher}
              </p>
              {/* <p className="text-gray-600 text-sm">
                <span className="font-semibold">ISBN:</span> {book.isbn}
              </p> */}
            </div>

            {/* Reviews */}
            {book.reviews && book.reviews.length > 0 && (
              <div className="mb-8">
                <div className="bg-gray-50 rounded-2xl p-3 lg:p-6">
                  <div className="flex items-center mb-3">
                    {/* {book.reviews[0].rating && (
                      <div className="flex items-center mr-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < book.reviews?.[0]?.rating!
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    )} */}
                    <span className="font-semibold text-gray-900">
                      {book.reviews[0].source}
                    </span>
                  </div>
                  <p className="text-gray-700 italic">
                    &quot;{book.reviews[0].excerpt}&quot;
                  </p>
                </div>
              </div>
            )}

            {/* Tags */}
            {/* <div className="flex flex-wrap gap-2 mb-8">
              {book.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div> */}

            {/* Purchase Links */}
            <div className="flex flex-wrap gap-3">
              {/* {book.purchaseLinks.amazon && (
                <motion.a
                  href={book.purchaseLinks.amazon}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
                >
                  Buy on Amazon
                  <ExternalLink className="w-4 h-4 ml-2" />
                </motion.a>
              )} */}

              {/* {book.purchaseLinks.publisher && (
                <motion.a
                  href={book.purchaseLinks.publisher}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                >
                  Publisher
                  <ExternalLink className="w-4 h-4 ml-2" />
                </motion.a>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
