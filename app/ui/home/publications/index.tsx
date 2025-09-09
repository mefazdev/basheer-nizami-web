// components/BooksPublicationsSection.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { FeaturedBook } from "./FeaturedBook";
import { PublicationFilter } from "./PublicationFilter";
import { BooksGrid } from "./BookGrid";
import { usePublicationsData } from "@/hooks/use-publications-data";
 import { usePublicationCategoriesData } from "@/hooks/use-publication-categories-data";
import { StorageUploader } from "@/lib/storage/upload";
import { Book } from "@/lib/types/publication";
import { mapPublicationToBook } from "@/lib/utils/publication";
import Link from "next/link";

// interface Book {
//   id: string;
//   title: string;
//   subtitle?: string;
//   description: string;
//   coverImage: string;
//   isbn: string;
//   publicationDate: string;
//   publisher: string;
//   pages: number;
//   category: "book" | "chapter" | "edited-volume";
//   featured?: boolean;
//   awards?: string[];
//   reviews?: {
//     source: string;
//     excerpt: string;
//     rating?: number;
//   }[];
//   purchaseLinks: {
//     amazon?: string;
//     barnes?: string;
//     publisher?: string;
//     google?: string;
//   };
//   tags: string[];
// }

// interface AcademicPublication {
//   id: string;
//   title: string;
//   abstract: string;
//   journal: string;
//   volume?: string;
//   issue?: string;
//   pages?: string;
//   publicationDate: string;
//   doi?: string;
//   pmid?: string;
//   citations: number;
//   impact: number;
//   coAuthors: string[];
//   category: "research" | "review" | "editorial" | "conference";
//   openAccess: boolean;
//   downloadLink?: string;
//   tags: string[];
// }
// interface PuvlicationDB {
//   page: number;
//   search: string;
//   category: string;
//   year: string;
// }
interface BooksPublicationsSectionProps {
  books?: Book[];
  // academicPublications?: AcademicPublication[];
  // featuredBook?: Book;
  // publicationDB?: PuvlicationDB;
  search?: string;
  category?: string;
  year?: string;
    page?: number;
}

export const PublicationsSection: React.FC<BooksPublicationsSectionProps> = ({


  // featuredBook,
  page,
  search,
  category,
  year,
 
}) => {
  // const [selectedCategory, setSelectedCategory] = useState<string>("all");
   const { data } = usePublicationsData({
      page:1,
      search,
      category_id: category || undefined,
      year: year ? parseInt(year) : undefined,
      limit:3
    });
  
      const books: Book[] = (data?.data ?? []).map(mapPublicationToBook);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // const featured = featuredBook || books.find((b) => b.featured) || books[0];
const featured =   (data?.data ?? []).map(mapPublicationToBook).find((v) => v.featured) ;

  // const categories = [
  //   { id: "all", label: "All Publications", count: books.length },
  //   {
  //     id: "books",
  //     label: "Books",
  //     count: books.filter((b) => b.category === "book").length,
  //   },
  //   // { id: 'research', label: 'Research Papers', count: academicPublications.filter(p => p.category === 'research').length },
  //   // { id: 'reviews', label: 'Review Articles', count: academicPublications.filter(p => p.category === 'review').length },
  //   {
  //     id: "edited",
  //     label: "Edited Volumes",
  //     count: books.filter((b) => b.category === "edited-volume").length,
  //   },
  // ];

  return (
    <section
      ref={containerRef}
      className="relative py-10 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden"
    >
      {/* Advanced Background Elements */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-40"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl" />
      </motion.div>

      {/* Book Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="book-pattern"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect width="2" height="12" x="2" y="4" fill="currentColor" />
              <rect width="2" height="12" x="6" y="4" fill="currentColor" />
              <rect width="2" height="12" x="10" y="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#book-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          {/* <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-lg font-semibold tracking-wider uppercase">
              Written Works
            </span>
          </motion.div> */}

          <h2 onClick={()=>console.log(featured )} className= " text-4xl lg:text-5xl   mt-10 font-bold text-gray-900 mb-2 lg:mb-6">
            Books &
            <span className="block bg-gradient-to-r from-red-600 to-gray-800 bg-clip-text text-transparent">
              Publications
            </span>
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-red-600 to-gray-800 mx-auto rounded-full mb-8"
          />

          {/* <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Explore a comprehensive collection of books, research papers, and academic publications that advance the field of education through evidence-based insights and innovative approaches
          </p> */}
        </motion.div>

        {/* Featured Book */}
   {featured &&      <FeaturedBook book={featured} />}

        {/* Publication Filter */}
        {/* <PublicationFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        /> */}

        {/* Content Based on Filter */}
        {/* {(selectedCategory === "all" ||
          selectedCategory === "books" ||
          selectedCategory === "edited") && (
          <BooksGrid
            books={books.filter(
              (book) =>
                selectedCategory === "all" ||
                (selectedCategory === "books" && book.category === "book") ||
                (selectedCategory === "edited" &&
                  book.category === "edited-volume")
            )}
          />
        )} */}
   
          <BooksGrid
            books={books}
               
          />
     


        {/* {(selectedCategory === 'all' || selectedCategory === 'research' || selectedCategory === 'reviews') && (
          <AcademicPublications 
            publications={academicPublications.filter(pub => 
              selectedCategory === 'all' || 
              (selectedCategory === 'research' && pub.category === 'research') ||
              (selectedCategory === 'reviews' && pub.category === 'review')
            )}
            showTitle={selectedCategory === 'all'}
          />
        )} */}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={'/publications'}><motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-black text-white font-bold rounded-full hover:from-red-700 hover:to-black/70 transition-all duration-300 shadow-xl"
            >
              View More
            </motion.button></Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-gray-900 font-bold rounded-full border-2 border-gray-200 hover:border-red-600 hover:text-black/80 transition-all duration-300 shadow-lg"
            >
              Subscribe to Updates
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
