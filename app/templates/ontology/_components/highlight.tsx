import * as React from "react"

/**
 * 검색어 매칭 하이라이트 — text 안의 query 등장 구간을 <mark> 로 감싼다.
 * 대소문자 무시, 정규식 메타문자는 이스케이프한다. query 가 비면 text 그대로.
 */
export function Highlight({ text, query }: Readonly<{ text: string; query: string }>) {
  const q = query.trim()
  if (!q) return <>{text}</>
  const safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const parts = text.split(new RegExp(`(${safe})`, "ig"))
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark key={i} className="rounded-xs bg-primary/20 px-0.5 text-inherit">
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  )
}

/** 노드가 검색어에 매칭되는지 — 라벨·경로·설명·세부종류를 통합 검사한다. */
export function matchesQuery(
  node: { label: string; path: string; description: string; kind: string },
  query: string,
): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return `${node.label} ${node.path} ${node.description} ${node.kind}`.toLowerCase().includes(q)
}
