import { Suspense } from 'react';

import Loading from './loading';

const PostLayout = ({
    children,
}: {
    children: React.ReactNode
}) => (
    <Suspense fallback={<Loading />}>
        {children}
    </Suspense>
);

export default PostLayout;