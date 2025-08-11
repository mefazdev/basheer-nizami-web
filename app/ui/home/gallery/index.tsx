// components/GallerySection.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import { MasonryGrid } from "./MasonryGrid";
import { PhotoModal } from "./PhotoModal";
import { GalleryPhoto } from "@/lib/types/gallery";
 

interface GallerySectionProps {
  photos?: GalleryPhoto[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  photos = [
    {
      id: "ted-talk-stage",
      title: "TED Education Conference Keynote",
      description:
        'Delivering keynote address on "The Future of Personalized Learning" to over 2,000 education leaders from around the world.',
      imageUrl: "/images/8.jpeg",
      thumbnailUrl: "/images/6.jpeg",
      category: "speaking",
      date: "2024-03-15",
      location: "Vancouver, Canada",
      event: "TED Education Conference 2024",
      tags: ["TED", "Keynote", "AI", "Personalized Learning"],
      featured: true,
      aspectRatio: 1.5,
    },
    {
      id: "unesco-meeting2",
      title: " Global Education Summit",
      description:
        "Strategic discussion with UNESCO leadership on digital transformation initiatives in developing countries.",
      imageUrl: "/images/7.jpeg",
      category: "events",
      date: "2024-03-10",
      location: "Paris, France",
      event: " Global Education Summit",
      tags: ["UNESCO", "Global Education", "Policy"],
      aspectRatio: 1.2,
    },
    {
      id: "ted-talk-stage3",
      title: "TED Education Conference Keynote",
      description:
        'Delivering keynote address on "The Future of Personalized Learning" to over 2,000 education leaders from around the world.',
      imageUrl: "/images/8.jpeg",
      thumbnailUrl: "/images/6.jpeg",
      category: "speaking",
      date: "2024-03-15",
      location: "Vancouver, Canada",
      event: "TED Education Conference 2024",
      tags: ["TED", "Keynote", "AI", "Personalized Learning"],
      featured: true,
      aspectRatio: 1.5,
    },
    {
      id: "unesco-meeting4",
      title: " Global Education Summit",
      description:
        "Strategic discussion with UNESCO leadership on digital transformation initiatives in developing countries.",
      imageUrl: "/images/7.jpeg",
      category: "events",
      date: "2024-03-10",
      location: "Paris, France",
      event: " Global Education Summit",
      tags: ["UNESCO", "Global Education", "Policy"],
      aspectRatio: 1.2,
    },
    {
      id: "ted-talk-stage5",
      title: "TED Education Conference Keynote",
      description:
        'Delivering keynote address on "The Future of Personalized Learning" to over 2,000 education leaders from around the world.',
      imageUrl: "/images/8.jpeg",
      thumbnailUrl: "/images/6.jpeg",
      category: "speaking",
      date: "2024-03-15",
      location: "Vancouver, Canada",
      event: "TED Education Conference 2024",
      tags: ["TED", "Keynote", "AI", "Personalized Learning"],
      featured: true,
      aspectRatio: 1.5,
    },
    {
      id: "unesco-meeting6",
      title: " Global Education Summit",
      description:
        "Strategic discussion with UNESCO leadership on digital transformation initiatives in developing countries.",
      imageUrl: "/images/7.jpeg",
      category: "events",
      date: "2024-03-10",
      location: "Paris, France",
      event: " Global Education Summit",
      tags: ["UNESCO", "Global Education", "Policy"],
      aspectRatio: 1.2,
    },
    {
      id: "ted-talk-stage7",
      title: "TED Education Conference Keynote",
      description:
        'Delivering keynote address on "The Future of Personalized Learning" to over 2,000 education leaders from around the world.',
      imageUrl: "/images/8.jpeg",
      thumbnailUrl: "/images/6.jpeg",
      category: "speaking",
      date: "2024-03-15",
      location: "Vancouver, Canada",
      event: "TED Education Conference 2024",
      tags: ["TED", "Keynote", "AI", "Personalized Learning"],
      featured: true,
      aspectRatio: 1.5,
    },
    {
      id: "unesco-meeting8",
      title: " Global Education Summit",
      description:
        "Strategic discussion with UNESCO leadership on digital transformation initiatives in developing countries.",
      imageUrl: "/images/7.jpeg",
      category: "events",
      date: "2024-03-10",
      location: "Paris, France",
      event: " Global Education Summit",
      tags: ["UNESCO", "Global Education", "Policy"],
      aspectRatio: 1.2,
    },
  ],
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const filteredPhotos =
    selectedCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  const handlePhotoClick = (photo: GalleryPhoto) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const categories = [
    { id: "all", label: "All Photos", count: photos.length, icon: "📸" },
    {
      id: "speaking",
      label: "Speaking Engagements",
      count: photos.filter((p) => p.category === "speaking").length,
      icon: "🎤",
    },
    {
      id: "events",
      label: "Events & Conferences",
      count: photos.filter(
        (p) => p.category === "events" || p.category === "conferences"
      ).length,
      icon: "🎯",
    },
    {
      id: "awards",
      label: "Awards & Recognition",
      count: photos.filter((p) => p.category === "awards").length,
      icon: "🏆",
    },
    {
      id: "campus-visits",
      label: "Campus Visits",
      count: photos.filter((p) => p.category === "campus-visits").length,
      icon: "🏛️",
    },
    {
      id: "field-visits",
      label: "Field Visits",
      count: photos.filter((p) => p.category === "field-visits").length,
      icon: "🌍",
    },
    {
      id: "community",
      label: "Community Outreach",
      count: photos.filter((p) => p.category === "community").length,
      icon: "🤝",
    },
    {
      id: "meetings",
      label: "Professional Meetings",
      count: photos.filter((p) => p.category === "meetings").length,
      icon: "👥",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-slate-50 overflow-hidden"
    >
      {/* Advanced Background Elements */}
      <motion.div
        style={{ y: backgroundY }}
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

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center pb-10 lg:mb-20"
        >
          {/* <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-lg font-semibold tracking-wider uppercase">
              Visual Journey
            </span>
          </motion.div> */}

          <h2
            onClick={() => console.log(filteredPhotos, "hello")}
            className="text-3xl lg:text-5xl md:text-6xl font-bold text-gray-900 mb-2 lg:mb-6"
          >
            Photo
            <span className="block bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
              Gallery
            </span>
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full mb-8"
          />

          {/* <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Explore moments from speaking engagements, campus visits, award ceremonies, and community outreach that showcase the impact of educational leadership in action
          </p> */}
        </motion.div>

        {/* Gallery Stats */}
        {/* <GalleryStats photos={photos} /> */}

        {/* Category Filter */}
        {/* <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        /> */}

        {/* Masonry Grid */}
        <MasonryGrid photos={filteredPhotos} onPhotoClick={handlePhotoClick} />

        {/* Photo Modal */}
        <PhotoModal
          photo={selectedPhoto}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          allPhotos={filteredPhotos}
          onNavigate={(photo) => setSelectedPhoto(photo)}
        />

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
              className="px-8 py-2.5 lg:py-4 bg-gradient-to-r from-red-600 to-black text-white font-bold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl"
            >
              View Full Archive
            </motion.button>
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-gray-900 font-bold rounded-full border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 shadow-lg"
            >
              Download Media Kit
            </motion.button> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
