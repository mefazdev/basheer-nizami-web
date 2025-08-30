"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  Play,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
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
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/UseToast";
import { EditVideoModal } from "./edit-video-modal";
import { DeleteVideoModal } from "./delete-video-modal";
import { useVideosData } from "@/hooks/use-videos-data";
import { useVideoCategories } from "@/hooks/use-video-categories";
import { getYouTubeThumbnailUrl, getYouTubeWatchUrl } from "@/lib/youtube";
import { formatDuration } from "@/lib/utils";

import type { VideoWithCategory } from "@/lib/types";

interface VideosTableProps {
  searchParams: {
    page?: string;
    search?: string;
    category?: string;
    published?: string;
    dateFrom?: string;
    dateTo?: string;
  };
}

export function VideosTable({ searchParams }: VideosTableProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [editingVideo, setEditingVideo] = useState<VideoWithCategory | null>(
    null
  );
  const [deletingVideo, setDeletingVideo] = useState<VideoWithCategory | null>(
    null
  );
  // const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({
  //   from: searchParams.dateFrom ? new Date(searchParams.dateFrom) : undefined,
  //   to: searchParams.dateTo ? new Date(searchParams.dateTo) : undefined,
  // })

  const page = parseInt(searchParams.page || "1");
  const search = searchParams.search || "";
  const categoryId = searchParams.category || "all";
  const published = searchParams.published || "all";

  const { data, isLoading, error, refetch } = useVideosData({
    page,
    search,
    category_id: categoryId === "all" ? undefined : categoryId,
    published: published === "all" ? undefined : published === "true",
  });

  const { data: categories } = useVideoCategories();

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams );
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== "page") {
      params.delete("page"); // Reset to first page when filtering
    }
    router.push(`/admin/videos?${params.toString()}`);
  };

  // const handleDateRangeChange = (range: { from?: Date; to?: Date }) => {
  //   // setDateRange(range)
  //   const params = new URLSearchParams(searchParams as any)

  //   if (range.from) {
  //     params.set('dateFrom', range.from.toISOString())
  //   } else {
  //     params.delete('dateFrom')
  //   }

  //   if (range.to) {
  //     params.set('dateTo', range.to.toISOString())
  //   } else {
  //     params.delete('dateTo')
  //   }

  //   params.delete('page')
  //   router.push(`/admin/videos?${params.toString()}`)
  // }

  // const clearDateRange = () => {
  //   handleDateRangeChange({ from: undefined, to: undefined })
  // }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600 dark:text-red-400">
            Failed to load videos. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Video Gallery</CardTitle>
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
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search videos by title, location, or tags..."
              defaultValue={search}
              onChange={(e) =>
                startTransition(() =>
                  updateSearchParams("search", e.target.value)
                )
              }
              className="pl-8"
            />
          </div>

          <Select
            value={categoryId}
            onValueChange={(value) =>
              startTransition(() => updateSearchParams("category", value))
            }
          >
            <SelectTrigger className="w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={published}
            onValueChange={(value) =>
              startTransition(() => updateSearchParams("published", value))
            }
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="true">Published</SelectItem>
              <SelectItem value="false">Draft</SelectItem>
            </SelectContent>
          </Select>

          {/* <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className={cn(
                  'w-48 justify-start text-left font-normal',
                  (!dateRange.from && !dateRange.to) && 'text-muted-foreground'
                )}
              >
              
                <Calendar className="mr-2 h-4 w-4" />
                {dateRange.from && dateRange.to
                  ? `${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd')}`
                  : dateRange.from
                  ? `From ${format(dateRange.from, 'MMM dd')}`
                  : 'Date range'
                }
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-3 border-b">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Select date range</p>
                  {(dateRange.from || dateRange.to) && (
                    <Button variant="ghost" size="sm" onClick={clearDateRange}>
                      Clear
                    </Button>
                  )}
                </div>
              </div>
              <Calendar
                mode="range"
                selected={dateRange }
                onSelect={(range) => handleDateRangeChange(range || {})}
                numberOfMonths={2}
                className="rounded-md"
              />
            </PopoverContent>
          </Popover> */}
        </div>

        {/* Table */}
        <div className="rounded-md border border-gray-700">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead>Video</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={7}>
                      <div className="h-16 animate-pulse bg-gray-800 border-gray-700" />
                    </TableCell>
                  </TableRow>
                ))
              ) : data?.data?.length === 0 ? (
                <TableRow className="border-gray-700">
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No videos found
                  </TableCell>
                </TableRow>
              ) : (
                data?.data?.map((video) => (
                  <TableRow key={video.id} className="border-gray-700">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative w-20 h-12 rounded-md overflow-hidden  bg-gray-800 shrink-0">
                          <Image
                            src={
                              video.thumbnail_url ||
                              getYouTubeThumbnailUrl(video.youtube_id)
                            }
                            alt={video.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = getYouTubeThumbnailUrl(
                                video.youtube_id,
                                "default"
                              );
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="h-4 w-4 text-white drop-shadow-md" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm line-clamp-2 mb-1">
                            {video.title}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-mono">
                              {video.youtube_id}
                            </span>
                            {video.tags.length > 0 && (
                              <>
                                <span>•</span>
                                <span>{video.tags.slice(0, 2).join(", ")}</span>
                                {video.tags.length > 2 && (
                                  <span>+{video.tags.length - 2}</span>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {video.video_categories.name}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {video.location ? (
                        <span className="text-sm">{video.location}</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {video.recorded_at ? (
                        <div className="text-sm">
                          {format(new Date(video.recorded_at), "MMM dd, yyyy")}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {video.duration_seconds ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3" />
                          {formatDuration(video.duration_seconds)}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={video.published ? "default" : "secondary"}
                      >
                        {video.published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
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
                            onClick={() =>
                              window.open(
                                getYouTubeWatchUrl(video.youtube_id),
                                "_blank"
                              )
                            }
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View on YouTube
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => setEditingVideo(video)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => setDeletingVideo(video)}
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

        {/* Pagination */}
        {data?.pagination && data.pagination.pages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Showing {(data.pagination.page - 1) * data.pagination.limit + 1}{" "}
              to{" "}
              {Math.min(
                data.pagination.page * data.pagination.limit,
                data.pagination.total
              )}{" "}
              of {data.pagination.total} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={data.pagination.page <= 1}
                onClick={() =>
                  startTransition(() =>
                    updateSearchParams(
                      "page",
                      (data.pagination.page - 1).toString()
                    )
                  )
                }
              >
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from(
                  { length: Math.min(5, data.pagination.pages) },
                  (_, i) => {
                    const pageNum = Math.max(1, data.pagination.page - 2) + i;
                    if (pageNum > data.pagination.pages) return null;
                    return (
                      <Button
                        key={pageNum}
                        variant={
                          pageNum === data.pagination.page
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        className="w-8"
                        onClick={() =>
                          startTransition(() =>
                            updateSearchParams("page", pageNum.toString())
                          )
                        }
                      >
                        {pageNum}
                      </Button>
                    );
                  }
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={data.pagination.page >= data.pagination.pages}
                onClick={() =>
                  startTransition(() =>
                    updateSearchParams(
                      "page",
                      (data.pagination.page + 1).toString()
                    )
                  )
                }
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      {/* Modals */}
      {editingVideo && (
        <EditVideoModal
          video={editingVideo}
          open={!!editingVideo}
          onOpenChange={(open) => !open && setEditingVideo(null)}
          onSuccess={refetch}
        />
      )}

      {deletingVideo && (
        <DeleteVideoModal
          video={deletingVideo}
          open={!!deletingVideo}
          onOpenChange={(open) => !open && setDeletingVideo(null)}
          onSuccess={refetch}
        />
      )}
    </Card>
  );
}
