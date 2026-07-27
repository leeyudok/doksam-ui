import type { PatternSampleData } from "@/components/showcase/pattern-sample"
import { LogViewerDemo } from "@/components/patterns/log-viewer/log-viewer-demo"

export const LOG_VIEWER_SAMPLES: PatternSampleData[] = [
  {
    num: 1,
    title: "레벨 색상 + 타임스탬프 + 반복 카운트 + 그룹 들여쓰기",
    description:
      "info/debug/warn/error 레벨을 색+배경으로 구분하고, 타임스탬프는 tabular-nums로 자릿수를 맞춥니다. 같은 이벤트가 반복되면 ×N 배지로 압축하고, 하위 로그는 그룹 depth만큼 들여씁니다.",
    demo: <LogViewerDemo />,
    code: `const LEVEL_STYLE: Record<LogLevel, string> = {
  info: "bg-muted text-muted-foreground",
  debug: "bg-primary/10 text-primary",
  warn: "bg-warning/15 text-warning",
  error: "bg-destructive/15 text-destructive",
}

<li style={{ paddingLeft: 12 + entry.group * 16 }}>
  <span className="tabular-nums text-muted-foreground">{entry.time}</span>
  <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-semibold", LEVEL_STYLE[entry.level])}>
    {LEVEL_LABEL[entry.level]}
  </span>
  <span>{entry.message}</span>
  {entry.count > 1 && <span className="rounded-full bg-muted px-1.5 tabular-nums">×{entry.count}</span>}
</li>`,
    notes: [
      "레벨 색은 success/warning/destructive/muted 시맨틱 토큰만 쓴다 — warn=warning, error=destructive, info/debug는 muted·primary 계열로 하드코딩 hex를 피한다.",
      "warn·error 행은 배경도 옅게(투명도 5%) 깔아 스크롤 중에도 눈에 먼저 들어오게 한다.",
      "타임스탬프는 font-mono + tabular-nums 조합으로 숫자 폭을 고정해 세로로 훑을 때 자릿수가 흔들리지 않게 한다.",
      "동일 메시지가 짧은 시간에 반복되면 각 줄을 다 그리지 말고 대표 1줄 + ×N 배지로 압축해 로그 폭주(log flood)를 완화한다.",
      "group 값(중첩 depth)에 비례해 paddingLeft를 늘려, 상위 요청과 그 내부에서 파생된 하위 로그를 시각적으로 묶는다.",
    ],
  },
]
