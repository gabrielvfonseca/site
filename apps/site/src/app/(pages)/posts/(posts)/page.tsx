import { posts } from '@/data/posts';
import { PostList } from '@/features/posts/post-list';

export default function Page() {
  return (
    <section className="flex flex-col gap-4">
      <PostList items={posts} />
    </section>
  );
}
