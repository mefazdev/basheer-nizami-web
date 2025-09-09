// components/DynamicVideoSection.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { VideoItem } from '@/lib/types/media';
import { Play, Clock, Eye, Calendar, MapPin, Tag } from 'lucide-react';

interface DynamicVideoSectionProps {
  title: string;
  videos: VideoItem[];
  onVideoClick: (video: VideoItem) => void;
  showTitle?: boolean;
  categorySlug: string;
}

export const  VideoSection: React.FC<DynamicVideoSectionProps> = ({
  title,
  videos,
  onVideoClick,
  showTitle = true,
  categorySlug
}) => {
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  if (!videos || videos.length === 0) return null;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views?.toString() || '0';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get category-specific styling
  const getCategoryStyles = (slug: string) => {
    const styles = {
      lectures: {
        gradient: 'from-blue-500 to-cyan-500',
        accent: 'blue-400',
        icon: '🎓',
        description: 'Educational content and academic discussions'
      },
      highlights: {
        gradient: 'from-purple-500 to-pink-500',
        accent: 'purple-400',
        icon: '⭐',
        description: 'Special moments and featured content'
      },
      'talk-shows': {
        gradient: 'from-orange-500 to-red-500',
        accent: 'orange-400',
        icon: '🎤',
        description: 'Interactive discussions and conversations'
      },
      default: {
        gradient: 'from-green-500 to-teal-500',
        accent: 'green-400',
        icon: '🎬',
        description: 'Quality video content'
      }
    };
    
    return styles[slug as keyof typeof styles] || styles.default;
  };

  const categoryStyle = getCategoryStyles(categorySlug);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Section Background */}
      <div className="absolute inset-0 opacity-5">
        <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br rounded-full mix-blend-multiply filter blur-3xl`} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              {/* <span className="text-4xl">{categoryStyle.icon}</span> */}
              <h2 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${categoryStyle.gradient} bg-clip-text text-transparent`}>
                {title}
              </h2>
            </div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {categoryStyle.description}
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className={`h-1 bg-gradient-to-r ${categoryStyle.gradient} mx-auto rounded-full mt-6`}
            />
          </motion.div>
        )}

        {/* Featured Video (if any) */}
        {videos.some(v => v.featured) && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            {(() => {
              const featuredVideo = videos.find(v => v.featured);
              if (!featuredVideo) return null;

              return (
                <div 
                  className="relative group cursor-pointer bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500"
                  onClick={() => onVideoClick(featuredVideo)}
                  onMouseEnter={() => setHoveredVideo(featuredVideo.id)}
                  onMouseLeave={() => setHoveredVideo(null)}
                >
                  <div className="md:flex">
                    {/* Video Thumbnail */}
                    <div className="md:w-1/2 relative overflow-hidden">
                      <motion.div
                        animate={{ scale: hoveredVideo === featuredVideo.id ? 1.05 : 1 }}
                        transition={{ duration: 0.6 }}
                        className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative"
                      >
                        {featuredVideo.youtubeId ? (
                          <img
                            src={`https://img.youtube.com/vi/${featuredVideo.youtubeId}/maxresdefault.jpg`}
                            alt={featuredVideo.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${featuredVideo.youtubeId}/hqdefault.jpg`;
                            }}
                          />
                        ) : (
                          <div className="text-6xl text-gray-500">🎥</div>
                        )}
                        
                        {/* Play Button Overlay */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: hoveredVideo === featuredVideo.id ? 1 : 0.8 }}
                          transition={{ duration: 0.3 }}
                          className={`absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        >
                          <div className={`w-20 h-20 bg-gradient-to-r ${categoryStyle.gradient} rounded-full flex items-center justify-center shadow-2xl`}>
                            <Play className="w-8 h-8 text-white ml-1" fill="white" />
                          </div>
                        </motion.div>

                        {/* Featured Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`bg-gradient-to-r ${categoryStyle.gradient} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg`}>
                            Featured
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Video Info */}
                    <div className="md:w-1/2 p-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 line-clamp-2">
                        {featuredVideo.title}
                      </h3>
                      
                      <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                        {featuredVideo.description}
                      </p>

                      {/* Video Meta */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{formatDuration(featuredVideo.duration)}</span>
                        </div>
                        {/* {featuredVideo.views && (
                          <div className="flex items-center gap-2 text-gray-400">
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">{formatViews(featuredVideo.views)} views</span>
                          </div>
                        )} */}
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{formatDate(featuredVideo.date)}</span>
                        </div>
                        {featuredVideo.venue && (
                          <div className="flex items-center gap-2 text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{featuredVideo.venue}</span>
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      {featuredVideo.tags && featuredVideo.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {featuredVideo.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-white/10 text-white px-3 py-1 rounded-full text-sm border border-white/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.filter(v => !v.featured).map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
              onClick={() => onVideoClick(video)}
              onMouseEnter={() => setHoveredVideo(video.id)}
              onMouseLeave={() => setHoveredVideo(null)}
            >
              <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-2xl">
                {/* Video Thumbnail */}
                <div className="relative overflow-hidden">
                  <motion.div
                    animate={{ scale: hoveredVideo === video.id ? 1.05 : 1 }}
                    transition={{ duration: 0.6 }}
                    className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative"
                  >
                    {video.youtubeId ? (
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/video-placeholder.jpg';
                        }}
                      />
                    ) : (
                      <div className="text-4xl text-gray-500">🎥</div>
                    )}
                    
                    {/* Play Button Overlay */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: hoveredVideo === video.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-r ${categoryStyle.gradient} rounded-full flex items-center justify-center shadow-xl`}>
                        <Play className="w-6 h-6 text-white ml-1" fill="white" />
                      </div>
                    </motion.div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3">
                      <span className="bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
                        {formatDuration(video.duration)}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {video.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 line-clamp-2 text-sm leading-relaxed">
                    {video.description}
                  </p>

                  {/* Video Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-4">
                      {/* {video.views && (
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{formatViews(video.views)}</span>
                        </div>
                      )} */}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(video.date)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {video.tags && video.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {video.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-white/10 text-white px-2 py-1 rounded text-xs border border-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                      {video.tags.length > 2 && (
                        <span className="text-gray-400 text-xs px-2 py-1">
                          +{video.tags.length - 2} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {videos.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <button className={`bg-gradient-to-r ${categoryStyle.gradient} text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-${categoryStyle.accent}/25 transition-all duration-300 hover:scale-105`}>
              View All {title}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};