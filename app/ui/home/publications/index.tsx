// components/BooksPublicationsSection.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { FeaturedBook } from "./FeaturedBook";
import { PublicationFilter } from "./PublicationFilter";
import { BooksGrid } from "./BookGrid";
 

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
  category: "book" | "chapter" | "edited-volume";
  featured?: boolean;
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

interface AcademicPublication {
  id: string;
  title: string;
  abstract: string;
  journal: string;
  volume?: string;
  issue?: string;
  pages?: string;
  publicationDate: string;
  doi?: string;
  pmid?: string;
  citations: number;
  impact: number;
  coAuthors: string[];
  category: "research" | "review" | "editorial" | "conference";
  openAccess: boolean;
  downloadLink?: string;
  tags: string[];
}

interface BooksPublicationsSectionProps {
  books?: Book[];
  academicPublications?: AcademicPublication[];
  featuredBook?: Book;
}

export const PublicationsSection: React.FC<BooksPublicationsSectionProps> = ({
  books = [
    {
      id: "future-of-learning",
      title: "The Future of Learning",
      subtitle: "Transforming Education Through Technology and Innovation",
      description:
        "A comprehensive exploration of how artificial intelligence, personalized learning, and innovative pedagogies are reshaping the educational landscape. This groundbreaking work provides practical frameworks for educators, administrators, and policymakers to navigate the digital transformation of education.",
      coverImage: "/images/book.jpg",
      isbn: "978-0-674-24789-3",
      publicationDate: "2024-01-15",
      publisher: "Harvard Business Review Press",
      pages: 384,
      category: "book",
      featured: true,
      awards: [
        "Education Book of the Year 2024",
        "Choice Outstanding Academic Title",
      ],
      reviews: [
        {
          source: "New York Times",
          excerpt:
            "A visionary guide that brilliantly bridges the gap between educational theory and practical innovation.",
          rating: 5,
        },
        {
          source: "Educational Leadership",
          excerpt:
            "Essential reading for anyone committed to transforming education for the 21st century.",
        },
      ],
      purchaseLinks: {
        amazon: "https://amazon.com/future-of-learning",
        barnes: "https://barnesandnoble.com/future-of-learning",
        publisher: "https://hbr.org/future-of-learning",
        google: "https://books.google.com/future-of-learning",
      },
      tags: [
        "Education Technology",
        "AI in Education",
        "Innovation",
        "Leadership",
      ],
    },
    {
      id: "digital-equity-education",
      title: "Digital Equity in Education",
      subtitle: "Bridging the Technology Gap for All Learners",
      description:
        "An in-depth analysis of the digital divide in education and comprehensive strategies for ensuring equitable access to technology-enhanced learning opportunities.",
      coverImage: "/images/book.jpg",
      isbn: "978-1-118-97234-8",
      publicationDate: "2023-06-20",
      publisher: "Jossey-Bass",
      pages: 312,
      category: "book",
      featured: false,
      awards: ["American Library Association Notable Book"],
      purchaseLinks: {
        amazon: "https://amazon.com/digital-equity-education",
        barnes: "https://barnesandnoble.com/digital-equity",
        publisher: "https://josseybass.com/digital-equity",
      },
      tags: ["Digital Equity", "Access", "Social Justice", "Technology"],
    },
    {
      id: "neuroscience-classroom",
      title: "Neuroscience in the Classroom",
      subtitle: "Evidence-Based Strategies for Enhanced Learning",
      description:
        "Translating cutting-edge neuroscience research into practical classroom applications that optimize learning and cognitive development.",
      coverImage: "/images/book.jpg",
      isbn: "978-0-521-87543-2",
      publicationDate: "2022-09-10",
      publisher: "Cambridge University Press",
      pages: 288,
      category: "book",
      featured: false,
      purchaseLinks: {
        amazon: "https://amazon.com/neuroscience-classroom",
        publisher: "https://cambridge.org/neuroscience-classroom",
      },
      tags: [
        "Neuroscience",
        "Learning",
        "Cognitive Development",
        "Evidence-Based",
      ],
    },
  ],

  featuredBook,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const featured = featuredBook || books.find((b) => b.featured) || books[0];

  const categories = [
    { id: "all", label: "All Publications", count: books.length },
    {
      id: "books",
      label: "Books",
      count: books.filter((b) => b.category === "book").length,
    },
    // { id: 'research', label: 'Research Papers', count: academicPublications.filter(p => p.category === 'research').length },
    // { id: 'reviews', label: 'Review Articles', count: academicPublications.filter(p => p.category === 'review').length },
    {
      id: "edited",
      label: "Edited Volumes",
      count: books.filter((b) => b.category === "edited-volume").length,
    },
  ];

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

          <h2 className= " text-4xl lg:text-5xl   mt-10 font-bold text-gray-900 mb-2 lg:mb-6">
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
        <FeaturedBook book={featured} />

        {/* Publication Filter */}
        <PublicationFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Content Based on Filter */}
        {(selectedCategory === "all" ||
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
        )}

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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-black text-white font-bold rounded-full hover:from-red-700 hover:to-black/70 transition-all duration-300 shadow-xl"
            >
              View More
            </motion.button>
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
