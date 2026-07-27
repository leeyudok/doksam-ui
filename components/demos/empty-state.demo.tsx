import { EmptyStateDemo } from "./empty-state.demo.client"

export const demo = <EmptyStateDemo />

export const code = `<EmptyState message="데이터가 없습니다." />
<EmptyState icon={<TrayIcon />} message="수집된 뉴스 없음" subtext="수집 주기: 5분" />
<EmptyState message="등록된 종목이 없습니다." action={{ label: "종목 추가", onClick: addStock }} />`

export const dos = [
  "리스트·패널 안 간단한 빈 상태는 이 prop API 하나로 끝낸다 — message 는 필수, icon/subtext/action 은 선택.",
  "action 은 빈 상태를 벗어나는 다음 행동(추가·새로고침)을 정확히 하나만 제시한다.",
  "페이지 전체 빈 상태처럼 구성이 복잡하면 ui/empty 서브컴포넌트 조합으로 올라간다.",
]

export const donts = [
  "에러를 빈 상태로 표현하지 않는다 — 실패는 error-state, 없음은 empty-state.",
  "action 버튼을 두 개 이상 넣지 않는다 — 선택지가 필요하면 상위 화면에서 처리한다.",
]
