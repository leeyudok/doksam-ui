"use client";

import { useEffect } from "react";
import { ArrowClockwiseIcon, WarningCircleIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";

interface RouteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** app/**\/error.tsx 가 공유하는 에러 바운더리 UI. */
export function RouteError({ error, reset }: Readonly<RouteErrorProps>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-2 text-destructive">
        <WarningCircleIcon size={20} weight="regular" />
        <span className="text-sm font-medium">문제가 발생했습니다</span>
      </div>
      <p className="max-w-prose text-sm text-muted-foreground">{error.message}</p>
      <Button type="button" variant="outline" size="sm" onClick={reset}>
        <ArrowClockwiseIcon size={16} weight="regular" />
        다시 시도
      </Button>
    </div>
  );
}
