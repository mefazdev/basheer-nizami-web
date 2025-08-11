"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import ReactPlayer from "react-player";
interface PortraitProps {
  image: string;
  alt: string;
}

export const Portrait: React.FC<PortraitProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="relative">
        {/* Decorative background shapes */}
        <div className="absolute -top-8 -left-4 lg:-left-8 w-32 h-32 bg-blue-100 rounded-full opacity-50" />
        <div className="absolute -bottom-8 -right-4 lg:-right-8 w-24 h-24 bg-blue-200 rounded-full opacity-60" />

        {/* Main portrait */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative aspect-[  rounded-2xl overflow-hidden shadow-2xl bg-white p-4"
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            {/* <Image
              src={'/images/8.jpeg'}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            /> */}
            <div className="relative aspect-video   rounded-xl overflow-hidden shadow-2xl">
              <div className="w-full max- mx-auto px-">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <ReactPlayer
                    // src={"/videos/nizami.mp4"}
                    src="https://res.cloudinary.com/dc52qrj3q/video/upload/v1754055772/nizami_lx6anz.mp4"
                    width="100%"
                    height="100%"
                    light={"/images/3.jpeg"}
                    playing={isPlaying}
                    autoPlay
                    // loop
                    controls
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    playIcon={
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="z-[1000]   bg-white bg-opacity-90 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                      >
                        {/* <Play className="w-8 h-8 md:w-10 md:h-10 text-gray-800 ml-1" /> */}
                        <div className="w-16 h-16 z-[1000]  bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-white ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </motion.div>
                    }
                  />
                </motion.div>
              </div>
            </div>

            {/* Subtle overlay */}
            {/* <div className="absolute inset-0 z-[50] bg-gradient-to-t from-black/10 via-transparent to-transparent" /> */}
          </div>
        </motion.div>

        {/* Quote bubble */}
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-2xl shadow-lg max-w-48 hidden lg:block"
          >
            <p className="text-sm text-gray-700 italic">
              &quot;Education is not preparation for life; education is life
              itself.&quot;
            </p>
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rotate-45" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
