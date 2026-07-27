"use client"

import { useState } from "react"
import { WarningCircleIcon } from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/**
 * 로그인 폼의 검증 에러 상태 데모 — 토글 버튼으로 정상/에러 상태를 전환해 보여준다.
 * 실제 폼 검증 로직 대신 버튼 클릭으로 에러 상태를 시뮬레이션한다.
 */
export function ValidationErrorDemo() {
  const [showError, setShowError] = useState(true)

  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl border bg-card p-6">
      <div className="space-y-1">
        <Label htmlFor="pattern-verr-email" className="text-[10px]">
          이메일
        </Label>
        <Input
          id="pattern-verr-email"
          type="email"
          defaultValue="user@example"
          aria-invalid={showError}
          className="h-8 text-xs"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="pattern-verr-password" className="text-[10px]">
          비밀번호
        </Label>
        <Input
          id="pattern-verr-password"
          type="password"
          defaultValue="1234"
          aria-invalid={showError}
          className="h-8 text-xs"
        />
        {showError ? (
          <p role="alert" className="flex items-center gap-1 text-[10px] text-destructive">
            <WarningCircleIcon size={12} weight="fill" />
            이메일 형식이 올바르지 않거나 비밀번호가 8자 미만입니다.
          </p>
        ) : null}
      </div>
      <div className="mt-1 flex items-center justify-between gap-2">
        <Button type="button" size="sm" className="flex-1">
          로그인
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => setShowError((prev) => !prev)}>
          {showError ? "정상 상태 보기" : "에러 상태 보기"}
        </Button>
      </div>
    </div>
  )
}
