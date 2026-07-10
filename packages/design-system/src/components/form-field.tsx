'use client';

import type { JSX, ReactNode } from 'react';
import * as React from 'react';
import { cn } from '../lib/utils';
import { Label } from './label';

export interface FormFieldProps {
  /** The label text for the field. */
  label: string;
  /** The input/textarea/select element to render. */
  children: ReactNode;
  /** Error message to display below the field. */
  error?: string;
  /** Additional hint/description text. */
  hint?: string;
  /** Unique id for the field (used for label htmlFor and aria-describedby). */
  id: string;
  /** Whether the field is required. */
  required?: boolean;
  /** Additional className for the wrapper. */
  className?: string;
}

/**
 * A consistent form field wrapper that provides standardized spacing
 * between label, input, error, and hint text.
 * @param props - The FormFieldProps.
 * @returns The FormField component.
 */
export function FormField({
  label,
  children,
  error,
  hint,
  id,
  required,
  className,
}: FormFieldProps): JSX.Element {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={id}>
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-destructive">
            *
          </span>
        )}
      </Label>
      {React.isValidElement(children)
        ? React.cloneElement(
            children as React.ReactElement<{
              id?: string;
              'aria-describedby'?: string;
              'aria-invalid'?: boolean;
            }>,
            {
              id,
              'aria-describedby': describedBy,
              'aria-invalid': Boolean(error),
            }
          )
        : children}
      {error && (
        <p className="text-caption text-destructive" id={errorId} role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-caption text-muted-foreground" id={hintId}>
          {hint}
        </p>
      )}
    </div>
  );
}
