import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"

import { I18nProvider } from "@/components/i18n-provider"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { LOCALE_STORAGE_KEY } from "@/lib/theme-storage"

function openMenu() {
  const trigger = screen.getByRole("button", { name: "언어 선택" })
  fireEvent.pointerDown(trigger, { pointerType: "mouse", button: 0 })
  fireEvent.click(trigger)
}

describe("LocaleSwitcher", () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.lang = "ko"
  })

  it("트리거를 열면 5개 언어 옵션이 보인다", async () => {
    render(<I18nProvider><LocaleSwitcher /></I18nProvider>)
    openMenu()
    for (const label of ["한국어", "English", "日本語", "中文", "Español"]) {
      expect(await screen.findByRole("menuitemradio", { name: label })).toBeInTheDocument()
    }
  })

  it("언어 선택 시 localStorage 갱신", async () => {
    render(<I18nProvider><LocaleSwitcher /></I18nProvider>)
    openMenu()
    fireEvent.click(await screen.findByRole("menuitemradio", { name: "日本語" }))
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("ja")
  })
})
