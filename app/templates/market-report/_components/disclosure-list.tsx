import { DISCLOSURES, type Disclosure } from "../_data/weekly"

/** 공시 성격별 도트 색 — 시맨틱 토큰. */
const DOT_CLASS: Record<Disclosure["tone"], string> = {
  neutral: "bg-muted-foreground",
  up: "bg-gain",
  down: "bg-loss",
  info: "bg-primary",
}

/**
 * 공시(DART류) 리스트(#51) — 주간 주요 공시 9건을 회사·요약·일자로 나열한다.
 * 가상 공시이며 색은 시맨틱 토큰만 사용.
 */
export function DisclosureList() {
  return (
    <ul className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
      {DISCLOSURES.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3 px-4 py-2.5">
          <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${DOT_CLASS[item.tone]}`} aria-hidden />
          <span className="w-24 shrink-0 text-xs font-bold text-foreground">{item.company}</span>
          <span className="min-w-0 flex-1 text-xs leading-relaxed text-muted-foreground">{item.desc}</span>
          <span className="shrink-0 text-[0.7rem] tabular-nums text-muted-foreground">{item.date}</span>
        </li>
      ))}
    </ul>
  )
}
