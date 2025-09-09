"use client";

import { useState, useTransition } from "react";
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
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";

import { useToast } from "@/components/ui/UseToast";
import {
  TextFormField,
  NumberFormField,
  SelectFormField,
  TextareaFormField,
} from "@/components/forms/Form-field";
import { VideoSchema, type VideoInput } from "@/lib/validation/video";
import { useVideoCategories } from "@/hooks/use-video-categories";
import { extractYouTubeVideoId, fetchYouTubeMetadata } from "@/lib/youtube";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";

interface CreateVideoModalProps {
  children: React.ReactNode;
}

export function CreateVideoModal({ children }: CreateVideoModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isEnrichingMetadata, setIsEnrichingMetadata] = useState(false);
  const { toast } = useToast();

  const { data: categories } = useVideoCategories();

  const form = useForm({
    resolver: zodResolver(VideoSchema),
    defaultValues: {
      youtube_id: "",
      title: "",
      category_id: "",
      location: "",
      duration_seconds: undefined,
      tags: [],
      description: "",
      published: true,
      featured: false, // ✅ added
    },
  });

  const watchedYouTubeId = form.watch("youtube_id");

  const enrichMetadata = async (youtubeUrl: string) => {
    const videoId = extractYouTubeVideoId(youtubeUrl);
    if (!videoId) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL or video ID",
        variant: "destructive",
      });
      return;
    }

    setIsEnrichingMetadata(true);
    try {
      const metadata = await fetchYouTubeMetadata(videoId);
      if (metadata) {
        form.setValue("youtube_id", videoId);
        if (!form.getValues("title")) {
          form.setValue("title", metadata.title);
        }

        toast({
          title: "Metadata loaded",
          description: "Video information has been fetched from YouTube",
        });
      } else {
        // Still set the video ID even if metadata fetch fails
        form.setValue("youtube_id", videoId);
        toast({
          title: "Video ID set",
          description: "Could not fetch metadata, but video ID has been set",
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

  const onSubmit = (data: VideoInput) => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/videos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
          toast({
            title: "Success",
            description: "Video added successfully",
          });
          setOpen(false);
          form.reset();
          window.location.reload(); // Refresh to show new video
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to add video",
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
  // A small controlled input for tags
  function TagsInput({
    value,
    onChange,
  }: {
    value: string[];
    onChange: (tags: string[]) => void;
  }) {
    const [inputValue, setInputValue] = useState(
      Array.isArray(value) ? value.join(", ") : ""
    );

    return (
      <input
        type="text"
        placeholder="Enter tags separated by commas"
        className="block w-full rounded-md border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-border-500"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={() => {
          const tags = inputValue
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);
          onChange(tags);
        }}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto border-gray-800 bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>Add Video</DialogTitle>
          <DialogDescription onClick={() => console.log(form.getValues())}>
            Add a new video to your gallery from YouTube
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <TextFormField
                form={form}
                name="youtube_id"
                label="YouTube URL or Video ID"
                placeholder="https://youtube.com/watch?v=... or video ID"
                required
              />

              {watchedYouTubeId && (
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => enrichMetadata(watchedYouTubeId)}
                    disabled={isEnrichingMetadata}
                  >
                    {isEnrichingMetadata ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Fetch Metadata
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    Auto-fill title and thumbnail
                  </span>
                </div>
              )}

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

              <NumberFormField
                form={form}
                name="duration_seconds"
                label="Duration (seconds)"
                placeholder="Video duration in seconds"
              />
              <Controller
                name="tags"
                control={form.control}
                render={({ field }) => (
                  <TagsInput
                    value={field.value ?? []}
                    onChange={field.onChange}
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
            </div>
            <div className="flex items-center justify-between rounded-md border border-gray-700 p-3">
              <Label htmlFor="featured" className="text-sm text-gray-300">
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
            <DialogFooter>
              <Button
                type="button"
                // variant="outline"
                className="border border-blue-500 text-blue-500"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 text-white"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Adding..." : "Add Video"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
