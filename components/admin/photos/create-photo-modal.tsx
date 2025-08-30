"use client";

import { useState, useTransition, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

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
import { toast } from "@/components/ui/UseToast";
import { Progress } from "@/components/ui/Progress";
import {
  TextFormField,
  SelectFormField,
  CustomFormField,
} from "@/components/forms/Form-field";
import { PhotoCreateInput, PhotoCreateSchema } from "@/lib/validation/photo";
import {
  StorageUploader,
  FILE_CONSTRAINTS,
  validateFileType,
  validateFileSize,
  formatFileSize,
} from "@/lib/storage/upload";

import { cn } from "@/lib/utils";
import { usePhotoCategoriesData } from "@/hooks/use-photo-categories-data";

interface CreatePhotoModalProps {
  children: React.ReactNode;
}

export function CreatePhotoModal({ children }: CreatePhotoModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const { data: categories } = usePhotoCategoriesData();

  const storageUploader = new StorageUploader();

  const form = useForm({
    resolver: zodResolver(PhotoCreateSchema),
    defaultValues: {
      title: "",
      location: "",
      category_id: "",
      tags: [],
      description: "",
      published: true,
      // file_path: '',
    },
  });

  const handleFileSelect = useCallback(
    (file: File) => {
      // Validate file type
      if (
        !validateFileType(file, FILE_CONSTRAINTS.photos.allowedTypes.slice())
      ) {
        toast({
          title: "Invalid file type",
          description:
            "Please select a valid image file (JPEG, PNG, WebP, or GIF)",
          variant: "destructive",
        });
        return;
      }

      // Validate file size
      if (!validateFileSize(file, FILE_CONSTRAINTS.photos.maxSize)) {
        toast({
          title: "File too large",
          description: `File size must be less than ${formatFileSize(
            FILE_CONSTRAINTS.photos.maxSize
          )}`,
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Auto-fill title from filename
      if (!form.getValues("title")) {
        const nameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
        form.setValue("title", nameWithoutExtension);
      }
    },
    [form, toast]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const onSubmit = (data: PhotoCreateInput) => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select an image file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    startTransition(async () => {
      try {
        // Upload file to storage
        const uploadResult = await storageUploader.uploadFile(
          selectedFile,
          "photos",
          "gallery"
        );

        if (!uploadResult.success) {
          throw new Error(uploadResult.error || "Upload failed");
        }

        // Create photo record
        const response = await fetch("/api/photos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            file_path: uploadResult.data!.path,
            tags: data.tags.filter((tag) => tag.trim().length > 0),
          }),
        });

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Failed to create photo");
        }

        toast({
          title: "Success",
          description: "Photo uploaded successfully",
        });

        setOpen(false);
        form.reset();
        setSelectedFile(null);
        setPreviewUrl(null);
        setUploadProgress(0);
      } catch (error) {
        console.error("Error creating photo:", error);
        toast({
          title: "Error",
          description:
            error instanceof Error ? error.message : "Failed to upload photo",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    });
  };

  const handleClose = () => {
    if (isUploading) return;

    setOpen(false);
    form.reset();
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setUploadProgress(0);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const categoryOptions =
    categories?.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })) || [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-gray-900 max-h-[90vh] overflow-y-auto text-gray-100">
        <DialogHeader>
          <DialogTitle>Upload Photo</DialogTitle>
          <DialogDescription>Add a new photo to your gallery</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* File Upload Area */}
            <div className="space-y-4">
              {!selectedFile ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={cn(
                    "border-2 border-dashed border-gray-600 rounded-lg p-8 text-center transition-colors",
                    "hover:border-gray-500 cursor-pointer"
                  )}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                      // console.log(file)
                    }}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-4">
                      <div className="rounded-full bg-gray-800 p-4">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-100">
                          Drop your photo here, or click to browse
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          Supports: JPEG, PNG, WebP, GIF up to{" "}
                          {formatFileSize(FILE_CONSTRAINTS.photos.maxSize)}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-800">
                      <Image
                        src={previewUrl!}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeFile}
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>
                      <strong>File:</strong> {selectedFile.name}
                    </p>
                    <p>
                      <strong>Size:</strong> {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>
              )}

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}
            </div>

            {/* Photo Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextFormField
                form={form}
                name="title"
                label="Title"
                placeholder="Enter photo title..."
                required
              />

              <SelectFormField
                form={form}
                name="category_id"
                label="Category"
                placeholder="Select category"
                options={categoryOptions}
                required
              />
            </div>

            <TextFormField
              form={form}
              name="location"
              label="Location"
              placeholder="Where was this photo taken?"
            />

            <CustomFormField
              form={form}
              name="tags"
              label="Tags"
              description="Enter tags separated by commas"
              type="custom"
              render={({ value, onChange }) => (
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="nature, landscape, sunset"
                  value={Array.isArray(value) ? value.join(", ") : ""}
                  onChange={(e) => {
                    const tags = e.target.value
                      .split(",")
                      .map((tag) => tag.trim());
                    onChange(tags);
                  }}
                />
              )}
            />

            <TextFormField
              form={form}
              name="description"
              label="Description"
              placeholder="Optional description..."
              variant="textarea"
              rows={3}
            />

            {/* <CheckboxFormField
              form={form}
              name="published"
              label="Publish immediately"
            /> */}

            <DialogFooter>
              <Button
                type="button"
                // variant="outline"
                className="border border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={handleClose}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!selectedFile || isUploading || isPending}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                {isUploading || isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
