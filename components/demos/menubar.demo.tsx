import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

export const demo = (
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>파일</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          새 문서
          <MenubarShortcut>⌘N</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>
          열기
          <MenubarShortcut>⌘O</MenubarShortcut>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem>
          저장
          <MenubarShortcut>⌘S</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>편집</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          실행 취소
          <MenubarShortcut>⌘Z</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>
          다시 실행
          <MenubarShortcut>⇧⌘Z</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>보기</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>전체 화면</MenubarItem>
        <MenubarItem>사이드바 토글</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
)

export const code = `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>파일</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        새 문서
        <MenubarShortcut>⌘N</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>저장</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>편집</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>실행 취소</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`

export const dos = [
  "데스크톱 웹앱처럼 항상 보이는 최상단 메뉴가 필요한 화면에만 사용한다.",
  "단축키가 있는 항목은 MenubarShortcut으로 오른쪽 정렬해 일관되게 표시한다.",
  "메뉴 개수는 화면 너비 안에서 한 줄로 유지될 만큼만 둔다.",
]

export const donts = [
  "모바일 레이아웃에 그대로 노출하지 않는다 — 좁은 화면에서는 Sheet·DropdownMenu로 대체한다.",
  "Menubar 항목 라벨을 아이콘만으로 대체해 어떤 메뉴인지 알 수 없게 하지 않는다.",
]
