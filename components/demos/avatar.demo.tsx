import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"

export const demo = (
  <div className="flex flex-wrap items-center gap-6">
    <Avatar size="sm">
      <AvatarFallback>김서</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>이도</AvatarFallback>
    </Avatar>
    <Avatar size="lg" className="relative">
      <AvatarFallback>박지</AvatarFallback>
      <AvatarBadge />
    </Avatar>
    <AvatarGroup>
      <Avatar>
        <AvatarFallback>김서</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>이도</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>박지</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+5</AvatarGroupCount>
    </AvatarGroup>
  </div>
)

export const code = `<Avatar size="sm">
  <AvatarImage src="/users/kim.jpg" alt="김서연" />
  <AvatarFallback>김서</AvatarFallback>
</Avatar>
<Avatar size="lg" className="relative">
  <AvatarImage src="/users/park.jpg" alt="박지민" />
  <AvatarFallback>박지</AvatarFallback>
  <AvatarBadge />
</Avatar>
<AvatarGroup>
  <Avatar><AvatarFallback>김서</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>이도</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>박지</AvatarFallback></Avatar>
  <AvatarGroupCount>+5</AvatarGroupCount>
</AvatarGroup>`

export const dos = [
  "AvatarImage가 로드 실패할 경우를 대비해 AvatarFallback을 항상 함께 둔다.",
  "Fallback 텍스트는 이름 앞 2글자 등 짧고 판별 가능한 값을 쓴다.",
  "참여자 목록처럼 인원이 많을 때는 AvatarGroup + AvatarGroupCount로 축약한다.",
]

export const donts = [
  "온라인/알림 표시용 AvatarBadge를 브랜드 로고 등 정보 전달용으로 쓰지 않는다.",
  "alt 텍스트를 생략하지 않는다 — 스크린리더 사용자에게 인물 정보가 사라진다.",
]
