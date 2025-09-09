"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { VideoFilters } from "./VideoFilters";

import { VideoModal } from "./VideoModal";
import { VideoItem } from "@/lib/types/media";
import { VideoSection } from "./VideoSection";
import { useVideosData } from "@/hooks/use-videos-data";
import { useVideoCategories } from "@/hooks/use-video-categories";
import { toVideoItem } from "@/lib/utils/video";

const VideosPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [page] = useState(1);
  const [search] = useState("");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Fetch videos data
  const {
    data: videosData,
    isLoading: videosLoading,
 
  } = useVideosData({
    page,
    search,
    category_id: selectedCategory === "all" ? undefined : selectedCategory,
    published: true,
  });

  // Fetch categories data
  const { data: categoriesData } =
    useVideoCategories();

  // Transform API data to VideoItem format
  const videos: VideoItem[] = useMemo(() => {
    if (!videosData?.data) return [];
    return videosData.data.map(toVideoItem);
  }, [videosData]);

  // Create categories with counts
  const categories = useMemo(() => {
    if (!categoriesData) return [{ id: "all", label: "All Videos", count: 0 }];

    const categoryList = [
      { id: "all", label: "All Videos", count: videos.length },
    ];

    categoriesData?.forEach((category ) => {
      const count = videos.filter((v) => v.category === category.name).length;
      categoryList.push({
        id: category.id,
        label: category.name,
        count,
      });
    });

    return categoryList;
  }, [categoriesData, videos]);

  // Group videos by category
  const videosByCategory = useMemo(() => {
    const grouped: Record<string, VideoItem[]> = {};

    if (categoriesData) {
      categoriesData.forEach((category ) => {
        grouped[category.name] = videos.filter(
          (v) => v.category === category.name
        );
      });
    }

    return grouped;
  }, [videos, categoriesData]);

  const filteredVideos =
    selectedCategory === "all"
      ? videos
      : videos.filter((video) => {
          const selectedCategoryName = categoriesData?.find(
            (cat) => cat.id === selectedCategory
          )?.name;
          return video.category === selectedCategoryName;
        });

  const handleVideoClick = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  // if (videosLoading || categoriesLoading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center">
  //       <motion.div
  //         animate={{ rotate: 360 }}
  //         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
  //         className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full"
  //       />
  //     </div>
  //   );
  // }

  // if (videosError) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center">
  //       <div className="text-center">
  //         <h2 className="text-2xl font-bold text-white mb-4">Error Loading Videos</h2>
  //         <p className="text-gray-400">Please try again later</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black"
    >
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Advanced Background Elements */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl" />
        </motion.div>

        {/* Video Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="video-grid"
                width="25"
                height="25"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="10"
                  y="8"
                  width="10"
                  height="7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  rx="1"
                />
                <circle cx="15" cy="11.5" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#video-grid)"
              className="text-blue-400"
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
            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-lg font-semibold tracking-wider uppercase">
                Visual Content Hub
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold text-white mb-6">
              Watch &
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Learn
              </span>
            </h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mb-8"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12"
          >
            Watch the mission come alive through moving visuals, stories, and
            speeches. Experience transformative content that inspires, educates,
            and empowers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                number: `${videos.length}+`,
                label: "Total Videos",
                description: "Growing Library",
              },
              // { number: `${videos.reduce((acc, video) => acc + (video.views || 0), 0).toLocaleString()}+`, label: "Total Views", description: "Global Reach" },
              {
                number: `${categories.length - 1}`,
                label: "Categories",
                description: "Organized Content",
              },
              {
                number: "Weekly",
                label: "New Content",
                description: "Regular Updates",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-300"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Filters */}
      <VideoFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Dynamic Video Sections */}
      {selectedCategory === "all"
        ? categoriesData?.map(
            (category ) =>
              videosByCategory[category.name]?.length > 0 && (
                <VideoSection
                  key={category.id}
                  title={category.name}
                  videos={videosByCategory[category.name]}
                  onVideoClick={handleVideoClick}
                  showTitle={true}
                  categorySlug={category.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}
                />
              )
          )
        : (() => {
            const selectedCategoryName = categoriesData?.find(
              (cat ) => cat.id === selectedCategory
            )?.name;
            const categoryVideos = selectedCategoryName
              ? videosByCategory[selectedCategoryName]
              : [];

            return (
              categoryVideos?.length > 0 && (
                <VideoSection
                  title={selectedCategoryName || ""}
                  videos={categoryVideos}
                  onVideoClick={handleVideoClick}
                  showTitle={false}
                  categorySlug={
                    selectedCategoryName?.toLowerCase().replace(/\s+/g, "-") ||
                    ""
                  }
                />
              )
            );
          })()}

      {/* No Videos Message */}
      {videos.length === 0 && !videosLoading && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto px-6 py-20 text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-12">
            <div className="text-6xl mb-6">🎥</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              No Videos Available
            </h3>
            <p className="text-gray-400">Check back soon for new content!</p>
          </div>
        </motion.div>
      )}

      {/* Video Modal */}
      {/* <VideoModal 
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        allVideos={filteredVideos}
        onNavigate={(video) => setSelectedVideo(video)}
      /> */}

      <VideoModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        allVideos={filteredVideos}
        onNavigate={(video) => setSelectedVideo(video)}
      />
    </div>
  );
};

export default VideosPage;

// // pages/VideosPage.tsx
// 'use client';

// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useRef, useState } from 'react';
// import { VideoFilters } from './VideoFilters';
// import { LecturesSection } from './LecturesSection';
// import { HighlightsSection } from './Highlights';
// import { TalkShowsSection } from './TalkShows';
// import { VideoModal } from './VideoModal';
// import { Video } from '@/lib/types/media';

//  const VideosPage: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<string>('all');

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"]
//   });

//   const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

//   const videos: Video[] = [
//     // Lectures
//     {
//       id: 'lecture-1',
//       title: 'Youth and Purpose: Finding Your Path in Life',
//       description: 'A heart-touching sermon exploring how young people can discover their true purpose through Quranic guidance and spiritual reflection.',
//     youtubeId: 'p1c-EaO-M8A',
//       category: 'lectures',
//       duration: 100,
//       views: 125000,
//       uploadDate: '2024-02-15',
//       tags: ['Youth', 'Purpose', 'Spirituality', 'Guidance'],
//       featured: true
//     },

//     {
//       id: 'lecture-3',
//       title: 'Knowledge and Wisdom: The Islamic Perspective',
//       description: 'Exploring the difference between knowledge and wisdom according to Islamic teachings and their application in modern education.',
//       youtubeId: 'p1c-EaO-M8A',
//       category: 'lectures',
//       duration: 100,
//       views: 76000,
//       uploadDate: '2024-01-10',
//       tags: ['Knowledge', 'Wisdom', 'Education', 'Learning']
//     },
//     // Highlights
//     {
//       id: 'highlight-1',
//       title: 'AILT Academy Annual Day 2024 - Complete Coverage',
//       description: 'Highlights from our grand annual celebration featuring student performances, achievements, and inspiring speeches.',
//     youtubeId: 'p1c-EaO-M8A',
//       category: 'highlights',
//        duration: 100,
//       views: 156000,
//       uploadDate: '2024-03-20',
//       tags: ['Annual Day', 'Celebration', 'Students', 'Achievements'],
//       featured: true
//     },
//     {
//       id: 'highlight-2',
//       title: 'International Conference Keynote Speech',
//       description: 'Delivering keynote address at the Global Education Summit on integrating values with modern education.',
//     youtubeId: 'p1c-EaO-M8A',
//       category: 'highlights',
//       duration: 100,
//       views: 94000,
//       uploadDate: '2024-02-28',
//       tags: ['Keynote', 'Conference', 'Global', 'Education']
//     },

//     // Talk Shows
//     {
//       id: 'talk-1',
//       title: 'The Broken Clock - Understanding Time and Opportunity',
//       description: 'A thought-provoking discussion about how we perceive time, missed opportunities, and the importance of seizing the moment.',
//     youtubeId: 'p1c-EaO-M8A',
//       category: 'talk-shows',
//        duration: 100,
//       views: 187000,
//       uploadDate: '2024-03-05',
//       tags: ['Time', 'Opportunity', 'Philosophy', 'Life Lessons'],
//       featured: true
//     },

//   ];

//   const filteredVideos = selectedCategory === 'all'
//     ? videos
//     : videos.filter(video => video.category === selectedCategory);

//   const handleVideoClick = (video: Video) => {
//     setSelectedVideo(video);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedVideo(null);
//   };

//   const categories = [
//     { id: 'all', label: 'All Videos', count: videos.length },
//     { id: 'lectures', label: 'Lectures', count: videos.filter(v => v.category === 'lectures').length },
//     { id: 'highlights', label: 'Highlights', count: videos.filter(v => v.category === 'highlights').length },
//     { id: 'talk-shows', label: 'Talk Shows', count: videos.filter(v => v.category === 'talk-shows').length }
//   ];

//   return (
//     <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
//       {/* Hero Section */}
//       <section className="relative py-32 overflow-hidden">
//         {/* Advanced Background Elements */}
//         <motion.div
//           style={{ y: backgroundY }}
//           className="absolute inset-0 opacity-20"
//         >
//           <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl" />
//           <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full mix-blend-multiply filter blur-3xl" />
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl" />
//         </motion.div>

//         {/* Video Grid Pattern */}
//         <div className="absolute inset-0 opacity-10">
//           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
//             <defs>
//               <pattern id="video-grid" width="25" height="25" patternUnits="userSpaceOnUse">
//                 <rect x="10" y="8" width="10" height="7" fill="none" stroke="currentColor" strokeWidth="0.5" rx="1"/>
//                 <circle cx="15" cy="11.5" r="1" fill="currentColor"/>
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#video-grid)" className="text-blue-400" />
//           </svg>
//         </div>

//         <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             className="mb-8"
//           >
//             <div className="inline-block mb-6">
//               <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-lg font-semibold tracking-wider uppercase">
//                 Visual Content Hub
//               </span>
//             </div>

//             <h1 className="text-5xl md:text-8xl font-bold text-white mb-6">
//               Watch &
//               <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                 Learn
//               </span>
//             </h1>

//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: "8rem" }}
//               transition={{ duration: 1, delay: 0.5 }}
//               className="h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mb-8"
//             />
//           </motion.div>

//           <motion.p
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.7 }}
//             className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12"
//           >
//             Watch the mission come alive through moving visuals, stories, and speeches.
//             Experience transformative content that inspires, educates, and empowers.
//           </motion.p>

//           {/* Video Stats */}
//           {/* <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 1 }}
//             className="grid md:grid-cols-4 gap-8"
//           >
//             {[
//               { number: `${videos.length}+`, label: "Total Videos", description: "Growing Library" },
//               { number: "1M+", label: "Total Views", description: "Global Reach" },
//               { number: "3", label: "Categories", description: "Organized Content" },
//               { number: "Weekly", label: "New Content", description: "Regular Updates" }
//             ].map((stat, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-white/5 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-300"
//               >
//                 <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
//                   {stat.number}
//                 </div>
//                 <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
//                 <div className="text-sm text-gray-400">{stat.description}</div>
//               </motion.div>
//             ))}
//           </motion.div> */}
//         </div>
//       </section>

//       {/* Video Filters */}
//       <VideoFilters
//         categories={categories}
//         selectedCategory={selectedCategory}
//         onCategoryChange={setSelectedCategory}
//       />

//       {/* Video Sections */}
//       {(selectedCategory === 'all' || selectedCategory === 'lectures') && (
//         <LecturesSection
//           videos={videos.filter(v => v.category === 'lectures')}
//           onVideoClick={handleVideoClick}
//           showTitle={selectedCategory === 'all'}
//         />
//       )}

//       {(selectedCategory === 'all' || selectedCategory === 'highlights') && (
//         <HighlightsSection
//           videos={videos.filter(v => v.category === 'highlights')}
//           onVideoClick={handleVideoClick}
//           showTitle={selectedCategory === 'all'}
//         />
//       )}

//       {(selectedCategory === 'all' || selectedCategory === 'talk-shows') && (
//         <TalkShowsSection
//           videos={videos.filter(v => v.category === 'talk-shows')}
//           onVideoClick={handleVideoClick}
//           showTitle={selectedCategory === 'all'}
//         />
//       )}

//       {/* Video Modal */}
//       <VideoModal
//         video={selectedVideo}
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         allVideos={filteredVideos}
//         onNavigate={(video) => setSelectedVideo(video)}
//       />
//     </div>
//   );
// };

// export default VideosPage;
