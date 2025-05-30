import { projects } from '@/constants/projects';
import { ProjectsHoverList } from './projects-hover-list';

export function ProjectList() {
  return (
    <div className="grid grid-cols-1 items-start md:grid-cols-12">
      <ProjectsHoverList items={projects} className="-mx-3 col-span-12" />
    </div>
  );
}
