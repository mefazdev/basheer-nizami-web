"use client";

import { ReactNode } from "react";
import { UseFormReturn, FieldPath, FieldValues, ControllerRenderProps, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Textarea } from "../ui/Textarea";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Input } from "../ui/Input";

interface BaseFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

interface TextFormFieldProps<T extends FieldValues>
  extends BaseFormFieldProps<T> {
  type?: "text" | "email" | "password" | "url" | "number";
  variant?: "input" | "textarea";
  rows?: number;
}

interface SelectFormFieldProps<T extends FieldValues>
  extends BaseFormFieldProps<T> {
  type: "select";
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

interface CheckboxFormFieldProps<T extends FieldValues>
  extends BaseFormFieldProps<T> {
  type: "checkbox";
}

// interface CustomFormFieldProps<T extends FieldValues>
//   extends BaseFormFieldProps<T> {
//   type: "custom";
//     render: (field: {
//     value: any;
//     onChange: (...event:  []) => void;
//     onBlur: () => void;
//     name: string;
//     ref: (instance: any) => void;
//   }) => ReactNode;
// }
interface CustomFormFieldProps<T extends FieldValues>
  extends BaseFormFieldProps<T> {
  type: "custom";
  render: (field: ControllerRenderProps<T, Path<T>>) => ReactNode;
}
type FormFieldProps<T extends FieldValues> =
  | TextFormFieldProps<T>
  | SelectFormFieldProps<T>
  | CheckboxFormFieldProps<T>
  | CustomFormFieldProps<T>;

  
export function CustomFormField<T extends FieldValues>(
  props: FormFieldProps<T>
) {
  const {
    form,
    name,
    label,
    description,
    disabled = false,
    required = false,
  } = props;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={
            props.type === "checkbox"
              ? "flex flex-row items-start space-x-3 space-y-0  "
              : undefined
          }
        >
          {props.type !== "checkbox" && label && (
            <FormLabel
              className={` ${
                required &&
                `after:content-['*'] after:ml-0.5 after:text-red-500`
              }  text-gray-300  `}
            >
              {label}
            </FormLabel>
          )}

          <FormControl>
            {(() => {
              switch (props.type) {
                case "select":
                  return (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={disabled}
                    >
                      <SelectTrigger className=" border border-gray-700 focus:border-blue-500 outline-none  ">
                        <SelectValue placeholder={props.placeholder} />
                      </SelectTrigger>
                      <SelectContent className="  border-gray-200">
                        {props.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );

                case "checkbox":
                  return (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={disabled}
                        id={name}
                        className="border"
                        aria-describedby={
                          description ? `${name}-description` : undefined
                        }
                      />
                      {label && (
                        <label
                          htmlFor={name}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {label}
                          {required && (
                            <span className="ml-0.5 text-red-500">*</span>
                          )}
                        </label>
                      )}
                    </div>
                  );

                case "custom":
                  return props.render(field);

                default:
                  // Handle text inputs and textarea
                  const variant = "variant" in props ? props.variant : "input";
                  const inputType = "type" in props ? props.type : "text";
                  const rows = "rows" in props ? props.rows : 3;

                  if (variant === "textarea") {
                    return (
                      <Textarea
                        className="border-gray-700    focus:border-blue-500  "
                        {...field}
                        placeholder={props.placeholder}
                        disabled={disabled}
                        rows={rows}
                        aria-describedby={
                          description ? `${name}-description` : undefined
                        }
                      />
                    );
                  }

                  return (
                    // <Input
                    //   {...field}
                    //   type={inputType}
                    //   placeholder={props.placeholder}
                    //   disabled={disabled}
                    //   aria-describedby={description ? `${name}-description` : undefined}
                    //   value={field.value || ''}
                    //   className='bg-white border-gray-200 focus:ring-blue-500'
                    // />
                    <Input
                      {...field}
                      type={inputType}
                      placeholder={props.placeholder}
                      disabled={disabled}
                      aria-describedby={
                        description ? `${name}-description` : undefined
                      }
                      value={field.value ?? ""}
                      className=" border-gray-700 focus:border-blue-500 outline-none  "
                      onChange={(e) => {
                        if (inputType === "number") {
                              field.onChange(
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value)
                          );
                        } else {
                          field.onChange(e);
                        }
                      }}
                    />
                  );
              }
            })()}
          </FormControl>

          {description && (
            <FormDescription id={`${name}-description`}>
              {description}
            </FormDescription>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Convenience components for common field types
export function TextFormField<T extends FieldValues>(
  props: Omit<TextFormFieldProps<T>, "type">
) {
  return <CustomFormField {...props} type="text" />;
}

export function EmailFormField<T extends FieldValues>(
  props: Omit<TextFormFieldProps<T>, "type">
) {
  return <CustomFormField {...props} type="email" />;
}

export function PasswordFormField<T extends FieldValues>(
  props: Omit<TextFormFieldProps<T>, "type">
) {
  return <CustomFormField {...props} type="password" />;
}

export function NumberFormField<T extends FieldValues>(
  props: Omit<TextFormFieldProps<T>, "type">
) {
  return <CustomFormField {...props} type="number" />;
}

export function TextareaFormField<T extends FieldValues>(
  props: Omit<TextFormFieldProps<T>, "type" | "variant">
) {
  return <CustomFormField {...props} type="text" variant="textarea" />;
}

export function SelectFormField<T extends FieldValues>(
  props: Omit<SelectFormFieldProps<T>, "type">
) {
  return <CustomFormField {...props} type="select" />;
}

export function CheckboxFormField<T extends FieldValues>(
  props: Omit<CheckboxFormFieldProps<T>, "type">
) {
  return <CustomFormField {...props} type="checkbox" />;
}


// Removed duplicate type definition for TextFormFieldProps to fix compile error.