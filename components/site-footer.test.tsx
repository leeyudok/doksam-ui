import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { SiteFooter } from "@/components/site-footer"

describe("SiteFooter", () => {
  it("사이트명·섹션 링크·라이선스 고지를 렌더한다", () => {
    render(<SiteFooter />)
    expect(screen.getByText("doksam-ui")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Components" })).toHaveAttribute("href", "/components")
    expect(screen.getByRole("link", { name: "Rules" })).toHaveAttribute("href", "/rules")
    expect(screen.getByText(/SIL Open Font License/)).toBeInTheDocument()
  })
})
