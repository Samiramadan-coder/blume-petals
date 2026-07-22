"use client";

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

import { cn } from "@/lib/utils";
import { Field, FieldContent, FieldError, FieldLabel } from "../../ui/field";

type SelectOption = {
  label: string;
  value: string | number;
};

type FormSelectProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  control: Control<T>;
  options: SelectOption[];
  groupLabel?: string;
  className?: string;
  triggerClassName?: string;
  onTrackValueChange?: () => void;
};

export default function FormSelect<T extends FieldValues>({
  name,
  label,
  placeholder = "Choose",
  required,
  control,
  options,
  groupLabel,
  className,
  triggerClassName,
  onTrackValueChange,
}: FormSelectProps<T>) {
  const getOptionValueFromSelect = (selectedValue: string) => {
    const matchedOption = options.find(
      (option) => String(option.value) === selectedValue,
    );

    return matchedOption?.value ?? selectedValue;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className={className} data-invalid={fieldState.invalid}>
          <FieldLabel
            htmlFor={name}
            className={cn(
              "text-sm font-semibold",
              required &&
                "after:ms-1 after:text-destructive after:content-['*']",
            )}
          >
            {label}
          </FieldLabel>

          <FieldContent>
            <div className="space-y-1.5">
              <Select
                value={
                  field.value == null || field.value === "" || field.value === 0
                    ? undefined
                    : String(field.value)
                }
                onValueChange={(value) => {
                  field.onChange(getOptionValueFromSelect(value));
                  onTrackValueChange?.();
                }}
              >
                <SelectTrigger
                  id={name}
                  aria-invalid={fieldState.invalid}
                  className={cn(
                    "h-12 min-h-12 w-full border-border",
                    triggerClassName,
                  )}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}

                    {options.map((option) => (
                      <SelectItem
                        key={`${typeof option.value}-${option.value}`}
                        value={String(option.value)}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <FieldError errors={[fieldState.error]} />
            </div>
          </FieldContent>
        </Field>
      )}
    />
  );
}
