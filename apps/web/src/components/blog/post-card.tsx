import React from 'react';

import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardTitle 
} from '@repo/design-system/components/ui/card';

import { Badge } from '@repo/design-system/components/ui/badge';

import { formatDate } from '@repo/design-system/lib/utils';

import type { Post } from '@contentlayer';

const PostCard = (post: Post) => (
    <Card className='relative'>
        <CardContent className='w-2/3'>
            <CardTitle>
                {post.title}
            </CardTitle>
            <CardDescription>
                {post.description}
            </CardDescription>
        </CardContent>
        <Badge
            variant='outline'
            className='absolute top-2 right-2'
        >
            {formatDate(post.date)}
        </Badge>
    </Card>
);

export default PostCard;