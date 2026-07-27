"use client"

import { useState } from "react"

import { DatePicker } from "@/components/date-picker"

export function DatePickerDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 6, 14))

  return <DatePicker value={date} onValueChange={setDate} />
}
