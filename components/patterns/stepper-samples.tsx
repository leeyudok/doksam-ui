import { CheckIcon } from "@phosphor-icons/react/dist/ssr"

import { Progress } from "@/components/ui/progress"
import type { PatternSampleData } from "@/components/showcase/pattern-sample"
import { OnboardingWizard } from "@/components/patterns/stepper/onboarding-wizard"

const INDICATOR_STEPS = [
  { title: "정보 입력", state: "done" as const },
  { title: "약관 동의", state: "done" as const },
  { title: "결제 정보", state: "current" as const },
  { title: "완료", state: "upcoming" as const },
]

const MINI_STEPS = ["기본 정보", "회사 정보", "선호 설정", "완료"]
const MINI_CURRENT = 1

export const STEPPER_SAMPLES: PatternSampleData[] = [
  {
    num: 1,
    title: "스텝 인디케이터",
    description: "완료·진행중·예정 3가지 상태를 원형 번호 + 연결선으로 표현하는 정적 인디케이터입니다.",
    demo: (
      <ol className="flex w-full max-w-md items-center gap-1.5">
        {INDICATOR_STEPS.map((s, i) => (
          <li key={s.title} className="flex flex-1 items-center gap-1.5">
            <div className="flex flex-col items-center gap-1">
              <span
                className={
                  s.state === "done"
                    ? "flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground"
                    : s.state === "current"
                      ? "flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-medium text-primary ring-2 ring-primary"
                      : "flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground"
                }
              >
                {s.state === "done" ? <CheckIcon size={12} weight="bold" /> : INDICATOR_STEPS.indexOf(s) + 1}
              </span>
              <span className="text-[10px] whitespace-nowrap text-muted-foreground">{s.title}</span>
            </div>
            {i < INDICATOR_STEPS.length - 1 ? (
              <span className={`h-px flex-1 ${s.state === "done" ? "bg-primary" : "bg-border"}`} />
            ) : null}
          </li>
        ))}
      </ol>
    ),
    code: `function StepIndicator({ steps, }: { steps: { title: string; state: "done" | "current" | "upcoming" }[] }) {
  return (
    <ol className="flex items-center gap-1.5">
      {steps.map((s, i) => (
        <li key={s.title} className="flex flex-1 items-center gap-1.5">
          <span className={cn(
            "flex size-6 items-center justify-center rounded-full text-[10px] font-medium",
            s.state === "done" && "bg-primary text-primary-foreground",
            s.state === "current" && "bg-primary/15 text-primary ring-2 ring-primary",
            s.state === "upcoming" && "bg-muted text-muted-foreground"
          )}>
            {s.state === "done" ? <CheckIcon weight="bold" /> : i + 1}
          </span>
          {i < steps.length - 1 ? <span className="h-px flex-1 bg-border" /> : null}
        </li>
      ))}
    </ol>
  )
}`,
    notes: [
      "완료 단계는 primary 배경 + CheckIcon, 진행중 단계는 primary/15 배경 + primary 링, 예정 단계는 muted 배경으로 구분한다.",
      "단계 사이 연결선은 완료 구간만 bg-primary, 나머지는 bg-border로 진행 정도를 시각화한다.",
      "번호 대신 아이콘으로 단계를 표현해야 하면 Icon prop을 받아 교체할 수 있게 확장한다.",
    ],
  },
  {
    num: 2,
    title: "온보딩 위저드",
    description: "진행 인디케이터 + 단계별 폼 + 이전/다음/완료 내비게이션으로 구성된 4단계 온보딩입니다.",
    demo: <OnboardingWizard />,
    code: `function OnboardingWizard() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  function goNext() {
    if (step === LAST_STEP) { setDone(true); return }
    setStep((prev) => Math.min(prev + 1, LAST_STEP))
  }

  if (done) return <CompletionScreen onRestart={() => { setStep(0); setDone(false) }} />

  return (
    <div>
      <StepIndicator current={step} steps={STEPS} />
      {step === 0 && <BasicInfoFields />}
      {step === 1 && <CompanyInfoFields />}
      {step === 2 && <PreferenceFields />}
      {step === 3 && <SummaryReview />}
      <div className="flex justify-between">
        <Button variant="outline" onClick={goPrev} disabled={step === 0}>이전</Button>
        <Button onClick={goNext}>{step === LAST_STEP ? "완료" : "다음"}</Button>
      </div>
    </div>
  )
}`,
    notes: [
      "각 단계 입력값은 위저드 컴포넌트가 소유하고, 완료 시 요약 화면에서 한 번에 검토하게 한다.",
      "이전 버튼은 첫 단계에서 disabled 처리하고, 마지막 단계의 다음 버튼은 라벨을 '완료'로 바꿔 종료 지점을 명확히 한다.",
      "실 서비스에서는 완료 버튼 클릭 시 setDone 대신 서버 액션 호출 후 성공 시에만 완료 화면으로 전환한다.",
      "단계 값 검증(필수 입력 등)이 필요하면 다음 버튼을 해당 단계 검증 결과로 disabled 처리한다.",
    ],
  },
  {
    num: 3,
    title: "컴팩트 진행바 스텝",
    description: "원형 인디케이터 대신 Progress 바 하나로 현재 단계를 표시하는 축약형 변형입니다.",
    demo: (
      <div className="w-full max-w-md space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium">
            {MINI_CURRENT + 1}/{MINI_STEPS.length}단계 — {MINI_STEPS[MINI_CURRENT]}
          </span>
          <span className="text-muted-foreground">
            {Math.round(((MINI_CURRENT + 1) / MINI_STEPS.length) * 100)}%
          </span>
        </div>
        <Progress value={((MINI_CURRENT + 1) / MINI_STEPS.length) * 100} className="h-1.5" />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          {MINI_STEPS.map((title) => (
            <span key={title}>{title}</span>
          ))}
        </div>
      </div>
    ),
    code: `<div className="space-y-2">
  <div className="flex items-center justify-between text-xs">
    <span className="font-medium">{current + 1}/{steps.length}단계 — {steps[current]}</span>
    <span className="text-muted-foreground">{Math.round(((current + 1) / steps.length) * 100)}%</span>
  </div>
  <Progress value={((current + 1) / steps.length) * 100} className="h-1.5" />
</div>`,
    notes: [
      "단계 수가 많거나(5단계 이상) 세로 공간이 좁은 화면(모바일 상단 바 등)에서는 원형 인디케이터 대신 이 축약형을 쓴다.",
      "퍼센트 값은 (현재 단계 + 1) / 전체 단계 수로 계산해 마지막 단계에서 항상 100%가 되게 한다.",
    ],
  },
]
