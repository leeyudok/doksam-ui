"use client"

import { useState } from "react"
import { CheckIcon } from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const STEPS = [
  { title: "기본 정보", desc: "이름과 이메일을 입력하세요." },
  { title: "회사 정보", desc: "소속 회사와 규모를 알려주세요." },
  { title: "선호 설정", desc: "받고 싶은 알림을 선택하세요." },
  { title: "완료", desc: "입력한 정보를 확인하고 시작하세요." },
] as const

const LAST_STEP = STEPS.length - 1
const TEAM_SIZES = ["1-10", "11-50", "51+"] as const

/**
 * 4단계 온보딩 위저드 — 진행 인디케이터 + 단계별 폼 + 이전/다음/완료 내비게이션.
 * 각 단계 값은 로컬 state로만 관리하며, 완료 시 별도 API 호출 없이 완료 화면을 보여준다.
 */
export function OnboardingWizard() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [teamSize, setTeamSize] = useState<(typeof TEAM_SIZES)[number]>(TEAM_SIZES[0])
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifySms, setNotifySms] = useState(false)

  function goNext() {
    if (step === LAST_STEP) {
      setDone(true)
      return
    }
    setStep((prev) => Math.min(prev + 1, LAST_STEP))
  }

  function goPrev() {
    setStep((prev) => Math.max(prev - 1, 0))
  }

  function restart() {
    setStep(0)
    setDone(false)
  }

  if (done) {
    return (
      <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-xl border bg-card p-6 text-center">
        <CheckIcon size={28} weight="bold" className="rounded-full bg-success/10 p-1.5 text-success" />
        <p className="text-sm font-semibold">온보딩이 완료됐어요</p>
        <p className="text-xs text-muted-foreground">
          {name || "회원"}님, {company || "회사"} 계정 설정이 끝났습니다. 이제 대시보드를 이용할 수 있어요.
        </p>
        <Button size="sm" variant="outline" className="mt-1" onClick={restart}>
          다시 보기
        </Button>
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-xl border bg-card p-6">
      <ol className="flex items-center gap-1.5">
        {STEPS.map((s, i) => (
          <li key={s.title} className="flex flex-1 items-center gap-1.5">
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-medium",
                i < step && "bg-primary text-primary-foreground",
                i === step && "bg-primary/15 text-primary ring-2 ring-primary",
                i > step && "bg-muted text-muted-foreground"
              )}
            >
              {i < step ? <CheckIcon size={12} weight="bold" /> : i + 1}
            </span>
            {i < STEPS.length - 1 ? (
              <span className={cn("h-px flex-1", i < step ? "bg-primary" : "bg-border")} />
            ) : null}
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold">{STEPS[step].title}</p>
        <p className="text-xs text-muted-foreground">{STEPS[step].desc}</p>
      </div>

      {step === 0 ? (
        <div className="flex flex-col gap-3">
          <div className="space-y-1">
            <Label htmlFor="pattern-wizard-name" className="text-[10px]">
              이름
            </Label>
            <Input id="pattern-wizard-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" className="h-8 text-xs" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="pattern-wizard-email" className="text-[10px]">
              이메일
            </Label>
            <Input
              id="pattern-wizard-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="h-8 text-xs"
            />
          </div>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="flex flex-col gap-3">
          <div className="space-y-1">
            <Label htmlFor="pattern-wizard-company" className="text-[10px]">
              회사명
            </Label>
            <Input
              id="pattern-wizard-company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="doksam"
              className="h-8 text-xs"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px]">팀 규모</Label>
            <div className="flex gap-2">
              {TEAM_SIZES.map((size) => (
                <Button
                  key={size}
                  type="button"
                  size="sm"
                  variant={teamSize === size ? "default" : "outline"}
                  onClick={() => setTeamSize(size)}
                >
                  {size}명
                </Button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Checkbox id="pattern-wizard-notify-email" checked={notifyEmail} onCheckedChange={(v) => setNotifyEmail(v === true)} />
            <Label htmlFor="pattern-wizard-notify-email" className="text-xs font-normal">
              이메일 알림 받기
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="pattern-wizard-notify-sms" checked={notifySms} onCheckedChange={(v) => setNotifySms(v === true)} />
            <Label htmlFor="pattern-wizard-notify-sms" className="text-xs font-normal">
              SMS 알림 받기
            </Label>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-1 rounded-md border bg-muted/30 p-3 text-xs">
          <p>
            <span className="text-muted-foreground">이름</span> {name || "-"}
          </p>
          <p>
            <span className="text-muted-foreground">이메일</span> {email || "-"}
          </p>
          <p>
            <span className="text-muted-foreground">회사</span> {company || "-"} ({teamSize}명)
          </p>
          <p>
            <span className="text-muted-foreground">알림</span>{" "}
            {[notifyEmail && "이메일", notifySms && "SMS"].filter(Boolean).join(", ") || "없음"}
          </p>
        </div>
      ) : null}

      <div className="mt-1 flex justify-between gap-2">
        <Button type="button" size="sm" variant="outline" onClick={goPrev} disabled={step === 0}>
          이전
        </Button>
        <Button type="button" size="sm" onClick={goNext}>
          {step === LAST_STEP ? "완료" : "다음"}
        </Button>
      </div>
    </div>
  )
}

