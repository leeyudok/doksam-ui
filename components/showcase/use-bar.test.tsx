import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "@/components/i18n-provider";
import { UseBar } from "@/components/showcase/use-bar";

const base = {
  slug: "button",
  title: "Button",
  description: "설명",
  code: "<Button/>",
  dos: ["a"],
  donts: ["b"],
};

function renderBar(props: { inRegistry: boolean }) {
  return render(
    <I18nProvider>
      <UseBar {...base} inRegistry={props.inRegistry} />
    </I18nProvider>,
  );
}

describe("UseBar", () => {
  it("코드 복사와 LLM 복사 버튼은 항상 있다", () => {
    renderBar({ inRegistry: true });
    expect(screen.getByRole("button", { name: "코드 복사" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "LLM용 복사" })).toBeInTheDocument();
  });

  it("레지스트리에 있으면 설치 커맨드 복사 버튼이 보인다", () => {
    renderBar({ inRegistry: true });
    expect(screen.getByRole("button", { name: "설치 커맨드 복사" })).toBeInTheDocument();
    expect(screen.queryByText("레지스트리 편입 예정")).not.toBeInTheDocument();
  });

  it("레지스트리에 없으면 설치 버튼 대신 배지를 보인다", () => {
    renderBar({ inRegistry: false });
    expect(screen.queryByRole("button", { name: "설치 커맨드 복사" })).not.toBeInTheDocument();
    expect(screen.getByText("레지스트리 편입 예정")).toBeInTheDocument();
  });
});
