import { DownloadSimpleIcon, PlusCircleIcon, UploadSimpleIcon } from "@phosphor-icons/react/dist/ssr"

import { ActionCard } from "@/components/action-card"

export const demo = (
  <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
    <ActionCard
      icon={<PlusCircleIcon className="size-5 text-primary" aria-hidden />}
      title="종목 추가"
      description="관심 종목을 포트폴리오에 등록합니다."
      actionLabel="추가하기"
    />
    <ActionCard
      icon={<DownloadSimpleIcon className="size-5 text-chart-1" aria-hidden />}
      title="데이터 내보내기"
      description="현재 테이블을 JSON 으로 다운로드합니다."
      actionLabel="내보내기"
    />
    <ActionCard
      icon={<UploadSimpleIcon className="size-5 text-warning" aria-hidden />}
      title="데이터 가져오기"
      description="백업 JSON 을 업로드해 복원합니다."
      actionLabel="가져오기"
    />
  </div>
)

export const code = `<ActionCard
  icon={<PlusCircleIcon className="size-5 text-primary" />}
  title="종목 추가"
  description="관심 종목을 포트폴리오에 등록합니다."
  actionLabel="추가하기"
  onClick={openAddDialog} />`

export const dos = [
  "기능 진입·바로가기 그리드에 쓴다 — 카드당 액션 정확히 하나.",
  "아이콘 색으로 액션 계열을 구분하되 시맨틱 토큰만 쓴다(primary/chart-*/warning).",
  "description 은 액션의 결과를 한 문장으로 적는다.",
]

export const donts = [
  "카드 전체 클릭과 버튼 클릭에 다른 동작을 걸지 않는다 — 동작은 버튼 하나로 모은다.",
  "파괴적 액션(삭제 등)을 이 카드로 노출하지 않는다 — confirm-dialog 를 거치는 별도 UI 로.",
]
