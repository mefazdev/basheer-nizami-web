"use client";

import { useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { useToast } from "@/components/ui/UseToast";
import { TextFormField } from "@/components/forms/Form-field";
import {
  CategoryUpdateSchema,
  type CategoryUpdateInput,
} from "@/lib/validation/category";
import { generateSlug } from "@/lib/utils";
import type {
  VideoCategory,
  PhotoCategory,
  PublicationCategory,
} from "@/lib/types";

type Category = VideoCategory | PhotoCategory | PublicationCategory;

interface EditCategoryModalProps {
  type: "video" | "photo" | "publication";
  category: Category;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EditCategoryModal({
  type,
  category,
  open,
  onOpenChange,
  onSuccess,
}: EditCategoryModalProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<CategoryUpdateInput>({
    resolver: zodResolver(CategoryUpdateSchema),
    defaultValues: {
      name: category.name,
      slug: category.slug,
    },
  });

  const watchedName = form.watch("name");

  useEffect(() => {
    form.reset({
      name: category.name,
      slug: category.slug,
    });
  }, [category, form]);

  // Auto-generate slug from name if name changes
 useEffect(() => {
    if (watchedName && watchedName !== category.name) {
      const slug = generateSlug(watchedName);
      if (slug !== category.slug) {
        form.setValue("slug", slug);
      }
    }
  }, [watchedName, category.name, category.slug, form]);

  const onSubmit = (data: CategoryUpdateInput) => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/categories/${type}/${category.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
          toast({
            title: "Success",
            description: `${
              type.charAt(0).toUpperCase() + type.slice(1)
            } category updated successfully`,
          });
          onOpenChange(false);
          onSuccess?.();
        } else {
          toast({
            title: "Error",
            description: result.message || `Failed to update ${type} category`,
            variant: "destructive",
          });
        }
      } catch (error) {
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
          <DialogTitle>
            Edit {type.charAt(0).toUpperCase() + type.slice(1)} Category
          </DialogTitle>
          <DialogDescription>Update the category information</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TextFormField
              form={form}
              name="name"
              label="Category Name"
              placeholder="Enter category name"
              required
            />

            <TextFormField
              form={form}
              name="slug"
              label="URL Slug"
              placeholder="category-slug"
              description="Used in URLs. Should be lowercase with hyphens."
            />

            <DialogFooter>
              <Button
                type="button"
               className="border border-blue-600 text-blue-600"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700" type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update Category"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
