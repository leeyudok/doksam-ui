import { DownloadIcon, TrashIcon } from "@phosphor-icons/react/dist/ssr"

import { TooltipIconButton } from "@/components/tooltip-icon-button"
import { TooltipProvider } from "@/components/ui/tooltip"

export const demo = (
  <TooltipProvider>
    <div className="flex items-center gap-2">
      <TooltipIconButton tip="다운로드" icon={<DownloadIcon size={16} weight="regular" />} />
      <TooltipIconButton
        tip="삭제"
        icon={<TrashIcon size={16} weight="regular" />}
        variant="destructive"
      />
    </div>
  </TooltipProvider>
)

export const code = `<TooltipIconButton tip="다운로드" icon={<DownloadIcon size={16} weight="regular" />} />
<TooltipIconButton
  tip="삭제"
  icon={<TrashIcon size={16} weight="regular" />}
  variant="destructive"
/>`

export const dos = [
  "tip 하나로 툴팁 텍스트와 aria-label을 동시에 채운다 — 별도로 aria-label을 다시 넘길 필요가 없다.",
  "아이콘만 있고 텍스트 레이블이 없는 모든 버튼에 기본으로 사용한다.",
  "짧은 동사형 tip(1~4글자)을 쓴다 — '다운로드', '삭제'처럼.",
  "TooltipProvider는 앱 최상단(app/layout.tsx)에 이미 있으므로 화면에서는 다시 감쌀 필요 없다 — 이 데모처럼 개별 스니펫에서만 예외적으로 감싼다.",
]

export const donts = [
  "아이콘 버튼을 Tooltip 없이 Button만으로 직접 만들지 않는다 — 접근성 라벨이 누락된다.",
  "tip에 화면에 이미 보이는 긴 문장을 그대로 복붙하지 않는다.",
]
