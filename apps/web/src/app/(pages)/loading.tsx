import { Skeleton } from '@repo/design-system/components/ui/skeleton';

export default function Loading() {
  // Get a random number between 1 and 10
  const randomNumber = Math.floor(Math.random() * 10) + 1;

  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: randomNumber }, (_, index: number) => (
        <Skeleton
          key={index}
          className="h-10"
          style={{ width: `${Math.random() * 100}%` }}
        />
      ))}
    </div>
  );
}
