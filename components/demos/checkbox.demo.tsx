import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export const demo = (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-2">
      <Checkbox id="demo-checkbox-terms" defaultChecked />
      <Label htmlFor="demo-checkbox-terms">이용약관에 동의합니다</Label>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox id="demo-checkbox-marketing" />
      <Label htmlFor="demo-checkbox-marketing">마케팅 정보 수신에 동의합니다</Label>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox id="demo-checkbox-otp" defaultChecked disabled />
      <Label htmlFor="demo-checkbox-otp">2단계 인증 사용 (관리자 설정)</Label>
    </div>
  </div>
)

export const code = `<div className="flex items-center gap-2">
  <Checkbox id="terms" defaultChecked />
  <Label htmlFor="terms">이용약관에 동의합니다</Label>
</div>
<div className="flex items-center gap-2">
  <Checkbox id="marketing" />
  <Label htmlFor="marketing">마케팅 정보 수신에 동의합니다</Label>
</div>
<div className="flex items-center gap-2">
  <Checkbox id="otp" defaultChecked disabled />
  <Label htmlFor="otp">2단계 인증 사용 (관리자 설정)</Label>
</div>`

export const dos = [
  "Checkbox의 id와 Label의 htmlFor를 일치시켜 라벨 클릭으로도 토글되게 한다.",
  "여러 항목을 나열할 때는 동일한 간격으로 세로 정렬해 목록처럼 보이게 한다.",
  "사용자가 바꿀 수 없는 항목은 disabled와 함께 이유를 라벨에 짧게 덧붙인다.",
]

export const donts = [
  "Label 없이 아이콘이나 텍스트만 옆에 배치해 클릭 영역을 좁히지 않는다.",
  "동의가 필수인 항목을 기본으로 defaultChecked 처리해 사용자를 오도하지 않는다.",
]
