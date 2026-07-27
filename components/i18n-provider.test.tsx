import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"

import { I18nProvider, useI18n } from "@/components/i18n-provider"
import { LOCALE_STORAGE_KEY } from "@/lib/theme-storage"

function Probe() {
  const { locale, setLocale, t } = useI18n()
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="text">{t("chrome.test.key", "한국어원문")}</span>
      <button onClick={() => setLocale("en")}>to-en</button>
    </div>
  )
}

describe("I18nProvider", () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.lang = "ko"
  })

  it("기본 ko — t 는 ko 원문을 반환", () => {
    render(<I18nProvider><Probe /></I18nProvider>)
    expect(screen.getByTestId("locale")).toHaveTextContent("ko")
    expect(screen.getByTestId("text")).toHaveTextContent("한국어원문")
  })

  it("setLocale 이 localStorage 와 <html lang> 을 갱신", () => {
    render(<I18nProvider><Probe /></I18nProvider>)
    fireEvent.click(screen.getByRole("button", { name: "to-en" }))
    expect(screen.getByTestId("locale")).toHaveTextContent("en")
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("en")
    expect(document.documentElement.lang).toBe("en")
  })

  it("번역 누락 키는 ko 원문 폴백", () => {
    render(<I18nProvider><Probe /></I18nProvider>)
    fireEvent.click(screen.getByRole("button", { name: "to-en" }))
    expect(screen.getByTestId("text")).toHaveTextContent("한국어원문")
  })

  it("mount 시 <html lang> 값으로 동기화 (FOUC 스크립트 연동)", () => {
    document.documentElement.lang = "ja"
    render(<I18nProvider><Probe /></I18nProvider>)
    expect(screen.getByTestId("locale")).toHaveTextContent("ja")
  })
})
