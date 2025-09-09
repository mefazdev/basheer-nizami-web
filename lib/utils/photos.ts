import { PhotoWithCategory } from "../types";
import { GalleryPhoto } from "../types/gallery";

 
export function mapPhotoToGalleryPhoto(photo: PhotoWithCategory): GalleryPhoto {
  return {
    id: photo.id,
    title: photo.title,
    description: photo.description ?? "",
    imageUrl: photo.file_path, // map DB file_path → imageUrl
    thumbnailUrl: photo.file_path, // if you want same for now
    // category: (photo.category?.slug ??
    //   "events") as GalleryPhoto["category"], // must match union type
    category: photo.photo_categories?.name ?? "Uncategorized",
    date: photo.created_at,
    location: photo.location ?? "",
    event: undefined, // no event field in DB
    tags: photo.tags ?? [],
    featured: false, // you can add a column later if needed
    aspectRatio: undefined, // can calculate if exif has dimensions
file_path: photo.file_path  
};
}
