import { cn } from "@/lib/utils"
import type { LogEntry, LogLevel } from "../_data/logs-data"

const LEVEL_STYLE: Record<LogLevel, string> = {
  info: "bg-muted text-muted-foreground",
  debug: "bg-primary/10 text-primary",
  warn: "bg-warning/15 text-warning",
  error: "bg-destructive/15 text-destructive",
}

const LEVEL_LABEL: Record<LogLevel, string> = {
  info: "INFO",
  debug: "DEBUG",
  warn: "WARN",
  error: "ERROR",
}

const ROW_TONE: Record<LogLevel, string> = {
  info: "",
  debug: "",
  warn: "bg-warning/5",
  error: "bg-destructive/5",
}

/**
 * components/patterns/log-viewer/log-viewer-demo.tsx를 props 기반으로 일반화한
 * 버전 — 레벨별 색+배경, 반복 카운트 배지, 그룹 들여쓰기를 그대로 유지한다.
 */
export function LogViewer({ entries }: Readonly<{ entries: LogEntry[] }>) {
  return (
    <div className="w-full overflow-x-auto rounded-md border border-border">
      <ul className="flex flex-col divide-y divide-border font-mono text-xs">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className={cn("flex items-start gap-2 px-3 py-1.5", ROW_TONE[entry.level])}
          >
            <span className="shrink-0 tabular-nums text-muted-foreground">{entry.time}</span>
            <span
              className={cn(
                "min-w-[3.25rem] shrink-0 rounded px-1.5 py-0.5 text-center text-[10px] font-semibold tracking-wide",
                LEVEL_STYLE[entry.level],
              )}
            >
              {LEVEL_LABEL[entry.level]}
            </span>
            <span
              className="flex-1 text-foreground"
              style={entry.group > 0 ? { paddingLeft: entry.group * 16 } : undefined}
            >
              {entry.message}
            </span>
            {entry.count !== undefined && entry.count > 1 && (
              <span className="shrink-0 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-muted-foreground">
                ×{entry.count}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
