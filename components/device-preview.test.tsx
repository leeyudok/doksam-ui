import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { DevicePreview } from "@/components/device-preview"

describe("DevicePreview", () => {
  it("renders children and defaults to the desktop mode pressed", () => {
    render(
      <DevicePreview>
        <p>미리보기 콘텐츠</p>
      </DevicePreview>,
    )

    expect(screen.getByText("미리보기 콘텐츠")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "데스크톱" })).toHaveAttribute("aria-pressed", "true")
    expect(screen.getByRole("button", { name: "태블릿" })).toHaveAttribute("aria-pressed", "false")
    expect(screen.getByRole("button", { name: "모바일" })).toHaveAttribute("aria-pressed", "false")
  })

  it("switches the frame width to 768px when the tablet toggle is clicked", () => {
    render(
      <DevicePreview>
        <p>미리보기 콘텐츠</p>
      </DevicePreview>,
    )

    fireEvent.click(screen.getByRole("button", { name: "태블릿" }))

    expect(screen.getByRole("button", { name: "태블릿" })).toHaveAttribute("aria-pressed", "true")
    expect(screen.getByRole("button", { name: "데스크톱" })).toHaveAttribute("aria-pressed", "false")

    const frame = document.querySelector('[data-device-mode="tablet"]') as HTMLElement | null
    expect(frame).not.toBeNull()
    expect(frame?.style.width).toBe("768px")
  })

  it("switches the frame width to 390px when the mobile toggle is clicked", () => {
    render(
      <DevicePreview>
        <p>미리보기 콘텐츠</p>
      </DevicePreview>,
    )

    fireEvent.click(screen.getByRole("button", { name: "모바일" }))

    expect(screen.getByRole("button", { name: "모바일" })).toHaveAttribute("aria-pressed", "true")

    const frame = document.querySelector('[data-device-mode="mobile"]') as HTMLElement | null
    expect(frame).not.toBeNull()
    expect(frame?.style.width).toBe("390px")
  })

  it("honors a non-default defaultMode prop", () => {
    render(
      <DevicePreview defaultMode="mobile">
        <p>미리보기 콘텐츠</p>
      </DevicePreview>,
    )

    expect(screen.getByRole("button", { name: "모바일" })).toHaveAttribute("aria-pressed", "true")
  })
})
