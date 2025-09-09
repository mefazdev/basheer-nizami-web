// pages/UpdatesPage.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef, useState, useEffect } from "react";

import { useUpdates, useUpdateSearch } from "@/hooks/sanity/useUpdates";
import { SearchBar } from "./SearchBar";
import { UpdatesGrid } from "./UpdateGrid";

const Updates: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Get data from hooks
  const { updates, loading, error } = useUpdates();
  const { searchResults, searching } = useUpdateSearch(searchTerm);
  // const {news} = useNewsItems()
  // Debug logging
  useEffect(() => {
    console.log("🔍 Updates Page Debug:");
    console.log("Updates:", updates);
    console.log("Updates length:", updates?.length);
    console.log("Loading:", loading);
    console.log("Error:", error);
    console.log("Search term:", searchTerm);
    console.log("Search results:", searchResults);
  }, [updates, loading, error, searchTerm, searchResults]);

  // Determine which updates to display
  const displayUpdates = useMemo(() => {
    console.log("🔄 Computing displayUpdates...");
    console.log("Search term:", searchTerm.trim());

    if (searchTerm.trim()) {
      console.log("Using search results:", searchResults);
      return searchResults;
    }

    console.log("Using all updates:", updates);
    return updates;
  }, [updates, searchResults, searchTerm]);

  // Show loading state
  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
  //       <motion.div
  //         animate={{ rotate: 360 }}
  //         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
  //         className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full"
  //       />
  //     </div>
  //   )
  // }

  // Show error state
  // if (error) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Updates</h2>
  //         <p className="text-gray-600 mb-6">{error.message}</p>
  //         <button
  //           onClick={() => window.location.reload()}
  //           className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
  //         >
  //           Retry
  //         </button>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50"
    >
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 opacity-30"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-200 to-green-200 rounded-full mix-blend-multiply filter blur-3xl" />
        </motion.div>

        {/* Update Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="update-pattern"
                width="15"
                height="15"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="7.5"
                  cy="7.5"
                  r="2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <line
                  x1="7.5"
                  y1="5.5"
                  x2="7.5"
                  y2="9.5"
                  stroke="currentColor"
                  strokeWidth="0.3"
                />
                <line
                  x1="5.5"
                  y1="7.5"
                  x2="9.5"
                  y2="7.5"
                  stroke="currentColor"
                  strokeWidth="0.3"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#update-pattern)"
              className="text-green-600"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <div className="inline-block mb-6 mt-10">
              <span
                onClick={() => console.log(updates)}
                className="bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent text-lg font-semibold tracking-wider uppercase"
              >
                Latest News
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Updates
              <span className="block bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                & News
              </span>
            </h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full mb-8"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-12"
          >
            Stay informed with our latest updates, announcements, and news. Get
            the most recent information about our projects, events, and
            developments.
          </motion.p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-4xl mx-auto px-6">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search updates by title or content..."
          />
        </div>
      </section>

      {/* Updates Grid */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 lg:mb-4">
              {searchTerm ? `Search Results` : "All Updates"}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full mb-6" />

            <p className="text-sm text-gray-500 mb-4">
              Showing {displayUpdates?.length || 0} updates
            </p>
          </motion.div>

          {/* Loading state for search */}
          {searching && (
            <div className="text-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full mx-auto mb-4"
              />
              <p>Searching...</p>
            </div>
          )}

          {/* Updates Grid */}
          {!searching && displayUpdates && displayUpdates.length > 0 && (
            <UpdatesGrid updates={displayUpdates} />
          )}

          {/* No updates found */}
          {!searching && displayUpdates && displayUpdates.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No updates found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "No updates available at the moment"}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-green-700"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}

      
        </div>
      </section>
    </div>
  );
};

export default Updates;
