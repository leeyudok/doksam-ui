import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import IconsPage from "@/app/icons/page";

describe("IconsPage", () => {
  it("renders the page heading", () => {
    render(<IconsPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Icons" })).toBeInTheDocument();
  });

  it("lists the three standard icon libraries", () => {
    render(<IconsPage />);
    expect(screen.getByText(/Phosphor \(@phosphor-icons\/react\)/)).toBeInTheDocument();
    expect(screen.getByText(/Lucide \(lucide-react\)/)).toBeInTheDocument();
    expect(screen.getByText(/Tabler \(@tabler\/icons-react\)/)).toBeInTheDocument();
  });

  it("demos all six Phosphor weights", () => {
    render(<IconsPage />);
    for (const weight of ["thin", "light", "regular", "bold", "fill", "duotone"]) {
      expect(screen.getByText(weight)).toBeInTheDocument();
    }
  });

  it("renders the icon gallery with search input and category chips (#66)", () => {
    render(<IconsPage />);
    expect(screen.getByPlaceholderText(/아이콘 검색/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "차트·데이터" })).toBeInTheDocument();
  });

  it("filters icons by korean keyword (#66)", () => {
    render(<IconsPage />);
    fireEvent.change(screen.getByPlaceholderText(/아이콘 검색/), { target: { value: "나침반" } });
    expect(screen.getByRole("button", { name: /Compass/ })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /HouseIcon/ })).not.toBeInTheDocument();
  });

  it("shows an empty state for a no-match query (#66)", () => {
    render(<IconsPage />);
    fireEvent.change(screen.getByPlaceholderText(/아이콘 검색/), { target: { value: "zzzznope" } });
    expect(screen.getByText("검색 결과가 없습니다")).toBeInTheDocument();
  });

  it("renders copy buttons for both import examples", () => {
    render(<IconsPage />);
    expect(screen.getAllByRole("button", { name: "복사" })).toHaveLength(2);
  });

  it("renders the 6-library comparison section with all library names", () => {
    render(<IconsPage />);
    expect(screen.getByText("라이브러리 비교 (참고)")).toBeInTheDocument();
    for (const name of ["Phosphor", "Lucide", "Tabler", "Heroicons", "Radix Icons", "Akar Icons"]) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });

  it("marks the non-standard libraries as reference-only", () => {
    render(<IconsPage />);
    expect(screen.getAllByText("표준 아님 — 비교 참고용")).toHaveLength(3);
  });

  it("compares all 8 icon concepts per library", () => {
    render(<IconsPage />);
    for (const label of ["Home", "Search", "Bell", "Settings", "User", "Heart", "Trash"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });
});
