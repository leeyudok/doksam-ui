import { describe, expect, it } from "vitest"

import {
  countSelected,
  paginate,
  pageSelectionState,
  toggleRowSelection,
  togglePageSelection,
} from "@/lib/patterns/data-table/paginate"

const ROWS = Array.from({ length: 23 }, (_, i) => ({ id: `r${i + 1}` }))

describe("paginate", () => {
  it("slices the first page", () => {
    const slice = paginate(ROWS, 1, 10)
    expect(slice.rows).toHaveLength(10)
    expect(slice.rows[0]).toEqual({ id: "r1" })
    expect(slice.page).toBe(1)
    expect(slice.pageCount).toBe(3)
    expect(slice.total).toBe(23)
  })

  it("slices the last partial page", () => {
    const slice = paginate(ROWS, 3, 10)
    expect(slice.rows).toHaveLength(3)
    expect(slice.rows[0]).toEqual({ id: "r21" })
  })

  it("clamps a page number above pageCount to the last page", () => {
    const slice = paginate(ROWS, 99, 10)
    expect(slice.page).toBe(3)
    expect(slice.rows[0]).toEqual({ id: "r21" })
  })

  it("clamps a page number below 1 to 1", () => {
    const slice = paginate(ROWS, -5, 10)
    expect(slice.page).toBe(1)
  })

  it("returns pageCount 1 for an empty dataset", () => {
    const slice = paginate([], 1, 10)
    expect(slice.pageCount).toBe(1)
    expect(slice.rows).toEqual([])
  })
})

describe("countSelected", () => {
  it("counts only truthy entries", () => {
    expect(countSelected({ a: true, b: false, c: true })).toBe(2)
  })

  it("returns 0 for an empty selection", () => {
    expect(countSelected({})).toBe(0)
  })
})

describe("pageSelectionState", () => {
  const pageRows = [{ id: "a" }, { id: "b" }, { id: "c" }]
  const getId = (r: { id: string }) => r.id

  it("returns none when nothing on the page is selected", () => {
    expect(pageSelectionState(pageRows, getId, {})).toBe("none")
  })

  it("returns all when every row on the page is selected", () => {
    expect(pageSelectionState(pageRows, getId, { a: true, b: true, c: true })).toBe("all")
  })

  it("returns some when only part of the page is selected", () => {
    expect(pageSelectionState(pageRows, getId, { a: true })).toBe("some")
  })

  it("ignores selections outside the current page", () => {
    expect(pageSelectionState(pageRows, getId, { z: true })).toBe("none")
  })
})

describe("togglePageSelection", () => {
  const pageRows = [{ id: "a" }, { id: "b" }]
  const getId = (r: { id: string }) => r.id

  it("selects every row on the page", () => {
    const next = togglePageSelection(pageRows, getId, { z: true }, true)
    expect(next).toEqual({ z: true, a: true, b: true })
  })

  it("deselects every row on the page without touching other pages' selections", () => {
    const next = togglePageSelection(pageRows, getId, { z: true, a: true, b: true }, false)
    expect(next).toEqual({ z: true })
  })
})

describe("toggleRowSelection", () => {
  it("adds the id when checked", () => {
    expect(toggleRowSelection("a", {}, true)).toEqual({ a: true })
  })

  it("removes the id when unchecked", () => {
    expect(toggleRowSelection("a", { a: true, b: true }, false)).toEqual({ b: true })
  })
})
