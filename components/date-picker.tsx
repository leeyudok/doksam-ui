"use client"

import * as React from "react"
import { CalendarIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export interface DatePickerProps {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  /** 트리거 버튼에 표시할 날짜 포맷터. 기본값은 ko-KR 장문 표기. */
  formatDate?: (date: Date) => string
}

const defaultFormatDate = (date: Date) =>
  date.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })

/**
 * components/ui/calendar.tsx + popover.tsx + button.tsx를 조합한 커스텀
 * 컴포넌트(#36). 단일 날짜 선택 — 트리거 버튼에 선택된 날짜를 표시하고
 * 클릭 시 팝오버 안에서 Calendar(mode="single")로 고른다.
 */
function DatePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "날짜 선택",
  disabled,
  className,
  formatDate = defaultFormatDate,
}: Readonly<DatePickerProps>) {
  const [open, setOpen] = React.useState(false)
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState<Date | undefined>(defaultValue)
  const selected = isControlled ? value : internalValue

  const handleSelect = (date: Date | undefined) => {
    if (!isControlled) setInternalValue(date)
    onValueChange?.(date)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-56 justify-start font-normal",
            !selected && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="pointer-events-none" />
          {selected ? formatDate(selected) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          defaultMonth={selected}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
