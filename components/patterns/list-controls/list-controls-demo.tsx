"use client"

import { useMemo, useState, type FormEvent } from "react"
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface ListItem {
  id: string
  title: string
  type: "guide" | "update" | "notice"
  updatedAt: string
}

const TYPE_TABS = [
  { key: "", label: "전체" },
  { key: "guide", label: "가이드" },
  { key: "update", label: "업데이트" },
  { key: "notice", label: "공지" },
] as const

const PAGE_SIZE = 4

const ITEMS: ListItem[] = [
  { id: "1", title: "설치 가이드", type: "guide", updatedAt: "2026-07-01" },
  { id: "2", title: "환경 변수 설정 가이드", type: "guide", updatedAt: "2026-06-29" },
  { id: "3", title: "v3.2 업데이트 노트", type: "update", updatedAt: "2026-06-27" },
  { id: "4", title: "정기 점검 공지", type: "notice", updatedAt: "2026-06-25" },
  { id: "5", title: "API 마이그레이션 가이드", type: "guide", updatedAt: "2026-06-20" },
  { id: "6", title: "v3.1 업데이트 노트", type: "update", updatedAt: "2026-06-18" },
  { id: "7", title: "요금제 변경 공지", type: "notice", updatedAt: "2026-06-15" },
  { id: "8", title: "보안 패치 업데이트", type: "update", updatedAt: "2026-06-10" },
  { id: "9", title: "권한 관리 가이드", type: "guide", updatedAt: "2026-06-05" },
  { id: "10", title: "서비스 점검 완료 공지", type: "notice", updatedAt: "2026-06-01" },
]

interface ListParams {
  type: string
  q: string
  page: number
}

const INITIAL_PARAMS: ListParams = { type: "", q: "", page: 0 }

/**
 * URLSearchParams로 다음 상태의 쿼리스트링을 만든다.
 * 실서비스에서는 이 함수의 반환값이 그대로 <Link href> 가 되고, 서버 컴포넌트가
 * searchParams prop으로 같은 값을 읽어 SSR 결과에 반영한다 — 클라이언트 상태가 아니라 URL이 단일 진실원천이다.
 */
function buildQuery(params: ListParams): string {
  const sp = new URLSearchParams()
  if (params.type) sp.set("type", params.type)
  if (params.q) sp.set("q", params.q)
  if (params.page > 0) sp.set("page", String(params.page))
  const qs = sp.toString()
  return qs ? `?${qs}` : ""
}

/** URL 기반 탭 + 검색 필터 + 페이지네이션 종합 데모. */
export function ListControlsDemo() {
  const [params, setParams] = useState<ListParams>(INITIAL_PARAMS)
  const [qInput, setQInput] = useState("")

  const filtered = useMemo(() => {
    return ITEMS.filter((item) => {
      if (params.type && item.type !== params.type) return false
      if (params.q && !item.title.toLowerCase().includes(params.q.toLowerCase())) return false
      return true
    })
  }, [params.type, params.q])

  const lastPage = Math.max(0, Math.ceil(filtered.length / PAGE_SIZE) - 1)
  const page = Math.min(params.page, lastPage)
  const pageItems = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  function goTab(type: string) {
    // 탭(필터 축)을 바꾸면 이전 페이지 번호는 더 이상 유효하지 않을 수 있으므로 1페이지로 되돌린다.
    setParams((prev) => ({ ...prev, type, page: 0 }))
  }

  function submitSearch(e: FormEvent) {
    e.preventDefault()
    setParams((prev) => ({ ...prev, q: qInput.trim(), page: 0 }))
  }

  function resetSearch() {
    setQInput("")
    setParams((prev) => ({ ...prev, q: "", page: 0 }))
  }

  function goPage(next: number) {
    setParams((prev) => ({ ...prev, page: Math.max(0, Math.min(lastPage, next)) }))
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap gap-1">
        {TYPE_TABS.map((tab) => (
          <button
            key={tab.key || "all"}
            type="button"
            aria-pressed={params.type === tab.key}
            onClick={() => goTab(tab.key)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              params.type === tab.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form role="search" onSubmit={submitSearch} className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[160px] flex-1">
          <MagnifyingGlassIcon
            size={14}
            weight="regular"
            className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={qInput}
            onChange={(e) => setQInput(e.target.value)}
            placeholder="제목으로 검색"
            className="h-8 pl-8 text-xs"
          />
        </div>
        <Button type="submit" size="sm">
          검색
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={resetSearch}>
          초기화
        </Button>
      </form>

      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
        {pageItems.length === 0 ? (
          <li className="p-4 text-center text-xs text-muted-foreground">조건에 맞는 항목이 없습니다.</li>
        ) : (
          pageItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-2 p-3 text-xs">
              <span className="font-medium text-foreground">{item.title}</span>
              <span className="text-muted-foreground">{item.updatedAt}</span>
            </li>
          ))
        )}
      </ul>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={buildQuery({ ...params, page: Math.max(0, page - 1) }) || "?"}
              onClick={(e) => {
                e.preventDefault()
                goPage(page - 1)
              }}
              aria-disabled={page === 0}
              className={page === 0 ? "pointer-events-none opacity-40" : undefined}
            />
          </PaginationItem>
          <PaginationItem>
            <span className="px-2 text-xs text-muted-foreground">
              {page + 1} / {lastPage + 1}
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={buildQuery({ ...params, page: Math.min(lastPage, page + 1) }) || "?"}
              onClick={(e) => {
                e.preventDefault()
                goPage(page + 1)
              }}
              aria-disabled={page === lastPage}
              className={page === lastPage ? "pointer-events-none opacity-40" : undefined}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <p className="font-mono text-[11px] text-muted-foreground">
        결과 URL: <code>{buildQuery(params) || "/"}</code>
      </p>
    </div>
  )
}
