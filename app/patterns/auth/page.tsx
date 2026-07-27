import { Badge } from "@/components/ui/badge"
import { PatternSample } from "@/components/showcase/pattern-sample"
import { AUTH_SAMPLES } from "@/components/patterns/auth-samples"

export default function AuthPatternsPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Patterns
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">인증 패턴</h1>
        <p className="max-w-prose text-sm text-muted-foreground">
          로그인·회원가입·비밀번호 재설정 3종 폼과 OAuth 버튼, 검증 에러 상태 데모를 카드형 컨테이너로
          모은 인증 UI 패턴입니다.
        </p>
      </section>

      {AUTH_SAMPLES.map((sample) => (
        <PatternSample key={sample.num} {...sample} />
      ))}
    </div>
  )
}
