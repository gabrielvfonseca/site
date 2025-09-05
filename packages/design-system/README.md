# @gabfon/design-system

Comprehensive design system package with React components, utilities, and styling.

## Overview

This package provides a complete design system built on top of Radix UI primitives, Tailwind CSS, and custom components. It includes a full set of accessible, customizable React components with consistent styling and behavior.

## Features

- **30+ Components**: Complete set of UI components including buttons, forms, navigation, and more
- **Radix UI Integration**: Built on accessible Radix UI primitives
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **Dark Mode Support**: Built-in theme switching capabilities
- **Type Safety**: Full TypeScript support with proper component props
- **Custom Hooks**: Utility hooks for common patterns
- **Font Integration**: Geist font family integration

## Installation

```bash
pnpm add @gabfon/design-system
```

## Usage

### Basic Setup

```typescript
import { DesignSystemProvider } from '@gabfon/design-system';
import '@gabfon/design-system/styles/globals.css';

function App() {
  return (
    <DesignSystemProvider>
      {/* Your app */}
    </DesignSystemProvider>
  );
}
```

### Using Components

```typescript
import { Button } from '@gabfon/design-system/components/button';
import { Input } from '@gabfon/design-system/components/input';

function MyComponent() {
  return (
    <div>
      <Input placeholder="Enter text..." />
      <Button>Click me</Button>
    </div>
  );
}
```

### Using Utilities

```typescript
import { cn } from '@gabfon/design-system/lib/utils';

// Merge Tailwind classes
const className = cn('base-class', condition && 'conditional-class');
```

## Available Components

### Form Components
- `Button` - Various button styles and sizes
- `Input` - Text input with validation states
- `Textarea` - Multi-line text input
- `Select` - Dropdown selection
- `Checkbox` - Checkbox input
- `RadioGroup` - Radio button groups
- `Switch` - Toggle switch
- `Slider` - Range slider
- `InputOTP` - One-time password input

### Layout Components
- `Card` - Content containers
- `Separator` - Visual dividers
- `Sheet` - Side panels and drawers
- `Dialog` - Modal dialogs
- `Popover` - Floating content
- `Tooltip` - Contextual information
- `HoverCard` - Hover-triggered content

### Navigation Components
- `NavigationMenu` - Main navigation
- `Menubar` - Application menu bar
- `DropdownMenu` - Context menus
- `Tabs` - Tabbed interfaces
- `Breadcrumb` - Navigation breadcrumbs

### Data Display
- `Table` - Data tables
- `Badge` - Status indicators
- `Avatar` - User avatars
- `Skeleton` - Loading placeholders
- `Spinner` - Loading indicators
- `Progress` - Progress bars

### Feedback
- `Alert` - Alert messages
- `Toast` - Notification toasts
- `Carousel` - Image/content carousels

## Exports

### Main Exports
- `./src/index.tsx` - Main provider and exports
- `./src/styles/globals.css` - Global styles
- `./src/providers/theme.tsx` - Theme provider
- `./src/lib/fonts.ts` - Font configuration
- `./src/lib/utils.ts` - Utility functions

### Component Exports
All components are available as individual exports:
- `./src/components/button.tsx`
- `./src/components/input.tsx`
- And 30+ more components...

### Hook Exports
- `./src/hooks/use-debounce.tsx` - Debounce hook
- `./src/hooks/use-mobile.tsx` - Mobile detection hook

## Styling

The design system uses Tailwind CSS with custom configuration:

```typescript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Custom theme extensions
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
```

## Dependencies

### Core Dependencies
- `@radix-ui/*` - UI primitives (30+ packages)
- `react` - React framework
- `tailwindcss` - Utility-first CSS
- `class-variance-authority` - Component variants
- `clsx` - Conditional classes
- `tailwind-merge` - Tailwind class merging

### Additional Dependencies
- `lucide-react` - Icon library
- `next-themes` - Theme switching
- `date-fns` - Date utilities
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `sonner` - Toast notifications

## Development

```bash
# Type checking
pnpm typecheck

# Clean build artifacts
pnpm clean
```

## Customization

### Adding New Components

1. Create component in `./src/components/`
2. Export from main index
3. Add to package.json exports
4. Update documentation

### Theme Customization

Modify the theme configuration in the Tailwind config and CSS custom properties.