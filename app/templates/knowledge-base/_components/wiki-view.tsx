"use client"

import * as React from "react"
import {
  CalendarBlankIcon,
  ClockIcon,
  HashIcon,
  ListDashesIcon,
  TagIcon,
  UserIcon,
} from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { TreeView } from "@/components/tree-view"
import { cn } from "@/lib/utils"

import {
  WIKI_DEFAULT_DOC,
  WIKI_DEFAULT_EXPANDED,
  WIKI_DOCS,
  WIKI_TREE,
  type WikiDoc,
} from "../_data/wiki"

const STATUS_VARIANT: Record<WikiDoc["status"], "default" | "secondary" | "outline"> = {
  정식: "default",
  검토중: "secondary",
  초안: "outline",
}

/**
 * 위키 탭 — 좌측 tree-view 문서 트리 + 우측 마크다운풍 본문 + 우측 TOC.
 * 트리 선택 상태를 소유하고, 선택 문서의 섹션에서 목차를 파생한다. 모바일에서는
 * 트리 → 본문 → 목차 순으로 세로 스택된다.
 */
export function WikiView() {
  const [selectedId, setSelectedId] = React.useState(WIKI_DEFAULT_DOC)
  const doc = WIKI_DOCS[selectedId] ?? WIKI_DOCS[WIKI_DEFAULT_DOC]

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,12rem)]">
      {/* 문서 트리 */}
      <aside className="flex flex-col gap-2">
        <p className="flex items-center gap-1.5 px-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          <ListDashesIcon size={13} weight="bold" aria-hidden />
          문서 트리
        </p>
        <TreeView
          nodes={WIKI_TREE}
          selectedId={selectedId}
          defaultExpandedIds={WIKI_DEFAULT_EXPANDED}
          onSelectedIdChange={(id) => {
            if (WIKI_DOCS[id]) setSelectedId(id)
          }}
          aria-label="위키 문서 트리"
        />
      </aside>

      {/* 본문 */}
      <article className="min-w-0 rounded-lg border border-border bg-card p-5 sm:p-6">
        <header className="flex flex-col gap-3 border-b border-border pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={STATUS_VARIANT[doc.status]}>{doc.status}</Badge>
            <Badge variant="outline">{doc.category}</Badge>
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-foreground">{doc.title}</h3>
          <dl className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <UserIcon size={13} aria-hidden />
              <dt className="sr-only">작성</dt>
              <dd>{doc.author}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarBlankIcon size={13} aria-hidden />
              <dt className="sr-only">수정일</dt>
              <dd className="font-mono">{doc.updated}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <ClockIcon size={13} aria-hidden />
              <dt className="sr-only">읽기 시간</dt>
              <dd>{doc.readMinutes}분 읽기</dd>
            </div>
          </dl>
          <div className="flex flex-wrap items-center gap-1.5">
            {doc.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md border border-border px-1.5 py-0.5 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <TagIcon size={11} aria-hidden />
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="flex flex-col gap-6 pt-5">
          {doc.sections.map((section) => (
            <section key={section.id} id={`sec-${section.id}`} className="flex flex-col gap-2">
              <h4
                className={cn(
                  "group flex items-center gap-1.5 font-semibold tracking-tight text-foreground",
                  section.level === 2 ? "text-base" : "text-sm"
                )}
              >
                <HashIcon
                  size={section.level === 2 ? 15 : 13}
                  className="text-muted-foreground/50 transition-colors group-hover:text-primary"
                  aria-hidden
                />
                {section.heading}
              </h4>
              {section.paragraphs.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>

      {/* 목차(TOC) */}
      <aside className="hidden lg:block">
        <div className="sticky top-4 flex flex-col gap-2">
          <p className="flex items-center gap-1.5 px-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            <ListDashesIcon size={13} weight="bold" aria-hidden />
            목차
          </p>
          <nav aria-label="문서 목차" className="flex flex-col gap-0.5 border-l border-border">
            {doc.sections.map((section) => (
              <a
                key={section.id}
                href={`#sec-${section.id}`}
                className={cn(
                  "-ml-px border-l-2 border-transparent py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground",
                  section.level === 2 ? "pl-3" : "pl-6"
                )}
              >
                {section.heading}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  )
}
