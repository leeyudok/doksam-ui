import { AvatarGroup } from "@/components/avatar-group"

const users = [
  { name: "김서연" },
  { name: "이도윤" },
  { name: "박지민" },
  { name: "최하은" },
  { name: "정우진" },
  { name: "한소율" },
]

export const demo = (
  <div className="flex flex-wrap items-center gap-6">
    <AvatarGroup users={users} max={4} />
    <AvatarGroup users={users.slice(0, 3)} max={4} size="lg" />
    <AvatarGroup users={users} max={3} size="sm" />
  </div>
)

export const code = `const users = [
  { name: "김서연" },
  { name: "이도윤" },
  { name: "박지민" },
  { name: "최하은" },
  { name: "정우진" },
  { name: "한소율" },
]

<AvatarGroup users={users} max={4} />`

export const dos = [
  "인원이 max를 넘으면 자동으로 '+N' 카운트가 붙는다 — 직접 문자열을 만들지 않는다.",
  "이름 대신 표시할 이니셜이 있으면 fallback으로 명시해 자동 절삭보다 정확한 값을 쓴다.",
  "리스트 항목이 아니라 '한 그룹의 참여자 요약'을 보여줄 때만 쓴다.",
]

export const donts = [
  "외부 이미지 URL(AvatarImage)을 끼워 넣지 않는다 — 이 컴포넌트는 이니셜 Fallback 전용이다.",
  "max를 지나치게 작게 줘 참여자 대부분이 '+N'에 묻히게 하지 않는다.",
]
