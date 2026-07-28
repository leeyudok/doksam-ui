"use client"

import { TableToggle, type TableToggleColumn } from "@/components/table-toggle"

interface Source {
  id: string
  name: string
  domain: string
  enabled: boolean
}

const SOURCES: Source[] = [
  { id: "src-1", name: "네이버 뉴스", domain: "news.naver.com", enabled: true },
  { id: "src-2", name: "구글 RSS", domain: "news.google.com", enabled: true },
  { id: "src-3", name: "네이트 뉴스", domain: "news.nate.com", enabled: false },
]

const columns: TableToggleColumn<Source>[] = [
  { header: "소스", cell: (row) => <span className="font-medium">{row.name}</span> },
  { header: "도메인", cell: (row) => <span className="text-muted-foreground">{row.domain}</span> },
]

async function handleToggle(row: Source) {
  await new Promise((resolve) => setTimeout(resolve, 400))
  // "구글 RSS"는 데모용으로 항상 실패한다 — 롤백 + 실패 사유 표시를 보여주기 위함.
  if (row.id === "src-2") {
    throw new Error("네트워크 오류로 저장하지 못했습니다.")
  }
}

export function TableToggleDemo() {
  return (
    <TableToggle
      data={SOURCES}
      getRowId={(row) => row.id}
      getEnabled={(row) => row.enabled}
      getRowLabel={(row) => row.name}
      onToggle={handleToggle}
      columns={columns}
    />
  )
}
