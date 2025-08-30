"use client";

import { useTransition } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
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
import { StorageUploader } from "@/lib/storage/upload";
import { formatDate } from "@/lib/utils";
import type { PhotoWithCategory } from "@/lib/types";

interface DeletePhotoModalProps {
  photo: PhotoWithCategory;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeletePhotoModal({
  photo,
  open,
  onOpenChange,
  onSuccess,
}: DeletePhotoModalProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const storageUploader = new StorageUploader();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/photos/${photo.id}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Failed to delete photo");
        }

        // Delete from storage
        await storageUploader.deleteFile("photos", photo.file_path);

        toast({
          title: "Success",
          description: "Photo deleted successfully",
        });

        onOpenChange(false);
        onSuccess?.();
      } catch (error) {
        console.error("Error deleting photo:", error);
        toast({
          title: "Error",
          description:
            error instanceof Error ? error.message : "Failed to delete photo",
          variant: "destructive",
        });
      }
    });
  };

  const getImageUrl = () => {
    return storageUploader.getFileUrl("photos", photo.file_path);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gray-900 text-gray-100">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <DialogTitle className="text-left">Delete Photo</DialogTitle>
              <DialogDescription className="text-left">
                This action cannot be undone. The photo will be permanently
                removed.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4 space-y-4 text-gray-700">
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 space-y-3">
            <div className="flex gap-3">
              <div className="relative h-16 w-16 rounded overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0">
                <Image
                  src={getImageUrl()}
                  alt={photo.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium line-clamp-2">{photo.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {photo.photo_categories.name}
                  </Badge>
                  <Badge
                    variant={photo.published ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {photo.published ? "Published" : "Draft"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200 dark:border-gray-700 text-sm">
              <div>
                <span className="text-muted-foreground">Created:</span>
                <div>{formatDate(photo.created_at, "MMM dd, yyyy")}</div>
              </div>
              {photo.location && (
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <div className="line-clamp-1">{photo.location}</div>
                </div>
              )}
            </div>
          </div>

          {photo.published && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/20 rounded-md">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 dark:text-amber-200">
                  Published Photo
                </p>
                <p className="text-amber-700 dark:text-amber-300 mt-1">
                  This photo is currently published and visible on your website.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            // variant="outline"
            className="border border-blue-600 hover:bg-gray-800 text-blue-600"
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
            className="gap-2 bg-red-600 hover:bg-red-700 text-white"
          >
            {isPending ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete Photo
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
