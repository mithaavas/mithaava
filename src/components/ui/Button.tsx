import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant =
  | 'primary'
  | 'whatsapp'
  | 'accent'
  | 'quiet'
  | 'secondary'
  | 'ghost'
  | 'outline';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn-primary border-transparent text-white',
  whatsapp:
    'btn-tactile bg-whatsapp text-white hover:brightness-105 border-transparent shadow-[0_8px_24px_-8px_rgba(37,211,102,0.55)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.2),0_2px_0_#128c7e,0_8px_24px_-8px_rgba(37,211,102,0.55)]',
  accent:
    'btn-tactile bg-berry-600 text-white hover:brightness-105 border-transparent [box-shadow:inset_0_1px_0_rgba(255,255,255,0.22),0_2px_0_#8e1a44]',
  quiet:
    'bg-transparent text-teal-900/75 hover:text-teal-900 hover:bg-cream-100 border-transparent',
  secondary:
    'btn-tactile bg-icing-200 text-teal-900 hover:bg-icing-300 border-transparent [box-shadow:inset_0_1px_0_rgba(255,255,255,0.35),0_2px_0_#e8a9a3]',
  ghost: 'bg-transparent text-teal-900 hover:bg-cream-100 border-transparent',
  outline:
    'bg-transparent border-teal-700/30 text-teal-900 hover:border-teal-700 hover:bg-cream-100',
};

const sizeClass = {
  sm: 'h-10 px-3 text-sm rounded-full',
  md: 'h-11 px-5 text-base rounded-full',
  lg: 'h-12 px-6 text-base rounded-full min-h-11',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = 'primary',
      size = 'md',
      type = 'button',
      disabled,
      loading = false,
      children,
      ...props
    },
    ref,
  ) {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-[transform,box-shadow,filter,background-color,border-color] duration-150 disabled:cursor-not-allowed disabled:opacity-50',
          'active:enabled:translate-y-[2px] active:enabled:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.18),0_0_0_transparent]',
          variantClass[variant],
          sizeClass[size],
          className,
        )}
        {...props}
      >
        {loading ? (
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
            aria-hidden
          />
        ) : null}
        {children}
      </button>
    );
  },
);
