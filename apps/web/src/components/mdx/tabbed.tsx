'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@gabfon/design-system/components/tabs';
import { type JSX, type ReactNode, useId } from 'react';
import { cn } from '@/lib/utils';

/**
 * A single tab definition for {@link Tabbed}.
 */
interface TabDef {
  /** Tab label shown in the trigger. */
  readonly label: string;
  /** Tab panel content. */
  readonly content: ReactNode;
}

/**
 * Props for {@link Tabbed}.
 */
interface TabbedProps {
  /** The ordered set of tabs to render. */
  readonly items: readonly TabDef[];
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * A tabbed content panel for MDX built on the shared design-system tabs.
 * Accepts a plain `items` array so it can be authored inline in MDX without
 * importing multiple sub-components.
 * @param props - The tabbed props.
 * @returns The Tabbed element.
 */
export function Tabbed({ items, className }: TabbedProps): JSX.Element {
  const base = useId();

  return (
    <Tabs
      className={cn('not-prose w-full gap-3', className)}
      defaultValue={`${base}-0`}
    >
      <TabsList className="w-full justify-start">
        {items.map((item, index) => (
          <TabsTrigger key={item.label} value={`${base}-${index}`}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item, index) => (
        <TabsContent
          className="text-muted-foreground text-sm leading-relaxed [&>*+*]:mt-3 [&>p]:m-0"
          key={item.label}
          value={`${base}-${index}`}
        >
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
