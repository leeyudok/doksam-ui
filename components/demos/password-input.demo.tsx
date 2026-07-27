import { PasswordInput } from "@/components/password-input"

export const demo = (
  <div className="w-64">
    <PasswordInput placeholder="비밀번호 입력" defaultValue="s3cr3t-passw0rd" />
  </div>
)

export const code = `<PasswordInput placeholder="비밀번호 입력" />`

export const dos = [
  "비밀번호·시크릿 키처럼 기본은 가려야 하지만 확인이 필요한 값에 사용한다.",
  "표시/숨기기 버튼에는 aria-label과 aria-pressed로 현재 상태를 명확히 알린다.",
  "autoComplete 기본값(current-password)을 회원가입 등 상황에 맞게 new-password로 바꿔준다.",
]

export const donts = [
  "값을 콘솔·로그에 그대로 남기지 않는다 — 표시 여부와 별개로 저장/전송 시 마스킹을 유지한다.",
  "일반 텍스트 입력에 사용하지 않는다 — 토글 버튼이 불필요한 혼란을 준다.",
]
