import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/tree-view.demo"

describe("tree-view demo", () => {
  it("renders expanded nodes and the initially selected leaf", () => {
    render(demo)
    expect(screen.getByRole("tree", { name: "트리" })).toBeInTheDocument()
    expect(screen.getByRole("treeitem", { name: "src" })).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByRole("treeitem", { name: "index.ts" })).toHaveAttribute("aria-selected", "true")
  })

  it("collapses a node on click and hides its children", () => {
    render(demo)
    fireEvent.click(screen.getByRole("treeitem", { name: "src" }))
    expect(screen.queryByRole("treeitem", { name: "components" })).not.toBeInTheDocument()
  })

  it("selects a node on click and reports it via onSelectedIdChange", () => {
    render(demo)
    fireEvent.click(screen.getByRole("treeitem", { name: "package.json" }))
    expect(screen.getByRole("treeitem", { name: "package.json" })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByText("선택: package-json")).toBeInTheDocument()
  })

  it("moves focus with ArrowDown and selects with Enter", () => {
    render(demo)
    const src = screen.getByRole("treeitem", { name: "src" })
    src.focus()
    fireEvent.keyDown(src, { key: "ArrowDown" })
    const components = screen.getByRole("treeitem", { name: "components" })
    expect(components).toHaveFocus()
    fireEvent.keyDown(components, { key: "Enter" })
    expect(screen.getByText("선택: components")).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("TreeView")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
