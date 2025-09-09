// components/media/VideoGallery.tsx
"use client";

import { VideoItem } from "@/lib/types/media";
import { formatDuration } from "@/lib/utils";
import { motion } from "framer-motion";
import { Play,  Clock } from "lucide-react";
import Image from "next/image";

interface VideoGalleryProps {
  videos: VideoItem[];
  onVideoClick: (video: VideoItem) => void;
}

 
export const VideoGallery: React.FC<VideoGalleryProps> = ({
  videos,
  onVideoClick,
}) => {

          {/* // const thumbnailUrl = "/images/7.jpeg"; */}
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {videos?.map((video ) => {
      
         const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`

        return (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.01 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, scale: 1.01 }}
            onClick={() => onVideoClick(video)}
            className="group cursor-pointer"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500 shadow-xl hover:shadow-2xl">
              {/* Video Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <Image
              
                fill
                  src={thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-red-600 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl"
                  >
                    <Play className="w-6 h-6 text-white ml-1" />
                  </motion.div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                     
                    {video.category?.replace("-", " ").toUpperCase()}
                  </span>
                </div>

                {/* Duration Badge */}
                {/* <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {video.duration}
                </div> */}

                  {video?.duration  ? (
                                        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center">
                                          <Clock className="w-3 h-3 mr-1"/>
                                          {formatDuration(video?.duration )}
                                        </div>
                                     ) : (
                                        <span className="text-muted-foreground">—ssss</span>
                                      )}  
              </div>

              {/* Video Details */}
              <div className="p-6">
                {/* Date and Venue */}
                <div className="flex items-center justify-between mb-3">
                  <time className="text-gray-400 text-sm">
                    {new Date(video.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  {/* {video.views && (
                    <div className="flex items-center text-gray-400 text-sm">
                      <Eye className="w-3 h-3 mr-1" />
                      {video.views.toLocaleString()}
                    </div>
                  )} */}
                </div>

                {/* Title */}
                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-gray-100 transition-colors line-clamp-2">
                  {video.title}
                </h4>

                {/* Venue */}
                {video.venue && (
                  <p className="text-gray-300 text-sm font-medium mb-3">
                    📍 {video.venue}
                  </p>
                )}

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                  {video.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {video.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-white/10 text-gray-400 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
