/**
 * 크롤러 콘솔 데모용 실행 이력 — 전부 가상으로 합성한 데이터다.
 * 회사·사업자번호 등 실데이터는 포함하지 않으며, 대상은 익명 데이터 소스
 * 코드/집계로만 표현한다. 시각은 로케일·타임존에 흔들리지 않도록 고정 표시
 * 문자열(KST 가정 "YYYY-MM-DD HH:MM:SS")로 둔다.
 */

export type CrawlStatus = "success" | "failed" | "stopped";

export type CrawlTrigger = "자동" | "수동";

export interface CrawlRun {
  /** React key. */
  id: string;
  /** 시작 시각(표시용 고정 문자열). */
  time: string;
  /** 크롤 대상 요약(익명 소스 집계). */
  target: string;
  /** 실행 방식. */
  trigger: CrawlTrigger;
  /** 갱신된 레코드 수. */
  updated: number;
  /** 실패 건수. */
  failed: number;
  /** 실행 결과. */
  status: CrawlStatus;
}

/** 최신순 15행 — 성공 다수 + 실패/중단 소수 섞어 상태 배지·행 강조가 드러나게 구성. */
export const INITIAL_RUNS: CrawlRun[] = [
  { id: "run-2050", time: "2026-07-15 04:00:11", target: "전체 소스 · 48", trigger: "자동", updated: 1284, failed: 0, status: "success" },
  { id: "run-2049", time: "2026-07-14 15:22:40", target: "지정 · 6", trigger: "수동", updated: 172, failed: 3, status: "failed" },
  { id: "run-2048", time: "2026-07-14 04:00:09", target: "전체 소스 · 48", trigger: "자동", updated: 1310, failed: 0, status: "success" },
  { id: "run-2047", time: "2026-07-13 11:05:57", target: "지정 · 12", trigger: "수동", updated: 388, failed: 0, status: "success" },
  { id: "run-2046", time: "2026-07-13 04:00:12", target: "전체 소스 · 48", trigger: "자동", updated: 1256, failed: 1, status: "success" },
  { id: "run-2045", time: "2026-07-12 09:41:03", target: "지정 · 3", trigger: "수동", updated: 0, failed: 0, status: "stopped" },
  { id: "run-2044", time: "2026-07-12 04:00:10", target: "전체 소스 · 48", trigger: "자동", updated: 1298, failed: 0, status: "success" },
  { id: "run-2043", time: "2026-07-11 04:00:14", target: "전체 소스 · 47", trigger: "자동", updated: 903, failed: 22, status: "failed" },
  { id: "run-2042", time: "2026-07-10 16:18:22", target: "지정 · 8", trigger: "수동", updated: 214, failed: 0, status: "success" },
  { id: "run-2041", time: "2026-07-10 04:00:08", target: "전체 소스 · 47", trigger: "자동", updated: 1271, failed: 0, status: "success" },
  { id: "run-2040", time: "2026-07-09 04:00:11", target: "전체 소스 · 47", trigger: "자동", updated: 1265, failed: 2, status: "success" },
  { id: "run-2039", time: "2026-07-08 13:50:44", target: "지정 · 1", trigger: "수동", updated: 41, failed: 0, status: "success" },
  { id: "run-2038", time: "2026-07-08 04:00:13", target: "전체 소스 · 47", trigger: "자동", updated: 1240, failed: 0, status: "success" },
  { id: "run-2037", time: "2026-07-07 04:00:09", target: "전체 소스 · 46", trigger: "자동", updated: 1188, failed: 5, status: "failed" },
  { id: "run-2036", time: "2026-07-06 04:00:10", target: "전체 소스 · 46", trigger: "자동", updated: 1203, failed: 0, status: "success" },
];
