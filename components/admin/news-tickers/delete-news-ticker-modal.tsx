"use client";

import { useTransition } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/UseToast";
import { deleteNewsTicker } from "@/lib/actions/news-ticker";
import { formatDate } from "@/lib/utils";
import type { NewsTicker } from "@/lib/types";

interface DeleteNewsTickerModalProps {
  ticker: NewsTicker;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteNewsTickerModal({
  ticker,
  open,
  onOpenChange,
  onSuccess,
}: DeleteNewsTickerModalProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

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

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const result = await deleteNewsTicker(ticker.id);

        if (result.success) {
          toast({
            title: "Success",
            description: "News ticker deleted successfully",
          });
          onOpenChange(false);
          onSuccess?.();
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to delete news ticker",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error deleting news ticker:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    });
  };

  const statusInfo = getStatusInfo(ticker);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle
                className="h-6 w-6 text-red-600 dark:text-red-400"
                aria-hidden="true"
              />
            </div>
            <div>
              <DialogTitle className="text-left">
                Delete News Ticker
              </DialogTitle>
              <DialogDescription className="text-left">
                This action cannot be undone. The news ticker will be
                permanently removed.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Are you sure you want to delete this news ticker?
          </p>

          {/* Ticker Preview Card */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-3">
                  {ticker.text}
                </p>
              </div>
              <Badge variant={statusInfo.variant} className="shrink-0">
                {statusInfo.label}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Sort Order
                </p>
                <p className="text-sm font-medium">{ticker.sort_order}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Created
                </p>
                <p className="text-sm font-medium">
                  {formatDate(ticker.created_at, "MMM dd, yyyy")}
                </p>
              </div>
            </div>

            {(ticker.starts_at || ticker.ends_at) && (
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Start Date
                  </p>
                  <p className="text-sm">
                    {ticker.starts_at
                      ? formatDate(ticker.starts_at, "MMM dd, yyyy HH:mm")
                      : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    End Date
                  </p>
                  <p className="text-sm">
                    {ticker.ends_at
                      ? formatDate(ticker.ends_at, "MMM dd, yyyy HH:mm")
                      : "—"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Warning for active tickers */}
          {statusInfo.label === "Active" && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/20 rounded-md">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 dark:text-amber-200">
                  Active News Ticker
                </p>
                <p className="text-amber-700 dark:text-amber-300 mt-1">
                  This ticker is currently being displayed on your website.
                  Deleting it will immediately remove it from public view.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="gap-2"
          >
            {isPending ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete News Ticker
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
