"use client";

import { useState, useTransition, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

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
import {
  TextFormField,
  NumberFormField,
  SelectFormField,
  CustomFormField,
  TextareaFormField,
} from "@/components/forms/Form-field";
import { VideoSchema, type VideoUpdateInput } from "@/lib/validation/video";
import { useVideoCategories } from "@/hooks/use-video-categories";
import { fetchYouTubeMetadata } from "@/lib/youtube";

import type { VideoWithCategory } from "@/lib/types";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";

interface EditVideoModalProps {
  video: VideoWithCategory;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EditVideoModal({
  video,
  open,
  onOpenChange,
  onSuccess,
}: EditVideoModalProps) {
  const [isPending, startTransition] = useTransition();
  const [isEnrichingMetadata, setIsEnrichingMetadata] = useState(false);
  const { toast } = useToast();

  const { data: categories } = useVideoCategories();

  const form = useForm({
 
    resolver: zodResolver(VideoSchema),
    defaultValues: {
      youtube_id: video.youtube_id,
      title: video.title,
      category_id: video.category_id,
      location: video.location || "",
      recorded_at: video.recorded_at || "",
      duration_seconds: video.duration_seconds || undefined,
      tags: video.tags,
      description: video.description || "",
      published: video.published,
      featured: video.featured,
    },
  });

  useEffect(() => {
    form.reset({
      youtube_id: video.youtube_id,
      title: video.title,
      category_id: video.category_id,
      location: video.location || "",
      recorded_at: video.recorded_at || "",
      duration_seconds: video.duration_seconds || undefined,
      tags: video.tags,
      description: video.description || "",
      published: video.published,
      featured: video.featured,  
    });
  }, [video, form]);

  const enrichMetadata = async () => {
    setIsEnrichingMetadata(true);
    try {
      const metadata = await fetchYouTubeMetadata(video.youtube_id);
      if (metadata) {
        if (
          !form.getValues("title") ||
          form.getValues("title") === video.title
        ) {
          form.setValue("title", metadata.title);
        }

        toast({
          title: "Metadata updated",
          description: "Video information has been refreshed from YouTube",
        });
      } else {
        toast({
          title: "Error",
          description: "Could not fetch metadata from YouTube",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error enriching metadata:", error);
      toast({
        title: "Error",
        description: "Failed to fetch video metadata",
        variant: "destructive",
      });
    } finally {
      setIsEnrichingMetadata(false);
    }
  };

  const onSubmit = (data: VideoUpdateInput) => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/videos/${video.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
          toast({
            title: "Success",
            description: "Video updated successfully",
          });
          onOpenChange(false);
          onSuccess?.();
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to update video",
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
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-slate-900 text-gray-200">
        <DialogHeader>
          <DialogTitle>Edit Video</DialogTitle>
          <DialogDescription>
            Update video information and metadata
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <TextFormField
                  form={form}
                  name="youtube_id"
                  label="YouTube Video ID"
                  disabled
                  //   className="flex-1"
                />
                <Button
                  type="button"
                  // variant="outline"
                  size="sm"
                  onClick={enrichMetadata}
                  disabled={isEnrichingMetadata}
                  className="ml-2 border border-blue-500 text-blue-500"
                >
                  {isEnrichingMetadata ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  Refresh
                </Button>
              </div>

              <TextFormField
                form={form}
                name="title"
                label="Title"
                placeholder="Video title"
                required
              />

              <SelectFormField
                form={form}
                name="category_id"
                label="Category"
                placeholder="Select category"
                options={
                  categories?.map((cat) => ({
                    value: cat.id,
                    label: cat.name,
                  })) || []
                }
                required
              />

              <TextFormField
                form={form}
                name="location"
                label="Location"
                placeholder="Where was this recorded?"
              />
              {/* 
              <CustomFormField
                form={form}
                name="recorded_at"
                label="Recording Date"
                type="custom"
                render={({ value, onChange }) => (
                  <div className="space-y-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {value ? format(new Date(value), 'PPP') : 'Pick recording date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={value ? new Date(value) : undefined}
                          onSelect={(date) => 
                            onChange(date ? date.toISOString() : '')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {value && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => onChange('')}
                        className="h-6 px-2 text-xs"
                      >
                        Clear date
                      </Button>
                    )}
                  </div>
                )}
              /> */}

              <NumberFormField
                form={form}
                name="duration_seconds"
                label="Duration (seconds)"
                placeholder="Video duration in seconds"
              />

              <CustomFormField
                form={form}
                name="tags"
                label="Tags"
                description="Separate tags with commas"
                type="custom"
                render={({ value, onChange }) => (
                  <input
                    type="text"
                    placeholder="Enter tags separated by commas"
                    className="block bg-   w-full rounded-md border border-gray-700 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const input = e.target.value;
                      const tags = input
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter((tag) => tag.length > 0);
                      onChange(tags);
                    }}
                    value={Array.isArray(value) ? value.join(", ") : ""}
                  />
                )}
              />

              <TextareaFormField
                form={form}
                name="description"
                label="Description"
                placeholder="Video description"
                rows={3}
              />
 <div className="flex items-center justify-between rounded-md border border-gray-700 p-3">
  <Label   htmlFor="featured" className="text-sm text-gray-300">
    Mark as Featured
  </Label>
  <Controller
    name="featured"
    control={form.control}
    render={({ field }) => (
      <Switch
        id="featured"
        checked={field.value}
        onCheckedChange={field.onChange}
      />
    )}
  />
</div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                // variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
                className="border border-blue-600 text-blue-600"
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 text-white"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Updating..." : "Update Video"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
