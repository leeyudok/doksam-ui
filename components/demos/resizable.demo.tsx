import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export const demo = (
  <ResizablePanelGroup
    orientation="horizontal"
    className="h-48 w-full max-w-sm rounded-lg border"
  >
    <ResizablePanel defaultSize={35} minSize={20}>
      <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
        파일 목록
      </div>
    </ResizablePanel>
    <ResizableHandle withHandle />
    <ResizablePanel defaultSize={65} minSize={30}>
      <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
        미리보기
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
)

export const code = `<ResizablePanelGroup orientation="horizontal" className="h-48 rounded-lg border">
  <ResizablePanel defaultSize={35} minSize={20}>
    파일 목록
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={65} minSize={30}>
    미리보기
  </ResizablePanel>
</ResizablePanelGroup>`

export const dos = [
  "ResizablePanelGroup에 명시적 높이를 지정해 패널이 실제로 드래그 가능한 영역을 갖게 한다.",
  "minSize를 지정해 패널이 0에 가깝게 눌려 콘텐츠가 사라지지 않도록 한다.",
  "withHandle로 드래그 가능 지점을 시각적으로 드러낸다.",
]

export const donts = [
  "패널 2개 미만이나 화면 폭이 좁은 모바일에서 억지로 가로 분할을 유지하지 않는다.",
  "패널 안 콘텐츠에 overflow 처리 없이 긴 텍스트를 그대로 흘려보내지 않는다.",
]
