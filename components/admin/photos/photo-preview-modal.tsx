'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { X, Download, Edit, MapPin, Tag, Calendar, Eye } from 'lucide-react'
import Image from 'next/image'

import {
  Dialog,
  DialogContent,
} from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Separator } from '@/components/ui/Separator'
import { StorageUploader } from '@/lib/storage/upload'
import type { PhotoWithCategory } from '@/lib/types'

interface PhotoPreviewModalProps {
  photo: PhotoWithCategory
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit?: (photo: PhotoWithCategory) => void
}

export function PhotoPreviewModal({ 
  photo, 
  open, 
  onOpenChange, 
  onEdit 
}: PhotoPreviewModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const storageUploader = new StorageUploader()

  const getImageUrl = () => {
    return storageUploader.getFileUrl('photos', photo.file_path)
  }

  const handleDownload = async () => {
    try {
      const imageUrl = getImageUrl()
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${photo.title}.${photo.file_path.split('.').pop()}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* Image Section */}
          <div className="relative flex-1 bg-black min-h-[400px] md:min-h-[600px]">
            <Image
              src={getImageUrl()}
              alt={photo.title}
              fill
              className={`object-contain transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 768px) 100vw, 60vw"
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}
            
            {/* Header Actions */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDownload}
                className="bg-black/50 hover:bg-black/70 text-white border-0"
              >
                <Download className="h-4 w-4" />
              </Button>
              {onEdit && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onEdit(photo)}
                  className="bg-black/50 hover:bg-black/70 text-white border-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="bg-black/50 hover:bg-black/70 text-white border-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Info Panel */}
          <div className="w-full md:w-80 p-6 bg-white dark:bg-gray-900 overflow-y-auto">
            <div className="space-y-6">
              {/* Title and Status */}
              <div>
                <h2 className="text-xl font-semibold mb-2">{photo.title}</h2>
                <Badge variant={photo.published ? 'default' : 'secondary'}>
                  {photo.published ? 'Published' : 'Draft'}
                </Badge>
              </div>

              <Separator />

              {/* Metadata */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Category:</span>
                  <Badge variant="outline">{photo.photo_categories.name}</Badge>
                </div>

                {photo.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Location:</span>
                    <span>{photo.location}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Created:</span>
                  <span>{format(new Date(photo.created_at), 'MMM dd, yyyy HH:mm')}</span>
                </div>

                {photo.tags.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {photo.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {photo.description && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {photo.description}
                    </p>
                  </div>
                </>
              )}

             
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}