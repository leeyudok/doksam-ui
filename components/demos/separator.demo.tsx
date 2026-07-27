import { Separator } from "@/components/ui/separator"

export const demo = (
  <div className="w-full max-w-sm">
    <div>
      <h4 className="text-sm font-medium">계정 설정</h4>
      <p className="text-sm text-muted-foreground">프로필·보안·알림을 관리합니다.</p>
    </div>
    <Separator className="my-4" />
    <div className="flex h-5 items-center gap-4 text-sm">
      <span>프로필</span>
      <Separator orientation="vertical" />
      <span>보안</span>
      <Separator orientation="vertical" />
      <span>알림</span>
    </div>
  </div>
)

export const code = `<div>
  <h4>계정 설정</h4>
  <p>프로필·보안·알림을 관리합니다.</p>
</div>
<Separator className="my-4" />
<div className="flex h-5 items-center gap-4">
  <span>프로필</span>
  <Separator orientation="vertical" />
  <span>보안</span>
  <Separator orientation="vertical" />
  <span>알림</span>
</div>`

export const dos = [
  "vertical Separator를 쓸 때는 부모에 명시적 높이(h-*)를 지정해 선이 보이게 한다.",
  "의미 있는 구획 전환에만 사용하고, 여백 대체용으로 남용하지 않는다.",
]

export const donts = [
  "decorative=false를 실제 목록 구조 구분 없이 남발해 스크린리더 잡음을 만들지 않는다.",
  "테두리(border) 대신 항상 Separator를 강제하지 않는다 — 카드 등은 자체 border를 쓴다.",
]
