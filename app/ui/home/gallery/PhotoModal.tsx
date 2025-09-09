// components/gallery/PhotoModal.tsx
"use client";

import { StorageUploader } from "@/lib/storage/upload";
import { GalleryPhoto } from "@/lib/types/gallery";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Tag,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PhotoModalProps {
  photo: GalleryPhoto | null;
  isOpen: boolean;
  onClose: () => void;
  allPhotos: GalleryPhoto[];
  onNavigate: (photo: GalleryPhoto) => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  photo,
  isOpen,
  onClose,
  allPhotos,
  onNavigate,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
const storageUploader = new StorageUploader();
   
   const getImageUrl = (photo:GalleryPhoto) => {
          return photo?.file_path
          ? storageUploader.getFileUrl("photos", photo?.file_path)
          : null;
      };
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

  useEffect(() => {
    if (photo && allPhotos.length > 0) {
      const index = allPhotos.findIndex((p) => p.id === photo.id);
      setCurrentIndex(index);
    }
  }, [photo, allPhotos]);

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : allPhotos.length - 1;
    setCurrentIndex(newIndex);
    onNavigate(allPhotos[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex < allPhotos.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    onNavigate(allPhotos[newIndex]);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isOpen, currentIndex, allPhotos.length]);

  if (!photo) return null;

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
            className="relative w-full max-w-7xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/50 to-transparent p-6">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <span className="text-sm font-medium">
                    {currentIndex + 1} of {allPhotos.length}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  {/* <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </motion.button> */}

                  {/* <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button> */}

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

            <div className="grid lg:grid-cols-3 gap-0 h-full">
              {/* Photo */}
              <div className="lg:col-span-2 relative bg-black flex items-center justify-center min-h-[70vh]">
                <Image fill
                  src={getImageUrl(photo) || ""}
                  alt={photo.title}
                  className="max-w-full max-h-full object-contain"
                />

                {/* Navigation Arrows */}
                {allPhotos.length > 1 && (
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

              {/* Details */}
              <div className="lg:col-span-1 p-8 overflow-y-auto max-h-[70vh]">
                <div className="space-y-6">
                  {/* Title and Category */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {photo.title}
                    </h3>
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {photo.category.replace("-", " ").toUpperCase()}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed">
                    {photo.description}
                  </p>

                  {/* Event */}
                  {photo.event && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Event
                      </h4>
                      <p className="text-gray-700">{photo.event}</p>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-3" />
                      <span>
                        {new Date(photo.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-3" />
                      <span>{photo.location}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <Tag className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Tags</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {photo.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
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
