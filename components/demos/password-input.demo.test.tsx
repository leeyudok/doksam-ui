import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/password-input.demo"

describe("password-input demo", () => {
  it("masks the value by default and reveals it on toggle click", () => {
    render(demo)
    const input = screen.getByPlaceholderText("비밀번호 입력") as HTMLInputElement
    expect(input.type).toBe("password")

    fireEvent.click(screen.getByRole("button", { name: "비밀번호 표시" }))
    expect(input.type).toBe("text")

    fireEvent.click(screen.getByRole("button", { name: "비밀번호 숨기기" }))
    expect(input.type).toBe("password")
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("PasswordInput")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
