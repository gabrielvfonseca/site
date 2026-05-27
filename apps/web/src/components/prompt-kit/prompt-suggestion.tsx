'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type PromptSuggestionProps = {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  highlight?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function PromptSuggestion({
  children,
  variant,
  size,
  className,
  highlight,
  ...props
}: PromptSuggestionProps) {
  const isHighlightMode = highlight !== undefined && highlight.trim() !== '';
  const content = typeof children === 'string' ? children : '';

  if (!isHighlightMode) {
    return (
      <Button
        className={cn('rounded-full', className)}
        size={size || 'lg'}
        variant={variant || 'outline'}
        {...props}
      >
        {children}
      </Button>
    );
  }

  if (!content) {
    return (
      <Button
        className={cn(
          'w-full cursor-pointer justify-start rounded-xl py-2',
          'hover:bg-accent',
          className
        )}
        size={size || 'sm'}
        variant={variant || 'ghost'}
        {...props}
      >
        {children}
      </Button>
    );
  }

  const trimmedHighlight = highlight.trim();
  const contentLower = content.toLowerCase();
  const highlightLower = trimmedHighlight.toLowerCase();
  const shouldHighlight = contentLower.includes(highlightLower);

  return (
    <Button
      className={cn(
        'w-full cursor-pointer justify-start gap-0 rounded-xl py-2',
        'hover:bg-accent',
        className
      )}
      size={size || 'sm'}
      variant={variant || 'ghost'}
      {...props}
    >
      {shouldHighlight ? (
        (() => {
          const index = contentLower.indexOf(highlightLower);
          if (index === -1)
            return (
              <span className="whitespace-pre-wrap text-muted-foreground">
                {content}
              </span>
            );

          const actualHighlightedText = content.substring(
            index,
            index + highlightLower.length
          );

          const before = content.substring(0, index);
          const after = content.substring(index + actualHighlightedText.length);

          return (
            <>
              {before && (
                <span className="whitespace-pre-wrap text-muted-foreground">
                  {before}
                </span>
              )}
              <span className="whitespace-pre-wrap font-medium text-primary">
                {actualHighlightedText}
              </span>
              {after && (
                <span className="whitespace-pre-wrap text-muted-foreground">
                  {after}
                </span>
              )}
            </>
          );
        })()
      ) : (
        <span className="whitespace-pre-wrap text-muted-foreground">
          {content}
        </span>
      )}
    </Button>
  );
}

export { PromptSuggestion };
