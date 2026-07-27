import { XCircleIcon, WarningCircleIcon, CheckCircleIcon } from "@phosphor-icons/react/dist/ssr"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface LogEntry {
  status: "completed" | "failed"
  date: string
  time: string
  step: string
  label: string
  by: string
  error?: string
}

const LOGS: LogEntry[] = [
  { status: "completed", date: "04-08", time: "09:41", step: "3/3", label: "조간 리포트", by: "scheduler" },
  { status: "failed", date: "04-08", time: "09:35", step: "2/3", label: "뉴스 수집", by: "admin", error: "timeout" },
  { status: "completed", date: "04-07", time: "15:42", step: "5/5", label: "석간 리포트", by: "scheduler" },
  { status: "completed", date: "04-07", time: "09:40", step: "3/3", label: "조간 리포트", by: "scheduler" },
  { status: "completed", date: "04-06", time: "15:41", step: "5/5", label: "석간 리포트", by: "scheduler" },
]

function ErrorCards() {
  return (
    <div className="space-y-2">
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="px-4 py-3">
          <div className="flex items-start gap-2">
            <XCircleIcon size={20} className="mt-0.5 shrink-0 text-destructive" />
            <div>
              <p className="text-sm font-medium text-destructive">실행 실패</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Step 3 (NLP분석)에서 오류 발생: API rate limit exceeded. 5분 후 재시도하세요.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-warning/50 bg-warning/5">
        <CardContent className="px-4 py-3">
          <div className="flex items-start gap-2">
            <WarningCircleIcon size={20} className="mt-0.5 shrink-0 text-warning" />
            <div>
              <p className="text-sm font-medium text-warning">경고</p>
              <p className="mt-0.5 text-xs text-muted-foreground">3건의 종목 데이터가 누락되었습니다. 부분 완료 상태입니다.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LogRow({ log }: Readonly<{ log: LogEntry }>) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-border px-3 py-2 text-xs">
      {log.status === "completed" ? (
        <CheckCircleIcon size={14} className="shrink-0 text-success" />
      ) : (
        <XCircleIcon size={14} className="shrink-0 text-destructive" />
      )}
      <span className="w-20 font-mono text-muted-foreground">
        {log.date} {log.time}
      </span>
      <span className="flex-1 font-medium">
        Step {log.step}: {log.label}
      </span>
      <span className="text-[10px] text-muted-foreground">{log.by}</span>
      {log.error && <span className="max-w-24 truncate text-[10px] text-destructive">{log.error}</span>}
    </div>
  )
}

function ExecutionLog() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">실행 이력</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[140px]">
          <div className="space-y-1">
            {LOGS.map((log, i) => (
              <LogRow key={`${log.date}-${log.time}-${i}`} log={log} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

/** #40 에러 카드 + 실행 로그 — 실패/경고 알림 카드와 이력 리스트 (srope PipelineMgmtView 이식). */
export function ErrorAndLog() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <ErrorCards />
      <ExecutionLog />
    </div>
  )
}
