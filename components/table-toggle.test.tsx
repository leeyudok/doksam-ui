import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { beforeAll, describe, expect, it, vi } from "vitest"

import { TableToggle, type TableToggleColumn } from "@/components/table-toggle"

// jsdom은 Pointer Events의 capture API를 구현하지 않는다 — Radix Switch가 내부적으로
// hasPointerCapture 등을 호출하므로 테스트 환경에서만 no-op으로 채운다.
beforeAll(() => {
  Element.prototype.hasPointerCapture ??= () => false
  Element.prototype.setPointerCapture ??= () => {}
  Element.prototype.releasePointerCapture ??= () => {}
})

interface Source {
  id: string
  name: string
  enabled: boolean
}

const columns: TableToggleColumn<Source>[] = [{ header: "소스", cell: (row) => row.name }]

function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (reason?: unknown) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

describe("TableToggle", () => {
  it("renders one switch per row with an accessible name derived from the row", () => {
    const data: Source[] = [
      { id: "a", name: "Naver News", enabled: true },
      { id: "b", name: "Google RSS", enabled: false },
    ]
    render(
      <TableToggle
        data={data}
        getRowId={(row) => row.id}
        getEnabled={(row) => row.enabled}
        getRowLabel={(row) => row.name}
        onToggle={async () => {}}
        columns={columns}
      />
    )

    expect(screen.getByRole("switch", { name: "Naver News 사용 여부" })).toBeChecked()
    expect(screen.getByRole("switch", { name: "Google RSS 사용 여부" })).not.toBeChecked()
  })

  it("optimistically flips the switch before the async handler resolves", async () => {
    const { promise } = deferred<void>()
    const onToggle = vi.fn(() => promise)
    const data: Source[] = [{ id: "a", name: "Naver News", enabled: false }]

    render(
      <TableToggle
        data={data}
        getRowId={(row) => row.id}
        getEnabled={(row) => row.enabled}
        getRowLabel={(row) => row.name}
        onToggle={onToggle}
        columns={columns}
      />
    )

    const toggle = screen.getByRole("switch", { name: "Naver News 사용 여부" })
    expect(toggle).not.toBeChecked()
    fireEvent.click(toggle)

    // 비동기 핸들러가 아직 resolve되지 않았는데도 즉시 반영된다.
    expect(toggle).toBeChecked()
    expect(onToggle).toHaveBeenCalledWith(data[0], true)
  })

  it("rolls the switch back and surfaces the failure reason on rejection", async () => {
    const failing = deferred<void>()
    const onToggle = vi.fn(() => failing.promise)
    const data: Source[] = [{ id: "a", name: "Naver News", enabled: false }]

    render(
      <TableToggle
        data={data}
        getRowId={(row) => row.id}
        getEnabled={(row) => row.enabled}
        getRowLabel={(row) => row.name}
        onToggle={onToggle}
        columns={columns}
      />
    )

    const toggle = screen.getByRole("switch", { name: "Naver News 사용 여부" })
    fireEvent.click(toggle)
    expect(toggle).toBeChecked()

    failing.reject(new Error("네트워크 오류로 저장하지 못했습니다."))
    await waitFor(() => expect(toggle).not.toBeChecked())

    const errorText = screen.getByText("네트워크 오류로 저장하지 못했습니다.")
    expect(errorText).toBeInTheDocument()
    expect(toggle).toHaveAttribute("aria-describedby", errorText.id)
  })

  it("disables only the in-flight row's switch while other rows stay interactive", async () => {
    const { promise, resolve } = deferred<void>()
    const onToggle = vi.fn(() => promise)
    const data: Source[] = [
      { id: "a", name: "Naver News", enabled: false },
      { id: "b", name: "Google RSS", enabled: false },
    ]

    render(
      <TableToggle
        data={data}
        getRowId={(row) => row.id}
        getEnabled={(row) => row.enabled}
        getRowLabel={(row) => row.name}
        onToggle={onToggle}
        columns={columns}
      />
    )

    const toggleA = screen.getByRole("switch", { name: "Naver News 사용 여부" })
    const toggleB = screen.getByRole("switch", { name: "Google RSS 사용 여부" })

    fireEvent.click(toggleA)
    expect(toggleA).toBeDisabled()
    expect(toggleB).not.toBeDisabled()

    resolve()
    await waitFor(() => expect(toggleA).not.toBeDisabled())
  })

  it("reconciles idle rows with incoming data while leaving in-flight rows untouched", async () => {
    const { promise } = deferred<void>()
    const onToggle = vi.fn(() => promise)
    const data: Source[] = [
      { id: "a", name: "Naver News", enabled: false },
      { id: "b", name: "Google RSS", enabled: false },
    ]

    const { rerender } = render(
      <TableToggle
        data={data}
        getRowId={(row) => row.id}
        getEnabled={(row) => row.enabled}
        getRowLabel={(row) => row.name}
        onToggle={onToggle}
        columns={columns}
      />
    )

    // b(idle)를 서버가 이미 켜둔 상태로 부모가 새 data를 내려준다.
    fireEvent.click(screen.getByRole("switch", { name: "Naver News 사용 여부" }))

    const nextData: Source[] = [
      { id: "a", name: "Naver News", enabled: false },
      { id: "b", name: "Google RSS", enabled: true },
    ]
    rerender(
      <TableToggle
        data={nextData}
        getRowId={(row) => row.id}
        getEnabled={(row) => row.enabled}
        getRowLabel={(row) => row.name}
        onToggle={onToggle}
        columns={columns}
      />
    )

    // idle이던 b는 새 data를 즉시 반영한다.
    expect(screen.getByRole("switch", { name: "Google RSS 사용 여부" })).toBeChecked()
    // in-flight인 a는 낙관적 상태(켜짐)를 유지한다 — data상 여전히 false지만 덮이지 않는다.
    expect(screen.getByRole("switch", { name: "Naver News 사용 여부" })).toBeChecked()
    expect(screen.getByRole("switch", { name: "Naver News 사용 여부" })).toBeDisabled()
  })

  it("renders an empty state when there is no data", () => {
    render(
      <TableToggle
        data={[]}
        getRowId={(row: Source) => row.id}
        getEnabled={(row: Source) => row.enabled}
        onToggle={async () => {}}
        columns={columns}
      />
    )
    expect(screen.getByText("데이터가 없습니다.")).toBeInTheDocument()
  })
})
