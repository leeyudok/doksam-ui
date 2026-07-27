import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export const demo = (
  <div className="flex w-full max-w-sm flex-col gap-2">
    <div className="flex items-center justify-between">
      <Label htmlFor="demo-slider-volume">알림 볼륨</Label>
      <span className="text-sm text-muted-foreground">70%</span>
    </div>
    <Slider id="demo-slider-volume" defaultValue={[70]} max={100} step={1} />
  </div>
)

export const code = `<div className="flex items-center justify-between">
  <Label htmlFor="volume">알림 볼륨</Label>
  <span className="text-sm text-muted-foreground">70%</span>
</div>
<Slider id="volume" defaultValue={[70]} max={100} step={1} />`

export const dos = [
  "현재 값을 슬라이더 옆이나 위에 텍스트로 함께 보여줘 값을 드래그 없이도 확인할 수 있게 한다.",
  "defaultValue는 항상 배열로 전달한다 (단일 값은 [70], 범위는 [20, 80]).",
  "min/max/step은 실제 데이터 단위(퍼센트, 원 등)에 맞춰 명확히 지정한다.",
]

export const donts = [
  "값을 표시하지 않고 슬라이더만 단독으로 노출해 정확한 값을 알 수 없게 하지 않는다.",
  "트랙 색상을 className으로 임의 변경해 primary 토큰과 다른 의미를 부여하지 않는다.",
]
