"use client";

import { useState, useTransition } from "react";
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
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { useToast } from "@/components/ui/UseToast";
import { Calendar } from "@/components/ui/Calendar";
 import {
  TextFormField,
  NumberFormField,

  CustomFormField,
} from "@/components/forms/Form-field";
import {
  NewsTickerSchema,
  type NewsTickerInput,
} from "@/lib/validation/news-ticker";
import { createNewsTicker } from "@/lib/actions/news-ticker";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

interface CreateNewsTickerModalProps {
  children: React.ReactNode;
}

export function CreateNewsTickerModal({
  children,
}: CreateNewsTickerModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(NewsTickerSchema),
    defaultValues: {
      text: "",
      published: true,
      sort_order: 0,
    },
  });

  const onSubmit = (data: NewsTickerInput) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("text", data.text);
        formData.append("published", data.published.toString());
        formData.append("sort_order", data.sort_order.toString());

        if (data.starts_at) {
          formData.append("starts_at", data.starts_at);
        }
        if (data.ends_at) {
          formData.append("ends_at", data.ends_at);
        }

        const result = await createNewsTicker(formData);

        if (result.success) {
          toast({
            title: "Success",
            description: "News ticker created successfully",
          });
          setOpen(false);
          form.reset();
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to create news ticker",
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md border-blue-200 bg-blue-50">
        <DialogHeader>
          <DialogTitle className="text-blue-500">
            Create News Ticker
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Add a new news ticker to display on your website
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

              {/* <CheckboxFormField 
                form={form}
                name="published"
                label="Published"
              /> */}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <CustomFormField
                form={form}
                name="starts_at"
                label="Start Date"
                description="When to start showing this ticker"
                type="custom"
                render={({ value, onChange }) => (
                  // <Popover>
                  //   <PopoverTrigger asChild>
                  //     <Button
                  //       // variant=""
                  //       className={cn(
                  //         "w-full border border-gray-300 bg-white justify-start text-left font-normal",
                  //         !value && "text-muted-foreground"
                  //       )}
                  //     >
                  //       <CalendarIcon className="mr-2 h-4 w-4" />
                  //       {value ? format(new Date(value), "PPP") : "Pick a date"}
                  //     </Button>
                  //   </PopoverTrigger>
                  //   <PopoverContent className="w-auto p-0  " align="start">
                  //     <Calendar
                  //       mode="single"
                  //       selected={value ? new Date(value) : undefined}
                  //       onSelect={(date) =>
                  //         onChange(date ? date.toISOString() : "")
                  //       }
                  //       initialFocus
                  //     />
                  //   </PopoverContent>
                  // </Popover>
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

                )}
              />

              <CustomFormField
                form={form}
                name="ends_at"
                label="End Date"
                description="When to stop showing this ticker"
                type="custom"
                render={({ value, onChange }) => (
                  // <Popover>
                  //   <PopoverTrigger asChild>
                  //     <Button
                  //       variant="outline"
                  //       className={cn(
                  //         "w-full border border-gray-300 bg-white justify-start text-left font-normal",
                  //         !value && "text-muted-foreground"
                  //       )}
                  //     >
                  //       <CalendarIcon className="mr-2 h-4 w-4" />
                  //       {value ? format(new Date(value), "PPP") : "Pick a date"}
                  //     </Button>
                  //   </PopoverTrigger>
                  //   <PopoverContent className="w-auto p-0" align="start">
                  //     <Calendar
                  //       mode="single"
                  //       selected={value ? new Date(value) : undefined}
                  //       onSelect={(date) =>
                  //         onChange(date ? date.toISOString() : "")
                  //       }
                  //       initialFocus
                  //     />
                  //   </PopoverContent>
                  // </Popover>
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

                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-blue-500 text-white"
              >
                {isPending ? "Creating..." : "Create News Ticker"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
