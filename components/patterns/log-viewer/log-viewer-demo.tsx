import { LogViewer, type LogEntry } from "@/components/log-viewer"

const LOG_ENTRIES: LogEntry[] = [
  { id: "1", time: "10:24:01.102", level: "info", group: 0, message: "요청 시작 GET /api/orders" },
  { id: "2", time: "10:24:01.118", level: "debug", group: 1, message: "캐시 조회 miss — DB 폴백" },
  { id: "3", time: "10:24:01.204", level: "debug", group: 1, message: "쿼리 실행 320ms" },
  { id: "4", time: "10:24:01.207", level: "info", group: 0, message: "응답 200 반환" },
  { id: "5", time: "10:24:03.501", level: "warn", group: 0, message: "커넥션 풀 사용률 82%", count: 3 },
  { id: "6", time: "10:24:05.880", level: "error", group: 0, message: "결제 게이트웨이 타임아웃(5000ms)" },
  { id: "7", time: "10:24:05.881", level: "debug", group: 1, message: "재시도 큐에 등록 attempt=1" },
  { id: "8", time: "10:24:07.012", level: "info", group: 0, message: "재시도 성공" },
]

/** LogViewer(components/log-viewer.tsx) 데모 — 샘플 로그 엔트리를 렌더링한다. */
export function LogViewerDemo() {
  return <LogViewer entries={LOG_ENTRIES} />
}
