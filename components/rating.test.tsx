import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Rating } from "@/components/rating"

function filledStarClassNames(container: HTMLElement) {
  const stars = container.querySelectorAll('[data-slot="rating-star"] svg')
  return Array.from(stars).map((svg) => svg.getAttribute("class") ?? "")
}

describe("Rating", () => {
  it("uses the default warning tone when neither severity nor toneByValue is set", () => {
    const { container } = render(<Rating value={5} readOnly />)
    const classNames = filledStarClassNames(container)
    expect(classNames.some((c) => c.includes("text-warning"))).toBe(true)
    expect(classNames.some((c) => c.includes("text-destructive"))).toBe(false)
  })

  it.each([
    [1, "text-destructive"],
    [1.4, "text-destructive"],
    [2, "text-warning"],
    [1.5, "text-warning"], // round(1.5) === 2 → warning
    [3, "text-muted-foreground"],
    [2.5, "text-muted-foreground"], // round(2.5) === 3 → muted
    [4, "text-warning"],
    [5, "text-warning"],
  ])("severity maps value=%s to %s", (value, expectedClass) => {
    const { container } = render(<Rating value={value} readOnly severity />)
    const classNames = filledStarClassNames(container)
    expect(classNames.some((c) => c.includes(expectedClass))).toBe(true)
  })

  it("lets toneByValue override the severity mapping", () => {
    const { container } = render(
      <Rating value={5} readOnly severity toneByValue={() => "destructive"} />
    )
    const classNames = filledStarClassNames(container)
    expect(classNames.some((c) => c.includes("text-destructive"))).toBe(true)
    expect(classNames.some((c) => c.includes("text-warning"))).toBe(false)
  })

  it("falls back to the default tone when toneByValue returns an unknown token", () => {
    const { container } = render(<Rating value={5} readOnly toneByValue={() => "not-a-real-tone"} />)
    const classNames = filledStarClassNames(container)
    expect(classNames.some((c) => c.includes("text-warning"))).toBe(true)
  })

  it("applies the tone to a half-filled star as well", () => {
    const { container } = render(<Rating value={0.5} readOnly severity />)
    const classNames = filledStarClassNames(container)
    expect(classNames.some((c) => c.includes("text-destructive"))).toBe(true)
  })

  it("does not apply a tone class to empty (unfilled) stars", () => {
    const { container } = render(<Rating value={0} readOnly severity />)
    const svg = container.querySelector('[data-slot="rating-star"] svg')
    const classNames = svg?.getAttribute("class") ?? ""
    expect(classNames).not.toContain("text-warning")
    expect(classNames).not.toContain("text-destructive")
    expect(classNames).not.toContain("text-muted-foreground")
  })
})
