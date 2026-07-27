import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export const demo = (
  <FieldSet className="w-full max-w-sm">
    <FieldLegend>배송지 정보</FieldLegend>
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="demo-field-receiver">받는 사람</FieldLabel>
        <FieldContent>
          <Input id="demo-field-receiver" placeholder="홍길동" />
          <FieldDescription>택배 수령 시 본인 확인에 사용됩니다.</FieldDescription>
        </FieldContent>
      </Field>
      <Field data-invalid="true">
        <FieldLabel htmlFor="demo-field-zip">우편번호</FieldLabel>
        <FieldContent>
          <Input id="demo-field-zip" aria-invalid defaultValue="0612" />
          <FieldError>우편번호는 5자리 숫자여야 합니다.</FieldError>
        </FieldContent>
      </Field>
    </FieldGroup>
  </FieldSet>
)

export const code = `<FieldSet>
  <FieldLegend>배송지 정보</FieldLegend>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="receiver">받는 사람</FieldLabel>
      <FieldContent>
        <Input id="receiver" placeholder="홍길동" />
        <FieldDescription>택배 수령 시 본인 확인에 사용됩니다.</FieldDescription>
      </FieldContent>
    </Field>
    <Field data-invalid="true">
      <FieldLabel htmlFor="zip">우편번호</FieldLabel>
      <FieldContent>
        <Input id="zip" aria-invalid defaultValue="0612" />
        <FieldError>우편번호는 5자리 숫자여야 합니다.</FieldError>
      </FieldContent>
    </Field>
  </FieldGroup>
</FieldSet>`

export const dos = [
  "FieldLabel의 htmlFor와 입력 요소의 id를 반드시 일치시켜 접근성을 보장한다.",
  "에러 상태는 Field data-invalid + aria-invalid + FieldError 세 개를 함께 설정한다.",
  "관련된 필드는 FieldGroup으로 묶어 간격 리듬을 통일한다.",
]

export const donts = [
  "FieldDescription과 FieldError를 동시에 상시 노출해 문장을 두 번 반복하지 않는다.",
  "Field 없이 label과 input을 임의 마진으로만 배치하지 않는다.",
]
