"use client";
import { useState, useTransition, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X, FileText, Loader2 } from "lucide-react";
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
import { useToast } from "@/components/ui/UseToast";
import {
  TextFormField,
  NumberFormField,
  SelectFormField,
  CustomFormField,
} from "@/components/forms/Form-field";
import {
  PublicationSchema,
  type PublicationInput,
} from "@/lib/validation/publication";
import {
  StorageUploader,
  FILE_CONSTRAINTS,
  validateFileType,
  validateFileSize,
  formatFileSize,
} from "@/lib/storage/upload";
import { usePublicationCategoriesData } from "@/hooks/use-publication-categories-data";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/Progress";

interface CreatePublicationModalProps {
  children: React.ReactNode;
}

export function CreatePublicationModal({
  children,
}: CreatePublicationModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { data: categories } = usePublicationCategoriesData();

  const storageUploader = new StorageUploader();

  const form = useForm({
    resolver: zodResolver(PublicationSchema),
    defaultValues: {
      name: "",
      description: "",
      category_id: "",
      total_pages: undefined,
      publisher: "",
      tags: [],
      published_year: undefined,
      buy_url: "",
      published: true,
      cover_path: "",
    },
  });

  const handleFileSelect = useCallback(
    (file: File) => {
      if (
        !validateFileType(
          file,
          FILE_CONSTRAINTS.publications.allowedTypes.slice()
        )
      ) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (JPEG, PNG, WebP) or PDF",
          variant: "destructive",
        });
        return;
      }

      if (!validateFileSize(file, FILE_CONSTRAINTS.publications.maxSize)) {
        toast({
          title: "File too large",
          description: `File size must be less than ${formatFileSize(
            FILE_CONSTRAINTS.publications.maxSize
          )}`,
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);

      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }

      if (!form.getValues("name")) {
        const nameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
        form.setValue("name", nameWithoutExtension);
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

  const onSubmit = (data: PublicationInput) => {
    setIsUploading(true);
    setUploadProgress(0);

    startTransition(async () => {
      try {
        let coverPath = "";

        if (selectedFile) {
          const uploadResult = await storageUploader.uploadFile(
            selectedFile,
            "publications",
            "covers"
          );

          if (!uploadResult.success) {
            throw new Error(uploadResult.error || "Upload failed");
          }

          coverPath = uploadResult.data!.path;
        }

        const response = await fetch("/api/publications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            cover_path: coverPath || undefined,
            tags: data.tags.filter((tag) => tag.trim().length > 0),
          }),
        });

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Failed to create publication");
        }

        toast({
          title: "Success",
          description: "Publication created successfully",
        });

        setOpen(false);
        form.reset();
        setSelectedFile(null);
        setPreviewUrl(null);
        setUploadProgress(0);
      } catch (error) {
        console.error("Error creating publication:", error);
        toast({
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "Failed to create publication",
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

  const currentYear = new Date().getFullYear();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 text-gray-200">
        <DialogHeader>
          <DialogTitle>Add Publication</DialogTitle>
          <DialogDescription>
            Create a new publication entry with optional cover image
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Cover Upload Area */}
            <div className="space-y-4">
              <label className="text-sm font-medium">
                Cover Image (Optional)
              </label>
              {!selectedFile ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={cn(
                    "border-2 border-dashed border-gray-600 rounded-lg p-6 text-center transition-colors",
                    "hover:border-gray-500 cursor-pointer"
                  )}
                >
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                    className="hidden"
                    id="cover-upload"
                  />
                  <label htmlFor="cover-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-3">
                      <div className="rounded-full bg-gray-800 p-3">
                        <FileText className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-100">
                          Upload cover image
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          JPEG, PNG, WebP or PDF up to{" "}
                          {formatFileSize(
                            FILE_CONSTRAINTS.publications.maxSize
                          )}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="relative">
                    <div className="aspect-[3/4] w-32 relative rounded-lg overflow-hidden bg-gray-800 mx-auto">
                      {previewUrl ? (
                        <Image
                          src={previewUrl}
                          alt="Cover preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <FileText className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2"
                      onClick={removeFile}
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-400 text-center">
                    <p>
                      <strong>File:</strong> {selectedFile.name}
                    </p>
                    <p>
                      <strong>Size:</strong> {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>
              )}

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

            {/* Publication Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextFormField
                form={form}
                name="name"
                label="Name"
                placeholder="Enter publication name..."
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
              name="description"
              label="Description"
              placeholder="Brief description of the publication..."
              variant="textarea"
              rows={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TextFormField
                form={form}
                name="publisher"
                label="Publisher"
                placeholder="Publisher name"
              />

              <NumberFormField
                form={form}
                name="total_pages"
                label="Total Pages"
                placeholder="0"
              />

              <NumberFormField
                form={form}
                name="published_year"
                label="Year"
                placeholder={currentYear.toString()}
              />
            </div>

            <CustomFormField
              form={form}
              name="tags"
              label="Tags"
              description="Enter tags separated by commas"
              type="custom"
              render={({ value, onChange }) => (
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border  border-gray-700 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="fiction, bestseller, award-winning"
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

            {/* <TextFormField
              form={form}
              name="buy_url"
              label="Buy/View URL"
              placeholder="https://example.com/book"
              description="Where people can purchase or view this publication"
            /> */}

            {/* <CheckboxFormField
              form={form}
              name="published"
              label="Publish immediately"
            /> */}

            <DialogFooter>
              <Button
                type="button"
                // variant="outline"
                onClick={handleClose}
                disabled={isUploading}
                className="border border-blue-600 text-blue-600"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUploading || isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isUploading || isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Create Publication
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
