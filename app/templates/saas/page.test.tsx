import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import SaasLandingPage from "@/app/templates/saas/page"
import { FAQ_ITEMS, FEATURES, PRICING_TIERS, PRODUCT_NAME } from "@/app/templates/saas/_lib/data"

describe("SaasLandingPage", () => {
  it("renders the hero heading and product name", () => {
    render(<SaasLandingPage />)
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("팀의 업무 흐름을 하나의 워크스페이스로")
    expect(screen.getAllByText(new RegExp(PRODUCT_NAME)).length).toBeGreaterThan(0)
  })

  it("renders every feature card", () => {
    render(<SaasLandingPage />)
    for (const feature of FEATURES) {
      expect(screen.getByText(feature.title)).toBeInTheDocument()
    }
  })

  it("renders every pricing tier with its CTA", () => {
    render(<SaasLandingPage />)
    for (const tier of PRICING_TIERS) {
      expect(screen.getByText(tier.name)).toBeInTheDocument()
      expect(screen.getByRole("button", { name: tier.cta })).toBeInTheDocument()
    }
  })

  it("renders every FAQ question as an accordion trigger", () => {
    render(<SaasLandingPage />)
    for (const item of FAQ_ITEMS) {
      expect(screen.getByRole("button", { name: item.question })).toBeInTheDocument()
    }
  })
})
