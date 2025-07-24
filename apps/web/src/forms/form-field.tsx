"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "textarea" | "select";
  options?: Array<{ value: string; label: string }>;
  required?: boolean;
  className?: string;
}

export function FormField({
  name,
  label,
  placeholder,
  type = "text",
  options = [],
  required = false,
  className,
}: FormFieldProps) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const error = errors[name];
  const value = watch(name);

  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <Textarea
            {...register(name)}
            placeholder={placeholder}
            className={className}
          />
        );
      case "select":
        return (
          <Select
            value={value || ""}
            onValueChange={(value) => setValue(name, value)}
          >
            <SelectTrigger className={className}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input
            {...register(name, { valueAsNumber: type === "number" })}
            type={type}
            placeholder={placeholder}
            className={className}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <span className="text-destructive"> *</span>}
        </Label>
      )}
      {renderInput()}
      {error && (
        <p className="text-sm text-destructive">{error.message as string}</p>
      )}
    </div>
  );
}
