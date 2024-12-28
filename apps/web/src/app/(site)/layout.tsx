import { Nav } from '@/components/layout/nav';

const SiteLayout = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <div className='mx-auto container max-w-lg sm:max-w-xl py-10 sm:py-28'>
    <Nav />
    {children}
  </div>
);

export default SiteLayout;