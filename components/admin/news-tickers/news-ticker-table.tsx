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
 
import type { NewsTicker } from "@/lib/types";
import { useNewsTickersData } from "@/hooks";
import { EditNewsTickerModal } from "./edit-news-ticker-modal";
import { Badge } from "@/components/ui/Badge";
import { DeleteNewsTickerModal } from "./delete-news-ticker-modal";

interface NewsTickersTableProps {
  page: number;
  search: string;
  status: string;
}

export function NewsTickersTable({
  page,
  search,
  status,
}: NewsTickersTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
 
  const [isPending, startTransition] = useTransition();
  const [editingTicker, setEditingTicker] = useState<NewsTicker | null>(null);
  const [deletingTicker, setDeletingTicker] = useState<NewsTicker | null>(null);

  const { data, isLoading, error, refetch } = useNewsTickersData({
    page,
    search,
    status: status === "all" ? undefined : status,
  });

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page"); // Reset to first page when filtering
    router.push(`/admin/news-tickers?${params.toString()}`);
  };

  const getStatusInfo = (ticker: NewsTicker) => {
    const now = new Date();
    const startsAt = ticker.starts_at ? new Date(ticker.starts_at) : null;
    const endsAt = ticker.ends_at ? new Date(ticker.ends_at) : null;

    if (!ticker.published) {
      return { label: "Draft", variant: "secondary" as const };
    }

    if (startsAt && startsAt > now) {
      return { label: "Scheduled", variant: "outline" as const };
    }

    if (endsAt && endsAt < now) {
      return { label: "Expired", variant: "destructive" as const };
    }

    return { label: "Active", variant: "default" as const };
  };

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600 dark:text-red-400">
            Failed to load news tickers. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>News Tickers</CardTitle>
          <Button
            
            size="sm"
            onClick={() => startTransition(refetch)}
            disabled={isPending}
            className="border border-blue-500  text-blue-500"
          >
            <RefreshCw
              className={` mr-2 h-4 w-4 ${isPending ? "animate-spin" : ""}`}
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
              placeholder="Search news tickers..."
              defaultValue={search}
              onChange={(e) =>
                startTransition(() =>
                  updateSearchParams("search", e.target.value)
                )
              }
              className="pl-8  border-gray-700  outline:none   "
            />
          </div>
          <Select
            defaultValue={status}
            onValueChange={(value) =>
              startTransition(() => updateSearchParams("status", value))
            }
          >
            <SelectTrigger className="w-48 border border-gray-700">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border border-gray-700">
          <Table className="">
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead>Text</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sort Order</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={7}>
                      <div className="h-8 animate-pulse border-gray-700  rounded dark:bg-gray-700" />
                    </TableCell>
                  </TableRow>
                ))
              ) : data?.data?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No news tickers found
                  </TableCell>
                </TableRow>
              ) : (
                data?.data?.map((ticker) => {
                  const statusInfo = getStatusInfo(ticker);
                  return (
                    <TableRow key={ticker.id} className="  border-gray-700">
                      <TableCell className="max-w-md">
                        <div className="truncate font-medium">
                          {ticker.text}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusInfo.variant}>
                          {statusInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-mono">
                          {ticker.sort_order}
                        </div>
                      </TableCell>
                      <TableCell>
                        {ticker.starts_at ? (
                          <div className="text-sm">
                            {format(new Date(ticker.starts_at), "MMM dd, yyyy")}
                            <div className="text-xs text-muted-foreground">
                              {/* {format(new Date(ticker.starts_at), 'HH:mm')} */}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {ticker.ends_at ? (
                          <div className="text-sm border-gray-700">
                            {format(new Date(ticker.ends_at), "MMM dd, yyyy")}
                            <div className="text-xs text-muted-foreground">
                              {/* {format(new Date(ticker.ends_at), 'HH:mm')} */}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {format(new Date(ticker.created_at), "MMM dd, yyyy")}
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
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => setEditingTicker(ticker)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => setDeletingTicker(ticker)}
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
                    const pageNum = i + 1;
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
      {editingTicker && (
        <EditNewsTickerModal
          ticker={editingTicker}
          open={!!editingTicker}
          onOpenChange={(open) => !open && setEditingTicker(null)}
          onSuccess={refetch}
        />
      )}

      {deletingTicker && (
        <DeleteNewsTickerModal
          ticker={deletingTicker}
          open={!!deletingTicker}
          onOpenChange={(open) => !open && setDeletingTicker(null)}
          onSuccess={refetch}
        />
      )}
    </Card>
  );
}
