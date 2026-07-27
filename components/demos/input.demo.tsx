import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const demo = (
  <div className="flex w-full max-w-sm flex-col gap-4">
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="input-demo-email">이메일 주소</Label>
      <Input
        id="input-demo-email"
        type="email"
        placeholder="name@doksam.com"
        defaultValue=""
      />
    </div>
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="input-demo-account">계좌번호</Label>
      <Input
        id="input-demo-account"
        disabled
        defaultValue="012-345678-90"
        readOnly
      />
    </div>
  </div>
)

export const code = `<div className="flex flex-col gap-1.5">
  <Label htmlFor="email">이메일 주소</Label>
  <Input id="email" type="email" placeholder="name@doksam.com" />
</div>
<div className="flex flex-col gap-1.5">
  <Label htmlFor="account">계좌번호</Label>
  <Input id="account" disabled defaultValue="012-345678-90" readOnly />
</div>`

export const dos = [
  "Input에는 항상 연결된 Label을 htmlFor/id로 짝지어 접근성을 보장한다.",
  "이메일·숫자 등 입력 형식에 맞는 type을 지정해 모바일 키보드까지 최적화한다.",
  "수정 불가한 값은 disabled 또는 readOnly로 명확히 표시한다.",
]

export const donts = [
  "placeholder를 label 대신 사용해 값을 지운 뒤 의미가 사라지게 하지 않는다.",
  "포커스 링 등 상태 스타일을 className으로 덮어써 접근성 신호를 제거하지 않는다.",
  "너비를 임의 px로 고정해 반응형 레이아웃을 깨지 않는다.",
]
