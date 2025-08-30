"use client";

import { useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

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
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import {
  TextFormField,
  NumberFormField,
  CheckboxFormField,
  CustomFormField,
} from "@/components/forms/Form-field";
import { updateNewsTicker } from "@/lib/actions/news-ticker";
import { cn } from "@/lib/utils";
import type { NewsTicker } from "@/lib/types";
import {
  NewsTickerSchema,
  NewsTickerUpdateInput,
} from "@/lib/validation/news-ticker";

interface EditNewsTickerModalProps {
  ticker: NewsTicker;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EditNewsTickerModal({
  ticker,
  open,
  onOpenChange,
  onSuccess,
}: EditNewsTickerModalProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(NewsTickerSchema),
    defaultValues: {
      text: ticker.text,
      published: ticker.published,
      sort_order: ticker.sort_order,
      starts_at: ticker.starts_at || "",
      ends_at: ticker.ends_at || "",
    },
  });

  // Reset form when ticker changes
  useEffect(() => {
    form.reset({
      text: ticker.text,
      published: ticker.published,
      sort_order: ticker.sort_order,
      starts_at: ticker.starts_at || "",
      ends_at: ticker.ends_at || "",
    });
  }, [ticker, form]);

  const onSubmit = (data: NewsTickerUpdateInput) => {
    startTransition(async () => {
      try {
        const formData = new FormData();

        if (data.text !== undefined) formData.append("text", data.text);
        if (data.published !== undefined)
          formData.append("published", data.published.toString());
        if (data.sort_order !== undefined)
          formData.append("sort_order", data.sort_order.toString());
        if (data.starts_at !== undefined)
          formData.append("starts_at", data.starts_at);
        if (data.ends_at !== undefined)
          formData.append("ends_at", data.ends_at);

        const result = await updateNewsTicker(ticker.id, formData);

        if (result.success) {
          toast({
            title: "Success",
            description: "News ticker updated successfully",
          });
          onOpenChange(false);
          onSuccess?.();
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to update news ticker",
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit News Ticker</DialogTitle>
          <DialogDescription>
            Update the news ticker information
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TextFormField
              form={form}
              name="text"
              label="Text"
              placeholder="Enter news ticker text..."
              variant="textarea"
              rows={3}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <NumberFormField
                form={form}
                name="sort_order"
                label="Sort Order"
                placeholder="0"
                description="Lower numbers appear first"
              />

              <CheckboxFormField
                form={form}
                name="published"
                label="Published"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <CustomFormField
                form={form}
                name="starts_at"
                label="Start Date"
                description="When to start showing this ticker"
                type="custom"
                render={({ value, onChange }) => (
                  <div className="space-y-2">
                    {/* <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {value
                            ? format(new Date(value), "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={value ? new Date(value) : undefined}
                          onSelect={(date) =>
                            onChange(date ? date.toISOString() : "")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover> */}
                    <Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      className={cn(
        "w-full border border-gray-300 bg-white justify-start text-left font-normal",
        !value && "text-muted-foreground"
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {value && typeof value !== 'boolean' 
        ? format(new Date(value), "PPP") 
        : "Pick a date"
      }
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar
      mode="single"
      selected={value && typeof value !== 'boolean' ? new Date(value) : undefined}
      onSelect={(date) =>
        onChange(date ? date.toISOString() : "")
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
                        onClick={() => onChange("")}
                        className="h-6 px-2 text-xs"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                )}
              />

              <CustomFormField
                form={form}
                name="ends_at"
                label="End Date"
                description="When to stop showing this ticker"
                type="custom"
                render={({ value, onChange }) => (
                  <div className="space-y-2">
                    {/* <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {value
                            ? format(new Date(value), "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={value ? new Date(value) : undefined}
                          onSelect={(date) =>
                            onChange(date ? date.toISOString() : "")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover> */}
                    <Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      className={cn(
        "w-full border border-gray-300 bg-white justify-start text-left font-normal",
        !value && "text-muted-foreground"
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {value && typeof value !== 'boolean' 
        ? format(new Date(value), "PPP") 
        : "Pick a date"
      }
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar
      mode="single"
      selected={value && typeof value !== 'boolean' ? new Date(value) : undefined}
      onSelect={(date) =>
        onChange(date ? date.toISOString() : "")
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
                        onClick={() => onChange("")}
                        className="h-6 px-2 text-xs"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              ></Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
