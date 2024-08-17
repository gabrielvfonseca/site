import React from 'react';

// Content Layer
import { useMDXComponent } from 'next-contentlayer/hooks';

// Components
import { components } from './components';

// Types
interface MdxProps {
  code: string;
};

// MDX Component
const MDX = ({ code }: MdxProps) => {
  // Get the component from the code.
  const Component = useMDXComponent(code)
  // Render the component
  return <Component components={components} />
};

// Export as default
export default MDX;