import { projects } from '@/data/projects';
import { ProjectList } from '@/features/projects/project-list';

export default function Page() {
  return (
    <section className="flex flex-col gap-4">
      <ProjectList items={projects} />
    </section>
  );
}
