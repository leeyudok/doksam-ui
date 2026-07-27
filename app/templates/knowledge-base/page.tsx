import { Badge } from "@/components/ui/badge"

import { KnowledgeBaseConsole } from "./_components/knowledge-base-console"
import { BOARD_CARDS } from "./_data/board"
import { LOG_SESSIONS } from "./_data/logs"
import { WIKI_DOCS } from "./_data/wiki"

const DOC_COUNT = Object.keys(WIKI_DOCS).length

export default function KnowledgeBaseConsolePage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Knowledge Base · 지식관리 콘솔
        </Badge>
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">위키 · 보드 · 로그 콘솔</h2>
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
          팀 지식을 한곳에서 다루는 콘솔 데모입니다. 위키 탭은 문서 트리와 마크다운풍 본문·목차를, 보드 탭은 카테고리별
          아이디어 카드를, 로그 탭은 날짜별 작업 세션 타임라인을 보여 줍니다. 문서 {DOC_COUNT}건 · 카드 {BOARD_CARDS.length}건 ·
          세션 {LOG_SESSIONS.length}건이 담겨 있습니다.
        </p>
      </section>

      <KnowledgeBaseConsole />

      <p className="text-xs text-muted-foreground">가상 데이터 · 데모</p>
    </div>
  )
}
