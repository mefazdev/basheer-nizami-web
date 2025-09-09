// pages/PublicationsPage.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useMemo, useEffect } from 'react';
 
import { usePublicationsData } from '@/hooks/use-publications-data';
import { usePublicationCategoriesData } from '@/hooks/use-publication-categories-data';
import { mapPublicationToBook } from '@/lib/utils/publication';
import { Book } from '@/lib/types/publication';
import { SearchBar } from './Searchbar';
import { PublicationFilter } from './PublicationFilter';
import { BooksGrid } from '@/app/ui/home/publications/BookGrid';
import { FeaturedBook } from '@/app/ui/home/publications/FeaturedBook';

const PublicationsPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [page] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Fetch publications data
  const { data: publicationsData } = usePublicationsData({
    page,
    search: searchTerm,
    category_id: selectedCategory === "all" ? undefined : selectedCategory,
    year: selectedYear === "all" ? undefined : parseInt(selectedYear),
  });

  // Fetch categories data
  const { data: categoriesData  } = usePublicationCategoriesData();

  // Transform API data to Book format
  const books: Book[] = useMemo(() => {
    if (!publicationsData?.data) return [];
    return publicationsData.data.map(mapPublicationToBook);
  }, [publicationsData]);

  // Create categories with counts
  const categories = useMemo(() => {
    if (!categoriesData) return [{ id: 'all', label: 'All Publications', count: 0 }];
    
    const categoryList = [
      { id: 'all', label: 'All Publications', count: books.length }
    ];

    categoriesData?.forEach((category ) => {
      const count = books.filter(book => book.category === category.name).length;
      categoryList.push({
        id: category.id,
        label: category.name,
        count
      });
    });

    return categoryList;
  }, [categoriesData, books]);

  // Get available years from publications
  const availableYears = useMemo(() => {
    const years = books.map(book => new Date(book.publicationDate).getFullYear());
    const uniqueYears = [...new Set(years)].sort((a, b) => b - a);
    return [
      { id: 'all', label: 'All Years', count: books.length },
      ...uniqueYears.map(year => ({
        id: year.toString(),
        label: year.toString(),
        count: books.filter(book => new Date(book.publicationDate).getFullYear() === year).length
      }))
    ];
  }, [books]);

  // Filter books based on search and filters
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || book.category === categoriesData?.find((cat ) => cat.id === selectedCategory)?.name;
      
      const matchesYear = selectedYear === 'all' || new Date(book.publicationDate).getFullYear() === parseInt(selectedYear);
      
      return matchesSearch && matchesCategory && matchesYear;
    });
  }, [books, searchTerm, selectedCategory, selectedYear, categoriesData]);

  // Get featured publication
  const featuredBook = books.find(book => book.featured);

//   if (publicationsLoading || categoriesLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//           className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full"
//         />
//       </div>
//     );
//   }

//   if (publicationsError) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Publications</h2>
//           <p className="text-gray-600">Please try again later</p>
//         </div>
//       </div>
//     );
//   }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Advanced Background Elements */}
        <motion.div 
          style={isMounted ? { y: backgroundY } : {}}
          className="absolute inset-0 opacity-40"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl" />
        </motion.div>

        {/* Book Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="book-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="2" height="12" x="2" y="4" fill="currentColor" />
                <rect width="2" height="12" x="6" y="4" fill="currentColor" />
                <rect width="2" height="12" x="10" y="4" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#book-pattern)" />
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
              <span className="bg-gradient-to-r from-red-600 to-gray-800 bg-clip-text text-transparent text-lg font-semibold tracking-wider uppercase">
                Written Works
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Books &
              <span className="block bg-gradient-to-r from-red-600 to-gray-800 bg-clip-text text-transparent">
                Publications
              </span>
            </h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-red-600 to-gray-800 mx-auto rounded-full mb-8"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-12"
          >
            Explore a comprehensive collection of books, research papers, and academic publications 
            that advance the field of education through evidence-based insights and innovative approaches.
          </motion.p>

          {/* Publication Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              { number: `${books.length}+`, label: "Publications", description: "Growing Library" },
              { number: `${categories.length - 1}+`, label: "Categories", description: "Diverse Topics" },
              { number: `${availableYears.length - 1}+`, label: "Years Published", description: "Continuous Work" },
              { number: "Global", label: "Impact", description: "Worldwide Reach" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-gray-800 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Explore Publications
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Search and filter through our collection of educational resources and research
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6 items-end">
            <div className="lg:col-span-2">
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Search publications by title, description, or tags..."
              />
            </div>
            <div>
              <PublicationFilter 
                label="Category"
                options={categories}
                selectedValue={selectedCategory}
                onValueChange={setSelectedCategory}
              />
            </div>
            {/* <div>
              <PublicationFilter 
                label="Year"
                options={availableYears}
                selectedValue={selectedYear}
                onValueChange={setSelectedYear}
              />
            </div> */}
          </div>
        </div>
      </section>

      {/* Featured Publication */}
      {featuredBook && selectedCategory === 'all' && !searchTerm && selectedYear === 'all' && (
        <section className="py-10 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Publication
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-gray-800 mx-auto rounded-full mb-6" />
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Highlighted work that showcases innovative approaches to education
              </p>
            </motion.div>

            <FeaturedBook book={featuredBook} />
          </div>
        </section>
      )}

      {/* Publications Grid */}
      <section className="py-10 lg:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {searchTerm ? 'Search Results' : 
               selectedCategory !== 'all' ? categories.find(c => c.id === selectedCategory)?.label :
               selectedYear !== 'all' ? `Publications from ${selectedYear}` :
               'All Publications'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-gray-800 mx-auto rounded-full mb-6" />
            
            {filteredBooks.length > 0 && (
              <p className="text-gray-600">
                Showing {filteredBooks.length} publication{filteredBooks.length !== 1 ? 's' : ''}
              </p>
            )}
          </motion.div>

          {filteredBooks.length > 0 ? (
            <BooksGrid books={filteredBooks} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center py-20"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-12 max-w-2xl mx-auto">
                <div className="text-6xl mb-6">📚</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Publications Found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm ? 
                    `No publications match your search for "${searchTerm}". Try different keywords or adjust your filters.` :
                    'No publications available for the selected filters. Try adjusting your search criteria.'
                  }
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedYear('all');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-gray-800 text-white font-semibold rounded-full hover:from-red-700 hover:to-gray-900 transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      {books.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Stay Updated on New Publications
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Be the first to know about new books, research papers, and educational resources.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-black text-white font-bold rounded-full hover:from-red-700 hover:to-black/70 transition-all duration-300 shadow-xl"
                >
                  Subscribe to Updates
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-gray-900 font-bold rounded-full border-2 border-gray-200 hover:border-red-600 hover:text-black/80 transition-all duration-300 shadow-lg"
                >
                  View Research
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PublicationsPage;