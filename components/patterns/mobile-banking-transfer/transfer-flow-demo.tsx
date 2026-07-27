"use client"

import { useState } from "react"
import { ArrowLeftIcon, BackspaceIcon, CheckCircleIcon, StarIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatWon } from "@/lib/finance/format-won"
import { RECENT_RECIPIENTS, type Recipient } from "@/lib/patterns/mobile-banking-data"

type Step = "recipient" | "amount" | "confirm" | "done"

const STEPS: { id: Step; label: string }[] = [
  { id: "recipient", label: "받는사람" },
  { id: "amount", label: "금액" },
  { id: "confirm", label: "확인" },
]

const KEYPAD_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "back"] as const

/** 입력 자릿수를 10억원 미만으로 제한해 키패드 입력이 무한정 길어지지 않게 한다. */
const MAX_AMOUNT = 999_999_999

/**
 * 이체 플로우 데모 — 받는사람 선택 → 금액 입력(숫자 키패드) → 확인 3단계를
 * 컴포넌트가 자체 상태(step/recipient/amount)로 소유하는 uncontrolled 데모다.
 * 실제 srope/bizinfo 화면에 얹을 때는 각 단계 전환 시점에 서버 액션(수취인 검증,
 * 이체 API 호출)을 끼워 넣는 지점으로 삼는다.
 */
export function TransferFlowDemo() {
  const [step, setStep] = useState<Step>("recipient")
  const [recipient, setRecipient] = useState<Recipient | null>(null)
  const [amount, setAmount] = useState(0)

  function handleKeypadPress(key: (typeof KEYPAD_KEYS)[number]) {
    if (key === "back") {
      setAmount((prev) => Math.floor(prev / 10))
      return
    }
    setAmount((prev) => Math.min(prev * 10 ** key.length + Number(key), MAX_AMOUNT))
  }

  function handleReset() {
    setStep("recipient")
    setRecipient(null)
    setAmount(0)
  }

  const stepIndex = STEPS.findIndex((s) => s.id === step)

  return (
    <div className="mx-auto w-full max-w-sm">
      <Card>
        <CardContent className="flex flex-col gap-4 px-4 py-4">
          {step !== "done" && (
            <div className="flex items-center gap-2">
              {stepIndex > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="이전 단계"
                  onClick={() => setStep(STEPS[stepIndex - 1].id)}
                >
                  <ArrowLeftIcon size={16} weight="bold" />
                </Button>
              )}
              <ol className="flex flex-1 items-center gap-1.5">
                {STEPS.map((s, i) => (
                  <li key={s.id} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className={`h-1 w-full rounded-full ${i <= stepIndex ? "bg-primary" : "bg-secondary"}`}
                    />
                    <span
                      className={`text-[10px] ${i === stepIndex ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                    >
                      {s.label}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {step === "recipient" && (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">받는사람을 선택하세요</p>
              <ul className="flex flex-col gap-1.5">
                {RECENT_RECIPIENTS.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setRecipient(r)
                        setStep("amount")
                      }}
                      className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2.5 text-left transition-colors hover:bg-muted"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="text-sm font-medium">{r.name}</span>
                        {r.isFavorite && <StarIcon size={12} weight="fill" className="text-warning" />}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {r.bankName} {r.accountNumber}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step === "amount" && recipient && (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">{recipient.name}님에게 보낼 금액</p>
              <p className="text-right text-2xl font-bold tabular-nums" aria-live="polite">
                {formatWon(amount)}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {KEYPAD_KEYS.map((key) => (
                  <button
                    key={key}
                    type="button"
                    aria-label={key === "back" ? "한 자리 지우기" : `숫자 ${key}`}
                    onClick={() => handleKeypadPress(key)}
                    className="flex h-11 items-center justify-center rounded-lg bg-secondary text-base font-medium text-secondary-foreground transition-colors hover:bg-secondary/70"
                  >
                    {key === "back" ? <BackspaceIcon size={18} weight="regular" /> : key}
                  </button>
                ))}
              </div>
              <Button type="button" disabled={amount === 0} onClick={() => setStep("confirm")}>
                다음
              </Button>
            </div>
          )}

          {step === "confirm" && recipient && (
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium">이체 내용을 확인하세요</p>
              <div className="flex flex-col gap-2 rounded-lg border border-border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">받는사람</span>
                  <span className="font-medium">
                    {recipient.bankName} {recipient.name}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">계좌번호</span>
                  <span className="font-medium tabular-nums">{recipient.accountNumber}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">이체금액</span>
                  <span className="font-semibold tabular-nums">{formatWon(amount)}</span>
                </div>
              </div>
              <Button type="button" onClick={() => setStep("done")}>
                이체하기
              </Button>
            </div>
          )}

          {step === "done" && recipient && (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <CheckCircleIcon size={40} weight="fill" className="text-success" />
              <div>
                <p className="text-base font-semibold">이체가 완료되었습니다</p>
                <p className="text-sm text-muted-foreground">
                  {recipient.name}님에게 <Badge variant="outline">{formatWon(amount)}</Badge>
                </p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={handleReset}>
                처음으로
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
