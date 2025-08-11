// components/videos/HighlightsSection.tsx
'use client';

import { Video } from '@/lib/types/media';
import { motion } from 'framer-motion';
import { Star, Play, Eye, Clock } from 'lucide-react';
import Image from 'next/image';

 
interface HighlightsSectionProps {
  videos: Video[];
  onVideoClick: (video: Video) => void;
  showTitle?: boolean;
}

export const HighlightsSection: React.FC<HighlightsSectionProps> = ({ 
  videos, 
  onVideoClick, 
  showTitle = true 
}) => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block p-4 bg-purple-500/10 rounded-2xl mb-6">
              <Star className="w-12 h-12 text-purple-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Highlights
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full mb-6" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Memorable moments from speeches, events, competitions, and travels that showcase 
              our educational journey and community achievements.
            </p>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => onVideoClick(video)}
              className="group cursor-pointer"
            >
              <div className="bg-slate-800 border border-purple-500/20 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-500 shadow-xl hover:shadow-2xl">
                {/* Video Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <Image fill
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-xl"
                    >
                      <Play className="w-6 h-6 text-white ml-1" />
                    </motion.div>
                  </div>
                  
                  {/* Featured Badge */}
                  {video.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                     Featured
                      </span>
                    </div>
                  )}
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {video.duration}
                  </div>
                </div>
                
                {/* Video Details */}
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                    {video.title}
                  </h4>
                  
                  <p className="text-gray-300 leading-relaxed mb-4 line-clamp-3 text-sm">
                    {video.description}
                  </p>
                  
                  {/* Video Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {video.views.toLocaleString()} views
                    </div>
                    <div>
                      {new Date(video.uploadDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {video.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};