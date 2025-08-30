"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import {
  MoreHorizontal,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  Grid3X3,
  List,
  Eye,
  Download,
} from "lucide-react";
import Image from "next/image";

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
import { DeletePhotoModal } from "./delete-photo-modal";
import { PhotoPreviewModal } from "./photo-preview-modal";
import { usePhotosData } from "@/hooks/use-photos-data";
import { StorageUploader } from "@/lib/storage/upload";
import type { PhotoWithCategory } from "@/lib/types";
import { Skeleton } from "@/components/ui/Skeletone";
import { usePhotoCategoriesData } from "@/hooks/use-photo-categories-data";

interface PhotosTableProps {
  page: number;
  search: string;
  category: string;
  view: "grid" | "list";
}

export function PhotosTable({
  page,
  search,
  category,
  view,
}: PhotosTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [deletingPhoto, setDeletingPhoto] = useState<PhotoWithCategory | null>(
    null
  );
  const [previewingPhoto, setPreviewingPhoto] =
    useState<PhotoWithCategory | null>(null);

  const { data, isLoading, error, refetch } = usePhotosData({
    page,
    search,
    category_id: category || undefined,
  });

  const { data: categories } = usePhotoCategoriesData();

  const storageUploader = new StorageUploader();

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== "page") {
      params.delete("page"); // Reset to first page when filtering
    }
    router.push(`/admin/photos?${params.toString()}`);
  };

  const getImageUrl = (photo: PhotoWithCategory) => {
    return storageUploader.getFileUrl("photos", photo.file_path);
  };

  const handleDownload = async (photo: PhotoWithCategory) => {
    try {
      const imageUrl = getImageUrl(photo);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${photo.title}.${photo.file_path.split(".").pop()}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download image",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600 dark:text-red-400">
            Failed to load photos. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  const GridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data?.data?.map((photo) => (
        <Card key={photo.id} className="overflow-hidden group">
          <div className="relative aspect-square">
            <Image
              src={getImageUrl(photo)}
              alt={photo.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-gray-900 text-gray-100"
                >
                  <DropdownMenuItem onClick={() => setPreviewingPhoto(photo)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload(photo)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuItem onClick={() => setEditingPhoto(photo)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem> */}
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => setDeletingPhoto(photo)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {!photo.published && (
              <Badge variant="secondary" className="absolute bottom-2 left-2">
                Draft
              </Badge>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-medium text-sm line-clamp-2 mb-2">
              {photo.title}
            </h3>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{photo.photo_categories.name}</span>
              <span>{format(new Date(photo.created_at), "MMM dd")}</span>
            </div>
            {photo.location && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                📍 {photo.location}
              </p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="rounded-md border border-gray-700">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700">
            <TableHead className="w-20">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((photo) => (
            <TableRow key={photo.id}>
              <TableCell>
                <div className="relative h-12 w-12 rounded overflow-hidden">
                  <Image
                    src={getImageUrl(photo)}
                    alt={photo.title}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-xs">
                  <div className="font-medium line-clamp-1">{photo.title}</div>
                  {photo.description && (
                    <div className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {photo.description}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{photo.photo_categories.name}</Badge>
              </TableCell>
              <TableCell>
                {photo.location ? (
                  <span className="text-sm">{photo.location}</span>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell>
                {photo.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {photo.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {photo.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{photo.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant={photo.published ? "default" : "secondary"}>
                  {photo.published ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {format(new Date(photo.created_at), "MMM dd, yyyy")}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-gray-900 text-gray-100"
                  >
                    <DropdownMenuItem onClick={() => setPreviewingPhoto(photo)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload(photo)}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuItem onClick={() => setEditingPhoto(photo)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem> */}
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => setDeletingPhoto(photo)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Photo Gallery</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={view === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => updateSearchParams("view", "grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => updateSearchParams("view", "list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => startTransition(refetch)}
              disabled={isPending}
            >
              <RefreshCw
                className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1 border-gr">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search photos..."
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
            defaultValue={category}
            onValueChange={(value) =>
              startTransition(() => updateSearchParams("category", value))
            }
          >
            <SelectTrigger className="w-48 border border-gray-600">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Categories">All Categories</SelectItem>
              {categories?.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Content */}
        {isLoading ? (
          view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          )
        ) : data?.data?.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">No photos found</div>
          </div>
        ) : (
          <>
            {view === "grid" ? <GridView /> : <ListView />}

            {/* Pagination */}
            {data?.pagination && data.pagination.pages > 1 && (
              <div className="flex items-center justify-center mt-8 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={data.pagination.page <= 1}
                  onClick={() =>
                    updateSearchParams(
                      "page",
                      (data.pagination.page - 1).toString()
                    )
                  }
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {data.pagination.page} of {data.pagination.pages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={data.pagination.page >= data.pagination.pages}
                  onClick={() =>
                    updateSearchParams(
                      "page",
                      (data.pagination.page + 1).toString()
                    )
                  }
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>

      {/* Modals */}
      {/* {editingPhoto && (
        <EditPhotoModal
          photo={editingPhoto}
          open={!!editingPhoto}
          onOpenChange={(open) => !open && setEditingPhoto(null)}
          onSuccess={refetch}
        />
      )} */}

      {deletingPhoto && (
        <DeletePhotoModal
          photo={deletingPhoto}
          open={!!deletingPhoto}
          onOpenChange={(open) => !open && setDeletingPhoto(null)}
          onSuccess={refetch}
        />
      )}

      {previewingPhoto && (
        <PhotoPreviewModal
          photo={previewingPhoto}
          open={!!previewingPhoto}
          onOpenChange={(open) => !open && setPreviewingPhoto(null)}
        />
      )}
    </Card>
  );
}
