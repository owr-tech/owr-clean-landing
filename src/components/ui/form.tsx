'use client'

import * as React from 'react'
import { FormProvider, useFormContext } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const Form = FormProvider

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('grid gap-2', className)} {...props} />
}

function FormLabel({
  className,
  error,
  ...props
}: React.ComponentProps<typeof Label> & { error?: boolean }) {
  return <Label className={cn(error && 'text-destructive', className)} {...props} />
}

function FormControl({ ...props }: React.ComponentProps<'div'>) {
  return <div {...props} />
}

function FormMessage({ name, className }: { name: string; className?: string }) {
  const {
    formState: { errors },
  } = useFormContext()
  const error = errors[name]
  const message = typeof error?.message === 'string' ? error.message : null
  if (!message) return null
  return <p className={cn('text-sm font-medium text-destructive', className)}>{message}</p>
}

export { Form, FormControl, FormItem, FormLabel, FormMessage }
