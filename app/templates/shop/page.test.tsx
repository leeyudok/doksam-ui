import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import ShopStorefrontPage from "@/app/templates/shop/page"
import { CATEGORIES, PRODUCTS, STORE_NAME } from "@/app/templates/shop/_lib/data"

describe("ShopStorefrontPage", () => {
  it("renders the hero heading with the store name", () => {
    render(<ShopStorefrontPage />)
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(STORE_NAME)
  })

  it("renders every product card", () => {
    render(<ShopStorefrontPage />)
    for (const product of PRODUCTS) {
      expect(screen.getByText(product.name)).toBeInTheDocument()
    }
  })

  it("renders the category facet filter group", () => {
    render(<ShopStorefrontPage />)
    const group = screen.getByRole("group", { name: "카테고리 필터" })
    expect(group).toBeInTheDocument()
    for (const category of CATEGORIES) {
      expect(screen.getByRole("button", { name: new RegExp(category.label) })).toBeInTheDocument()
    }
  })
})
