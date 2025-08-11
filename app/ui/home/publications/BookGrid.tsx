// components/publications/BooksGrid.tsx
"use client";

import { motion } from "framer-motion";
import { Calendar, BookOpen } from "lucide-react";
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
  category: string;
  purchaseLinks: {
    amazon?: string;
    barnes?: string;
    publisher?: string;
    google?: string;
  };
  tags: string[];
}

interface BooksGridProps {
  books: Book[];
}

export const BooksGrid: React.FC<BooksGridProps> = ({ books }) => {
  if (books.length === 0) return null;

  return (
    <div className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Published Books
        </h3>
        {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive works that advance educational theory and practice
        </p> */}
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {books.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group cursor-pointer"
          >
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 h-full flex flex-col">
              {/* Book Cover */}
              <div className="relative aspect-[4/4] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <Image fill
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {book.category === "edited-volume" ? "Edited" : "Authored"}
                  </span>
                </div>
              </div>

              {/* Book Details */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Title */}
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors line-clamp-2">
                  {book.title}
                </h4>

                {/* Subtitle */}
                {book.subtitle && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                    {book.subtitle}
                  </p>
                )}

                {/* Description */}
                {/* <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                  {book.description}
                </p> */}

                {/* Book Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-500 text-xs">
                    <Calendar className="w-3 h-3 mr-2" />
                    {new Date(book.publicationDate).getFullYear()}
                  </div>
                  <div className="flex items-center text-gray-500 text-xs">
                    <BookOpen className="w-3 h-3 mr-2" />
                    {book.pages} pages
                  </div>
                </div>

                {/* Publisher */}
                <p className="text-xs text-gray-500 mb-4">{book.publisher}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {book.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Purchase Links */}
                {/* <div className="flex gap-2">
                  {book.purchaseLinks.amazon && (
                    <motion.a
                      href={book.purchaseLinks.amazon}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-2 px-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-center text-sm flex items-center justify-center"
                    >
                      Buy
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </motion.a>
                  )}
                  {book.purchaseLinks.publisher && (
                    <motion.a
                      href={book.purchaseLinks.publisher}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-center text-sm flex items-center justify-center"
                    >
                      Read
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </motion.a>
                  )}
                </div> */}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
