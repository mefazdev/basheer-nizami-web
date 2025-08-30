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
import type { PublicationWithCategory } from "@/lib/types";

interface DeletePublicationModalProps {
  publication: PublicationWithCategory;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeletePublicationModal({
  publication,
  open,
  onOpenChange,
  onSuccess,
}: DeletePublicationModalProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const storageUploader = new StorageUploader();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/publications/${publication.id}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Failed to delete publication");
        }

        // Delete cover image from storage if exists
        if (publication.cover_path) {
          try {
            await storageUploader.deleteFile(
              "publications",
              publication.cover_path
            );
          } catch (error) {
            console.warn("Failed to delete cover image:", error);
            // Don't fail the operation if file deletion fails
          }
        }

        toast({
          title: "Success",
          description: "Publication deleted successfully",
        });

        onOpenChange(false);
        onSuccess?.();
      } catch (error) {
        console.error("Error deleting publication:", error);
        toast({
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "Failed to delete publication",
          variant: "destructive",
        });
      }
    });
  };

  const getCoverUrl = () => {
    return publication.cover_path
      ? storageUploader.getFileUrl("publications", publication.cover_path)
      : null;
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
              <DialogTitle className="text-left">
                Delete Publication
              </DialogTitle>
              <DialogDescription className="text-left">
                This action cannot be undone. The publication will be
                permanently removed.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4 space-y-4 text-gray-700">
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 space-y-3">
            <div className="flex gap-3">
              <div className="relative h-20 w-16 rounded overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0">
                {getCoverUrl() ? (
                  <Image
                    src={getCoverUrl()!}
                    alt={publication.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium line-clamp-2">{publication.name}</h3>
                {publication.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {publication.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {publication.publication_categories.name}
                  </Badge>
                  <Badge
                    variant={publication.published ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {publication.published ? "Published" : "Draft"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200 dark:border-gray-700 text-sm">
              <div>
                <span className="text-muted-foreground">Created:</span>
                <div>{formatDate(publication.created_at, "MMM dd, yyyy")}</div>
              </div>
              {publication.publisher && (
                <div>
                  <span className="text-muted-foreground">Publisher:</span>
                  <div className="line-clamp-1">{publication.publisher}</div>
                </div>
              )}
              {publication.published_year && (
                <div>
                  <span className="text-muted-foreground">Year:</span>
                  <div>{publication.published_year}</div>
                </div>
              )}
              {publication.total_pages && (
                <div>
                  <span className="text-muted-foreground">Pages:</span>
                  <div>{publication.total_pages}</div>
                </div>
              )}
            </div>

            {/* Tags */}
            {publication.tags && publication.tags.length > 0 && (
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-muted-foreground text-sm">Tags:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {publication.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {publication.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{publication.tags.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          {publication.published && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/20 rounded-md">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 dark:text-amber-200">
                  Published Publication
                </p>
                <p className="text-amber-700 dark:text-amber-300 mt-1">
                  This publication is currently published and visible on your
                  website.
                </p>
              </div>
            </div>
          )}

          {publication.buy_url && (
            <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/20 rounded-md">
              <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-blue-800 dark:text-blue-200">
                  Has Purchase Link
                </p>
                <p className="text-blue-700 dark:text-blue-300 mt-1">
                  This publication has a buy/view URL that may be referenced
                  elsewhere.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
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
                Delete Publication
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
