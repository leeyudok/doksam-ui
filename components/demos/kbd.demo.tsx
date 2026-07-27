import { Kbd, KbdGroup } from "@/components/ui/kbd"

export const demo = (
  <div className="flex flex-wrap items-center gap-4">
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      저장
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>S</Kbd>
      </KbdGroup>
    </div>
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      커맨드 팔레트 열기
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
    </div>
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      검색
      <Kbd>/</Kbd>
    </div>
  </div>
)

export const code = `<div className="flex items-center gap-2 text-sm text-muted-foreground">
  저장
  <KbdGroup>
    <Kbd>Ctrl</Kbd>
    <Kbd>S</Kbd>
  </KbdGroup>
</div>`

export const dos = [
  "여러 키를 조합할 때는 KbdGroup으로 묶어 순서와 간격을 일관되게 유지한다.",
  "실제 사용자 OS(맥/윈도우)에 맞는 조합키 표기(⌘/Ctrl)를 사용한다.",
  "단축키 옆에는 항상 해당 액션 이름을 텍스트로 함께 보여준다.",
]

export const donts = [
  "Kbd를 클릭 가능한 버튼처럼 사용하지 않는다 — 순수 표시용 요소다.",
  "존재하지 않거나 실제로 동작하지 않는 단축키를 표기하지 않는다.",
]
