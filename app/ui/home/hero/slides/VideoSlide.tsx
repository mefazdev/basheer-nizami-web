// components/slides/VideoSlide.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import { Play } from "lucide-react";

interface VideoSlideProps {
  videoUrl: string;
  thumbnail: string;
  title: string;
}

export const VideoSlide: React.FC<VideoSlideProps> = ({
  videoUrl,
  thumbnail,
 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full h-full bg-gray-900 flex items-center justify-center">
      <div className="w-full max- mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
          whileHover={{ scale: 1.02 }}
        >
          <ReactPlayer
            src={videoUrl}
            width="100%"
            height="100%"
            light={thumbnail}
            playing={isPlaying}
            autoPlay
            loop
            // controls
            // onPlay={() => setIsPlaying(true)}
            // onPause={() => setIsPlaying(false)}
            playIcon={
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 md:w-24 md:h-24 bg-white bg-opacity-90 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
              >
                <Play className="w-8 h-8 md:w-10 md:h-10 text-gray-800 ml-1" />
              </motion.div>
            }
          />

          {/* Animated Border */}
          <motion.div
            // className="absolute inset-0 rounded-2xl border-2 border-transparent"
            animate={{
              borderColor: isPlaying
                ? "rgba(59, 130, 246, 0.6)"
                : "rgba(255, 255, 255, 0.2)",
              boxShadow: isPlaying
                ? "0 0 30px rgba(59, 130, 246, 0.3)"
                : "0 0 20px rgba(0, 0, 0, 0.1)",
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Title and CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
            {title}
            
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            See More Speeches
            
          </motion.button>
        </motion.div> */}
      </div>
    </div>
  );
};
