import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { I18nProvider } from "@/components/i18n-provider"
import { PreviewFrame } from "@/components/showcase/preview-frame"

function renderFrame(ui: React.ReactNode) {
  return render(<I18nProvider>{ui}</I18nProvider>)
}

describe("PreviewFrame", () => {
  it("자식을 미리보기 표면에 렌더한다", () => {
    renderFrame(
      <PreviewFrame code="<X />">
        <button>데모버튼</button>
      </PreviewFrame>,
    )
    expect(screen.getByText("데모버튼")).toBeInTheDocument()
    expect(screen.getByTestId("preview-surface")).toBeInTheDocument()
  })

  it("모바일 폭 버튼을 누르면 표면 max-width가 390px가 된다", () => {
    renderFrame(
      <PreviewFrame>
        <span>x</span>
      </PreviewFrame>,
    )
    fireEvent.click(screen.getByRole("button", { name: "모바일" }))
    expect(screen.getByTestId("preview-surface")).toHaveStyle({ maxWidth: "390px" })
  })

  it("테마 토글을 누르면 표면에 dark 클래스가 붙는다", () => {
    renderFrame(
      <PreviewFrame>
        <span>x</span>
      </PreviewFrame>,
    )
    const surface = screen.getByTestId("preview-surface")
    expect(surface).not.toHaveClass("dark")
    fireEvent.click(screen.getByRole("button", { name: "테마 전환" }))
    expect(surface).toHaveClass("dark")
  })

  it("code가 없으면 복사 버튼을 렌더하지 않는다", () => {
    renderFrame(
      <PreviewFrame>
        <span>x</span>
      </PreviewFrame>,
    )
    expect(screen.queryByRole("button", { name: "복사" })).not.toBeInTheDocument()
  })
})
