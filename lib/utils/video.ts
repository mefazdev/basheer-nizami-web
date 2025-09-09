import { VideoWithCategory } from "@/lib/types";
import { VideoItem } from "@/lib/types/media";

export function toVideoItem(video: VideoWithCategory): VideoItem {
  return {
    id: video.id,
    title: video.title,
    description: video.description ?? "",
    youtubeId: video.youtube_id ?? "",
    // thumbnail: video.thumbnail ?? "/images/7.jpeg",
    // category: (video.category_id as VideoItem["category"]) ?? "conferences",
    category: video.video_categories?.name ?? "Uncategorized", // ✅ from join
    date: video.created_at ?? new Date().toISOString(),
    venue: video.location ?? "",
    duration: video.duration_seconds ? Number(video.duration_seconds) :  0,
    // views: video.views ?? 0,
    // featured: video.featured ?? false,
    
    tags: video.tags ?? [],
    featured:video.featured
  };
}
