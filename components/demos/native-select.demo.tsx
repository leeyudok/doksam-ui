import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

export const demo = (
  <div className="flex flex-col gap-1.5">
    <Label htmlFor="native-select-demo-country">국가 선택</Label>
    <NativeSelect id="native-select-demo-country" defaultValue="kr">
      <NativeSelectOption value="kr">대한민국</NativeSelectOption>
      <NativeSelectOption value="us">미국</NativeSelectOption>
      <NativeSelectOption value="jp">일본</NativeSelectOption>
      <NativeSelectOption value="cn">중국</NativeSelectOption>
      <NativeSelectOption value="vn">베트남</NativeSelectOption>
    </NativeSelect>
  </div>
)

export const code = `<div className="flex flex-col gap-1.5">
  <Label htmlFor="country">국가 선택</Label>
  <NativeSelect id="country" defaultValue="kr">
    <NativeSelectOption value="kr">대한민국</NativeSelectOption>
    <NativeSelectOption value="us">미국</NativeSelectOption>
    <NativeSelectOption value="jp">일본</NativeSelectOption>
    <NativeSelectOption value="cn">중국</NativeSelectOption>
    <NativeSelectOption value="vn">베트남</NativeSelectOption>
  </NativeSelect>
</div>`

export const dos = [
  "모바일에서 OS 네이티브 선택 UI를 활용하고 싶은 간단한 목록에는 NativeSelect를 쓴다.",
  "Select와 마찬가지로 defaultValue로 초기 선택값을 명시한다.",
  "옵션 그룹이 필요하면 NativeSelectOptGroup으로 논리적으로 묶는다.",
]

export const donts = [
  "커스텀 스타일링(아이콘, 멀티라인 옵션 등)이 필요한 경우에는 사용하지 않는다 — Select를 사용한다.",
  "옵션 텍스트를 지나치게 길게 작성해 좁은 화면에서 잘리게 하지 않는다.",
  "라벨 없이 단독으로 배치해 어떤 값을 고르는지 불분명하게 두지 않는다.",
]
