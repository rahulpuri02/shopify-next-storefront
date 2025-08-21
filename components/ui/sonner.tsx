"use client";

import { Toaster as Sonner } from "sonner";

const Toaster = () => {
  return (
    <Sonner
      theme={"light"}
      className="toaster group"
      position="top-right"
      expand={true}
      richColors={true}
      closeButton={true}
      duration={4000}
      gap={12}
      offset={16}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: `
            group toast group-[.toaster]:bg-card group-[.toaster]:text-card-foreground 
            group-[.toaster]:border-border group-[.toaster]:shadow-lg
            group-[.toaster]:rounded-xl group-[.toaster]:border
            group-[.toaster]:backdrop-blur-sm group-[.toaster]:backdrop-saturate-150
            group-[.toaster]:p-4 group-[.toaster]:gap-3
            group-[.toaster]:flex group-[.toaster]:items-start
            group-[.toaster]:min-h-[60px] group-[.toaster]:max-w-[420px]
            group-[.toaster]:transition-all group-[.toaster]:duration-200
            group-[.toaster]:ease-out
            data-[swipe=cancel]:translate-x-0
            data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]
            data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
            data-[swipe=move]:transition-none
            data-[state=open]:animate-in
            data-[state=open]:slide-in-from-top-2
            data-[state=open]:fade-in-0
            data-[state=closed]:animate-out
            data-[state=closed]:slide-out-to-right-full
            data-[state=closed]:fade-out-0
            @media (prefers-reduced-motion: reduce) {
              data-[state=open]:animate-none
              data-[state=closed]:animate-none
            }
          `,
          title: `
            group-[.toast]:text-sm group-[.toast]:font-semibold 
            group-[.toast]:text-foreground group-[.toast]:leading-tight
          `,
          description: `
            group-[.toast]:text-sm group-[.toast]:text-muted-foreground 
            group-[.toast]:leading-relaxed group-[.toast]:mt-1
          `,
          actionButton: `
            group-[.toast]:bg-primary group-[.toast]:text-primary-foreground
            group-[.toast]:hover:bg-primary/90 group-[.toast]:text-xs
            group-[.toast]:font-medium group-[.toast]:px-3 group-[.toast]:py-1.5
            group-[.toast]:rounded-md group-[.toast]:transition-colors
            group-[.toast]:focus:outline-none group-[.toast]:focus:ring-2
            group-[.toast]:focus:ring-ring group-[.toast]:focus:ring-offset-2
          `,
          cancelButton: `
            group-[.toast]:bg-muted group-[.toast]:text-muted-foreground
            group-[.toast]:hover:bg-muted/80 group-[.toast]:text-xs
            group-[.toast]:font-medium group-[.toast]:px-3 group-[.toast]:py-1.5
            group-[.toast]:rounded-md group-[.toast]:transition-colors
            group-[.toast]:focus:outline-none group-[.toast]:focus:ring-2
            group-[.toast]:focus:ring-ring group-[.toast]:focus:ring-offset-2
          `,
          closeButton: `
            group-[.toast]:absolute group-[.toast]:right-2 group-[.toast]:top-2
            group-[.toast]:rounded-md group-[.toast]:p-1 group-[.toast]:text-foreground/50
            group-[.toast]:opacity-0 group-[.toast]:transition-opacity
            group-[.toast]:hover:text-foreground group-[.toast]:focus:opacity-100
            group-[.toast]:focus:outline-none group-[.toast]:focus:ring-2
            group-[.toast]:group-hover:opacity-100
            group-[.toaster]:group-[.toast]:bg-background
            group-[.toaster]:group-[.toast]:text-muted-foreground
            group-[.toaster]:group-[.toast]:hover:text-foreground
          `,
          icon: `
            group-[.toast]:flex-shrink-0 group-[.toast]:mt-0.5
          `,
          content: `
            group-[.toast]:flex-1 group-[.toast]:min-w-0
          `,
          success: `
            group-[.toast]:border-green-200 group-[.toast]:bg-green-50
            dark:group-[.toast]:border-green-800 dark:group-[.toast]:bg-green-950/50
          `,
          error: `
            group-[.toast]:border-red-200 group-[.toast]:bg-red-50
            dark:group-[.toast]:border-red-800 dark:group-[.toast]:bg-red-950/50
          `,
          warning: `
            group-[.toast]:border-yellow-200 group-[.toast]:bg-yellow-50
            dark:group-[.toast]:border-yellow-800 dark:group-[.toast]:bg-yellow-950/50
          `,
          info: `
            group-[.toast]:border-blue-200 group-[.toast]:bg-blue-50
            dark:group-[.toast]:border-blue-800 dark:group-[.toast]:bg-blue-950/50
          `,
        },
      }}
    />
  );
};

export { Toaster };
