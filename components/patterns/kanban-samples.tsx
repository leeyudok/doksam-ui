import type { PatternSampleData } from "@/components/showcase/pattern-sample"
import { KanbanBoardDemo } from "@/components/patterns/kanban/kanban-board-demo"

export const KANBAN_SAMPLES: PatternSampleData[] = [
  {
    num: 1,
    title: "드래그 앤 드롭 칸반 보드",
    description:
      "할 일 / 진행 중 / 완료 3개 컬럼 사이로 카드를 드래그해 옮길 수 있는 보드입니다. 카드에는 라벨 배지와 담당자 아바타가 붙습니다.",
    demo: <KanbanBoardDemo />,
    code: `function findColumnId(board, id) {
  if (id in board) return id
  return Object.keys(board).find((columnId) => board[columnId].some((card) => card.id === id))
}

<DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
  <div className="flex w-full gap-3 overflow-x-auto pb-2">
    {columns.map((column) => (
      <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
        {/* useDroppable({ id: column.id }) 로 빈 컬럼도 드롭 대상이 되게 한다 */}
      </SortableContext>
    ))}
  </div>
  <DragOverlay>{activeCard ? <KanbanCardView card={activeCard} /> : null}</DragOverlay>
</DndContext>`,
    notes: [
      "카드/컬럼 이동은 컬럼별 SortableContext + 컬럼 전체를 감싸는 useDroppable을 조합해, 카드가 없는 빈 컬럼에도 드롭할 수 있게 한다.",
      "onDragEnd 한 곳에서 같은 컬럼 내 재정렬과 다른 컬럼으로의 이동을 모두 처리해 로직을 한 군데로 모은다.",
      "라벨 색은 chart-1~5 · destructive 시맨틱 토큰만 사용하고(디자인=chart-1, 개발=chart-2, 기획=chart-3, QA=chart-4, 버그=destructive), 하드코딩 hex를 쓰지 않는다.",
      "담당자는 외부 프로필 이미지 대신 이니셜 AvatarFallback만 사용해 self-host(외부 이미지 요청 없음)를 유지한다.",
      "좁은 화면에서는 컬럼을 세로로 쌓지 않고 overflow-x-auto로 가로 스크롤시켜 각 컬럼의 세로 공간을 유지한다.",
      "DragOverlay로 드래그 중인 카드를 원래 위치와 분리해 최상위에 렌더링해, 드롭 대상 컬럼 위로 자연스럽게 따라오게 한다.",
    ],
  },
]
