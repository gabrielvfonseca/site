import { HoverList } from '@/components/hover-list';

const projectFeatures = [
  {
    title: 'AI-Powered Insights',
    description: 'Get intelligent recommendations based on your data',
    href: '/projects/ai-powered-insights',
  },
  {
    title: 'Real-time Analytics',
    description: 'Monitor performance metrics as they happen',
    href: '/projects/real-time-analytics',
  },
  {
    title: 'Secure Data Storage',
    description: 'End-to-end encryption for all your information',
    href: '/projects/secure-data-storage',
  },
  {
    title: 'Customizable Dashboard',
    description: 'Tailor the interface to your specific needs',
    href: '/projects/customizable-dashboard',
  },
];

export function ProjectList() {
  return (
    <div className="grid grid-cols-1 items-start md:grid-cols-12">
      <HoverList items={projectFeatures} className="-mx-3 col-span-12" />
    </div>
  );
}
