import type { Projects } from '@/constants/projects';
import { ProjectsHoverList } from './projects-hover-list';

type ProjectListProps = {
  readonly items: Projects;
};

export function ProjectList({ items }: ProjectListProps) {
  return (
    <div className="grid grid-cols-1 items-start md:grid-cols-12">
      <ProjectsHoverList items={items} className="-mx-3 col-span-12" />
    </div>
  );
}
