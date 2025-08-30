"use client";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { useToast } from "@/components/ui/UseToast";
import { TextFormField } from "@/components/forms/Form-field";
import { CategorySchema, type CategoryInput } from "@/lib/validation/category";
import { generateSlug } from "@/lib/utils";

interface CreateCategoryModalProps {
  type: "video" | "photo" | "publication";
  children: React.ReactNode;
  onSuccess?: () => void;
}

export function CreateCategoryModal({
  type,
  children,
  onSuccess,
}: CreateCategoryModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<CategoryInput>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const watchedName = form.watch("name");

  // Auto-generate slug from name
  useEffect(() => {
    if (watchedName && !form.getValues("slug")) {
      const slug = generateSlug(watchedName);
      form.setValue("slug", slug);
    }
  }, [watchedName, form]);

  const onSubmit = (data: CategoryInput) => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/categories/${type}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
          toast({
            title: "Success",
            description: `${
              type.charAt(0).toUpperCase() + type.slice(1)
            } category created successfully`,
          });
          setOpen(false);
          form.reset();
          onSuccess?.();
        } else {
          toast({
            title: "Error",
            description: result.message || `Failed to create ${type} category`,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.log(error)
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gray-900 text-gray-200">
        <DialogHeader>
          <DialogTitle>
            Create {type.charAt(0).toUpperCase() + type.slice(1)} Category
          </DialogTitle>
          <DialogDescription>
            Add a new category to organize your {type} content
          </DialogDescription>
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

            {/* <TextFormField
              form={form}
              name="slug"
              label="URL Slug"
              placeholder="category-slug"
              description="Used in URLs. Will be auto-generated from name if left empty."
            /> */}

            <DialogFooter>
              <Button
                type="button"
             className="border border-blue-600 text-blue-600   "
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button className="bg-blue-600 text-white " type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Category"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
