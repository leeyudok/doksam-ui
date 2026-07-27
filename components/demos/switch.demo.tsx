import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export const demo = (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-2">
      <Switch id="demo-switch-dark" defaultChecked />
      <Label htmlFor="demo-switch-dark">다크 모드</Label>
    </div>
    <div className="flex items-center gap-2">
      <Switch id="demo-switch-notify" />
      <Label htmlFor="demo-switch-notify">주문 체결 알림 받기</Label>
    </div>
    <div className="flex items-center gap-2">
      <Switch id="demo-switch-auto" defaultChecked disabled />
      <Label htmlFor="demo-switch-auto">자동 재투자 (프리미엄 전용)</Label>
    </div>
  </div>
)

export const code = `<div className="flex items-center gap-2">
  <Switch id="dark-mode" defaultChecked />
  <Label htmlFor="dark-mode">다크 모드</Label>
</div>
<div className="flex items-center gap-2">
  <Switch id="notify" />
  <Label htmlFor="notify">주문 체결 알림 받기</Label>
</div>
<div className="flex items-center gap-2">
  <Switch id="auto-reinvest" defaultChecked disabled />
  <Label htmlFor="auto-reinvest">자동 재투자 (프리미엄 전용)</Label>
</div>`

export const dos = [
  "즉시 반영되는 on/off 설정에만 Switch를 쓰고, 저장 버튼이 필요한 값은 다른 입력을 사용한다.",
  "Switch의 id와 Label의 htmlFor를 연결해 라벨 클릭으로도 상태를 바꿀 수 있게 한다.",
  "권한상 바꿀 수 없는 설정은 disabled와 함께 이유를 라벨에 명시한다.",
]

export const donts = [
  "Switch 하나로 저장이 필요한 여러 단계의 설정을 표현하지 않는다.",
  "라벨 없이 Switch만 단독 배치해 무엇을 켜고 끄는지 불명확하게 두지 않는다.",
]
