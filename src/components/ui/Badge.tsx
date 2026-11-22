'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'verde' | 'musgo' | 'terra' | 'argila' | 'flor' | 'ceu' | 'default'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', dot, children, ...props }, ref) => {
    const variants = {
      default: 'bg-papel-200 text-tinta-700',
      verde: 'bg-verde-100 text-verde-800 border border-verde-200',
      musgo: 'bg-musgo-100 text-musgo-800 border border-musgo-200',
      terra: 'bg-terra-100 text-terra-800 border border-terra-200',
      argila: 'bg-argila-100 text-argila-800 border border-argila-200',
      flor: 'bg-flor-100 text-flor-800 border border-flor-200',
      ceu: 'bg-ceu-100 text-ceu-800 border border-ceu-200',
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 font-medium rounded-full border',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'