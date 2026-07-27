import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import ComponentsPage from "@/app/components/page"
import { COMPONENT_REGISTRY } from "@/lib/showcase/registry"
import { COMPONENT_CATEGORY_LABEL } from "@/lib/showcase/types"

describe("ComponentsPage", () => {
  it("renders the showcase heading", () => {
    render(<ComponentsPage />)
    expect(
      screen.getByRole("heading", { level: 1, name: /컴포넌트 카탈로그/ }),
    ).toBeInTheDocument()
  })

  it("renders one category section per used category", () => {
    render(<ComponentsPage />)
    const usedCategories = new Set(COMPONENT_REGISTRY.map((entry) => entry.category))
    for (const category of usedCategories) {
      expect(
        screen.getByRole("heading", { level: 2, name: COMPONENT_CATEGORY_LABEL[category] }),
      ).toBeInTheDocument()
    }
  })

  it("links every registry entry to its detail page", () => {
    render(<ComponentsPage />)
    const links = screen.getAllByRole("link")
    for (const entry of COMPONENT_REGISTRY) {
      const matches = links.filter(
        (link) => link.getAttribute("href") === `/components/${entry.slug}`,
      )
      expect(matches.length, entry.slug).toBe(1)
    }
  })

  it("renders the three layer filter tabs", () => {
    render(<ComponentsPage />)
    for (const label of ["전체", "Primitive", "Composition"]) {
      expect(screen.getByRole("tab", { name: label })).toBeInTheDocument()
    }
  })

  it("labels every card with its origin badge (shadcn/doksam)", () => {
    render(<ComponentsPage />)
    const cardBadges = screen
      .getAllByText(/^(shadcn|doksam)$/)
      .filter((el) => el.closest("a") !== null)
    expect(cardBadges.length).toBe(COMPONENT_REGISTRY.length)
    const doksamBadges = cardBadges.filter((el) => el.textContent === "doksam")
    expect(doksamBadges.length).toBe(
      COMPONENT_REGISTRY.filter((e) => e.layer === "composition").length,
    )
  })
})
