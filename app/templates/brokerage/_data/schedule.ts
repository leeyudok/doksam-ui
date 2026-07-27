/**
 * app/templates/brokerage/(#41) 전용 가상 주요 일정(경제지표 발표 등).
 * 날짜/컨센서스/이전치는 전부 가상 수치이며 실제 발표 일정과 무관하다.
 */
export interface ScheduleItem {
  id: string
  /** 발표 일자(가상) — "07/16(수)" 형태. */
  date: string
  /** 발표 시각(가상) — "22:30" 형태. */
  time: string
  title: string
  country: "한국" | "미국" | "중국" | "유로존" | "일본"
  importance: "high" | "medium" | "low"
  /** 시장 예상치(컨센서스). */
  consensus?: string
  /** 직전 발표치. */
  previous?: string
}

export const KEY_SCHEDULE: ScheduleItem[] = [
  {
    id: "us-cpi",
    date: "07/16(수)",
    time: "22:30",
    title: "미국 소비자물가지수(CPI)",
    country: "미국",
    importance: "high",
    consensus: "3.1%",
    previous: "3.3%",
  },
  {
    id: "kr-rate",
    date: "07/17(목)",
    time: "09:00",
    title: "한국은행 기준금리 결정",
    country: "한국",
    importance: "high",
    consensus: "동결",
    previous: "3.50%",
  },
  {
    id: "us-retail",
    date: "07/17(목)",
    time: "21:30",
    title: "미국 소매판매",
    country: "미국",
    importance: "medium",
    consensus: "0.3%",
    previous: "0.1%",
  },
  {
    id: "cn-gdp",
    date: "07/18(금)",
    time: "11:00",
    title: "중국 2분기 GDP 성장률",
    country: "중국",
    importance: "medium",
    consensus: "5.0%",
    previous: "5.3%",
  },
  {
    id: "eu-ecb",
    date: "07/21(월)",
    time: "20:45",
    title: "ECB 통화정책회의",
    country: "유로존",
    importance: "high",
    consensus: "동결",
    previous: "3.75%",
  },
  {
    id: "jp-boj",
    date: "07/22(화)",
    time: "12:00",
    title: "일본은행(BOJ) 정책금리",
    country: "일본",
    importance: "low",
    consensus: "동결",
    previous: "0.25%",
  },
]
