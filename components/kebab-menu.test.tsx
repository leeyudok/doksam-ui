import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { KebabMenu } from "@/components/kebab-menu";

// jsdom은 Pointer Events의 capture API를 구현하지 않는다 — Radix DropdownMenu가
// 내부적으로 hasPointerCapture 등을 호출하므로 테스트 환경에서만 no-op으로 채운다.
beforeAll(() => {
  Element.prototype.hasPointerCapture ??= () => false;
  Element.prototype.setPointerCapture ??= () => {};
  Element.prototype.releasePointerCapture ??= () => {};
  Element.prototype.scrollIntoView ??= () => {};
});

function openMenu(name: string) {
  const trigger = screen.getByRole("button", { name });
  fireEvent.pointerDown(trigger, { pointerType: "mouse", button: 0 });
  fireEvent.click(trigger);
}

describe("KebabMenu", () => {
  it("uses label as the trigger button's accessible name", () => {
    render(<KebabMenu label="계좌 옵션" items={[{ label: "수정", onSelect: vi.fn() }]} />);
    expect(screen.getByRole("button", { name: "계좌 옵션" })).toBeInTheDocument();
  });

  it("renders items when the menu is opened", async () => {
    render(
      <KebabMenu
        label="옵션"
        items={[
          { label: "수정", onSelect: vi.fn() },
          { label: "공유", onSelect: vi.fn() },
        ]}
      />,
    );
    openMenu("옵션");

    expect(await screen.findByRole("menuitem", { name: "수정" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "공유" })).toBeInTheDocument();
  });

  it("calls onSelect when an item is chosen", async () => {
    const onEdit = vi.fn();
    render(<KebabMenu label="옵션" items={[{ label: "수정", onSelect: onEdit }]} />);

    openMenu("옵션");
    fireEvent.click(await screen.findByRole("menuitem", { name: "수정" }));

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("renders a separator between item groups", async () => {
    render(
      <KebabMenu
        label="옵션"
        items={[
          { label: "수정", onSelect: vi.fn() },
          "separator",
          { label: "삭제", variant: "destructive", onSelect: vi.fn() },
        ]}
      />,
    );
    openMenu("옵션");
    await screen.findByRole("menuitem", { name: "수정" });

    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("does not call onSelect for a disabled item", async () => {
    const onSelect = vi.fn();
    render(<KebabMenu label="옵션" items={[{ label: "수정", onSelect, disabled: true }]} />);

    openMenu("옵션");
    const item = await screen.findByRole("menuitem", { name: "수정" });
    expect(item).toHaveAttribute("aria-disabled", "true");

    fireEvent.click(item);
    expect(onSelect).not.toHaveBeenCalled();
  });
});
