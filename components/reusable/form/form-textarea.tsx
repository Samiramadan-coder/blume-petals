"use client";

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

import {
  get,
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

type FormTextareaProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  labelClassName?: string;
};

export default function FormTextarea<T extends FieldValues>({
  name,
  label,
  placeholder,
  required,
  register,
  errors,
  className,
  inputClassName,
  disabled = false,
  labelClassName,
}: FormTextareaProps<T>) {
  const error = get(errors, name);

  return (
    <Field className={className} data-invalid={!!error}>
      {label && (
        <FieldLabel
          htmlFor={name}
          className={cn(
            "text-sm font-semibold",
            required && "after:ms-1 after:text-destructive after:content-['*']",
            labelClassName,
          )}
        >
          {label}
        </FieldLabel>
      )}

      <FieldContent>
        <div className="space-y-1.5">
          <Textarea
            {...register(name)}
            id={name}
            placeholder={placeholder}
            aria-invalid={!!error}
            disabled={disabled}
            className={cn("h-11 border-border", inputClassName)}
          />

          <FieldError errors={[error]} />
        </div>
      </FieldContent>
    </Field>
  );
}
