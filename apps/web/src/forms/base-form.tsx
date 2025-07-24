"use client";

import { ReactNode } from "react";
import {
  useForm,
  FormProvider,
  type UseFormReturn,
  type FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ZodSchema } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BaseFormProps<T extends FieldValues> {
  children: ReactNode;
  onSubmit: (data: T) => void | Promise<void>;
  schema: ZodSchema<T>;
  defaultValues?: Partial<T>;
  title?: string;
  description?: string;
  submitText?: string;
  isLoading?: boolean;
  className?: string;
}

export function BaseForm<T extends FieldValues>({
  children,
  onSubmit,
  schema,
  defaultValues,
  title,
  description,
  submitText = "Submit",
  isLoading = false,
  className,
}: BaseFormProps<T>) {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = async (data: T) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </CardHeader>
      )}
      <CardContent>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {children}
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Loading..." : submitText}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
