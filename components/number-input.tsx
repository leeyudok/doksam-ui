"use client"

import * as React from "react"
import { MinusIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

export interface NumberInputProps
  extends Omit<
    React.ComponentProps<"input">,
    "type" | "value" | "defaultValue" | "onChange" | "min" | "max" | "step"
  > {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number | undefined) => void
  decrementLabel?: string
  incrementLabel?: string
}

function clamp(value: number, min?: number, max?: number) {
  let next = value
  if (min !== undefined) next = Math.max(min, next)
  if (max !== undefined) next = Math.min(max, next)
  return next
}

/**
 * components/ui/input-group.tsx를 조합한 커스텀 컴포넌트(#36).
 * +/- 스테퍼 버튼과 min/max/step 제한, 직접 입력을 함께 지원한다.
 * 값은 controlled(value)/uncontrolled(defaultValue) 둘 다 지원.
 */
function NumberInput({
  className,
  value,
  defaultValue,
  min,
  max,
  step = 1,
  disabled,
  onValueChange,
  decrementLabel = "감소",
  incrementLabel = "증가",
  ...props
}: Readonly<NumberInputProps>) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState<number | undefined>(
    defaultValue
  )
  const currentValue = isControlled ? value : internalValue

  const commit = React.useCallback(
    (next: number | undefined) => {
      if (!isControlled) setInternalValue(next)
      onValueChange?.(next)
    },
    [isControlled, onValueChange]
  )

  const handleStep = (delta: number) => {
    const base = currentValue ?? 0
    commit(clamp(base + delta, min, max))
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value
    if (raw === "" || raw === "-") {
      commit(undefined)
      return
    }
    const parsed = Number(raw)
    if (Number.isNaN(parsed)) return
    commit(parsed)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (currentValue !== undefined) {
      commit(clamp(currentValue, min, max))
    }
    props.onBlur?.(event)
  }

  const decrementDisabled =
    disabled || (min !== undefined && currentValue !== undefined && currentValue <= min)
  const incrementDisabled =
    disabled || (max !== undefined && currentValue !== undefined && currentValue >= max)

  return (
    <InputGroup className={cn(className)}>
      <InputGroupAddon align="inline-start">
        <InputGroupButton
          type="button"
          size="icon-xs"
          variant="ghost"
          disabled={decrementDisabled}
          aria-label={decrementLabel}
          onClick={() => handleStep(-step)}
        >
          <MinusIcon className="pointer-events-none" />
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupInput
        type="text"
        inputMode="decimal"
        role="spinbutton"
        aria-valuenow={currentValue}
        aria-valuemin={min}
        aria-valuemax={max}
        className="text-center"
        disabled={disabled}
        {...props}
        value={currentValue ?? ""}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          size="icon-xs"
          variant="ghost"
          disabled={incrementDisabled}
          aria-label={incrementLabel}
          onClick={() => handleStep(step)}
        >
          <PlusIcon className="pointer-events-none" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export { NumberInput }
