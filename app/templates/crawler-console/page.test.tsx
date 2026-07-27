import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CrawlerConsolePage from "@/app/templates/crawler-console/page";

describe("CrawlerConsolePage", () => {
  it("renders the page heading and eyebrow badge", () => {
    render(<CrawlerConsolePage />);
    expect(
      screen.getByRole("heading", { level: 2, name: "데이터 파이프라인 운영 콘솔" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Crawler · 파이프라인 운영")).toBeInTheDocument();
  });

  it("renders the three pipeline steps and scheduler status", () => {
    render(<CrawlerConsolePage />);
    for (const label of ["수집", "갱신", "감지"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
    expect(screen.getByText("스케줄러 대기 · 다음 04:00")).toBeInTheDocument();
  });

  it("renders run history with status badges", () => {
    render(<CrawlerConsolePage />);
    expect(screen.getByText("실행 이력")).toBeInTheDocument();
    // 데스크톱 테이블 기준: 성공/실패 배지가 모두 존재한다.
    expect(screen.getAllByText("성공").length).toBeGreaterThan(0);
    expect(screen.getAllByText("실패").length).toBeGreaterThan(0);
    expect(screen.getAllByText("중단됨").length).toBeGreaterThan(0);
  });

  it("transitions to running state when the manual trigger is fired", () => {
    render(<CrawlerConsolePage />);
    const runButton = screen.getByRole("button", { name: "전체 소스 실행" });
    const stopButton = screen.getByRole("button", { name: "중단" });
    expect(stopButton).toBeDisabled();

    fireEvent.click(runButton);

    expect(runButton).toBeDisabled();
    expect(stopButton).toBeEnabled();

    // 중단으로 시뮬레이션 인터벌을 정리한다.
    fireEvent.click(stopButton);
    expect(runButton).toBeEnabled();
  });

  it("exposes the help dialog trigger", () => {
    render(<CrawlerConsolePage />);
    expect(screen.getByRole("button", { name: "화면 매뉴얼" })).toBeInTheDocument();
  });

  it("renders the demo-data footer caption", () => {
    render(<CrawlerConsolePage />);
    const footer = screen.getByText("가상 데이터 · 데모").closest("footer");
    expect(footer).not.toBeNull();
    expect(within(footer as HTMLElement).getByText(/실제 시스템/)).toBeInTheDocument();
  });
});
