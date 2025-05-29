import { HoverList } from '@/components/hover-list';
import { projects } from '@/constants/projects';

export function ProjectList() {
  return (
    <div className="grid grid-cols-1 items-start md:grid-cols-12">
      <HoverList items={projects} className="-mx-3 col-span-12" />
    </div>
  );
}
