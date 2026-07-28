import type { ComponentProps } from "react"

import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { I18nProvider } from "@/components/i18n-provider"
import { ComponentDetail } from "@/components/showcase/component-detail"
import type { ComponentEntry } from "@/lib/showcase/types"

const entry: ComponentEntry = {
  slug: "button",
  title: "Button",
  category: "form",
  layer: "primitive",
  description: "설명",
  status: "done",
}

function renderDetail(extra: Partial<ComponentProps<typeof ComponentDetail>>) {
  return render(
    <I18nProvider>
      <ComponentDetail
        entry={entry}
        demo={<button>단일데모</button>}
        code="<Button/>"
        dos={["a"]}
        donts={["b"]}
        inRegistry
        {...extra}
      />
    </I18nProvider>,
  )
}

describe("ComponentDetail", () => {
  it("examples가 없으면 단일 데모로 폴백한다", () => {
    renderDetail({})
    expect(screen.getByText("단일데모")).toBeInTheDocument()
  })

  it("examples가 있으면 예제 이름과 각 데모를 그리드로 보인다", () => {
    renderDetail({
      examples: [
        { name: "Variants", demo: <button>변형데모</button>, code: "<A/>" },
        { name: "Sizes", demo: <button>크기데모</button>, code: "<B/>" },
      ],
    })
    expect(screen.getByText("Variants")).toBeInTheDocument()
    expect(screen.getByText("Sizes")).toBeInTheDocument()
    expect(screen.getByText("변형데모")).toBeInTheDocument()
    expect(screen.getByText("크기데모")).toBeInTheDocument()
  })

  it("가져다 쓰기 바(코드 복사)를 렌더한다", () => {
    renderDetail({})
    expect(screen.getByRole("button", { name: "코드 복사" })).toBeInTheDocument()
  })
})
