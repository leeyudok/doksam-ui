"use client"

import { useState } from "react"
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type SearchFilterStatus = "all" | "active" | "inactive"
export type SearchFilterSort = "newest" | "oldest" | "name"

export interface SearchFilterValue {
  search: string
  status: SearchFilterStatus
  sort: SearchFilterSort
}

export const SEARCH_FILTER_DEFAULT: SearchFilterValue = {
  search: "",
  status: "all",
  sort: "newest",
}

interface SearchFilterDemoProps {
  value: SearchFilterValue
  onChange: (value: SearchFilterValue) => void
  onReset?: () => void
}

/**
 * 검색어 + 상태/정렬 필터 드롭다운으로 구성하는 목록 상단 검색바.
 * 상태를 컴포넌트가 스스로 들고 있지 않고 value/onChange로 부모가 소유하는 controlled 컴포넌트다 —
 * 목록 페이지의 실제 검색바(서버 재조회 트리거, URL 동기화 등)에 그대로 얹어 재사용할 수 있다.
 */
export function SearchFilterDemo({ value, onChange, onReset }: Readonly<SearchFilterDemoProps>) {
  function handleReset() {
    if (onReset) {
      onReset()
      return
    }
    onChange(SEARCH_FILTER_DEFAULT)
  }

  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      <div className="relative min-w-[180px] flex-1">
        <MagnifyingGlassIcon
          size={14}
          weight="regular"
          className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={value.search}
          onChange={(e) => onChange({ ...value, search: e.target.value })}
          placeholder="이름으로 검색"
          className="h-8 pl-8 text-xs"
        />
      </div>
      <Select value={value.status} onValueChange={(status: SearchFilterStatus) => onChange({ ...value, status })}>
        <SelectTrigger className="h-8 w-28 text-xs">
          <SelectValue placeholder="상태" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>
          <SelectItem value="active">활성</SelectItem>
          <SelectItem value="inactive">비활성</SelectItem>
        </SelectContent>
      </Select>
      <Select value={value.sort} onValueChange={(sort: SearchFilterSort) => onChange({ ...value, sort })}>
        <SelectTrigger className="h-8 w-28 text-xs">
          <SelectValue placeholder="정렬" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">최신순</SelectItem>
          <SelectItem value="oldest">오래된순</SelectItem>
          <SelectItem value="name">이름순</SelectItem>
        </SelectContent>
      </Select>
      <Button size="sm" variant="outline" onClick={handleReset}>
        초기화
      </Button>
      <Button size="sm">검색</Button>
    </div>
  )
}

/** /patterns 데모용 — SearchFilterDemo가 요구하는 controlled state를 대신 들고 있는 프리뷰 래퍼. */
export function SearchFilterDemoPreview() {
  const [value, setValue] = useState<SearchFilterValue>(SEARCH_FILTER_DEFAULT)
  return <SearchFilterDemo value={value} onChange={setValue} />
}
