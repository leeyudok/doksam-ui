import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/chart.demo"

describe("chart demo", () => {
  it("renders the bar chart without crashing", () => {
    const { container } = render(demo)
    expect(container.querySelector('[data-slot="chart"]')).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("BarChart")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
