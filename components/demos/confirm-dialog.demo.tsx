import { ConfirmDialogDemo } from "./confirm-dialog.demo.client"

export const demo = <ConfirmDialogDemo />

export const code = `const [open, setOpen] = useState(false)

<ConfirmDialog
  open={open} onOpenChange={setOpen}
  title="종목을 삭제할까요?"
  description={<><b>한빛반도체(042700)</b> 를 포트폴리오에서 삭제합니다.</>}
  loading={deleting}
  onConfirm={async () => { await remove() }} />`

export const dos = [
  "삭제·초기화 등 되돌릴 수 없는 작업 전 확인에만 쓴다 — '되돌릴 수 없습니다' 문구가 항상 붙는다.",
  "onConfirm 이 비동기면 loading 을 함께 올려 확인 버튼을 잠그고 'OO 중…' 레이블로 전환한다.",
  "description 에 대상 식별 정보(이름·코드)를 굵게 넣어 무엇이 지워지는지 못 박는다.",
]

export const donts = [
  "일반 안내·선택 다이얼로그로 쓰지 않는다 — 그건 ui/dialog 몫이다.",
  "onConfirm 안에서 에러를 삼키지 않는다 — 실패 시 토스트 등으로 호출부가 알린다.",
]
