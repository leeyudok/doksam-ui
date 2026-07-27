import { Progress } from "@/components/ui/progress"

export const demo = (
  <div className="flex w-full max-w-sm flex-col gap-4">
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span>프로필 완성도</span>
        <span className="text-muted-foreground">72%</span>
      </div>
      <Progress value={72} />
    </div>
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span>파일 업로드</span>
        <span className="text-muted-foreground">128MB / 200MB</span>
      </div>
      <Progress value={64} />
    </div>
  </div>
)

export const code = `<div className="flex items-center justify-between text-sm">
  <span>프로필 완성도</span>
  <span className="text-muted-foreground">72%</span>
</div>
<Progress value={72} />`

export const dos = [
  "진행률 옆에 숫자(%, 용량 등) 텍스트를 함께 보여줘 정확한 값을 전달한다.",
  "값이 확정되지 않은 무기한 대기는 Progress 대신 Spinner를 사용한다.",
  "0~100 범위의 value를 항상 명시적으로 넘긴다.",
]

export const donts = [
  "Progress value를 음수나 100 초과로 넘기지 않는다.",
  "완료(100%) 상태를 계속 보여주지 않는다 — 완료 즉시 결과 UI로 전환한다.",
]
