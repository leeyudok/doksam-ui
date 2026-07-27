import { ScreenHelpDialog } from "@/components/screen-help-dialog"

export const demo = (
  <div className="flex items-center gap-2">
    <ScreenHelpDialog
      title="주문 관리 화면 매뉴얼"
      description="이 화면의 용도와 보는 방법입니다."
      items={[
        { title: "이 화면은?", body: "오늘 접수된 주문을 상태별로 확인하고 처리하는 화면입니다." },
        { title: "상태 배지", body: "신규·처리중·완료 배지 색으로 진행 단계를 구분합니다." },
      ]}
    />
    <span className="text-sm text-muted-foreground">← 화면 제목 옆에 이 버튼을 배치한다</span>
  </div>
)

export const code = `<div className="flex items-center gap-2">
  <ScreenHelpDialog
    title="주문 관리 화면 매뉴얼"
    description="이 화면의 용도와 보는 방법입니다."
    items={[
      { title: "이 화면은?", body: "오늘 접수된 주문을 상태별로 확인하고 처리하는 화면입니다." },
      { title: "상태 배지", body: "신규·처리중·완료 배지 색으로 진행 단계를 구분합니다." },
    ]}
  />
  <h1>주문 관리</h1>
</div>`

export const dos = [
  "화면 제목 옆 (?) 버튼 패턴으로 배치해 어느 화면의 도움말인지 명확히 한다.",
  "items 는 제목+본문 짧은 목록으로 구성한다 — 긴 문서는 별도 문서로 링크한다.",
  "title·description 은 해당 화면 이름을 그대로 반복해 검색·스크린리더 문맥을 유지한다.",
]

export const donts = [
  "페이지 전체 사용 설명서 대용으로 남용하지 않는다 — 화면당 요점만 담는다.",
  "onOpenChange 를 직접 관리하지 않는다 — Dialog 내부 상태에 위임한다.",
]
