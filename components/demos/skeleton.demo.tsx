import { Skeleton } from "@/components/ui/skeleton"

export const demo = (
  <div className="flex w-full max-w-sm flex-col gap-4">
    <div className="flex items-center gap-3">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-2/5" />
        <Skeleton className="h-3 w-3/5" />
      </div>
    </div>
    <Skeleton className="h-32 w-full rounded-lg" />
    <div className="flex flex-col gap-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  </div>
)

export const code = `<div className="flex items-center gap-3">
  <Skeleton className="size-10 rounded-full" />
  <div className="flex flex-1 flex-col gap-2">
    <Skeleton className="h-4 w-2/5" />
    <Skeleton className="h-3 w-3/5" />
  </div>
</div>
<Skeleton className="h-32 w-full rounded-lg" />`

export const dos = [
  "실제 콘텐츠의 형태·크기와 최대한 비슷한 뼈대를 그려 레이아웃 시프트를 막는다.",
  "로딩이 끝나면 즉시 실제 콘텐츠로 교체하고 Skeleton을 걷어낸다.",
  "여러 항목 리스트는 각 항목의 아바타·제목·설명 구조를 그대로 반영한다.",
]

export const donts = [
  "3초 이상 걸리는 로딩에 Skeleton만 두지 않는다 — 진행 표시(Progress/Spinner)를 함께 고려한다.",
  "Skeleton 색상을 임의 커스텀 색으로 바꿔 다크모드에서 대비가 깨지게 하지 않는다.",
]
