import { type ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

const labelStyles = tv({
  base: 'text-sm font-bold text-center',
  variants: {
    state: {
      // ATUALIZADO: de text-gray-800 para text-gray-600
      default: 'text-gray-600', 
      error: 'text-danger',
    },
  },
  defaultVariants: {
    state: 'default',
  },
})

const inputStyles = tv({
  // ATUALIZADO: de text-gray-800 para text-gray-600
  base: 'border rounded-md p-3 outline-none text-gray-600 transition-colors text-center',
  variants: {
    state: {
      default: 'border-gray-300 focus:border-brand-base', // Ajustado para 'brand-base'
      error: 'border-danger focus:border-danger placeholder:text-danger/50',
    },
  },
  defaultVariants: {
    state: 'default',
  },
})

type InputProps = ComponentProps<'input'> & {
  label: string
  isError?: boolean
}

export function Input({ label, isError, ...props }: InputProps) {
  const state = isError ? 'error' : 'default'

  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={props.id || props.name}
        className={labelStyles({ state })}
      >
        {label}
      </label>
      <input
        {...props}
        id={props.id || props.name}
        className={inputStyles({ state })}
      />
    </div>
  )
}