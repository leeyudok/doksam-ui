import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import WireframePage from "@/app/wireframe/page";

function canvas() {
  return screen.getByTestId("wireframe-canvas");
}

describe("WireframePage", () => {
  it("renders the page heading and the empty canvas state (#17)", () => {
    render(<WireframePage />);
    expect(screen.getByRole("heading", { level: 1, name: "Wireframe" })).toBeInTheDocument();
    expect(screen.getByText(/끌어다 놓거나 클릭해 추가하세요/)).toBeInTheDocument();
  });

  it("shows the palette grouped by category with done components (#17)", () => {
    render(<WireframePage />);
    expect(screen.getByText("컴포넌트 팔레트")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Button" })).toBeInTheDocument();
    expect(screen.getByText("Form")).toBeInTheDocument();
  });

  it("offers the three device frame modes with mobile as default (#17)", () => {
    render(<WireframePage />);
    const mobile = screen.getByRole("button", { name: "모바일" });
    expect(mobile).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "태블릿" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button", { name: "전체" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText("390px")).toBeInTheDocument();
  });

  it("adds a component to the canvas on palette click and loads its demo (#17)", async () => {
    render(<WireframePage />);
    fireEvent.click(screen.getByRole("button", { name: "Button" }));
    expect(await within(canvas()).findByText("Button")).toBeInTheDocument();
    expect(screen.queryByText(/끌어다 놓거나 클릭해 추가하세요/)).not.toBeInTheDocument();
    // 데모 동적 로딩까지 끝나야(스켈레톤 소멸) 늦은 setState 로 인한 act 경고가 없다.
    await waitFor(() => expect(canvas().querySelector(".animate-pulse")).toBeNull());
  });

  it("shows the JSX export section once items exist (#17)", async () => {
    render(<WireframePage />);
    fireEvent.click(screen.getByRole("button", { name: "Button" }));
    await waitFor(() => expect(canvas().querySelector(".animate-pulse")).toBeNull());
    expect(screen.getByText("JSX 내보내기")).toBeInTheDocument();
    expect(screen.getByText(/1\. Button/)).toBeInTheDocument();
  });

  it("removes an item and clears the canvas (#17)", async () => {
    render(<WireframePage />);
    fireEvent.click(screen.getByRole("button", { name: "Button" }));
    await waitFor(() => expect(canvas().querySelector(".animate-pulse")).toBeNull());
    fireEvent.click(screen.getByRole("button", { name: "Button 제거" }));
    expect(screen.getByText(/끌어다 놓거나 클릭해 추가하세요/)).toBeInTheDocument();
  });

  it("clears all items via the toolbar clear button (#17)", async () => {
    render(<WireframePage />);
    fireEvent.click(screen.getByRole("button", { name: "Button" }));
    fireEvent.click(screen.getByRole("button", { name: "Badge" }));
    await waitFor(() => expect(canvas().querySelector(".animate-pulse")).toBeNull());
    fireEvent.click(screen.getByRole("button", { name: "비우기" }));
    expect(screen.getByText(/끌어다 놓거나 클릭해 추가하세요/)).toBeInTheDocument();
  });
});
