// pages/PhotosGalleryPage.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useMemo, useEffect } from "react";
 
import { usePhotosData } from "@/hooks/use-photos-data";
import { usePhotoCategoriesData } from "@/hooks/use-photo-categories-data";
import { mapPhotoToGalleryPhoto } from "@/lib/utils/photos";
import { GalleryPhoto } from "@/lib/types/gallery"; 
import { SearchBar } from "../publications/Searchbar"; 
import { MasonryGrid } from "@/app/ui/home/gallery/MasonryGrid";
import { PhotoModal } from "@/app/ui/home/gallery/PhotoModal";
 
import { CategoryFilter } from "./PhotoCategoryFilter";

const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Fetch photos data
  const {
    data: photosData,
    
  } = usePhotosData({
    page,
    search: searchTerm,
    category_id: selectedCategory === "all" ? undefined : selectedCategory,
  });

  // Fetch categories data
  const { data: categoriesData} =
    usePhotoCategoriesData();

  // Transform API data to GalleryPhoto format
  const photos: GalleryPhoto[] = useMemo(() => {
    if (!photosData?.data) return [];
    return photosData.data.map(mapPhotoToGalleryPhoto);
  }, [photosData]);

  // Create categories with counts
  const categories = useMemo(() => {
    if (!categoriesData)
      return [{ id: "all", label: "All Photos", count: 0, icon: "📸" }];

    const categoryList = [
      { id: "all", label: "All Photos", count: photos.length },
    ];

    categoriesData?.forEach((category) => {
      const count = photos.filter(
        (photo) => photo.category === category.name
      ).length;
      categoryList.push({
        id: category.id,
        label: category.name,
        count,
        // icon: getCategoryIcon(category.name)
      });
    });

    return categoryList;
  }, [categoriesData, photos]);


  // Filter photos based on search and category
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      const matchesSearch =
        photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "all" ||
        photo.category ===
          categoriesData?.find((cat) => cat.id === selectedCategory)?.name;

      return matchesSearch && matchesCategory;
    });
  }, [photos, searchTerm, selectedCategory, categoriesData]);

  const handlePhotoClick = (photo: GalleryPhoto) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  // if (photosLoading || categoriesLoading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50 flex items-center justify-center">
  //       <motion.div
  //         animate={{ rotate: 360 }}
  //         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
  //         className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full"
  //       />
  //     </div>
  //   );
  // }

  // if (photosError) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Photos</h2>
  //         <p className="text-gray-600">Please try again later</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50"
    >
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Advanced Background Elements */}
        <motion.div
          style={isMounted ? { y: backgroundY } : {}}
          className="absolute inset-0 opacity-30"
        >
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-to-l from-indigo-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl" />
        </motion.div>

        {/* Camera Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <svg
            className="w-full h-full"
            viewBox="0 0 60 60"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="camera-pattern"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="30"
                  cy="30"
                  r="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <circle cx="30" cy="30" r="3" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#camera-pattern)" />
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
              <span className="bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent text-lg font-semibold tracking-wider uppercase">
                Visual Journey
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Photo
              <span className="block bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                Gallery
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
            Explore moments from speaking engagements, campus visits, award
            ceremonies, and community outreach that showcase the impact of
            educational leadership in action.
          </motion.p>

          {/* Photo Stats */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              {
                number: `${photos.length}+`,
                label: "Total Photos",
                description: "Captured Moments",
              },
              {
                number: `${new Set(photos.map((p) => p.location)).size}+`,
                label: "Locations",
                description: "Global Reach",
              },
              {
                number: `${photos.filter((p) => p.featured).length}+`,
                label: "Featured",
                description: "Highlighted Photos",
              },
              {
                number: `${categories.length - 1}+`,
                label: "Categories",
                description: "Organized Collection",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div> */}
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-6">
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Explore Photo Collection
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Search and filter through our visual documentation of educational
              leadership moments
            </p>
          </motion.div> */}

          <div className="grid lg:grid-cols-3 gap-6 items-end">
            <div className="lg:col-span-2">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Search photos by title, description, or tags..."
              />
            </div>
            <div>
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              
              
            </div>
          </div>
        </div>
      </section>
 
              
 
     

      {/* Photos Grid */}
      <section className="py-10 lg:py-20 bg-gradient-to-br from-gray-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {searchTerm
                ? "Search Results"
                : selectedCategory !== "all"
                  ? categories.find((c) => c.id === selectedCategory)?.label
                  : "All Photos"}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full mb-6" />

            {filteredPhotos.length > 0 && (
              <p className="text-gray-600">
                Showing {filteredPhotos.length} photo
                {filteredPhotos.length !== 1 ? "s" : ""}
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            )}
          </motion.div>

          {filteredPhotos.length > 0 ? (
            <MasonryGrid
              photos={filteredPhotos}
              onPhotoClick={handlePhotoClick}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center py-20"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-12 max-w-2xl mx-auto">
                <div className="text-6xl mb-6">📸</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No Photos Found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm
                    ? `No photos match your search for "${searchTerm}". Try different keywords or adjust your category filter.`
                    : "No photos available for the selected category. Try selecting a different category."}
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-black text-white font-semibold rounded-full hover:from-red-700 hover:to-gray-900 transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Photo Modal */}
      <PhotoModal
        photo={selectedPhoto}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        allPhotos={filteredPhotos}
        onNavigate={(photo) => setSelectedPhoto(photo)}
      />

      {/* Call to Action */}
      {photos.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Capture More Moments
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Stay connected with our visual journey and be part of the
                educational transformation story.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-black text-white font-bold rounded-full hover:from-red-700 hover:to-gray-900 transition-all duration-300 shadow-xl"
                >
                  Subscribe to Updates
                </motion.button>
                
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Gallery;
