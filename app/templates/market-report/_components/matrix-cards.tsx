import { MATRIX_CARDS, type MatrixCard } from "../_data/daily"

/** 카드 성격별 테두리/배경/태그 색 — 전부 시맨틱 토큰. */
const TONE_CLASS: Record<MatrixCard["tone"], { card: string; icon: string; tag: string }> = {
  risk: {
    card: "border-loss/30 bg-loss/5",
    icon: "text-loss",
    tag: "bg-loss/10 text-loss border-loss/30",
  },
  oppo: {
    card: "border-gain/30 bg-gain/5",
    icon: "text-gain",
    tag: "bg-gain/10 text-gain border-gain/30",
  },
  warn: {
    card: "border-warning/30 bg-warning/5",
    icon: "text-warning",
    tag: "bg-warning/10 text-warning border-warning/30",
  },
  info: {
    card: "border-primary/30 bg-primary/5",
    icon: "text-primary",
    tag: "bg-primary/10 text-primary border-primary/30",
  },
}

/**
 * 리스크·기회 매트릭스 카드 그리드(#51) — 아이콘·제목·설명·태그 8종.
 * 데스크톱은 다열, 모바일은 1열로 리플로우한다. 색은 시맨틱 토큰만 사용.
 */
export function MatrixCards() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {MATRIX_CARDS.map((card) => {
        const tone = TONE_CLASS[card.tone]
        const Icon = card.icon
        return (
          <div key={card.id} className={`flex flex-col gap-1.5 rounded-lg border p-3.5 ${tone.card}`}>
            <Icon size={22} weight="duotone" className={tone.icon} />
            <div className="text-[0.8rem] font-semibold text-foreground">{card.title}</div>
            <p className="text-xs leading-relaxed text-muted-foreground">{card.desc}</p>
            <span
              className={`mt-1 inline-block w-fit rounded border px-2 py-0.5 text-[0.65rem] font-bold tracking-wide ${tone.tag}`}
            >
              {card.tag}
            </span>
          </div>
        )
      })}
    </div>
  )
}
