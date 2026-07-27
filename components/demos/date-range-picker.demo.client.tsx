"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"

import { DateRangePicker } from "@/components/date-range-picker"

export function DateRangePickerDemo() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 6, 14),
    to: new Date(2026, 6, 20),
  })

  return <DateRangePicker value={range} onValueChange={setRange} />
}
