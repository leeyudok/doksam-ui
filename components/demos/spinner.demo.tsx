import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"

export const demo = (
  <div className="flex flex-wrap items-center gap-6">
    <Spinner />
    <Spinner className="size-6 text-primary" />
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Spinner className="size-4" />
      정산 내역을 불러오는 중입니다…
    </div>
    <Button disabled size="sm">
      <Spinner className="size-4" />
      저장 중
    </Button>
  </div>
)

export const code = `<Spinner />
<Spinner className="size-6 text-primary" />
<div className="flex items-center gap-2 text-sm text-muted-foreground">
  <Spinner className="size-4" />
  정산 내역을 불러오는 중입니다…
</div>
<Button disabled size="sm">
  <Spinner className="size-4" />
  저장 중
</Button>`

export const dos = [
  "버튼 내부에 넣을 때는 버튼을 disabled로 두어 중복 클릭을 막는다.",
  "Spinner 곁에 상황을 설명하는 텍스트를 함께 두어 무엇을 기다리는지 알린다.",
  "짧은 요청(수백ms 이내)에는 굳이 Spinner를 노출하지 않는다 — 깜빡임만 유발한다.",
]

export const donts = [
  "전체 화면을 가리는 대형 Spinner를 남발하지 않는다 — 부분 로딩엔 인라인으로 충분하다.",
  "Spinner 색상을 브랜드색이 아닌 임의 hex로 하드코딩하지 않는다.",
]
