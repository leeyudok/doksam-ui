import { describe, expect, it } from "vitest"

import { buildLlmMarkdown, shadcnAddCommand } from "@/lib/showcase/llm-markdown"

const base = {
  title: "Button",
  slug: "button",
  description: "클릭 가능한 기본 액션 트리거.",
  code: "<Button>저장</Button>",
  dos: ["주요 액션 하나만 default"],
  donts: ["default 여러 개 나열 금지"],
}

describe("shadcnAddCommand", () => {
  it("slug로 설치 커맨드를 만든다", () => {
    expect(shadcnAddCommand("badge-extended")).toBe(
      "npx shadcn@latest add https://ui.doksam.com/r/badge-extended.json",
    )
  })
})

describe("buildLlmMarkdown", () => {
  it("레지스트리에 있으면 설치 커맨드 줄을 포함한다", () => {
    const md = buildLlmMarkdown({ ...base, inRegistry: true })
    expect(md).toContain("# Button (button)")
    expect(md).toContain("클릭 가능한 기본 액션 트리거.")
    expect(md).toContain("npx shadcn@latest add https://ui.doksam.com/r/button.json")
    expect(md).toContain("<Button>저장</Button>")
    expect(md).toContain("Do: 주요 액션 하나만 default")
    expect(md).toContain("Don't: default 여러 개 나열 금지")
  })

  it("레지스트리에 없으면 수동 복사 안내로 대체한다", () => {
    const md = buildLlmMarkdown({ ...base, inRegistry: false })
    expect(md).not.toContain("npx shadcn")
    expect(md).toContain("components/button.tsx 를 수동 복사")
  })
})
