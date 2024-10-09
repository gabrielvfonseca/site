'use client'

// Packages
import { useTheme } from 'next-themes';

// Sonner
import { Toaster as Sonner } from 'sonner';

// Styles
import '../styles/styles.css';

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
          toast: 'group group-[.toaster]:text-sm toast group-[.toaster]:bg-accents-1 group-[.toaster]:text-gray-1000 group-[.toaster]:border-gray-400 group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-sm group-[.toast]:text-gray-1000',
          actionButton: 'group-[.toast]:bg-gray-1000 group-[.toast]:text-gray-1000',
          cancelButton: 'group-[.toast]:bg-gray-100 group-[.toast]:text-gray-100',
        },
      }}
      {...props}
    />
  );
};

// Export Toaster Component
export { Toaster }