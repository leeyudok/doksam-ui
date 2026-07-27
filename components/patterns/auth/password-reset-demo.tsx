"use client"

import { useState } from "react"
import { ArrowLeftIcon, CheckCircleIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ResetStep = "form" | "sent"

/**
 * 비밀번호 재설정 2단계 데모 — 이메일 입력 → 발송 완료 안내.
 * 실제 API 호출 없이 로컬 state만으로 단계 전환을 시뮬레이션한다.
 */
export function PasswordResetDemo() {
  const [step, setStep] = useState<ResetStep>("form")
  const [email, setEmail] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStep("sent")
  }

  if (step === "sent") {
    return (
      <div className="flex w-full max-w-sm flex-col items-center gap-3 rounded-xl border bg-card p-6 text-center">
        <CheckCircleIcon size={32} weight="fill" className="text-success" />
        <p className="text-sm font-medium">재설정 링크를 보냈어요</p>
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{email || "user@example.com"}</span>
          {" "}주소로 비밀번호 재설정 링크를 발송했습니다. 메일함을 확인해주세요.
        </p>
        <Button size="sm" variant="outline" className="mt-1" onClick={() => setStep("form")}>
          <ArrowLeftIcon size={14} weight="regular" />
          다시 입력하기
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-3 rounded-xl border bg-card p-6">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold">비밀번호 재설정</p>
        <p className="text-xs text-muted-foreground">가입한 이메일 주소를 입력하면 재설정 링크를 보내드립니다.</p>
      </div>
      <div className="space-y-1">
        <Label htmlFor="pattern-reset-email" className="text-[10px]">
          이메일
        </Label>
        <div className="relative">
          <EnvelopeSimpleIcon
            size={14}
            weight="regular"
            className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="pattern-reset-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            className="h-8 pl-8 text-xs"
          />
        </div>
      </div>
      <Button type="submit" size="sm" className="mt-1">
        재설정 링크 보내기
      </Button>
    </form>
  )
}
