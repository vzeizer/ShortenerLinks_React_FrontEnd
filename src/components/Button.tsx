import { type ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { Loader2 } from 'lucide-react'

const buttonVariants = tv({
  base: 'py-2 px-4 rounded-md font-bold transition-all flex items-center justify-center gap-2',
  variants: {
    variant: {
      primary: 'bg-brand text-white hover:bg-brand/90',
      secondary: 'bg-brand/10 text-brand hover:bg-brand/20',
      tertiary: 'bg-transparent text-brand hover:bg-brand/10',
    },
    disabled: {
      true: '',
    },
  },
  compoundVariants: [
    // Regras para botões desabilitados
    {
      variant: 'primary',
      disabled: true,
      className: 'bg-gray-200 text-gray-400 cursor-not-allowed',
    },
    {
      variant: ['secondary', 'tertiary'],
      disabled: true,
      className: 'bg-transparent text-gray-400 cursor-not-allowed',
    },
  ],
  defaultVariants: {
    variant: 'primary',
  },
})

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean
  }

export function Button({
  variant,
  disabled,
  className,
  isLoading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={buttonVariants({ variant, disabled, className })}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : children}
    </button>
  )
}