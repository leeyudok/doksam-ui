"use client"

import { useState, type ClipboardEvent, type KeyboardEvent } from "react"
import { PlusIcon, XIcon } from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

function digitsOf(value: string): string {
  return value.replace(/\D/g, "")
}

/** 숫자만 남기고 010-1234-5678 형태로 타이핑 중에도 포맷팅한다. */
function formatPhoneTyping(value: string): string {
  const digits = digitsOf(value).slice(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
}

function splitTokens(text: string): string[] {
  return text
    .split(/[\r\n,]+|\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
}

/**
 * 자동 포맷팅 입력 → 펜딩 칩 변환 → 일괄 제출 패턴.
 * 붙여넣기로 여러 값을 한 번에 분할 파싱하고, 추가 전 중복을 사전 검증한다.
 */
export function ChipInputDemo() {
  const [input, setInput] = useState("")
  const [chips, setChips] = useState<string[]>([])
  const [notice, setNotice] = useState<{ tone: "muted" | "destructive"; text: string } | null>(null)
  const [submitted, setSubmitted] = useState<string[] | null>(null)

  function isDuplicate(digits: string, within: string[]): boolean {
    return within.some((c) => digitsOf(c) === digits)
  }

  function addByDigits(digits: string) {
    if (digits.length !== 10 && digits.length !== 11) return
    const formatted = formatPhoneTyping(digits)
    if (isDuplicate(digits, chips)) {
      setNotice({ tone: "destructive", text: `이미 추가된 번호입니다: ${formatted}` })
      return
    }
    setChips((prev) => [...prev, formatted])
    setNotice(null)
    setInput("")
  }

  function addBatch(tokens: string[]) {
    let added = 0
    let dup = 0
    let invalid = 0
    setChips((prev) => {
      const next = [...prev]
      for (const token of tokens) {
        const digits = digitsOf(token)
        if (digits.length !== 10 && digits.length !== 11) {
          invalid++
          continue
        }
        if (isDuplicate(digits, next)) {
          dup++
          continue
        }
        next.push(formatPhoneTyping(digits))
        added++
      }
      return next
    })
    setInput("")
    const parts: string[] = []
    if (added > 0) parts.push(`${added}건 추가`)
    if (dup > 0) parts.push(`중복 ${dup}건 제외`)
    if (invalid > 0) parts.push(`형식 오류 ${invalid}건 제외`)
    setNotice(parts.length > 0 ? { tone: dup + invalid > 0 ? "destructive" : "muted", text: parts.join(", ") } : null)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      addByDigits(digitsOf(input))
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    const tokens = splitTokens(e.clipboardData.getData("text"))
    if (tokens.length <= 1) return
    e.preventDefault()
    addBatch(tokens)
  }

  function removeChip(chip: string) {
    setChips((prev) => prev.filter((c) => c !== chip))
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex items-center gap-2">
        <Input
          value={input}
          onChange={(e) => {
            setInput(formatPhoneTyping(e.target.value))
            setNotice(null)
          }}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder="휴대폰번호 (010-0000-0000)"
          aria-label="휴대폰번호 입력"
          className="font-mono"
          maxLength={13}
        />
        <Button
          type="button"
          size="icon"
          aria-label="번호 추가"
          onClick={() => addByDigits(digitsOf(input))}
          disabled={digitsOf(input).length !== 10 && digitsOf(input).length !== 11}
        >
          <PlusIcon className="size-4" />
        </Button>
      </div>

      {notice && (
        <p className={cn("text-xs", notice.tone === "destructive" ? "text-destructive" : "text-muted-foreground")}>
          {notice.text}
        </p>
      )}

      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-2 py-1 font-mono text-xs"
            >
              {chip}
              <button
                type="button"
                aria-label={`${chip} 제거`}
                onClick={() => removeChip(chip)}
                className="text-muted-foreground hover:text-destructive"
              >
                <XIcon className="size-3" />
              </button>
            </span>
          ))}
          <Button type="button" variant="outline" size="xs" onClick={() => setChips([])}>
            전체 비우기
          </Button>
        </div>
      )}

      <Button
        type="button"
        onClick={() => setSubmitted(chips)}
        disabled={chips.length === 0}
        className="self-start"
      >
        <PlusIcon className="size-4" />
        일괄 등록
      </Button>

      {submitted && <p className="text-sm text-muted-foreground">{submitted.length}건 등록되었습니다.</p>}
    </div>
  )
}
