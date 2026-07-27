import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export const demo = (
  <RadioGroup defaultValue="realtime" className="max-w-xs">
    <div className="flex items-center gap-2">
      <RadioGroupItem id="demo-radio-realtime" value="realtime" />
      <Label htmlFor="demo-radio-realtime">실시간 알림</Label>
    </div>
    <div className="flex items-center gap-2">
      <RadioGroupItem id="demo-radio-daily" value="daily" />
      <Label htmlFor="demo-radio-daily">하루 한 번 요약</Label>
    </div>
    <div className="flex items-center gap-2">
      <RadioGroupItem id="demo-radio-off" value="off" />
      <Label htmlFor="demo-radio-off">받지 않음</Label>
    </div>
  </RadioGroup>
)

export const code = `<RadioGroup defaultValue="realtime">
  <div className="flex items-center gap-2">
    <RadioGroupItem id="realtime" value="realtime" />
    <Label htmlFor="realtime">실시간 알림</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem id="daily" value="daily" />
    <Label htmlFor="daily">하루 한 번 요약</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem id="off" value="off" />
    <Label htmlFor="off">받지 않음</Label>
  </div>
</RadioGroup>`

export const dos = [
  "선택지가 상호 배타적일 때만 RadioGroup을 쓰고, 각 값은 defaultValue로 초기 선택을 명시한다.",
  "RadioGroupItem마다 고유 id를 부여하고 Label의 htmlFor와 짝지어 클릭 영역을 넓힌다.",
  "옵션은 3~5개 이내로 유지해 한눈에 비교할 수 있게 한다.",
]

export const donts = [
  "다중 선택이 가능한 상황에 RadioGroup을 쓰지 않는다 (이 경우 Checkbox 그룹을 사용한다).",
  "값(value) 없이 그룹만 렌더링해 어떤 옵션도 선택되지 않은 상태로 방치하지 않는다.",
]
