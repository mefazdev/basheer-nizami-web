"use client";

import { useTransition } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/UseToast";
import { formatDate } from "@/lib/utils";
import type {
  VideoCategory,
  PhotoCategory,
  PublicationCategory,
} from "@/lib/types";

type Category = VideoCategory | PhotoCategory | PublicationCategory;

interface DeleteCategoryModalProps {
  type: "video" | "photo" | "publication";
  category: Category;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteCategoryModal({
  type,
  category,
  open,
  onOpenChange,
  onSuccess,
}: DeleteCategoryModalProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/categories/${type}/${category.id}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (result.success) {
          toast({
            title: "Success",
            description: `${
              type.charAt(0).toUpperCase() + type.slice(1)
            } category deleted successfully`,
          });
          onOpenChange(false);
          onSuccess?.();
        } else {
          toast({
            title: "Error",
            description: result.message || `Failed to delete ${type} category`,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error deleting category:", error);
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
      <DialogContent className="sm:max-w-md bg-gray-900 text-gray-200">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full  bg-red-900/20">
              <AlertTriangle
                className="h-6 w-6 text-red-600 dark:text-red-400"
                aria-hidden="true"
              />
            </div>
            <div>
              <DialogTitle className="text-left">Delete Category</DialogTitle>
              <DialogDescription className="text-left">
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <p className="text-sm  text-gray-400">
            Are you sure you want to delete this {type} category? This action
            cannot be undone.
          </p>

          {/* Category Preview */}
          <div className="border rounded-lg p-4  bg-gray-800/50 space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-medium  text-gray-100">
                {category.name}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t  border-gray-700 text-sm">
              <div>
                <p className=" text-gray-400">Slug</p>
                <code className="text-xs  bg-gray-700 px-1 py-0.5 rounded">
                  {category.slug}
                </code>
              </div>
              <div>
                <p className=" text-gray-400">Created</p>
                <p>{formatDate(category.created_at, "MMM dd, yyyy")}</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3  bg-amber-900/10 border  border-amber-900/20 rounded-md">
            <AlertTriangle className="h-4 w-4  text-amber-400 mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-medium  text-amber-200">
                Warning
              </p>
              <p className=" text-amber-300 mt-1">
                Make sure no {type}s are assigned to this category before
                deleting. The deletion will fail if there are associated {type}
                s.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
           className="border border-blue-600 text-blue-600"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
     className="gap-2 bg-red-600 text-white hover:bg-red-700"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
   
          >
            {isPending ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete Category
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
