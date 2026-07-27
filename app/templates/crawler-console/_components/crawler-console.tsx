"use client";

import { useEffect, useRef, useState } from "react";
import {
  ClockCounterClockwiseIcon,
  PlayIcon,
  StopIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { LiveIndicator, type LiveIndicatorStatus } from "@/components/live-indicator";

import { INITIAL_RUNS, type CrawlRun } from "../_data/runs";
import { StepFlow, type StepFlowModel, type StepStatus } from "./step-flow";
import { RunHistoryTable } from "./run-history-table";

const STEP_LABELS = ["수집", "갱신", "감지"] as const;
const TICK_MS = 450;
const PROGRESS_STEP = 11;

type Phase = "idle" | "running";

/** 진행률(0~100)에서 3단계 스텝 상태를 파생한다. */
function deriveStepFlow(phase: Phase, progress: number): StepFlowModel {
  if (phase === "idle") {
    return {
      steps: STEP_LABELS.map((label) => ({ label, status: "idle" as StepStatus })),
      progress: 0,
      progressLabel: "대기 중 · 다음 예약 실행 04:00",
    };
  }
  const activeIndex = progress >= 67 ? 2 : progress >= 34 ? 1 : 0;
  const steps = STEP_LABELS.map((label, i) => {
    let status: StepStatus;
    if (progress >= 100 || i < activeIndex) status = "done";
    else if (i === activeIndex) status = "running";
    else status = "idle";
    return { label, status };
  });
  return {
    steps,
    progress,
    progressLabel: `${STEP_LABELS[activeIndex]} 단계 진행 중…`,
  };
}

/** 입력창의 대상 코드를 파싱해 개수를 센다(줄바꿈·콤마·공백 구분). */
function parseTargetCount(text: string): number {
  return new Set(
    text
      .split(/[\r\n,]+|\s+/)
      .map((t) => t.trim())
      .filter(Boolean),
  ).size;
}

/** 현재 시각을 표시용 고정 포맷 "YYYY-MM-DD HH:MM:SS"(KST 가정)로 만든다. */
function nowStamp(): string {
  const p = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const d = new Date();
  return (
    `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ` +
    `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
  );
}

const LIVE_STATUS: Record<Phase, LiveIndicatorStatus> = {
  idle: "paused",
  running: "live",
};

const LIVE_LABEL: Record<Phase, string> = {
  idle: "스케줄러 대기 · 다음 04:00",
  running: "수동 실행 진행 중",
};

/**
 * 데이터 파이프라인 운영 콘솔의 상호작용 영역 전체를 소유하는 클라이언트
 * 컴포넌트. 수동 트리거 → 실행 중 상태 전이(스텝플로우·라이브 인디케이터·이력
 * 반영)를 로컬 상태만으로 시뮬레이션한다. 실제 네트워크 호출·백엔드는 없다.
 */
export function CrawlerConsole() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [targetInput, setTargetInput] = useState("");
  const [runs, setRuns] = useState<CrawlRun[]>(INITIAL_RUNS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => clearTimer, []);

  const prependRun = (status: CrawlRun["status"], updated: number, failed: number) => {
    const count = parseTargetCount(targetInput);
    const target = count > 0 ? `지정 · ${count}` : "전체 소스 · 48";
    setRuns((prev) => [
      {
        id: `run-${Date.now()}`,
        time: nowStamp(),
        target,
        trigger: "수동",
        updated,
        failed,
        status,
      },
      ...prev,
    ]);
  };

  const start = () => {
    if (phase === "running") return;
    setPhase("running");
    setProgress(0);
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + PROGRESS_STEP;
        if (next >= 100) {
          clearTimer();
          setPhase("idle");
          prependRun("success", 96 + Math.round(Math.random() * 40), 0);
          return 0;
        }
        return next;
      });
    }, TICK_MS);
  };

  const stop = () => {
    if (phase !== "running") return;
    clearTimer();
    setPhase("idle");
    setProgress(0);
    prependRun("stopped", 0, 0);
  };

  const flow = deriveStepFlow(phase, progress);
  const running = phase === "running";

  return (
    <div className="flex flex-col gap-4">
      {/* 스텝플로우 + 스케줄러 상태 */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-base">수집 파이프라인</CardTitle>
            <LiveIndicator status={LIVE_STATUS[phase]} label={LIVE_LABEL[phase]} />
          </div>
        </CardHeader>
        <CardContent>
          <StepFlow {...flow} />
        </CardContent>
      </Card>

      {/* 수동 트리거 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <PlayIcon className="size-4" />
            수동 트리거
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="crawl-targets" className="text-sm text-muted-foreground">
              대상 소스 코드 (선택 · 줄바꿈·콤마 구분 — 비우면 전체 소스)
            </label>
            <Textarea
              id="crawl-targets"
              rows={3}
              placeholder={"SRC-A01\nSRC-A02, SRC-B14"}
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              disabled={running}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" onClick={start} disabled={running}>
              <PlayIcon className="size-4" />
              {parseTargetCount(targetInput) > 0 ? "지정 대상 실행" : "전체 소스 실행"}
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={stop}
              disabled={!running}
            >
              <StopIcon className="size-4" />
              중단
            </Button>
            {running && (
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <span className="size-2 animate-pulse rounded-full bg-primary" />
                실행 중… {progress}%
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 실행 이력 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ClockCounterClockwiseIcon className="size-4" />
            실행 이력
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RunHistoryTable runs={runs} />
        </CardContent>
      </Card>
    </div>
  );
}
