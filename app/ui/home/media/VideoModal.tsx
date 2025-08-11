// components/media/VideoModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar, MapPin, Eye, Clock } from "lucide-react";
import { useEffect } from "react";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
  date: string;
  venue?: string;
  duration: string;
  views?: number;
  tags: string[];
}

interface VideoModalProps {
  video: VideoItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  video,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!video) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0  z-[1000] flex items-center justify-center p-4 "
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0  bg-black/80  backdrop-blur-sm z-[1000]" />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-5xl max-h-[85vh] overflow-scroll bg-gray-900  mt-20 rounded-3xl  shadow-2xl border border-gray-700 z-[1000]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Video Player */}
            <div className="relative aspect-video bg-black z-[1000]">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/p1c-EaO-M8A?si=YuxqtDmBzBQFdP1z" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}

            {/* Video Information */}
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold border border-blue-500/30">
                      {video.category.replace("-", " ").toUpperCase()}
                    </span>
                    <time className="text-gray-400 text-sm flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(video.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {video.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed mb-6">
                    {video.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 text-gray-300 text-sm font-medium rounded-full border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Side Info */}
                <div className="space-y-6">
                  {video.venue && (
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center text-blue-400 mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="font-semibold">Venue</span>
                      </div>
                      <p className="text-white">{video.venue}</p>
                    </div>
                  )}

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-400">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>Duration</span>
                        </div>
                        <span className="text-white font-semibold">
                          {video.duration}
                        </span>
                      </div>

                      {video.views && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-400">
                            <Eye className="w-4 h-4 mr-2" />
                            <span>Views</span>
                          </div>
                          <span className="text-white font-semibold">
                            {video.views.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-red-800 to-red-500 text-white font-bold py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Watch on YouTube
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
