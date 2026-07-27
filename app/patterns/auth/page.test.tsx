import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import AuthPatternsPage from "@/app/patterns/auth/page"
import { AUTH_SAMPLES } from "@/components/patterns/auth-samples"

describe("AuthPatternsPage", () => {
  it("renders the page heading", () => {
    render(<AuthPatternsPage />)
    expect(screen.getByRole("heading", { level: 1, name: "인증 패턴" })).toBeInTheDocument()
  })

  it("renders every auth sample as a numbered section", () => {
    render(<AuthPatternsPage />)
    for (const sample of AUTH_SAMPLES) {
      expect(screen.getByRole("heading", { level: 2, name: sample.title })).toBeInTheDocument()
      expect(screen.getByText(`#${sample.num}`)).toBeInTheDocument()
    }
  })

  it("renders 4 samples", () => {
    render(<AuthPatternsPage />)
    expect(AUTH_SAMPLES.length).toBe(4)
  })

  it("toggles the validation error state demo", () => {
    render(<AuthPatternsPage />)

    expect(screen.getByRole("alert")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "정상 상태 보기" }))
    expect(screen.queryByRole("alert")).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "에러 상태 보기" }))
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("switches the password reset demo from form to sent confirmation", () => {
    render(<AuthPatternsPage />)

    const emailInput = screen.getByLabelText("이메일", { selector: "#pattern-reset-email" })
    fireEvent.change(emailInput, { target: { value: "user@example.com" } })
    fireEvent.click(screen.getByRole("button", { name: "재설정 링크 보내기" }))

    expect(screen.getByText("재설정 링크를 보냈어요")).toBeInTheDocument()
    expect(screen.getByText("user@example.com")).toBeInTheDocument()
  })
})
