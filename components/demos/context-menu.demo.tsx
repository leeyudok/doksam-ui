import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export const demo = (
  <ContextMenu>
    <ContextMenuTrigger className="flex h-24 w-64 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
      여기를 우클릭하세요
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuLabel>파일 작업</ContextMenuLabel>
      <ContextMenuItem>
        이름 바꾸기
        <ContextMenuShortcut>F2</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        복제
        <ContextMenuShortcut>⌘D</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem variant="destructive">
        삭제
        <ContextMenuShortcut>⌫</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
)

export const code = `<ContextMenu>
  <ContextMenuTrigger className="flex h-24 w-64 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
    여기를 우클릭하세요
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuLabel>파일 작업</ContextMenuLabel>
    <ContextMenuItem>
      이름 바꾸기
      <ContextMenuShortcut>F2</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive">삭제</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`

export const dos = [
  "파일 목록·캔버스처럼 우클릭 관례가 자연스러운 영역에만 사용한다.",
  "동일한 액션을 다른 방식(툴바 등)으로도 접근 가능하게 해 터치 기기 사용자를 배려한다.",
  "파괴적 액션은 variant='destructive'와 ContextMenuSeparator로 시각적으로 분리한다.",
]

export const donts = [
  "모바일 전용 화면의 유일한 액션 경로로 ContextMenu만 제공하지 않는다 — 우클릭이 없다.",
  "트리거 영역 밖 우클릭에도 메뉴가 뜨는 것처럼 브라우저 기본 메뉴를 막지 않는다.",
]
