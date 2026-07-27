import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export const demo = (
  <div className="flex w-full max-w-sm flex-col gap-1.5">
    <Label htmlFor="textarea-demo-feedback">문의 내용</Label>
    <Textarea
      id="textarea-demo-feedback"
      placeholder="문의하실 내용을 입력해 주세요."
      defaultValue={
        "안녕하세요, 보유 중인 해외주식 배당금 입금 내역이\n거래내역서에 반영되지 않아 확인 부탁드립니다."
      }
    />
  </div>
)

export const code = String.raw`<div className="flex flex-col gap-1.5">
  <Label htmlFor="feedback">문의 내용</Label>
  <Textarea
    id="feedback"
    placeholder="문의하실 내용을 입력해 주세요."
    defaultValue={
      "안녕하세요, 보유 중인 해외주식 배당금 입금 내역이\n거래내역서에 반영되지 않아 확인 부탁드립니다."
    }
  />
</div>`

export const dos = [
  "여러 줄 입력이 예상되는 문의·피드백 등에는 Textarea를 사용한다.",
  "field-sizing-content 특성을 살려 내용 길이에 따라 자연스럽게 늘어나도록 둔다.",
  "Label과 함께 배치해 어떤 내용을 입력해야 하는지 명확히 안내한다.",
]

export const donts = [
  "한 줄짜리 짧은 값(이름, 이메일 등)에 Textarea를 사용하지 않는다.",
  "최소 높이를 과도하게 줄여 여러 줄 입력을 불편하게 만들지 않는다.",
  "placeholder에만 의존하고 Label을 생략하지 않는다.",
]
