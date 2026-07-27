import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export const demo = (
  <div className="flex flex-col gap-2">
    <InputOTP maxLength={6} defaultValue="24">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
    <p className="text-sm text-muted-foreground">
      휴대폰으로 전송된 6자리 인증번호를 입력해 주세요.
    </p>
  </div>
)

export const code = `<InputOTP maxLength={6} defaultValue="24">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`

export const dos = [
  "휴대폰·이메일 인증번호처럼 자릿수가 고정된 코드 입력에만 사용한다.",
  "maxLength를 슬롯 개수와 정확히 일치시킨다.",
  "구분자가 필요한 자리(3+3, 4+2 등)에는 InputOTPSeparator로 시각적으로 나눈다.",
]

export const donts = [
  "자릿수가 가변적인 값(전화번호 전체 등)에 사용하지 않는다.",
  "인증번호 발송/재전송 안내 문구 없이 입력창만 단독으로 두지 않는다.",
  "슬롯 index를 건너뛰거나 중복시켜 포커스 흐름을 깨지 않는다.",
]
