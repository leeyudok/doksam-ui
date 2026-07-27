"use client"

import { type CSSProperties, useState } from "react"
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
  type DraggableAttributes,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities"
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { DotsSixVerticalIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface KanbanCardData {
  id: string
  title: string
  label: string
  labelClass: string
  assignee: string
}

interface KanbanColumn {
  id: string
  title: string
}

const COLUMNS: KanbanColumn[] = [
  { id: "todo", title: "할 일" },
  { id: "in-progress", title: "진행 중" },
  { id: "done", title: "완료" },
]

const INITIAL_BOARD: Record<string, KanbanCardData[]> = {
  todo: [
    { id: "card-1", title: "요금제 페이지 카피 검수", label: "기획", labelClass: "bg-chart-3/15 text-chart-3", assignee: "이유" },
    { id: "card-2", title: "가격 카드 다크모드 대비 확인", label: "디자인", labelClass: "bg-chart-1/15 text-chart-1", assignee: "박서" },
    { id: "card-3", title: "칸반 보드 접근성 키보드 테스트", label: "QA", labelClass: "bg-chart-4/15 text-chart-4", assignee: "김도" },
  ],
  "in-progress": [
    { id: "card-4", title: "드래그 앤 드롭 컬럼 이동 구현", label: "개발", labelClass: "bg-chart-2/15 text-chart-2", assignee: "이유" },
    { id: "card-5", title: "결제 위젯 401 에러 수정", label: "버그", labelClass: "bg-destructive/15 text-destructive", assignee: "최민" },
  ],
  done: [
    { id: "card-6", title: "가격 티어 데이터 모델 정의", label: "개발", labelClass: "bg-chart-2/15 text-chart-2", assignee: "박서" },
  ],
}

function initialsOf(name: string): string {
  return name.slice(0, 2)
}

function findColumnId(board: Record<string, KanbanCardData[]>, id: string): string | undefined {
  if (id in board) return id
  return Object.keys(board).find((columnId) => board[columnId].some((card) => card.id === id))
}

interface KanbanCardViewProps {
  card: KanbanCardData
  ariaLabel?: string
  dragHandleProps?: {
    ref: (node: HTMLElement | null) => void
    style: CSSProperties
    attributes: DraggableAttributes
    listeners: SyntheticListenerMap | undefined
  }
}

function KanbanCardView({ card, ariaLabel, dragHandleProps }: Readonly<KanbanCardViewProps>) {
  return (
    <Card
      ref={dragHandleProps?.ref}
      style={dragHandleProps?.style}
      aria-label={ariaLabel}
      className="touch-none"
      {...(dragHandleProps ? { ...dragHandleProps.attributes, ...dragHandleProps.listeners } : {})}
    >
      <CardContent className="flex flex-col gap-2 px-3 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className={cn("border-transparent", card.labelClass)}>
            {card.label}
          </Badge>
          <DotsSixVerticalIcon size={14} className="mt-0.5 shrink-0 text-muted-foreground" aria-hidden />
        </div>
        <p className="text-sm text-foreground">{card.title}</p>
        <div className="flex items-center justify-end">
          <Avatar size="sm" title={card.assignee}>
            <AvatarFallback>{initialsOf(card.assignee)}</AvatarFallback>
          </Avatar>
        </div>
      </CardContent>
    </Card>
  )
}

function SortableKanbanCard({ card }: Readonly<{ card: KanbanCardData }>) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({ id: card.id })
  return (
    <div className={cn(isDragging && "opacity-40")}>
      <KanbanCardView
        card={card}
        ariaLabel={`${card.title} — ${card.label}, 담당자 ${card.assignee}`}
        dragHandleProps={{
          ref: setNodeRef,
          style: { transform: CSS.Transform.toString(transform), transition },
          attributes,
          listeners,
        }}
      />
    </div>
  )
}

interface KanbanColumnViewProps {
  column: KanbanColumn
  cards: KanbanCardData[]
}

function KanbanColumnView({ column, cards }: Readonly<KanbanColumnViewProps>) {
  const { setNodeRef } = useDroppable({ id: column.id })
  const cardIds = cards.map((card) => card.id)

  return (
    <div className="flex w-64 shrink-0 flex-col gap-3 rounded-lg border border-border bg-muted/30 p-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
        <Badge variant="outline">{cards.length}</Badge>
      </div>
      <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="flex min-h-16 flex-col gap-2">
          {cards.length === 0 ? (
            <p className="rounded-md border border-dashed border-border p-3 text-center text-xs text-muted-foreground">
              카드를 여기로 옮기세요
            </p>
          ) : (
            cards.map((card) => <SortableKanbanCard key={card.id} card={card} />)
          )}
        </div>
      </SortableContext>
    </div>
  )
}

/**
 * 드래그 앤 드롭 칸반 보드(#33). @dnd-kit/core + @dnd-kit/sortable로 컬럼 간 카드 이동을
 * 지원한다(components/table-sortable.tsx 의 단일 리스트 정렬 방식을, 다중 컨테이너 이동으로
 * 확장). 라벨 색은 chart-1~5 · destructive 시맨틱 토큰만 사용하고, 담당자는 이니셜
 * AvatarFallback으로 표시해 외부 이미지 없이 self-host를 유지한다.
 */
export function KanbanBoardDemo() {
  const [board, setBoard] = useState(INITIAL_BOARD)
  const [activeCard, setActiveCard] = useState<KanbanCardData | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor)
  )

  function handleDragStart(event: DragStartEvent) {
    const columnId = findColumnId(board, String(event.active.id))
    const card = columnId ? board[columnId].find((c) => c.id === event.active.id) : undefined
    setActiveCard(card ?? null)
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveCard(null)
    const { active, over } = event
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)

    const fromColumnId = findColumnId(board, activeId)
    const toColumnId = findColumnId(board, overId)
    if (!fromColumnId || !toColumnId) return

    setBoard((current) => {
      const fromCards = [...current[fromColumnId]]
      const activeIndex = fromCards.findIndex((card) => card.id === activeId)
      if (activeIndex === -1) return current
      const [movedCard] = fromCards.splice(activeIndex, 1)

      if (fromColumnId === toColumnId) {
        const overIndex = fromCards.findIndex((card) => card.id === overId)
        const insertAt = overIndex === -1 ? fromCards.length : overIndex
        fromCards.splice(insertAt, 0, movedCard)
        return { ...current, [fromColumnId]: fromCards }
      }

      const toCards = [...current[toColumnId]]
      const overIndex = toCards.findIndex((card) => card.id === overId)
      const insertAt = overIndex === -1 ? toCards.length : overIndex
      toCards.splice(insertAt, 0, movedCard)
      return { ...current, [fromColumnId]: fromCards, [toColumnId]: toCards }
    })
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex w-full gap-3 overflow-x-auto pb-2">
        {COLUMNS.map((column) => (
          <KanbanColumnView key={column.id} column={column} cards={board[column.id]} />
        ))}
      </div>
      <DragOverlay>{activeCard ? <KanbanCardView card={activeCard} /> : null}</DragOverlay>
    </DndContext>
  )
}
