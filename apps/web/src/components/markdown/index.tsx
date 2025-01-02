import React from 'react';

import { useMDXComponent } from 'next-contentlayer/hooks';

import { components } from '@/components/markdown/components';

type MdxProps = {
    code: string;
};

export const MDX = ({ code }: MdxProps) => {
    const Component = useMDXComponent(code);
    return <Component components={components} />
};