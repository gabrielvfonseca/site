import { projects } from '@/constants/projects';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProjectList } from '../project-list';

describe('ProjectList', () => {
  it('renders all projects', () => {
    render(<ProjectList items={projects} />);

    for (const project of projects) {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      expect(screen.getByText(project.description)).toBeInTheDocument();
    }
  });

  it('renders project links with correct attributes', () => {
    render(<ProjectList items={projects} />);

    for (const project of projects) {
      const link = screen.getByRole('link', {
        name: new RegExp(project.title),
      });
      expect(link).toHaveAttribute('href', project.href);
      expect(link).toHaveAttribute('target', '_blank');
    }
  });
});
