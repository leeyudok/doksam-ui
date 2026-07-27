import { Skeleton } from "@/components/ui/skeleton";

/** app/**\/loading.tsx 가 공유하는 스켈레톤. */
export function RouteLoading() {
  return (
    <output className="flex flex-col gap-3" aria-label="로딩 중">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-4 w-72" />
      <Skeleton className="h-4 w-56" />
    </output>
  );
}
