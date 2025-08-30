"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  Eye,
  ExternalLink,
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
import { EditPublicationModal } from "./edit-publication-modal";
import { DeletePublicationModal } from "./delete-publication-modal";
import { StorageUploader } from "@/lib/storage/upload";
import type { PublicationWithCategory } from "@/lib/types";
import { usePublicationCategoriesData } from "@/hooks/use-publication-categories-data";
import { usePublicationsData } from "@/hooks/use-publications-data";

interface PublicationsTableProps {
  page: number;
  search: string;
  category: string;
  year: string;
}

export function PublicationsTable({
  page,
  search,
  category,
  year,
}: PublicationsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [editingPublication, setEditingPublication] =
    useState<PublicationWithCategory | null>(null);
  const [deletingPublication, setDeletingPublication] =
    useState<PublicationWithCategory | null>(null);

  const { data, isLoading, error, refetch } = usePublicationsData({
    page,
    search,
    category_id: category || undefined,
    year: year ? parseInt(year) : undefined,
  });

  const { data: categories } = usePublicationCategoriesData();
  const storageUploader = new StorageUploader();

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== "page") {
      params.delete("page");
    }
    router.push(`/admin/publications?${params.toString()}`);
  };

  const getCoverUrl = (publication: PublicationWithCategory) => {
    return publication.cover_path
      ? storageUploader.getFileUrl("publications", publication.cover_path)
      : null;
  };

  // Generate year options for filter
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 1999 },
    (_, i) => currentYear - i
  );

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600 dark:text-red-400">
            Failed to load publications. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle onClick={() => console.log(data)}>Publications</CardTitle>
          <Button
            variant="outline"
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
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search publications..."
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
            <SelectTrigger className="w-48 border border-gray-700">
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
          <Select
            defaultValue={year}
            onValueChange={(value) =>
              startTransition(() => updateSearchParams("year", value))
            }
          >
            <SelectTrigger className="w-32 border border-gray-700">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Years">All Years</SelectItem>
              {yearOptions.map((yearOption) => (
                <SelectItem key={yearOption} value={yearOption.toString()}>
                  {yearOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border  border-gray-700">
          <Table>
            <TableHeader>
              <TableRow className="border border-gray-700">
                <TableHead className="w-24">Cover</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Publisher</TableHead>
                <TableHead>Pages</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border border-gray-700">
                    <TableCell colSpan={10}>
                      <div className="h-20 animate-pulse bg-gray-200 rounded dark:bg-gray-700" />
                    </TableCell>
                  </TableRow>
                ))
              ) : data?.data?.length === 0 ? (
                <TableRow className="border border-gray-700">
                  <TableCell
                    colSpan={10}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No publications found
                  </TableCell>
                </TableRow>
              ) : (
                data?.data?.map((publication) => {
                  const coverUrl = getCoverUrl(publication);
                  return (
                    <TableRow
                      key={publication.id}
                      className="border border-gray-700"
                    >
                      <TableCell>
                        <div className="relative h-16 w-12 rounded overflow-hidden bg-gray-100 dark:bg-gray-800">
                          {coverUrl ? (
                            <Image
                              src={coverUrl}
                              alt={publication.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                              <Eye className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <div className="font-medium line-clamp-1">
                            {publication.name}
                          </div>
                          {publication.description && (
                            <div className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {publication.description}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {publication.publication_categories.name}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {publication.publisher ? (
                          <span className="text-sm">
                            {publication.publisher}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {publication.total_pages ? (
                          <span className="text-sm font-mono">
                            {publication.total_pages}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {publication.published_year ? (
                          <span className="text-sm font-mono">
                            {publication.published_year}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {publication.tags.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {publication.tags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {publication.tags.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{publication.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            publication.published ? "default" : "secondary"
                          }
                        >
                          {publication.published ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {format(
                            new Date(publication.created_at),
                            "MMM dd, yyyy"
                          )}
                        </div>
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
                            className="bg-gray-900 text-white"
                          >
                            {publication.buy_url && (
                              <>
                                <DropdownMenuItem asChild>
                                  <a
                                    href={publication.buy_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center"
                                  >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    View/Buy
                                  </a>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                              </>
                            )}
                            <DropdownMenuItem
                              onClick={() => setEditingPublication(publication)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() =>
                                setDeletingPublication(publication)
                              }
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

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
      </CardContent>

      {/* Modals */}
      {editingPublication && (
        <EditPublicationModal
          publication={editingPublication}
          open={!!editingPublication}
          onOpenChange={(open) => !open && setEditingPublication(null)}
          onSuccess={refetch}
        />
      )}

      {deletingPublication && (
        <DeletePublicationModal
          publication={deletingPublication}
          open={!!deletingPublication}
          onOpenChange={(open) => !open && setDeletingPublication(null)}
          onSuccess={refetch}
        />
      )}
    </Card>
  );
}
