// components/videos/VideoModal.tsx
'use client';

import { Video } from '@/lib/types/media';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, Calendar, Eye, Clock, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';

 

interface VideoModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
  allVideos: Video[];
  onNavigate: (video: Video) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ 
  video, 
  isOpen, 
  onClose, 
  allVideos, 
  onNavigate 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (video && allVideos.length > 0) {
      const index = allVideos.findIndex(v => v.id === video.id);
      setCurrentIndex(index);
    }
  }, [video, allVideos]);

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : allVideos.length - 1;
    setCurrentIndex(newIndex);
    onNavigate(allVideos[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex < allVideos.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    onNavigate(allVideos[newIndex]);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, currentIndex, allVideos.length]);

  if (!video) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-6xl bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-600"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/50 to-transparent p-6">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <span className="text-sm font-medium">
                    {currentIndex + 1} of {allVideos.length}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <motion.a
                    href={`https://youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.a>
                  
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-0">
              {/* Video Player */}
              <div className="lg:col-span-2 relative bg-black flex items-center justify-center min-h-[60vh]">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={video.title}
                  className="w-full h-full min-h-[60vh]"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                
                {/* Navigation Arrows */}
                {allVideos.length > 1 && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handlePrevious}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.button>
                  </>
                )}
              </div>
              
              {/* Video Details */}
              <div className="lg:col-span-1 p-8 overflow-y-auto max-h-[60vh]">
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {video.title}
                    </h3>
                    {video.featured && (
                      <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                        ⭐ Featured Video
                      </span>
                    )}
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed">
                    {video.description}
                  </p>
                  
                  {/* Metadata */}
                  <div className="space-y-3">
                    {/* <div className="flex items-center text-gray-400">
                      <Calendar className="w-4 h-4 mr-3" />
                      <span>{new Date(video.uploadDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div> */}
                    
                    <div className="flex items-center text-gray-400">
                      <Eye className="w-4 h-4 mr-3" />
                      {/* <span>{video.views.toLocaleString()} views</span> */}
                    </div>
                    
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-4 h-4 mr-3" />
                      <span>{video.duration}</span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div>
                    <div className="flex items-center text-gray-400 mb-3">
                      <Tag className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Tags</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {video.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-700 text-gray-300 text-sm font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};