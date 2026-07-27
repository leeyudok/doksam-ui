"use client"

import { NotePencilIcon, TagIcon } from "@phosphor-icons/react/dist/ssr"

import { KeywordCloud } from "@/components/keyword-cloud"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { KEYWORDS, MEMOS } from "../_data/company"

/**
 * 연관 키워드 + 메모 카드(#53) — 공유 KeywordCloud(연관 키워드, 클릭 시 관련 항목
 * 펼침)를 재사용하고 그 아래 가상 애널리스트 메모를 타임라인 형태로 쌓는다.
 * KeywordCloud 가 client 컴포넌트라 이 섹션 전체를 client 로 둔다.
 */
export function TagsMemo() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TagIcon className="size-4" />
            연관 키워드
          </CardTitle>
        </CardHeader>
        <CardContent>
          <KeywordCloud keywords={KEYWORDS} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <NotePencilIcon className="size-4" />
            내부 메모
            <span className="text-xs font-normal text-muted-foreground">{MEMOS.length}건</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-3">
            {MEMOS.map((memo) => (
              <li key={memo.id} className="rounded-lg border bg-muted/40 p-3">
                <p className="text-sm leading-relaxed text-foreground">{memo.text}</p>
                <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{memo.author}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={memo.date} className="font-mono">
                    {memo.date}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
