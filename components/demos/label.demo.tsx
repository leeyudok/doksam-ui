import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export const demo = (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-2">
      <Checkbox id="label-demo-terms" defaultChecked />
      <Label htmlFor="label-demo-terms">
        서비스 이용약관 및 개인정보 처리방침에 동의합니다
      </Label>
    </div>
    <div className="group flex items-center gap-2" data-disabled="true">
      <Checkbox id="label-demo-marketing" disabled />
      <Label htmlFor="label-demo-marketing">
        마케팅 정보 수신에 동의합니다 (준비 중)
      </Label>
    </div>
  </div>
)

export const code = `<div className="flex items-center gap-2">
  <Checkbox id="terms" defaultChecked />
  <Label htmlFor="terms">
    서비스 이용약관 및 개인정보 처리방침에 동의합니다
  </Label>
</div>
<div className="group flex items-center gap-2" data-disabled="true">
  <Checkbox id="marketing" disabled />
  <Label htmlFor="marketing">
    마케팅 정보 수신에 동의합니다 (준비 중)
  </Label>
</div>`

export const dos = [
  "Label의 htmlFor와 대상 요소의 id를 반드시 일치시켜 클릭 영역을 넓힌다.",
  "체크박스·라디오 등과 짝지을 때는 group과 data-disabled를 함께 써 비활성 스타일을 전파한다.",
  "라벨 텍스트만으로 동의 대상이 무엇인지 명확히 읽히도록 작성한다.",
]

export const donts = [
  "htmlFor 없이 텍스트만 나열해 클릭해도 대상 요소가 반응하지 않게 하지 않는다.",
  "필수 동의 항목의 라벨을 흐린 muted 색으로만 표시해 눈에 띄지 않게 하지 않는다.",
  "하나의 Label에 여러 입력 요소를 동시에 연결하지 않는다.",
]
