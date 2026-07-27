import { CommandDemo } from "./command.demo.client"

export const demo = <CommandDemo />

export const code = `function CommandDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        명령어 검색
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} title="명령어 검색">
        <CommandInput placeholder="검색할 명령어를 입력하세요..." />
        <CommandList>
          <CommandEmpty>일치하는 결과가 없습니다.</CommandEmpty>
          <CommandGroup heading="이동">
            <CommandItem>내 프로필</CommandItem>
            <CommandItem>주문 내역</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}`

export const dos = [
  "전역 단축키(⌘K 등)와 함께 제공해 키보드 사용자의 접근성을 높인다.",
  "결과를 의미 단위(CommandGroup)로 묶고 Separator로 구분한다.",
  "결과가 없을 때 CommandEmpty로 다음 행동을 안내한다.",
]

export const donts = [
  "일반 페이지 내비게이션 메뉴 대체 용도로 남용하지 않는다 — 검색이 핵심 가치일 때만 쓴다.",
  "CommandItem 안에 클릭 시 페이지가 아예 새로고침되는 일반 a 태그를 넣지 않는다.",
]
