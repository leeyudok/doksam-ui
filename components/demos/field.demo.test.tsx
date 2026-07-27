import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/field.demo"

describe("field demo", () => {
  it("renders labeled fields with description and error", () => {
    render(demo)
    expect(screen.getByLabelText("받는 사람")).toBeInTheDocument()
    expect(screen.getByText("택배 수령 시 본인 확인에 사용됩니다.")).toBeInTheDocument()
    expect(screen.getByText("우편번호는 5자리 숫자여야 합니다.")).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("<FieldSet>")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
