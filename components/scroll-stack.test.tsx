import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ScrollStack, ScrollStackItem, type ScrollStackProps } from "@/components/scroll-stack"

function renderStack(props: Partial<Omit<ScrollStackProps, "children">> = {}) {
  return render(
    <ScrollStack {...props}>
      <ScrollStackItem>first</ScrollStackItem>
      <ScrollStackItem>second</ScrollStackItem>
      <ScrollStackItem itemClassName="border-l-chart-1">third</ScrollStackItem>
    </ScrollStack>,
  )
}

describe("ScrollStack", () => {
  it("renders all items as stack cards with the end sentinel (#19)", () => {
    const { container } = renderStack()
    expect(screen.getByText("first")).toBeInTheDocument()
    expect(container.querySelectorAll("[data-scroll-stack-card]")).toHaveLength(3)
    expect(container.querySelector("[data-scroll-stack-end]")).toBeInTheDocument()
  })

  it("applies itemDistance margin to every card except the last (#19)", () => {
    const { container } = renderStack({ itemDistance: 48 })
    const cards = [...container.querySelectorAll<HTMLElement>("[data-scroll-stack-card]")]
    expect(cards[0].style.marginBottom).toBe("48px")
    expect(cards[1].style.marginBottom).toBe("48px")
    expect(cards[2].style.marginBottom).toBe("")
  })

  it("merges itemClassName onto the card (#19)", () => {
    const { container } = renderStack()
    const cards = container.querySelectorAll("[data-scroll-stack-card]")
    expect(cards[2].className).toContain("border-l-chart-1")
  })

  it("uses an inner scroller by default and a plain wrapper with useWindowScroll (#19)", () => {
    const { container: inner } = renderStack()
    expect(inner.firstElementChild?.className).toContain("overflow-y-auto")

    const { container: windowed } = render(
      <ScrollStack useWindowScroll>
        <ScrollStackItem>page</ScrollStackItem>
      </ScrollStack>,
    )
    expect(windowed.firstElementChild?.className).not.toContain("overflow-y-auto")
  })
})
