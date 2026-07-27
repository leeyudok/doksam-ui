import { ErrorStateDemo } from "./error-state.demo.client"

export const demo = <ErrorStateDemo />

export const code = `<ErrorState message="시세 조회에 실패했습니다." onRetry={refetch} />   {/* page */}
<ErrorState variant="inline" message="종목코드는 6자리 숫자여야 합니다." />
<ErrorState variant="simple" message="뉴스 조회 실패: 응답 시간 초과" />`

export const dos = [
  "화면 본문 전체가 실패하면 page(카드+재시도), 폼 필드·섹션 실패는 inline, 리스트 행·패널 구석은 simple.",
  "onRetry 는 page variant 에만 의미가 있다 — 재시도가 가능할 때만 넘긴다.",
  "메시지는 실패 대상 + 원인을 짧게 담는다(예: '뉴스 조회 실패: 응답 시간 초과').",
]

export const donts = [
  "simple 변형에 박스·배경을 덧입히지 않는다 — 박스가 필요하면 inline 을 쓴다.",
  "destructive 토큰 외의 빨강 팔레트(red-500 등)를 하드코딩하지 않는다.",
]
