"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Form } from "@/components/ui/Form";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/UseToast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/AertDialog";
import { TextFormField, CustomFormField } from "@/components/forms/Form-field";
import { CategorySchema, type CategoryInput } from "@/lib/validation/category";
import { generateSlug } from "@/lib/utils";
import { useApiData } from "@/hooks/use-api-data";
import type { VideoCategory } from "@/lib/types";
import { DeleteCategoryModal } from "./delete-category-modal";
import { EditCategoryModal } from "./edit-category-modal";

interface VideoCategoriesTableProps {
  onCategoryChange?: () => void;
}

export function VideoCategoriesTable({
  onCategoryChange,
}: VideoCategoriesTableProps) {
  const [isPending, startTransition] = useTransition();
  const [editingCategory, setEditingCategory] = useState<VideoCategory | null>(
    null
  );
  
  const [deletingCategory, setDeletingCategory] =
    useState<VideoCategory | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { toast } = useToast();

  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useApiData<VideoCategory[]>({
    url: "/api/categories/video",
  });

  const createForm = useForm<CategoryInput>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const editForm = useForm<CategoryInput>({
    // resolver: zodResolver(CategoryUpdateSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const handleCreate = async (data: CategoryInput) => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/categories/video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
          toast({
            title: "Success",
            description: "Video category created successfully",
          });
          setIsCreateModalOpen(false);
          createForm.reset();
          refetch();
          onCategoryChange?.();
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to create category",
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

  // const handleEdit = async (data: CategoryInput) => {
  //   if (!editingCategory) return;

  //   startTransition(async () => {
  //     try {
  //       const response = await fetch(
  //         `/api/categories/video/${editingCategory.id}`,
  //         {
  //           method: "PATCH",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(data),
  //         }
  //       );

  //       const result = await response.json();

  //       if (result.success) {
  //         toast({
  //           title: "Success",
  //           description: "Video category updated successfully",
  //         });
  //         setEditingCategory(null);
  //         editForm.reset();
  //         refetch();
  //         onCategoryChange?.();
  //       } else {
  //         toast({
  //           title: "Error",
  //           description: result.message || "Failed to update category",
  //           variant: "destructive",
  //         });
  //       }
  //     } catch (error) {
  //       toast({
  //         title: "Error",
  //         description: "An unexpected error occurred",
  //         variant: "destructive",
  //       });
  //     }
  //   });
  // };

  // const handleDelete = async () => {
  //   if (!deletingCategory) return;

  //   startTransition(async () => {
  //     try {
  //       const response = await fetch(
  //         `/api/categories/video/${deletingCategory.id}`,
  //         {
  //           method: "DELETE",
  //         }
  //       );

  //       const result = await response.json();

  //       if (result.success) {
  //         toast({
  //           title: "Success",
  //           description: "Video category deleted successfully",
  //         });
  //         setDeletingCategory(null);
  //         refetch();
  //         onCategoryChange?.();
  //       } else {
  //         toast({
  //           title: "Error",
  //           description: result.message || "Failed to delete category",
  //           variant: "destructive",
  //         });
  //       }
  //     } catch (error) {
  //       toast({
  //         title: "Error",
  //         description: "An unexpected error occurred",
  //         variant: "destructive",
  //       });
  //     }
  //   });
  // };

  const openEditModal = (category: VideoCategory) => {
    setEditingCategory(category);
    editForm.reset({
      name: category.name,
      slug: category.slug,
    });
  };

 

  const generateSlugFromName = (
    name: string,
    form: typeof createForm | typeof editForm
  ) => {
    const slug = generateSlug(name);
    form.setValue("slug", slug);
  };

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600 dark:text-red-400">
            Failed to load video categories. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Video className="h-5 w-5" />
              <CardTitle>Video Categories</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                // variant="outline"
                className="border border-blue-600 text-blue-600"
                size="sm"
                onClick={() => startTransition(refetch)}
                disabled={isPending}
              >
                <RefreshCw
                  className={`mr-2 h-4 w-4 ${isPending ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
              <Button
                className="bg-blue-600 text-white"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-700">
            <Table className=" ">
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Created</TableHead>
                  {/* <TableHead>Videos</TableHead> */}
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i} className="border-gray-700">
                      <TableCell colSpan={5}>
                        <div className="h-8 animate-pulse bg-gray-200 rounded dark:bg-gray-700" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : !categories || categories.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No video categories found
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((category) => (
                    <TableRow key={category.id} className="border-gray-700">
                      <TableCell className="font-medium">
                        {category.name}
                      </TableCell>
                      <TableCell>
                        <Badge className="font-mono text-xs">
                          {category.slug}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(category.created_at).toLocaleDateString()}
                      </TableCell>
                      {/* <TableCell>
                        <Badge variant="secondary">0 videos</Badge>
                      </TableCell> */}
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-gray-800 text-white"
                          >
                            <DropdownMenuItem
                              onClick={() => openEditModal(category)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => setDeletingCategory(category)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create Category Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-md bg-gray-900 text-gray-200">
          <DialogHeader>
            <DialogTitle>Create Video Category</DialogTitle>
            <DialogDescription>
              Add a new category for organizing videos
            </DialogDescription>
          </DialogHeader>

          <Form {...createForm}>
            <form
              onSubmit={createForm.handleSubmit(handleCreate)}
              className="space-y-4"
            >
              <TextFormField
                form={createForm}
                name="name"
                label="Category Named"
                placeholder="e.g. Travel, Technology, Education"
                required
               
              />

              <CustomFormField
                form={createForm}
                name="slug"
                label="Slug"
                description="URL-friendly identifier (auto-generated from name)"
                type="custom"
                render={({ value, onChange }) => (
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder="e.g. travel, technology, education"
                        className="flex h-10 w-full rounded-md border border-gray-300   px-3 py-2 text-sm   file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none     focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <Button
                        type="button"
                        // variant="outline"
                        onClick={() => {
                          const name = createForm.getValues("name");
                          if (name) generateSlugFromName(name, createForm);
                        }}
                        disabled={!createForm.watch("name")}
                      >
                        Generate
                      </Button>
                    </div>
                  </div>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  // variant="outline"x
                  className="border border-blue-500 text-blue-500"
                  onClick={() => setIsCreateModalOpen(false)}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-blue-500 text-white"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Creating..." : "Create Category"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Category Modal */}
      {/* <Dialog
        open={!!editingCategory}
        onOpenChange={(open) => !open && closeEditModal()}
      >
        <DialogContent className="sm:max-w-md bg-gray-900 text-gray-200">
          <DialogHeader>
            <DialogTitle>Edit Video Category</DialogTitle>
            <DialogDescription>
             Update the category information
            </DialogDescription>
          </DialogHeader>

          <Form {...editForm}>
            <form
              onSubmit={editForm.handleSubmit(handleEdit)}
              className="space-y-4"
            >
              <TextFormField
                form={editForm}
                name="name"
                label="Category Name"
                placeholder="e.g. Travel, Technology, Education"
                required
                // onBlur={(e) => {
                //   const name = e.target.value;
                //   if (
                //     name &&
                //     editingCategory &&
                //     name !== editingCategory.name
                //   ) {
                //     generateSlugFromName(name, editForm);
                //   }
                // }}
              />

              <CustomFormField
                form={editForm}
                name="slug"
                label="Slug"
                description="URL-friendly identifier"
                type="custom"
                render={({ value, onChange }) => (
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="e.g. travel, technology, education"
                        className="flex h-10 w-full rounded-md border border-gray-700  px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        
                        onClick={() => {
                          const name = editForm.getValues("name");
                          if (name) generateSlugFromName(name, editForm);
                        }}
                        disabled={!editForm.watch("name")}
                      >
                        Generate
                      </Button>
                    </div>
                  </div>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  // variant="outline"
                  className="border border-blue-600 text-blue-600"
                  onClick={closeEditModal}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button className='bg-blue-600 hover:bg-blue-700    text-white' type="submit" disabled={isPending}>
                  {isPending ? "Updating..." : "Update Category"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog> */}

      {/* Delete Category Confirmation */}
      {/* <AlertDialog
        open={!!deletingCategory}
        onOpenChange={(open) => !open && setDeletingCategory(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Video Category</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <span>
                Are you sure you want to delete this video category? This action
                cannot be undone.
              </span>
              {deletingCategory && (
                <div className="p-2 bg-muted rounded text-sm font-medium">
                  {deletingCategory.name} ({deletingCategory.slug})
                </div>
              )}
              <span className="text-sm text-amber-600 dark:text-amber-400">
                Note: You cannot delete a category that contains videos.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isPending}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isPending ? "Deleting..." : "Delete Category"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
{editingCategory && (
        <EditCategoryModal
          type="video"
          category={editingCategory}
          open={!!editingCategory}
          onOpenChange={(open) => !open && setEditingCategory(null)}
          onSuccess={refetch}
        />
      )}
      {deletingCategory && <DeleteCategoryModal
       type="video"
          category={deletingCategory}
          open={!!deletingCategory}
          onOpenChange={(open) => !open && setDeletingCategory(null)}
          onSuccess={refetch}

      />}
    </>
  );
}
