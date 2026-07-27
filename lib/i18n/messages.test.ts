import { describe, expect, it } from "vitest"

import en from "@/lib/i18n/messages/en.json"
import es from "@/lib/i18n/messages/es.json"
import ja from "@/lib/i18n/messages/ja.json"
import zh from "@/lib/i18n/messages/zh.json"
import { PATTERN_REGISTRY } from "@/lib/patterns/registry"
import { COMPONENT_REGISTRY } from "@/lib/showcase/registry"
import { TEMPLATE_REGISTRY } from "@/lib/templates/registry"

const ALL: Record<string, Record<string, string>> = { en, ja, zh, es }

describe("i18n 메시지 스냅샷 정합성", () => {
  it("4개 로케일이 동일한 키 집합을 가진다", () => {
    const keys = Object.keys(en).sort()
    expect(keys.length).toBeGreaterThan(0)
    for (const [locale, msgs] of Object.entries(ALL)) {
      expect(Object.keys(msgs).sort(), `${locale} 키 집합 불일치`).toEqual(keys)
    }
  })

  it("component.* 키는 실제 레지스트리 slug 와 대응한다", () => {
    const slugs = new Set(COMPONENT_REGISTRY.map((e) => e.slug))
    for (const key of Object.keys(en).filter((k) => k.startsWith("component."))) {
      expect(slugs.has(key.split(".")[1]), `고아 키: ${key}`).toBe(true)
    }
  })

  it("레지스트리 전 항목의 설명 번역이 존재한다 (드리프트 감지)", () => {
    for (const e of COMPONENT_REGISTRY) {
      expect(en, `component.${e.slug}.description 누락`).toHaveProperty([`component.${e.slug}.description`])
    }
    for (const e of PATTERN_REGISTRY) {
      expect(en).toHaveProperty([`pattern.${e.slug}.description`])
      expect(en).toHaveProperty([`pattern.${e.slug}.title`])
    }
    for (const e of TEMPLATE_REGISTRY) {
      const slug = e.href.split("/").pop() ?? ""
      expect(en).toHaveProperty([`template.${slug}.description`])
    }
  })

  it("플레이스홀더가 ko 카탈로그와 일치한다", async () => {
    const ko: Record<string, string> = (await import("@/scripts/i18n/ko-catalog.json")).default
    const holes = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort()
    for (const [locale, msgs] of Object.entries(ALL)) {
      for (const [key, value] of Object.entries(msgs)) {
        if (!(key in ko)) continue
        expect(holes(value), `${locale}:${key} 플레이스홀더 불일치`).toEqual(holes(ko[key]))
      }
    }
  })
})
