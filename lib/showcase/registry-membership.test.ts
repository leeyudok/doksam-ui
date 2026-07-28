import { describe, expect, it } from "vitest"

import { isInRegistry } from "@/lib/showcase/registry-membership"

describe("isInRegistry", () => {
  it("registry.json에 있는 slug는 true", () => {
    expect(isInRegistry("badge-extended")).toBe(true)
  })

  it("등록되지 않은 slug는 false", () => {
    expect(isInRegistry("__does-not-exist__")).toBe(false)
  })
})
