/**
 * data-table 패턴용 순수 로직 — 페이지 슬라이스 계산과 행 선택 상태 갱신을
 * 렌더링과 분리해 단위 테스트만으로 검증할 수 있게 한다(#33).
 */

export interface PageSlice<T> {
  /** 현재 페이지에 보여줄 행들. */
  rows: T[]
  /** 1-base 현재 페이지 번호(범위를 벗어나면 clamp된 값). */
  page: number
  /** 총 페이지 수(최소 1). */
  pageCount: number
  /** 전체 행 수. */
  total: number
}

/**
 * 전체 데이터에서 page(1-base)에 해당하는 슬라이스를 계산한다.
 * page가 총 페이지 수를 넘어가면 마지막 페이지로, 1 미만이면 1페이지로 clamp한다.
 */
export function paginate<T>(rows: readonly T[], page: number, pageSize: number): PageSlice<T> {
  const total = rows.length
  const pageCount = Math.max(Math.ceil(total / pageSize), 1)
  const clampedPage = Math.min(Math.max(page, 1), pageCount)
  const start = (clampedPage - 1) * pageSize
  return {
    rows: rows.slice(start, start + pageSize),
    page: clampedPage,
    pageCount,
    total,
  }
}

/** 선택 상태(id → true)에서 체크된 id 개수를 센다. */
export function countSelected(selection: Readonly<Record<string, boolean>>): number {
  return Object.values(selection).filter(Boolean).length
}

/** 현재 페이지 행 전체가 선택돼있으면 "all", 일부만이면 "some", 없으면 "none". */
export function pageSelectionState<T>(
  pageRows: readonly T[],
  getId: (row: T) => string,
  selection: Readonly<Record<string, boolean>>
): "all" | "some" | "none" {
  if (pageRows.length === 0) return "none"
  const selectedCount = pageRows.filter((row) => selection[getId(row)]).length
  if (selectedCount === 0) return "none"
  if (selectedCount === pageRows.length) return "all"
  return "some"
}

/**
 * 현재 페이지 행들의 선택 여부를 checked로 일괄 설정한 새 선택 상태를 반환한다.
 * (헤더 체크박스 "전체 선택"이 페이지 단위로만 동작하도록 한다.)
 */
export function togglePageSelection<T>(
  pageRows: readonly T[],
  getId: (row: T) => string,
  selection: Readonly<Record<string, boolean>>,
  checked: boolean
): Record<string, boolean> {
  const next = { ...selection }
  for (const row of pageRows) {
    const id = getId(row)
    if (checked) next[id] = true
    else delete next[id]
  }
  return next
}

/** 단일 행의 선택 여부를 토글한 새 선택 상태를 반환한다. */
export function toggleRowSelection(
  id: string,
  selection: Readonly<Record<string, boolean>>,
  checked: boolean
): Record<string, boolean> {
  const next = { ...selection }
  if (checked) next[id] = true
  else delete next[id]
  return next
}
