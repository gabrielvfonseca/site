# @gabfon/design-system API Reference

## Installation

```bash
npm install @gabfon/design-system
```

## Setup

### Global Styles

Import the global CSS file in your application:

```typescript
// app/layout.tsx
import '@gabfon/design-system/styles/globals.css';
```

### Provider Setup

Wrap your application with the DesignSystemProvider:

```typescript
import { DesignSystemProvider } from '@gabfon/design-system';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DesignSystemProvider>
      {children}
    </DesignSystemProvider>
  );
}
```

## Provider

### DesignSystemProvider

Main provider that combines theme, analytics, and UI providers.

#### Props

```typescript
interface DesignSystemProviderProperties extends ThemeProviderProps {
  privacyUrl?: string;
  termsUrl?: string;
  helpUrl?: string;
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}
```

#### Usage

```typescript
<DesignSystemProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
  privacyUrl="/privacy"
  termsUrl="/terms"
  helpUrl="/help"
>
  <App />
</DesignSystemProvider>
```

## Components

### Form Components

#### Button

Primary button component with multiple variants.

#### Props

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
```

#### Usage

```typescript
import { Button } from '@gabfon/design-system';

function Example() {
  return (
    <>
      <Button>Default Button</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button variant="ghost">Ghost</Button>
    </>
  );
}
```

#### Input

Text input component with variants.

#### Props

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
}
```

#### Usage

```typescript
import { Input } from '@gabfon/design-system';

function Example() {
  return <Input placeholder="Enter text..." />;
}
```

#### Label

Label component for form inputs.

#### Props

```typescript
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}
```

#### Usage

```typescript
import { Label } from '@gabfon/design-system';

function Example() {
  return (
    <div>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" />
    </div>
  );
}
```

#### Textarea

Multi-line text input component.

#### Props

```typescript
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
```

#### Usage

```typescript
import { Textarea } from '@gabfon/design-system';

function Example() {
  return <Textarea placeholder="Enter message..." />;
}
```

#### Checkbox

Checkbox component with label support.

#### Props

```typescript
interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  id?: string;
}
```

#### Usage

```typescript
import { Checkbox } from '@gabfon/design-system';

function Example() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
}
```

#### Radio Group

Radio button group component.

#### Props

```typescript
interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {}

interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  value: string;
}
```

#### Usage

```typescript
import { RadioGroup, RadioGroupItem } from '@gabfon/design-system';

function Example() {
  return (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <Label htmlFor="option1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <Label htmlFor="option2">Option 2</Label>
      </div>
    </RadioGroup>
  );
}
```

#### Switch

Toggle switch component.

#### Props

```typescript
interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  id?: string;
}
```

#### Usage

```typescript
import { Switch } from '@gabfon/design-system';

function Example() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  );
}
```

#### Select

Dropdown select component.

#### Props

```typescript
interface SelectProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {}

interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {}

interface SelectContentProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {}

interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  value: string;
}
```

#### Usage

```typescript
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@gabfon/design-system';

function Example() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

### Navigation Components

#### Tabs

Tab navigation component.

#### Props

```typescript
interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {}

interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {}

interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  value: string;
}

interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  value: string;
}
```

#### Usage

```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@gabfon/design-system';

function Example() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account content</TabsContent>
      <TabsContent value="profile">Profile content</TabsContent>
    </Tabs>
  );
}
```

#### Navigation Menu

Dropdown navigation menu component.

#### Props

```typescript
interface NavigationMenuProps extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {}

interface NavigationMenuListProps extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List> {}

interface NavigationMenuItemProps extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item> {}

interface NavigationMenuTriggerProps extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> {}

interface NavigationMenuContentProps extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> {}
```

#### Usage

```typescript
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@gabfon/design-system';

function Example() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/product1">Product 1</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

### Feedback Components

#### Toast

Notification component for user feedback.

#### Usage

```typescript
import { toast } from '@gabfon/design-system';

function Example() {
  const showToast = () => {
    toast({
      title: "Success",
      description: "Your changes have been saved.",
    });
  };

  return <Button onClick={showToast}>Show Toast</Button>;
}
```

#### Alert

Alert component for important messages.

#### Props

```typescript
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive';
}
```

#### Usage

```typescript
import { Alert, AlertDescription, AlertTitle } from '@gabfon/design-system';

function Example() {
  return (
    <Alert>
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>This is an important message.</AlertDescription>
    </Alert>
  );
}
```

#### Badge

Small indicator component.

#### Props

```typescript
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}
```

#### Usage

```typescript
import { Badge } from '@gabfon/design-system';

function Example() {
  return <Badge variant="secondary">New</Badge>;
}
```

### Layout Components

#### Dialog

Modal dialog component.

#### Props

```typescript
interface DialogProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {}

interface DialogTriggerProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger> {}

interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {}

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

interface DialogTitleProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}

interface DialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}
```

#### Usage

```typescript
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@gabfon/design-system';

function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog description</DialogDescription>
        </DialogHeader>
        <div>Dialog content</div>
      </DialogContent>
    </Dialog>
  );
}
```

#### Sheet

Side sheet/drawer component.

#### Props

```typescript
interface SheetProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Root> {}

interface SheetTriggerProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Trigger> {}

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {}

interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

interface SheetTitleProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title> {}

interface SheetDescriptionProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description> {}
```

#### Usage

```typescript
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@gabfon/design-system';

function Example() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>Sheet description</SheetDescription>
        </SheetHeader>
        <div>Sheet content</div>
      </SheetContent>
    </Sheet>
  );
}
```

## Hooks

### useDebounce

Debounce hook for delaying function execution.

#### Props

```typescript
function useDebounce<T>(value: T, delay?: number): T
```

#### Usage

```typescript
import { useDebounce } from '@gabfon/design-system/hooks';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    // Perform search with debounced term
    performSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />;
}
```

### useMobile

Hook for detecting mobile screen size.

#### Returns

```typescript
interface UseMobileReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}
```

#### Usage

```typescript
import { useMobile } from '@gabfon/design-system/hooks';

function ResponsiveComponent() {
  const { isMobile, isTablet, isDesktop } = useMobile();

  if (isMobile) return <div>Mobile view</div>;
  if (isTablet) return <div>Tablet view</div>;
  return <div>Desktop view</div>;
}
```

## Form Integration

### react-hook-form Integration

All form components work seamlessly with react-hook-form.

#### Usage

```typescript
import { useForm } from 'react-hook-form';
import { Button, Input, Label } from '@gabfon/design-system';

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Form Validation with Zod

Integration with Zod for schema validation.

#### Usage

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Label } from '@gabfon/design-system';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## Theming

### Theme Customization

The design system uses CSS custom properties for theming.

#### CSS Variables

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  /* ... other dark theme variables */
}
```

### Theme Switching

#### Usage

```typescript
import { useTheme } from 'next-themes';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Switch to {theme === 'dark' ? 'light' : 'dark'} theme
    </Button>
  );
}
```

## Utility Functions

### cn

Utility function for merging Tailwind CSS classes.

#### Usage

```typescript
import { cn } from '@gabfon/design-system/lib/utils';

function Component({ className, ...props }) {
  return (
    <div className={cn('base-class', className)} {...props}>
      Content
    </div>
  );
}
```

## Best Practices

### 1. Component Usage
- Always wrap forms with proper providers
- Use semantic HTML elements
- Provide proper accessibility attributes
- Handle loading and error states

### 2. Styling
- Use Tailwind utility classes for custom styles
- Leverage component variants for consistency
- Avoid inline styles
- Use responsive design patterns

### 3. Form Handling
- Use react-hook-form for complex forms
- Implement proper validation
- Handle form submission states
- Provide clear error messages

### 4. Accessibility
- Test with screen readers
- Ensure keyboard navigation
- Use proper ARIA labels
- Maintain focus management

## Integration Examples

### With Analytics

```typescript
import { Button } from '@gabfon/design-system';
import { useAnalytics } from '@gabfon/analytics';

function TrackedButton() {
  const analytics = useAnalytics();

  return (
    <Button onClick={() => analytics.track('button_click', { button: 'submit' })}>
      Submit
    </Button>
  );
}
```

### With AI Components

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@gabfon/design-system';
import { Message } from '@gabfon/ai/components';

function ChatInterface() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <Message data={message} />
      </CardContent>
    </Card>
  );
}
```

## Testing

### Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@gabfon/design-system';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
});
```

### Accessibility Testing

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '@gabfon/design-system';

test('button is accessible', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```
