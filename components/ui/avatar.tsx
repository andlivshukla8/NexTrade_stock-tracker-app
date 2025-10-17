"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

/**
 * Renders the avatar root element with default sizing, rounded shape, and overflow handling.
 *
 * @param className - Additional CSS class names to merge with the component's default avatar styles.
 * @returns The Avatar root React element with combined class names and all other props forwarded to the underlying element.
 */
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders an avatar image element with preset sizing and a data-slot for integration.
 *
 * @param className - Optional additional CSS classes to merge with the component's defaults
 * @returns The avatar image element with composed class names and any forwarded props
 */
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

/**
 * Renders the avatar fallback used when an avatar image is not available.
 *
 * Forwards remaining props to the underlying Radix `AvatarPrimitive.Fallback` and applies default
 * styles for a centered, rounded fallback container; additional `className` values are merged.
 *
 * @returns A Radix Avatar Fallback element styled as a centered, rounded fallback container.
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }