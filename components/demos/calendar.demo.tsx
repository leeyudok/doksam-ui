import { Calendar } from "@/components/ui/calendar"

export const demo = <Calendar mode="single" className="rounded-lg border border-border" />

export const code = `<Calendar mode="single" className="rounded-lg border border-border" />`

export const dos = [
  "예약·마감일처럼 날짜 선택이 핵심인 흐름에만 달력을 직접 노출한다.",
  "폼 안에서는 Popover + Calendar 조합으로 공간을 아낀다.",
  "선택 가능 범위가 제한적이면 disabled prop으로 범위를 명시한다.",
]

export const donts = [
  "긴 목록 폼 중간에 이유 없이 항상 펼쳐진 달력을 넣지 않는다.",
  "날짜 형식을 지역마다 하드코딩하지 않고 locale/formatters를 사용한다.",
]
