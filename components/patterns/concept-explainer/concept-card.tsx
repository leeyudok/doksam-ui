import { ArrowRightIcon, WarningIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

/** 개념 설명 카드 한 장이 받는 데이터. warn=true 항목은 주의 마커로 강조된다. */
export interface ConceptItem {
  text: string
  warn?: boolean
}

export interface ConceptCardData {
  /** 순번 표기(예: "01"). 모노 폰트로 렌더된다. */
  num: string
  title: string
  /** 우측 상단에 붙는 한 줄 등가물(예: "≈ 냉동 밀키트"). */
  equivalent: string
  /** 카드 상단 한 줄 요약 비유. */
  analogy: string
  items: ConceptItem[]
}

/**
 * 개념 설명 카드 — 순번 + 제목 + 등가물 헤더, 한 줄 비유, 불릿 목록(주의 마커)으로
 * 어려운 개념 하나를 친숙한 비유로 설명하는 카드. 색·타이포는 전부 시맨틱 토큰으로
 * 해소하며 하드코딩 색을 쓰지 않는다(주의 항목만 text-destructive).
 */
export function ConceptCard({ num, title, equivalent, analogy, items }: Readonly<ConceptCardData>) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-border">
        <span className="font-mono text-2xl font-semibold leading-none text-primary tabular-nums">{num}</span>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <span className="ml-auto font-mono text-xs text-muted-foreground">{equivalent}</span>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="border-l-2 border-primary pl-3 text-sm font-medium">{analogy}</p>
        <ul className="flex flex-col gap-1.5">
          {items.map((item) => (
            <li
              key={item.text}
              className={cn(
                "flex items-start gap-2 text-sm",
                item.warn ? "text-destructive" : "text-muted-foreground",
              )}
            >
              {item.warn ? (
                <WarningIcon aria-hidden size={14} weight="fill" className="mt-0.5 shrink-0" />
              ) : (
                <ArrowRightIcon aria-hidden size={14} weight="bold" className="mt-0.5 shrink-0 text-primary" />
              )}
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

/** /patterns/concept-explainer 데모용 — 도커 개념 2종을 카드로 보여준다. */
export function ConceptCardDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {CONCEPT_CARD_DEMO.map((card) => (
        <ConceptCard key={card.num} {...card} />
      ))}
    </div>
  )
}

const CONCEPT_CARD_DEMO: ConceptCardData[] = [
  {
    num: "01",
    title: "Image",
    equivalent: "≈ 냉동 밀키트",
    analogy: "손질·계량 다 끝난 재료 묶음 — 근데 아직 안 익혔어요",
    items: [
      { text: "레시피(Dockerfile)대로 docker build 하면 만들어진다" },
      { text: "여러 layer로 쌓이고, 안 바뀐 재료는 캐시로 재사용된다" },
      { text: "이미지 자체는 실행 상태가 아니다 — 냉동고에 든 상태일 뿐", warn: true },
    ],
  },
  {
    num: "02",
    title: "Container",
    equivalent: "≈ 데워서 접시에 담은 요리",
    analogy: "밀키트를 실제로 데우고 조리해 먹을 수 있게 된 상태",
    items: [
      { text: "docker run 하면 이미지가 컨테이너로 살아난다" },
      { text: "같은 이미지 하나로 컨테이너 여러 개를 띄울 수 있다" },
      { text: "컨테이너를 지우면 그 안에서 만든 건 다 증발한다 → Volume 필요", warn: true },
    ],
  },
]
