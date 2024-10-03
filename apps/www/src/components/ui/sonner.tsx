'use client'

// Packages
import { useTheme } from 'next-themes';

// Sonner
import { Toaster as Sonner } from 'sonner';

// Types
type ToasterProps = React.ComponentProps<typeof Sonner>

// Toaster Component
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      toastOptions={{
        classNames: {
          toast: 'group group-[.toaster]:text-sm toast group-[.toaster]:bg-gray-200 dark:group-[.toaster]:bg-gray-1200 group-[.toaster]:text-black dark:group-[.toaster]:text-white group-[.toaster]:border-gray-400 dark:group-[.toaster]:border-gray-1000 group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-sm group-[.toast]:text-black dark:group-[.toast]:text-white',
          actionButton: 'group-[.toast]:bg-white group-[.toast]:text-black dark:group-[.toast]:bg-black dark:group-[.toast]:text-white',
          cancelButton: 'group-[.toast]:bg-white group-[.toast]:text-black dark:group-[.toast]:bg-black dark:group-[.toast]:text-white',
        },
      }}
      {...props}
    />
  );
};

// Export Toaster Component
export { Toaster }