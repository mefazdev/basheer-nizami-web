// components/MediaSpeechesSection.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { FeaturedVideo } from "./FeaturedVideo";
// import { CategoryFilter } from "./CategoryFilter";
import { VideoGallery } from "./VideoGallery";
import { VideoModal } from "./VideoModal";
import { VideoItem } from "@/lib/types/media";
import Link from "next/link";
import { useVideosData } from "@/hooks/use-videos-data";
import { toVideoItem } from "@/lib/utils/video";
// import { useVideoCategories } from "@/hooks/use-video-categories";

// interface MediaSpeechesSectionProps {
//   videos?: VideoItem[];
//   featuredVideo?: VideoItem;
// category_id:string
// }
interface VideosTableProps {
  searchParams?: {
    page?: string;
    search?: string;
    category?: string;
    published?: string;
    dateFrom?: string;
    dateTo?: string;
  };
}
export const MediaSpeechesSection: React.FC<VideosTableProps> = (
  
 
{ searchParams }: VideosTableProps
 
) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);


  const page = parseInt(searchParams?.page || "1");
  // const search = searchParams?.search || "";
  const categoryId = searchParams?.category || "all";
  const published = searchParams?.published || "all";


const { data  } = useVideosData({
    page,
    // search,
    category_id: categoryId === "all" ? undefined : categoryId,
    published: published === "all" ? undefined : published === "true",
    limit:3
  });  
//  const { data: categories } = useVideoCategories();

  // const filteredVideos =
  //   selectedCategory === "all"
  //     ? data?.data
  //     : data?.data?.filter((video) => video.category_id === categoryId);

  const filteredVideos =
  selectedCategory === "all"
    ? (data?.data ?? []).map(toVideoItem)
    : (data?.data ?? [])
        .filter((video) => video.category_id === selectedCategory)
        .map(toVideoItem);


  const featured =   (data?.data ?? []).map(toVideoItem).find((v) => v.featured)  ;

  const handleVideoClick = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  

  return (
    <section
      ref={containerRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-black via-gray-800 to-black overflow-hidden"
    >
      {/* Advanced Background Elements */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-slate-300 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-slate-300 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-slate-300 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl" />
      </motion.div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="media-grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#media-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-lg font-semibold tracking-wider uppercase">
              Video Portfolio
            </span>
          </motion.div>
           */}
          <h2 onClick={()=>console.log(filteredVideos)} className="text-4xl md:text-6xl font-bold text-white mb-6">
            Media &
            <span className="block bg-gradient-to-r from-white/30 to-gray-300 bg-clip-text text-transparent">
              Luctures
            </span>
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-white/30 to-gray-300 mx-auto rounded-full mb-8"
          />

          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Watch keynote speeches, television interviews, and public
            presentations showcasing thought leadership in educational
            innovation and transformation
          </p>
        </motion.div>

        {/* Featured Video */}
        {featured && <FeaturedVideo
          video={featured}
          onPlay={() => handleVideoClick(featured)}
        />}

        {/* Category Filter */}
        {/* <div className="hidden lg:block">
          <CategoryFilter
            // categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div> */}

        {/* Video Gallery */}
        {filteredVideos &&  <VideoGallery videos={filteredVideos|| []} onVideoClick={handleVideoClick} />}
       

        {/* Video Modal */}
        <VideoModal
          video={selectedVideo}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 lg:mt-20"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl"
            >
              Subscribe to Channel
            </motion.button> */}
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full border-2 border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300"
            >
        View More
            </motion.button> */}
            <Link href="/videos">
              {" "}
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center px-10 lg:px-12 py-2.5 lg:py-4 bg-gradient-to-r from-slate-600 to-black/70 text-white font-bold rounded-full hover:from-red-700 hover:to-gray-700 transition-all duration-300 shadow-xl overflow-hidden"
              >
                <span className="relative z-10 ">VIEW MORE </span>
                <motion.svg
                  className="relative z-10 ml-3 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>

                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
