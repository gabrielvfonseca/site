import React from 'react';

import Nav from '@/components/layout/nav';
import Footer from '@/components/layout/footer';

// Application Layout
const AppLayout = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <div className='mx-auto container max-w-lg sm:max-w-xl py-14 sm:py-28'>
    <Nav />
      {children}
    <Footer />
  </div>
);

export default AppLayout;