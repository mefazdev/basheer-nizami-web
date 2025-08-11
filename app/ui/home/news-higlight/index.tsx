// components/NewsHighlightsSection.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { NewsTicker } from "./NewsTicker";
import { FeaturedNews } from "./FeaturedNews";
// import { PublicationShowcase } from './PublicationShowcase';
import { NewsGrid } from "./NewsGrid";
import { Blogs } from "./Blogs";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category:
    | "media"
    | "publication"
    | "speaking"
    | "award"
    | "research"
    | "announcement";
  date: string;
  image?: string;
  source?: string;
  link?: string;
  featured?: boolean;
  tags: string[];
}

interface Publication {
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

interface NewsHighlightsSectionProps {
  tickerItems?: string[];
  featuredNews?: NewsItem;
  newsItems?: NewsItem[];
  publications?: Publication[];
}

export const NewsHighlightsSection: React.FC<NewsHighlightsSectionProps> = ({
  tickerItems = [
    "Featured as 'Education Innovator of the Year' by Global Education Summit 2024",
    "New research published in Journal of Educational Technology showing 85% improvement in student engagement",
    "Keynote speaker at UNESCO International Conference on Digital Learning - Paris, March 2024",
    "Selected as Harvard Graduate School of Education Visiting Fellow for 2024-2025",
    "AI-Powered Learning Platform receives $2.3M in Series A funding",
    "Invited to White House Education Technology Roundtable discussion",
    "Named to Fortune's '40 Under 40 in Education' list for transformative leadership",
  ],
  featuredNews = {
    id: "featured-1",
    title: "Pioneering AI in Education: A New Era of Personalized Learning",
    excerpt:
      "Our groundbreaking research on AI-driven personalized learning platforms has been featured in Harvard Educational Review, showcasing how machine learning algorithms can adapt to individual student needs in real-time.",
    category: "publication",
    date: "2024-03-15",
    image: "/images/edu.jpg",
    source: "Harvard Educational Review",
    link: "/blog/ai-personalized-learning",
    featured: true,
    tags: ["AI", "Personalized Learning", "Research", "Harvard"],
  },
  newsItems = [
    {
      id: "news-1",
      title: "UNESCO Keynote: Transforming Global Education Systems",
      excerpt:
        "Delivered keynote address on innovative educational frameworks at the UNESCO International Conference, reaching over 2,000 education leaders worldwide.",
      category: "speaking",
      date: "2024-03-10",
      image: "/images/edu.jpg",
      source: "UNESCO Global Conference",
      link: "/appearances/unesco-2024",
      featured: false,
      tags: ["UNESCO", "Keynote", "Global Education", "Leadership"],
    },
    {
      id: "news-2",
      title: "Digital Equity Research Wins National Innovation Award",
      excerpt:
        "Our comprehensive study on bridging the digital divide in education receives the National Education Research Association's highest honor.",
      category: "award",
      date: "2024-02-28",
      image: "/images/edu.jpg",
      source: "NERA",
      link: "/news/nera-award-2024",
      featured: false,
      tags: ["Award", "Digital Equity", "Research", "Innovation"],
    },
    {
      id: "news-3",
      title: 'New Book: "The Future of Learning" Launches to Critical Acclaim',
      excerpt:
        "Latest publication explores the intersection of technology, pedagogy, and human potential in 21st-century education.",
      category: "publication",
      date: "2024-02-15",
      image: "/images/edu.jpg",
      source: "Harvard Business Review Press",
      link: "/publications/future-of-learning",
      featured: false,
      tags: ["Book", "Publication", "Future Learning", "Technology"],
    },
  ],
  publications = [
    {
      id: "pub-1",
      title: "Machine Learning Applications in Adaptive Educational Assessment",
      journal: "Nature Education",
      date: "2024-03-01",
      coAuthors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez"],
      abstract:
        "This study explores the implementation of machine learning algorithms in creating adaptive assessment systems that personalize to individual student learning patterns.",
      link: "/publications/ml-adaptive-assessment",
      citations: 47,
      image: "/images/edu.jpg",
    },
    {
      id: "pub-2",
      title: "Digital Equity and Educational Outcomes: A Longitudinal Study",
      journal: "Educational Psychology Review",
      date: "2024-01-15",
      coAuthors: ["Dr. Jennifer Walsh", "Prof. David Kim"],
      abstract:
        "A comprehensive five-year longitudinal study examining the correlation between digital access and long-term educational achievement across diverse socioeconomic populations.",
      link: "/publications/digital-equity-outcomes",
      citations: 73,
      image: "/images/edu.jpg",
    },
    {
      id: "pub-3",
      title: "Neurocognitive Impacts of Immersive Learning Environments",
      journal: "Frontiers in Educational Neuroscience",
      date: "2023-11-20",
      coAuthors: ["Dr. Lisa Park", "Prof. Robert Thompson"],
      abstract:
        "Investigation into how virtual and augmented reality learning environments affect cognitive processing and knowledge retention using advanced neuroimaging techniques.",
      link: "/publications/neurocognitive-immersive-learning",
      citations: 89,
      image: "/images/edu.jpg",
    },
  ],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

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

          <h2 className="text-3xl lg:text-5xl    font-bold text-gray-900 mb-3 lg:mb-6">
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
        <NewsTicker items={tickerItems} />

        {/* Featured News */}
        <FeaturedNews news={featuredNews} />

        {/* Publication Showcase */}
        <Blogs blogs={publications} />

        {/* News Grid */}
        <NewsGrid newsItems={newsItems} />

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-10 lg:mt-20"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-2.5 lg:py-4 bg-gradient-to-r from-red-600 to-black text-white font-bold rounded-full hover:from-red-700 hover:to-gray-700 transition-all duration-300 shadow-xl"
            >
              View All News
            </motion.button>
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
