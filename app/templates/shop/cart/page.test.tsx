import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import ShopCartPage from "@/app/templates/shop/cart/page"
import { cartLineDetails, cartTotals } from "@/app/templates/shop/_lib/data"

describe("ShopCartPage", () => {
  it("renders the cart heading and every line item", () => {
    render(<ShopCartPage />)
    expect(screen.getByRole("heading", { level: 1, name: "장바구니" })).toBeInTheDocument()
    for (const { product } of cartLineDetails()) {
      expect(screen.getByText(product.name)).toBeInTheDocument()
    }
  })

  it("renders the checkout CTA and computed total", () => {
    render(<ShopCartPage />)
    const totals = cartTotals(cartLineDetails())
    expect(screen.getByRole("button", { name: /결제하기/ })).toBeInTheDocument()
    // 무료배송 임계값을 넘으면 상품금액과 총 결제금액이 같은 문자열이 되어 두 번 나타날 수 있다.
    expect(screen.getAllByText(`${totals.total.toLocaleString()}원`).length).toBeGreaterThan(0)
  })
})
