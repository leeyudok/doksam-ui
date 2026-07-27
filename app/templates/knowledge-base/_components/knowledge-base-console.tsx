"use client"

import {
  BookOpenIcon,
  ClockCounterClockwiseIcon,
  KanbanIcon,
} from "@phosphor-icons/react/dist/ssr"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { BoardView } from "./board-view"
import { LogsView } from "./logs-view"
import { WikiView } from "./wiki-view"

/**
 * 지식관리 콘솔 본체 — 위키/보드/로그 3개 탭을 client 에서 전환한다(Radix Tabs).
 * 각 탭 뷰는 자체 데이터 모듈을 읽는 프레젠테이션 컴포넌트다. 탭 트리거에는
 * 아이콘을 붙여 시각 밀도를 높였다.
 */
export function KnowledgeBaseConsole() {
  return (
    <Tabs defaultValue="wiki" className="w-full gap-4">
      <TabsList className="h-9 w-full max-w-md">
        <TabsTrigger value="wiki">
          <BookOpenIcon aria-hidden />
          위키
        </TabsTrigger>
        <TabsTrigger value="board">
          <KanbanIcon aria-hidden />
          보드
        </TabsTrigger>
        <TabsTrigger value="logs">
          <ClockCounterClockwiseIcon aria-hidden />
          로그
        </TabsTrigger>
      </TabsList>

      <TabsContent value="wiki">
        <WikiView />
      </TabsContent>
      <TabsContent value="board">
        <BoardView />
      </TabsContent>
      <TabsContent value="logs">
        <LogsView />
      </TabsContent>
    </Tabs>
  )
}
