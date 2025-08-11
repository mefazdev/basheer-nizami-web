// components/gallery/GalleryStats.tsx
'use client';

import { motion } from 'framer-motion';
import { Camera, MapPin, Award, Users } from 'lucide-react';

interface GalleryPhoto {
  category: string;
  location: string;
  featured?: boolean;
}

interface GalleryStatsProps {
  photos: GalleryPhoto[];
}

export const GalleryStats: React.FC<GalleryStatsProps> = ({ photos }) => {
  const stats = [
    {
      icon: Camera,
      label: 'Total Photos',
      value: photos.length.toString(),
      color: 'text-blue-600'
    },
    {
      icon: MapPin,
      label: 'Locations',
      value: new Set(photos.map(p => p.location)).size.toString(),
      color: 'text-purple-600'
    },
    {
      icon: Award,
      label: 'Featured',
      value: photos.filter(p => p.featured).length.toString(),
      color: 'text-yellow-600'
    },
    {
      icon: Users,
      label: 'Categories',
      value: new Set(photos.map(p => p.category)).size.toString(),
      color: 'text-green-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
              <motion.div
                whileHover={{ 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 0.5 }}
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 mb-4 ${stat.color}`}
              >
                <stat.icon className="w-6 h-6" />
              </motion.div>
              
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              
              <div className="text-sm font-medium text-gray-600">
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
