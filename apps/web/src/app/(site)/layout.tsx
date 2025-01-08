import { Footer } from '@/components/layout/footer';
import { Nav } from '@/components/layout/nav';

const SiteLayout = ({
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

export default SiteLayout;