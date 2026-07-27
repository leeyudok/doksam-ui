import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"
import { DirectionProvider } from "@/components/ui/direction"

/**
 * DirectionProvider는 자체 시각 스타일이 없는 방향(RTL/LTR) 컨텍스트
 * 프리미티브다 — 하위 Radix 기반 컴포넌트(Bubble 등)의 aria-*·키보드
 * 내비게이션 방향을 뒤집어 보여주기 위해 실제 채팅 UI와 함께 데모한다.
 */
export const demo = (
  <div className="w-full max-w-sm">
    <p className="mb-2 text-xs text-muted-foreground">
      아랍어 사용자와의 대화 — RTL 방향으로 렌더링됩니다.
    </p>
    <DirectionProvider dir="rtl">
      <BubbleGroup dir="rtl">
        <Bubble variant="muted" align="start">
          <BubbleContent>مرحبًا، هل يمكنني المساعدة؟</BubbleContent>
        </Bubble>
        <Bubble variant="default" align="end">
          <BubbleContent>نعم من فضلك، أحتاج فاتورة الشهر الماضي.</BubbleContent>
        </Bubble>
      </BubbleGroup>
    </DirectionProvider>
  </div>
)

export const code = `<DirectionProvider dir="rtl">
  <BubbleGroup dir="rtl">
    <Bubble variant="muted" align="start">
      <BubbleContent>مرحبًا، هل يمكنني المساعدة؟</BubbleContent>
    </Bubble>
    <Bubble variant="default" align="end">
      <BubbleContent>نعم من فضلك، أحتاج فاتورة الشهر الماضي.</BubbleContent>
    </Bubble>
  </BubbleGroup>
</DirectionProvider>`

export const dos = [
  "아랍어·히브리어 등 RTL 로케일을 지원할 때 앱 루트 근처에서 한 번만 DirectionProvider로 감싼다.",
  "실제 텍스트 정렬은 dir 속성이 있는 컨테이너와 논리 속성(ms-/me-, text-start 등)에 맡긴다.",
]

export const donts = [
  "컴포넌트마다 개별적으로 DirectionProvider를 중첩해 방향이 예측 불가능해지게 하지 않는다.",
  "left/right 같은 물리적 방향 유틸리티만으로 RTL 레이아웃을 흉내 내지 않는다 — 실제로 뒤집히지 않는다.",
]
