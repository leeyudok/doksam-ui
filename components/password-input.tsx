"use client"

import * as React from "react"
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

export interface PasswordInputProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  /** 표시 토글 버튼의 접근성 라벨(표시 상태). 기본값 "비밀번호 표시". */
  showLabel?: string
  /** 표시 토글 버튼의 접근성 라벨(숨김 상태). 기본값 "비밀번호 숨기기". */
  hideLabel?: string
}

/**
 * components/ui/input.tsx + input-group.tsx를 조합한 커스텀 컴포넌트(#36).
 * 마스킹된 비밀번호 입력에 Eye/EyeSlash 토글 버튼을 붙인다.
 * 원본 Input/InputGroup은 수정하지 않고 조합만 한다.
 */
function PasswordInput({
  className,
  disabled,
  autoComplete = "current-password",
  showLabel = "비밀번호 표시",
  hideLabel = "비밀번호 숨기기",
  ...props
}: Readonly<PasswordInputProps>) {
  const [visible, setVisible] = React.useState(false)

  return (
    <InputGroup className={cn(className)}>
      <InputGroupInput
        type={visible ? "text" : "password"}
        disabled={disabled}
        autoComplete={autoComplete}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          size="icon-xs"
          variant="ghost"
          disabled={disabled}
          aria-label={visible ? hideLabel : showLabel}
          aria-pressed={visible}
          onClick={() => setVisible((prev) => !prev)}
        >
          {visible ? (
            <EyeSlashIcon className="pointer-events-none" />
          ) : (
            <EyeIcon className="pointer-events-none" />
          )}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export { PasswordInput }
