"use client"

import { useState } from "react"

import { MagnifyingGlassIcon, QuotesIcon, StackIcon } from "@phosphor-icons/react/dist/ssr"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { QUERIES } from "../_data/queries"
import { AnswerView } from "./answer-view"
import { IndexView } from "./index-view"
import { SearchView } from "./search-view"

/**
 * RAG 검색 콘솔 본체 — 탭을 client 에서 전환하고, 탭 사이에서 공유하는
 * 상태(선택 질의 · 선택 청크)의 유일한 소유자다. 각 뷰는 props 로 상태와
 * 콜백을 받는 프레젠테이션 컴포넌트다.
 */
export function RagConsole() {
  const [selectedQueryId, setSelectedQueryId] = useState(QUERIES[0].id)
  const [selectedChunkId, setSelectedChunkId] = useState<string | null>(null)

  const query = QUERIES.find((q) => q.id === selectedQueryId) ?? QUERIES[0]

  function handleSelectQuery(queryId: string) {
    setSelectedQueryId(queryId)
    // 질의를 바꾸면 이전 질의의 청크 선택이 새 질의의 인용 패널에 남지 않도록 리셋한다.
    setSelectedChunkId(null)
  }

  return (
    <Tabs defaultValue="search" className="w-full gap-4">
      <TabsList className="h-9 w-full max-w-md">
        <TabsTrigger value="search">
          <MagnifyingGlassIcon aria-hidden />
          검색
        </TabsTrigger>
        <TabsTrigger value="answer">
          <QuotesIcon aria-hidden />
          답변
        </TabsTrigger>
        <TabsTrigger value="index">
          <StackIcon aria-hidden />
          색인
        </TabsTrigger>
      </TabsList>

      <TabsContent value="search">
        <SearchView
          queries={QUERIES}
          selectedQueryId={selectedQueryId}
          query={query}
          selectedChunkId={selectedChunkId}
          onSelectQuery={handleSelectQuery}
          onSelectChunk={setSelectedChunkId}
        />
      </TabsContent>
      <TabsContent value="answer">
        <AnswerView queryId={query.id} selectedChunkId={selectedChunkId} onSelectChunk={setSelectedChunkId} />
      </TabsContent>
      <TabsContent value="index">
        <IndexView />
      </TabsContent>
    </Tabs>
  )
}
