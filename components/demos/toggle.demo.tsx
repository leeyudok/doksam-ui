import { TextBIcon, TextItalicIcon } from "@phosphor-icons/react/dist/ssr"

import { Toggle } from "@/components/ui/toggle"

export const demo = (
  <div className="flex flex-wrap items-center gap-2">
    <Toggle aria-label="굵게" defaultPressed>
      <TextBIcon size={16} weight="regular" />
    </Toggle>
    <Toggle aria-label="기울임" variant="outline">
      <TextItalicIcon size={16} weight="regular" />
    </Toggle>
  </div>
)

export const code = `<Toggle aria-label="굵게" defaultPressed>
  <TextBIcon size={16} weight="regular" />
</Toggle>
<Toggle aria-label="기울임" variant="outline">
  <TextItalicIcon size={16} weight="regular" />
</Toggle>`

export const dos = [
  "아이콘만 있는 Toggle에는 항상 aria-label로 기능을 명시한다.",
  "초기에 켜진 상태를 보여줘야 하면 defaultPressed를 사용한다.",
  "테두리가 필요한 맥락(툴바 등)에서는 variant='outline'을 사용해 경계를 구분한다.",
]

export const donts = [
  "on/off 결과가 즉시 저장되지 않는 일반 버튼 동작에 Toggle을 쓰지 않는다.",
  "같은 화면에 variant를 무작위로 섞어 어떤 것이 눌린 상태인지 헷갈리게 하지 않는다.",
]
