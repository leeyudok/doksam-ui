"use client"

import * as React from "react"
import { CalendarIcon } from "@phosphor-icons/react/dist/ssr"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export interface DateRangePickerProps {
  value?: DateRange
  defaultValue?: DateRange
  onValueChange?: (range: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  /** 트리거 버튼에 표시할 날짜 포맷터. 기본값은 ko-KR 짧은 표기(월 일). */
  formatDate?: (date: Date) => string
}

const defaultFormatDate = (date: Date) =>
  date.toLocaleDateString("ko-KR", { month: "short", day: "numeric" })

/**
 * components/ui/calendar.tsx + popover.tsx + button.tsx를 조합한 커스텀
 * 컴포넌트(#36). 범위 날짜 선택 — Calendar(mode="range", numberOfMonths=2)로
 * from~to 두 달치를 동시에 보여주고, 트리거 버튼에 선택 구간을 표시한다.
 */
function DateRangePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "기간 선택",
  disabled,
  className,
  formatDate = defaultFormatDate,
}: Readonly<DateRangePickerProps>) {
  const [open, setOpen] = React.useState(false)
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState<DateRange | undefined>(
    defaultValue
  )
  const selected = isControlled ? value : internalValue

  const handleSelect = (range: DateRange | undefined) => {
    if (!isControlled) setInternalValue(range)
    onValueChange?.(range)
    if (range?.from && range?.to) {
      setOpen(false)
    }
  }

  const label = React.useMemo(() => {
    if (!selected?.from) return placeholder
    if (!selected.to) return formatDate(selected.from)
    return `${formatDate(selected.from)} - ${formatDate(selected.to)}`
  }, [selected, placeholder, formatDate])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-64 justify-start font-normal",
            !selected?.from && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="pointer-events-none" />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          numberOfMonths={2}
          selected={selected}
          onSelect={handleSelect}
          defaultMonth={selected?.from}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DateRangePicker }
