import { describe, expect, it } from "vitest"

import { DEMO_LOADERS } from "@/lib/showcase/demo-loaders"
import { COMPONENT_REGISTRY } from "@/lib/showcase/registry"

describe("DEMO_LOADERS", () => {
  it("registers a loader for every 'done' registry entry, and nothing else", () => {
    const doneSlugs = COMPONENT_REGISTRY.filter((entry) => entry.status === "done").map(
      (entry) => entry.slug,
    )
    const loaderSlugs = Object.keys(DEMO_LOADERS)

    expect(new Set(loaderSlugs)).toEqual(new Set(doneSlugs))
  })

  it("only registers loaders for slugs that exist in the registry", () => {
    const registeredSlugs = new Set(COMPONENT_REGISTRY.map((entry) => entry.slug))
    for (const slug of Object.keys(DEMO_LOADERS)) {
      expect(registeredSlugs.has(slug), `loader "${slug}" has no registry entry`).toBe(true)
    }
  })

  // 등록된 모든 로더를 실제로 동적 import 해서 모듈 형태(ComponentDemoModule)를
  // 검증한다 — registry status가 "done"인데 import가 깨진 slug를 놓치지 않기 위함.
  it.each(Object.keys(DEMO_LOADERS))(
    "loader for '%s' resolves a well-formed demo module",
    async (slug) => {
      const loader = DEMO_LOADERS[slug]
      expect(loader, `no loader registered for "${slug}"`).toBeTypeOf("function")

      const mod = await loader()
      expect(mod.demo, `${slug}: demo`).toBeDefined()
      expect(typeof mod.code, `${slug}: code`).toBe("string")
      expect(mod.code.length, `${slug}: code length`).toBeGreaterThan(0)
      expect(Array.isArray(mod.dos), `${slug}: dos`).toBe(true)
      expect(Array.isArray(mod.donts), `${slug}: donts`).toBe(true)
    },
  )

  it("returns undefined for a slug that has no loader", () => {
    expect(DEMO_LOADERS["does-not-exist"]).toBeUndefined()
  })
})
