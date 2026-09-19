import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, label, error, hint, id, ...props }, ref) {
    const inputId = id ?? props.name;
    return (
      <label className="flex w-full flex-col gap-1.5 text-sm">
        {label ? (
          <span className="font-medium text-cocoa-800">{label}</span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-12 w-full rounded-[var(--radius-md)] border bg-cream-50 px-3 text-base text-cocoa-800 placeholder:text-cocoa-800/40',
            error
              ? 'border-berry-600 focus-visible:outline-berry-600'
              : 'border-icing-300/90 focus-visible:outline-teal-700',
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />
        {error ? (
          <span id={`${inputId}-error`} className="text-sm text-berry-600">
            {error}
          </span>
        ) : hint ? (
          <span id={`${inputId}-hint`} className="text-sm text-cocoa-800/65">
            {hint}
          </span>
        ) : null}
      </label>
    );
  },
);
