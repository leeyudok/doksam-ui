import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/dialog.demo"

describe("dialog demo", () => {
  it("opens the dialog and shows its title on trigger click", () => {
    render(demo)
    fireEvent.click(screen.getByRole("button", { name: "프로필 수정" }))
    expect(screen.getByRole("heading", { name: "프로필 수정" })).toBeInTheDocument()
    expect(screen.getByLabelText("이름")).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("<Dialog>")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
