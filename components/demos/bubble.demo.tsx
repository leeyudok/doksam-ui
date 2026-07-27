import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"

export const demo = (
  <BubbleGroup className="w-full max-w-sm">
    <Bubble variant="muted" align="start">
      <BubbleContent>내일 오후 2시 회의 가능하신가요?</BubbleContent>
    </Bubble>
    <Bubble variant="default" align="end">
      <BubbleContent>네, 가능합니다. 회의실 예약해 둘게요.</BubbleContent>
    </Bubble>
    <Bubble variant="muted" align="start">
      <BubbleContent>감사합니다, 그때 뵙겠습니다.</BubbleContent>
    </Bubble>
  </BubbleGroup>
)

export const code = `<BubbleGroup>
  <Bubble variant="muted" align="start">
    <BubbleContent>내일 오후 2시 회의 가능하신가요?</BubbleContent>
  </Bubble>
  <Bubble variant="default" align="end">
    <BubbleContent>네, 가능합니다. 회의실 예약해 둘게요.</BubbleContent>
  </Bubble>
  <Bubble variant="muted" align="start">
    <BubbleContent>감사합니다, 그때 뵙겠습니다.</BubbleContent>
  </Bubble>
</BubbleGroup>`

export const dos = [
  "내가 보낸 말풍선은 align='end' + variant='default', 상대는 align='start' + variant='muted'로 구분한다.",
  "링크·버튼이 들어가는 말풍선은 variant='outline' 또는 'ghost'로 클릭 대상이 명확히 보이게 한다.",
]

export const donts = [
  "variant를 색상 하드코딩(className으로 bg-[#...])으로 대체하지 않는다.",
  "긴 코드 블록·표 같은 구조화된 콘텐츠를 말풍선 안에 그대로 욱여넣지 않는다 — variant='ghost'나 별도 카드로 분리한다.",
]
