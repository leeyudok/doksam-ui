import { render, screen } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"

import ShopProductPage, { generateStaticParams } from "@/app/templates/shop/product/[id]/page"
import { listProductIds } from "@/app/templates/shop/_lib/data"

// embla-carousel-react(components/ui/carousel.tsx가 사용)는 window.matchMedia /
// ResizeObserver / IntersectionObserver로 반응형 옵션과 슬라이드 가시성을 계산한다 —
// jsdom은 셋 다 구현하지 않으므로 렌더 전에 최소 스텁을 채워준다(다른 라우트
// 테스트에 영향 없도록 이 파일에 로컬로만 정의).
beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }))

  class StubObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = window.ResizeObserver || (StubObserver as unknown as typeof ResizeObserver)
  window.IntersectionObserver =
    window.IntersectionObserver || (StubObserver as unknown as typeof IntersectionObserver)
})

describe("ShopProductPage", () => {
  it("renders the product name, price, and review summary for a known product", async () => {
    const jsx = await ShopProductPage({ params: Promise.resolve({ id: "light-runner-sneaker" }) })
    render(jsx)
    expect(screen.getByRole("heading", { level: 1, name: "라이트 러너 스니커즈" })).toBeInTheDocument()
    // 수량 1일 때 헤더 가격과 총 상품 금액이 같은 문자열로 두 번 나타날 수 있다.
    expect(screen.getAllByText("89,000원").length).toBeGreaterThan(0)
    expect(screen.getByText("리뷰")).toBeInTheDocument()
  })

  it("renders option choices and a quantity control", async () => {
    const jsx = await ShopProductPage({ params: Promise.resolve({ id: "cotton-crew-tee" }) })
    render(jsx)
    expect(screen.getByText("사이즈")).toBeInTheDocument()
    expect(screen.getByText("컬러")).toBeInTheDocument()
    expect(screen.getByText("수량")).toBeInTheDocument()
  })

  it("throws not-found for an unregistered product id", async () => {
    await expect(
      ShopProductPage({ params: Promise.resolve({ id: "does-not-exist" }) }),
    ).rejects.toThrow()
  })

  it("generateStaticParams returns an { id } entry for every registered product", () => {
    const params = generateStaticParams()
    expect(params).toEqual(listProductIds().map((id) => ({ id })))
  })
})
