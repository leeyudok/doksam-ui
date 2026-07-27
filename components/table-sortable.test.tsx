import { fireEvent, render, screen, within } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"
import type { ColumnDef } from "@tanstack/react-table"

import { TableSortable } from "@/components/table-sortable"

// jsdom은 Pointer Events의 capture API를 구현하지 않는다 — Radix DropdownMenu가
// 내부적으로 hasPointerCapture 등을 호출하므로 테스트 환경에서만 no-op으로 채운다.
beforeAll(() => {
  Element.prototype.hasPointerCapture ??= () => false
  Element.prototype.setPointerCapture ??= () => {}
  Element.prototype.releasePointerCapture ??= () => {}
  Element.prototype.scrollIntoView ??= () => {}
})

interface Row {
  id: string
  name: string
  score: number
}

const ROWS: Row[] = [
  { id: "a", name: "Charlie", score: 30 },
  { id: "b", name: "Alice", score: 10 },
  { id: "c", name: "Bravo", score: 20 },
]

const columns: ColumnDef<Row, unknown>[] = [
  { accessorKey: "name", header: "이름", enableHiding: false },
  { accessorKey: "score", header: "점수" },
]

function getBodyRows() {
  const table = screen.getByRole("table")
  return within(table)
    .getAllByRole("row")
    .slice(1) // header row 제외
}

describe("TableSortable", () => {
  it("renders rows in the given data order by default", () => {
    render(<TableSortable data={ROWS} columns={columns} getRowId={(row) => row.id} />)
    const rows = getBodyRows()
    expect(within(rows[0]).getByText("Charlie")).toBeInTheDocument()
    expect(within(rows[1]).getByText("Alice")).toBeInTheDocument()
    expect(within(rows[2]).getByText("Bravo")).toBeInTheDocument()
  })

  it("sorts rows when a sortable column header is clicked", () => {
    render(<TableSortable data={ROWS} columns={columns} getRowId={(row) => row.id} />)
    fireEvent.click(screen.getByRole("button", { name: /이름/ }))

    const rows = getBodyRows()
    expect(within(rows[0]).getByText("Alice")).toBeInTheDocument()
    expect(within(rows[1]).getByText("Bravo")).toBeInTheDocument()
    expect(within(rows[2]).getByText("Charlie")).toBeInTheDocument()
  })

  it("disables the row drag handle while a column sort is active", () => {
    render(<TableSortable data={ROWS} columns={columns} getRowId={(row) => row.id} />)

    fireEvent.click(screen.getByRole("button", { name: /이름/ }))

    const handles = screen.getAllByLabelText("행 순서 변경 핸들")
    for (const handle of handles) {
      expect(handle).toBeDisabled()
    }
  })

  it("toggles a hideable column via the column-visibility menu", async () => {
    render(<TableSortable data={ROWS} columns={columns} getRowId={(row) => row.id} />)

    expect(screen.getByRole("columnheader", { name: /점수/ })).toBeInTheDocument()

    const trigger = screen.getByRole("button", { name: "컬럼" })
    fireEvent.pointerDown(trigger, { pointerType: "mouse", button: 0 })
    fireEvent.click(trigger)
    const menuCheckbox = await screen.findByRole("menuitemcheckbox", { name: "점수" })
    fireEvent.click(menuCheckbox)

    expect(screen.queryByRole("columnheader", { name: /점수/ })).not.toBeInTheDocument()
  })

  it("renders an empty state when there is no data", () => {
    render(<TableSortable data={[]} columns={columns} getRowId={(row) => row.id} />)
    expect(screen.getByText("데이터가 없습니다.")).toBeInTheDocument()
  })
})
