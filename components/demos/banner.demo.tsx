import { Banner } from "@/components/banner"

export const demo = (
  <div className="flex w-full max-w-md flex-col gap-3">
    <Banner variant="info">새 버전이 배포되었습니다. 새로고침 후 이용해 주세요.</Banner>
    <Banner variant="success">결제가 정상적으로 완료되었습니다.</Banner>
    <Banner variant="warning">저장 공간이 90%를 초과했습니다.</Banner>
    <Banner variant="destructive">서버 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.</Banner>
  </div>
)

export const code = `<Banner variant="info">새 버전이 배포되었습니다. 새로고침 후 이용해 주세요.</Banner>
<Banner variant="success">결제가 정상적으로 완료되었습니다.</Banner>
<Banner variant="warning">저장 공간이 90%를 초과했습니다.</Banner>
<Banner variant="destructive" onDismiss={() => track("banner_dismissed")}>
  서버 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.
</Banner>`

export const dos = [
  "메시지 성격에 맞는 variant(info/success/warning/destructive)를 골라 아이콘·색으로 중요도를 전달한다.",
  "사용자가 스스로 닫을 수 있게 두되, 재방문 시 다시 보여줄지는 상위에서 상태로 관리한다.",
  "onDismiss로 닫힘 이벤트를 잡아 로깅·영속화가 필요하면 상위에 알린다.",
]

export const donts = [
  "페이지 전체를 막는 치명적 오류를 Banner만으로 처리하지 않는다 — Dialog 등으로 명확히 알린다.",
  "닫기 버튼 없이 영구적으로 화면을 차지하게 방치하지 않는다.",
]
