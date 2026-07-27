import { describe, expect, it } from "vitest"

import { DEFAULT_LOCALE, LOCALES, LOCALE_LABEL, getMessage, isLocale } from "@/lib/i18n"

describe("i18n core", () => {
  it("5개 로케일과 라벨을 정의한다", () => {
    expect(LOCALES).toEqual(["ko", "en", "ja", "zh", "es"])
    expect(DEFAULT_LOCALE).toBe("ko")
    expect(LOCALE_LABEL.ja).toBe("日本語")
    expect(isLocale("en")).toBe(true)
    expect(isLocale("fr")).toBe(false)
  })

  it("ko 와 미등록 키는 undefined (호출측 ko 폴백)", () => {
    expect(getMessage("ko", "chrome.nav.home")).toBeUndefined()
    expect(getMessage("en", "no.such.key")).toBeUndefined()
  })
})
