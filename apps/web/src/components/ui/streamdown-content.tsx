'use client';

import { cjk } from '@streamdown/cjk';
import { math } from '@streamdown/math';
import { mermaid } from '@streamdown/mermaid';
import { Streamdown } from 'streamdown';
import { cn } from '@/lib/utils';

const streamdownPlugins = {
  cjk,
  math,
  mermaid,
};

export interface StreamdownContentProps {
  children: string;
  className?: string;
}

export function StreamdownContent({
  children,
  className,
}: StreamdownContentProps) {
  return (
    <Streamdown
      className={cn(
        'prose prose-slate dark:prose-invert max-w-none',
        '[&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
        'prose-headings:scroll-m-20 prose-headings:font-semibold',
        'prose-h1:mt-8 prose-h1:mb-4 prose-h1:text-3xl',
        'prose-h2:mt-6 prose-h2:mb-3 prose-h2:text-2xl',
        'prose-h3:mt-4 prose-h3:mb-2 prose-h3:text-xl',
        'prose-p:my-4 prose-p:leading-7',
        'prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm',
        'prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:border prose-pre:bg-muted prose-pre:p-4',
        'prose-blockquote:border-muted-foreground prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic',
        'prose-ul:my-2 prose-ul:list-disc prose-ul:pl-6',
        'prose-ol:my-2 prose-ol:list-decimal prose-ol:pl-6',
        'prose-li:my-1',
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        'prose-img:mx-auto prose-img:rounded-lg prose-img:shadow-lg',
        'prose-table:w-full prose-table:border-collapse prose-table:border',
        'prose-th:border prose-th:bg-muted prose-th:px-4 prose-th:py-2 prose-th:text-left',
        'prose-td:border prose-td:px-4 prose-td:py-2',
        className
      )}
      plugins={streamdownPlugins}
    >
      {children}
    </Streamdown>
  );
}
