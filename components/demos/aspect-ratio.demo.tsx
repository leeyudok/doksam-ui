import { ImageSquareIcon } from "@phosphor-icons/react/dist/ssr"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export const demo = (
  <AspectRatio
    ratio={16 / 9}
    className="flex w-full max-w-sm items-center justify-center rounded-lg bg-muted text-muted-foreground"
  >
    <div className="flex flex-col items-center gap-2">
      <ImageSquareIcon size={28} weight="regular" />
      <span className="text-xs">썸네일 16:9</span>
    </div>
  </AspectRatio>
)

export const code = `<AspectRatio ratio={16 / 9} className="rounded-lg bg-muted">
  <img src="/thumbnail.jpg" alt="상품 썸네일" className="size-full object-cover" />
</AspectRatio>`

export const dos = [
  "이미지·영상 등 비율 고정이 필요한 콘텐츠를 감쌀 때만 사용한다.",
  "실제 이미지에는 object-cover와 함께 size-full을 지정해 잘림 없이 채운다.",
]

export const donts = [
  "텍스트 위주 카드처럼 가변 높이가 자연스러운 콘텐츠에 강제로 씌우지 않는다.",
  "ratio 값을 컴포넌트마다 제각각 지정해 그리드 전체 리듬을 깨지 않는다.",
]
