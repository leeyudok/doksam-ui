import { ScrollStack, ScrollStackItem } from "@/components/scroll-stack"
import { Badge } from "@/components/ui/badge"

const CARDS = [
  {
    step: "01",
    title: "토큰",
    body: "색·간격·타이포그래피를 시맨틱 토큰으로 통일합니다.",
    accent: "border-l-4 border-l-chart-1",
  },
  {
    step: "02",
    title: "컴포넌트",
    body: "shadcn 프리미티브와 조합 컴포넌트를 카탈로그로 제공합니다.",
    accent: "border-l-4 border-l-chart-2",
  },
  {
    step: "03",
    title: "패턴",
    body: "화면 단위 조합 규칙으로 일관된 UX 를 만듭니다.",
    accent: "border-l-4 border-l-chart-3",
  },
  {
    step: "04",
    title: "템플릿",
    body: "완성된 화면 스캐폴드에서 프로젝트를 시작합니다.",
    accent: "border-l-4 border-l-chart-4",
  },
]

export const demo = (
  <div className="h-96 w-full overflow-hidden rounded-lg border border-border">
    <ScrollStack>
      {CARDS.map((card) => (
        <ScrollStackItem key={card.step} itemClassName={card.accent}>
          <div className="flex h-40 flex-col justify-between sm:h-44">
            <Badge variant="secondary">{card.step}</Badge>
            <div className="flex flex-col gap-1.5">
              <div className="text-xl font-semibold tracking-tight">{card.title}</div>
              <p className="text-sm text-muted-foreground">{card.body}</p>
            </div>
          </div>
        </ScrollStackItem>
      ))}
    </ScrollStack>
  </div>
)

export const code = `import { ScrollStack, ScrollStackItem } from "@/components/scroll-stack"
import { Badge } from "@/components/ui/badge"

// 고정 높이 컨테이너 안에서 내부 스크롤로 동작한다.
// 페이지 전체 스크롤에 연동하려면 <ScrollStack useWindowScroll> 을 쓴다.
<div className="h-96 w-full overflow-hidden rounded-lg border border-border">
  <ScrollStack>
    <ScrollStackItem itemClassName="border-l-4 border-l-chart-1">
      <Badge variant="secondary">01</Badge>
      <div className="text-xl font-semibold tracking-tight">토큰</div>
      <p className="text-sm text-muted-foreground">
        색·간격·타이포그래피를 시맨틱 토큰으로 통일합니다.
      </p>
    </ScrollStackItem>
    {/* ...카드 3~6장 권장 */}
  </ScrollStack>
</div>`

export const dos = [
  "기능 소개·온보딩 단계처럼 순차 서사가 있는 카드 3~6장에 사용한다.",
  "고정 높이 컨테이너(내부 스크롤) 또는 useWindowScroll 로 페이지 스크롤에 연동한다.",
  "카드 배경·강조색은 시맨틱 토큰(bg-card, border-chart-N)으로만 지정한다.",
]

export const donts = [
  "표·긴 목록 등 정보 밀도가 높은 콘텐츠를 카드에 넣지 않는다 — 스택되면 가려진다.",
  "필수 정보 전달을 스크롤 애니메이션에만 의존하지 않는다 (reduced-motion 환경에서는 일반 목록으로 렌더된다).",
  "카드 수를 7장 이상으로 늘리지 않는다 — 스택 오프셋이 쌓여 상단이 답답해진다.",
]
