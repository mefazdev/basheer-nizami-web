// types/gallery.ts
export interface GalleryPhoto {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl?: string;
  category:
    | 'events'
    | 'campus-visits'
    | 'awards'
    | 'field-visits'
    | 'speaking'
    | 'community'
    | 'conferences'
    | 'meetings';
  date: string;
  location: string;
  event?: string;
  tags: string[];
  featured?: boolean;
  aspectRatio?: number;
}
