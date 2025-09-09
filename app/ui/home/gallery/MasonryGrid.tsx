// components/gallery/MasonryGrid.tsx
'use client';

import { StorageUploader } from '@/lib/storage/upload';
import { GalleryPhoto } from '@/lib/types/gallery';
import { motion } from 'framer-motion';
import { Calendar, MapPin,   } from 'lucide-react';
import Image from 'next/image';



interface MasonryGridProps {
  photos: GalleryPhoto[];
  onPhotoClick: (photo: GalleryPhoto) => void;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({ photos, onPhotoClick }) => {
   const storageUploader = new StorageUploader();
   
   const getImageUrl = (photo:GalleryPhoto) => {
          return photo?.file_path
          ? storageUploader.getFileUrl("photos", photo?.file_path)
          : null;
      };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {/* {photos.map((photo, index) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -10, scale: 1.02 }}
          onClick={() => onPhotoClick(photo)}
          className="group cursor-pointer"
          style={{ 
            gridRowEnd: photo.aspectRatio ? `span ${Math.ceil(photo.aspectRatio * 10)}` : 'span 10'
          }}
        >
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 h-full">
        
            <div className="relative overflow-hidden h-[200px]">
              <Image fill
                src={photo.thumbnailUrl || photo.imageUrl}
                alt={photo.title}
                className="  object-cover group-hover:scale-110 transition-transform duration-700"
                
              />
              
               
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
            
              {photo.featured && (
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-red-600 to-black text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
 
                    Featured
                  </span>
                </div>
              )}
              
    
              <div className="absolute top-4 right-4">
                <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                  {photo.category.replace('-', ' ').toUpperCase()}
                </span>
              </div>
          
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="font-bold text-lg mb-2 line-clamp-2">
                  {photo.title}
                </h4>
                <div className="flex items-center text-sm mb-2">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(photo.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="w-3 h-3 mr-1" />
                  {photo.location}
                </div>
              </div>
            </div>
            
           
            <div className="p-4">
              <h4 className="font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
                {photo.title}
              </h4>
              
              {photo.event && (
                <p className="text-gray-600 text-sm font-medium mb-2">
                  📍 {photo.event}
                </p>
              )}
             
              <div className="flex flex-wrap gap-1">
                {photo.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {photo.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    +{photo.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))} */}

      {
        photos?.map((photo,index)=>{
           const photoUrl = getImageUrl(photo)
     
          return(
             <motion.div
          key={photo.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -10, scale: 1.02 }}
          onClick={() => onPhotoClick(photo)}
          className="group cursor-pointer"
          style={{ 
            gridRowEnd: photo.aspectRatio ? `span ${Math.ceil(photo.aspectRatio * 10)}` : 'span 10'
          }}
        >
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 h-full">
            {/* Photo Image */}
            <div className="relative overflow-hidden h-[250px]">
             {photoUrl &&  <Image fill
                src={photoUrl}
                alt={photo.title}
                className="  object-cover group-hover:scale-110 transition-transform duration-700"
                
              />}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Featured Badge */}
              {photo.featured && (
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-red-600 to-black text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
 
                    Featured
                  </span>
                </div>
              )}
              
              {/* Category Badge */}
              <div className="absolute top-4 right-4">
                <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                  {photo.category.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              
              {/* Hover Content */}
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="font-bold text-lg mb-2 line-clamp-2">
                  {photo.title}
                </h4>
                <div className="flex items-center text-sm mb-2">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(photo.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="w-3 h-3 mr-1" />
                  {photo.location}
                </div>
              </div>
            </div>
            
            {/* Photo Details */}
            <div className="p-4">
              <h4 className="font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
                {photo.title}
              </h4>
              
              {photo.event && (
                <p className="text-gray-600 text-sm font-medium mb-2">
                  📍 {photo.event}
                </p>
              )}
              
              {/* <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                {photo.description}
              </p> */}
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {photo.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {photo.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    +{photo.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
          )
        })
      }
    </div>
  );
};
