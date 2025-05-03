import { Skeleton } from '@repo/design-system/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from(
        { length: Math.floor(Math.random() * 10) },
        (_, index: number) => (
          <Skeleton
            key={index}
            className="h-10"
            style={{ width: `${Math.random() * 100}%` }}
          />
        )
      )}
    </div>
  );
}
