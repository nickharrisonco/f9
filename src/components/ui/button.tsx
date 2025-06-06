
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-all duration-200 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-yellow-500 text-black hover:bg-yellow-600",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background text-black hover:bg-yellow-100 hover:text-black",
        secondary:
          "bg-secondary text-black hover:bg-secondary/80",
        ghost: "hover:bg-accent text-black hover:text-accent-foreground",
        link: "text-yellow-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  external?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, external = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // For external links with href attribute
    if (external && 'href' in props) {
      // Extract only the props that are valid for anchor elements
      const { 
        onClick, 
        href, 
        target, 
        rel, 
        className: anchorClassName,
        ...restProps 
      } = props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
      
      return (
        <a 
          className={cn(buttonVariants({ variant, size, className: anchorClassName }))}
          href={href}
          target="_blank" 
          rel="noopener noreferrer"
          onClick={onClick}
        />
      )
    }
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
