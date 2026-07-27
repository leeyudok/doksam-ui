"use client"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface CatalogItem {
  code: string
  name: string
  active: boolean
}

const CATALOG: CatalogItem[] = [
  { code: "SKU-1001", name: "무선 키보드", active: true },
  { code: "SKU-1002", name: "무선 마우스", active: true },
  { code: "SKU-1003", name: "무선 이어폰", active: false },
  { code: "SKU-1004", name: "USB 허브", active: true },
  { code: "SKU-1005", name: "노트북 거치대", active: true },
  { code: "SKU-1006", name: "모니터 암", active: false },
  { code: "SKU-1007", name: "웹캠", active: true },
  { code: "SKU-1008", name: "휴대용 SSD", active: true },
]

/**
 * 접두어 검색 → 2~3열 그리드 카드 드롭다운 + "전체 N건 중 M건 표시" 카운트 라인 +
 * 단종 포함 토글로 구성한 자동완성 패턴. 실제 API 호출 없이 로컬 배열만 필터링한다.
 */
export function GridAutocompleteDemo() {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [includeDiscontinued, setIncludeDiscontinued] = useState(false)

  const trimmed = query.trim().toUpperCase()
  const scoped = includeDiscontinued ? CATALOG : CATALOG.filter((item) => item.active)
  const matches = trimmed
    ? scoped.filter((item) => item.code.toUpperCase().includes(trimmed) || item.name.includes(query.trim()))
    : scoped
  const showDropdown = open && trimmed.length > 0
  const visible = showDropdown ? matches.slice(0, 6) : []

  return (
    <div className="w-full max-w-sm">
      <div className="relative">
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="상품코드 또는 상품명 검색 (예: SKU-100)"
          aria-label="상품 검색"
        />

        {showDropdown && (
          <div className="absolute top-full z-10 mt-1 w-full min-w-[280px] rounded-md border bg-card shadow-md">
            <div className="flex items-center justify-between gap-2 border-b px-3 py-1.5">
              <p className="text-xs text-muted-foreground">
                {`전체 ${matches.length}건 중 ${visible.length}건 표시${
                  matches.length > visible.length ? " — 더 입력해 좁혀보세요" : ""
                }`}
              </p>
              <Label
                htmlFor="verified-grid-include-discontinued"
                className="shrink-0 text-xs font-normal text-muted-foreground"
              >
                <input
                  id="verified-grid-include-discontinued"
                  type="checkbox"
                  checked={includeDiscontinued}
                  onChange={(e) => setIncludeDiscontinued(e.target.checked)}
                  onMouseDown={(e) => e.preventDefault()}
                  className="size-3.5 accent-primary"
                />
                단종 포함
              </Label>
            </div>

            {visible.length === 0 ? (
              <p className="px-3 py-2 text-sm text-muted-foreground">검색 결과가 없습니다.</p>
            ) : (
              <div className="grid max-h-64 grid-cols-2 gap-1.5 overflow-auto p-1.5 lg:grid-cols-3">
                {visible.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setQuery(item.code)
                      setOpen(false)
                    }}
                    className={cn(
                      "flex flex-col items-start gap-1 rounded border px-2 py-1.5 text-left text-sm hover:bg-muted",
                    )}
                  >
                    <span className="font-mono text-xs tracking-tight">{item.code}</span>
                    <span className="w-full truncate font-medium">{item.name}</span>
                    <Badge variant={item.active ? "default" : "outline"} className="text-[9px]">
                      {item.active ? "판매중" : "단종"}
                    </Badge>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
