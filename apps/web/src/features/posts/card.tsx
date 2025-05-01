import React from 'react';
import {
  Card, 
  CardContent, 
  CardDescription, 
  CardTitle 
} from '@repo/design-system/components/ui/card';
import { Badge } from '@repo/design-system/components/ui/badge';
import { formatDate } from '@repo/design-system/lib/utils';
import Link from 'next/link';

type PostCardProps = {
  title: string;
  description: string;
  slug: string;
  date: string;
};

export function PostCard({ title, description, date, slug }: PostCardProps) {
  return (
    <Link href={`/posts/${slug}`}>
      <Card className='relative'>
        <CardContent>
          <CardTitle>
            {title}
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardContent>
        <Badge
          variant='outline'
          className='absolute top-2 right-2'
        >
          {formatDate(date)}
        </Badge>
      </Card>
    </Link>
  );
};