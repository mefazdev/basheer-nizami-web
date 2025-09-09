"use client";

import {  useTransition } from "react";
import { AlertTriangle, Trash2, ExternalLink } from "lucide-react";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/UseToast";
import { getYouTubeThumbnailUrl  } from "@/lib/youtube";
import { formatDate, formatDuration } from "@/lib/utils";
import type { VideoWithCategory } from "@/lib/types";

interface DeleteVideoModalProps {
  video: VideoWithCategory;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteVideoModal({
  video,
  open,
  onOpenChange,
  onSuccess,
}: DeleteVideoModalProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/videos/${video.id}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (result.success) {
          toast({
            title: "Success",
            description: "Video deleted successfully",
          });
          onOpenChange(false);
          onSuccess?.();
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to delete video",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error deleting video:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-900 text-gray-200">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full  bg-red-900/20">
              <AlertTriangle
                className="h-6 w-6  text-red-400"
                aria-hidden="true"
              />
            </div>
            <div>
              <DialogTitle className="text-left">Delete Video</DialogTitle>
              <DialogDescription className="text-left">
                This action cannot be undone. The video will be removed from
                your gallery.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <p className="text-sm  text-gray-400">
            Are you sure you want to delete this video from your gallery?
          </p>

          {/* Video Preview Card */}
          <div className="border border-gray-700 rounded-lg p-4 bg-gray-800/50 space-y-3">
            <div className="flex items-start gap-3">
              <div className="relative w-24 h-16 rounded-md overflow-hidden  bg-gray-800 shrink-0">
                <Image
                  src={
                    video.thumbnail_url ||
                    getYouTubeThumbnailUrl(video.youtube_id)
                  }
                  alt={video.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <p className="text-sm font-medium  text-gray-100 line-clamp-2">
                  {video.title}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {video.video_categories.name}
                  </Badge>
                  <Badge
                    variant={video.published ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {video.published ? "Published" : "Draft"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t  border-gray-700 text-xs">
              <div>
                <p className=" text-gray-400">YouTube ID</p>
                <p className="font-mono">{video.youtube_id}</p>
              </div>
              {video.duration_seconds && (
                <div>
                  <p className=" text-gray-400">Duration</p>
                  <p>{formatDuration(video.duration_seconds)}</p>
                </div>
              )}
              {video.location && (
                <div>
                  <p className=" text-gray-400">Location</p>
                  <p>{video.location}</p>
                </div>
              )}
              {video.recorded_at && (
                <div>
                  <p className=" text-gray-400">Recorded</p>
                  <p>{formatDate(video.recorded_at, "MMM dd, yyyy")}</p>
                </div>
              )}
            </div>

            {video.tags.length > 0 && (
              <div className="pt-2 border-t  border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Tags
                </p>
                <div className="flex flex-wrap gap-1">
                  {video.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md  bg-gray-700 text-xs text-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {video.tags.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{video.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ExternalLink className="h-3 w-3" />
            <span>
              Note: This only removes the video from your gallery. The original
              video will remain on YouTube.
            </span>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            // variant="outline"
            className="border border-blue-500 text-blue-500"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="gap-2 bg-red-500 text-white"
          >
            {isPending ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Deleting...
              </>
            ) : (
              <>
                Delete
                <Trash2 className="h-4 w-4" />
                {/* </Trash2> */}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
