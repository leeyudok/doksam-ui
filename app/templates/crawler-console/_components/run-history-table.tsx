import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { CrawlRun, CrawlStatus } from "../_data/runs";

const STATUS_LABEL: Record<CrawlStatus, string> = {
  success: "성공",
  failed: "실패",
  stopped: "중단됨",
};

const STATUS_BADGE_CLASS: Record<CrawlStatus, string> = {
  success: "bg-success/10 text-success border-success/30",
  failed: "bg-destructive/10 text-destructive border-destructive/30",
  stopped: "bg-warning/10 text-warning border-warning/30",
};

/** 실패 행만 옅게 강조 — 이상 실행을 스캔으로 즉시 찾게 한다. */
const ROW_HIGHLIGHT_CLASS: Partial<Record<CrawlStatus, string>> = {
  failed: "bg-destructive/5",
};

function StatusBadge({ status }: Readonly<{ status: CrawlStatus }>) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded border px-2 py-0.5 font-mono text-xs font-semibold tracking-wide",
        STATUS_BADGE_CLASS[status],
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

/**
 * 크롤 실행 이력 — 데스크톱은 정렬 테이블, 모바일은 카드 스택으로 리플로우한다.
 * 표는 자체 overflow-x 컨테이너 안에서만 가로 스크롤되어 페이지 가로 오버플로우를
 * 만들지 않는다.
 */
export function RunHistoryTable({ runs }: Readonly<{ runs: CrawlRun[] }>) {
  return (
    <div>
      {/* 모바일: 카드 스택 */}
      <div className="flex flex-col gap-3 sm:hidden">
        {runs.map((run) => (
          <Card key={run.id} className={cn(ROW_HIGHLIGHT_CLASS[run.status])}>
            <CardContent className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-xs text-muted-foreground">{run.time}</span>
                <StatusBadge status={run.status} />
              </div>
              <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                <dt className="text-muted-foreground">대상</dt>
                <dd>
                  {run.target}
                  <span className="ml-1 text-xs text-muted-foreground">({run.trigger})</span>
                </dd>
                <dt className="text-muted-foreground">갱신 / 실패</dt>
                <dd className="tabular-nums">
                  {run.updated.toLocaleString()} /{" "}
                  <span className={run.failed > 0 ? "font-semibold text-destructive" : undefined}>
                    {run.failed.toLocaleString()}
                  </span>
                </dd>
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 데스크톱: 테이블 */}
      <div className="hidden overflow-x-auto sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>시각</TableHead>
              <TableHead>대상</TableHead>
              <TableHead>방식</TableHead>
              <TableHead className="text-right">갱신</TableHead>
              <TableHead className="text-right">실패</TableHead>
              <TableHead>상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {runs.map((run) => (
              <TableRow key={run.id} className={cn(ROW_HIGHLIGHT_CLASS[run.status])}>
                <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {run.time}
                </TableCell>
                <TableCell className="text-sm">{run.target}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{run.trigger}</TableCell>
                <TableCell className="text-right text-sm tabular-nums">
                  {run.updated.toLocaleString()}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right text-sm tabular-nums",
                    run.failed > 0 && "font-semibold text-destructive",
                  )}
                >
                  {run.failed.toLocaleString()}
                </TableCell>
                <TableCell>
                  <StatusBadge status={run.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
