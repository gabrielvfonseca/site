import { posts } from '@/constants/posts';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PostList } from '../post-list';

const DATE_PATTERN = /\d{4}-\d{2}-\d{2}/;
const ANY_TEXT_PATTERN = /./;

describe('PostList', () => {
  it('renders posts in descending date order', async () => {
    render(await PostList({ items: posts }));

    const postElements = screen.getAllByRole('link');
    const postDates = postElements.map((element) => {
      const dateText = element.textContent?.match(DATE_PATTERN)?.[0];
      return dateText ? new Date(dateText) : new Date(0);
    });

    // Check if dates are in descending order
    for (let i = 0; i < postDates.length - 1; i++) {
      expect(postDates[i] >= postDates[i + 1]).toBe(true);
    }
  });

  it('renders post titles and descriptions', async () => {
    render(await PostList({ items: posts }));

    for (const post of posts) {
      const titleElements = screen.getAllByText(post.title);
      expect(titleElements.length).toBeGreaterThan(0);
      const descriptionElements = screen.getAllByText(post.description);
      expect(descriptionElements.length).toBeGreaterThan(0);
    }
  });
});
