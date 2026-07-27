"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const DAILY_SIGNUPS = [
  { date: "03-01", count: 12 },
  { date: "03-05", count: 28 },
  { date: "03-10", count: 19 },
  { date: "03-15", count: 35 },
  { date: "03-20", count: 22 },
  { date: "03-25", count: 41 },
  { date: "03-30", count: 30 },
]

const chartConfig = {
  count: { label: "가입", color: "var(--chart-1)" },
} satisfies ChartConfig

export function AreaChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[160px] w-full">
      <AreaChart data={DAILY_SIGNUPS} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="pattern-area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-count)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-count)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} allowDecimals={false} width={32} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area type="monotone" dataKey="count" stroke="var(--color-count)" strokeWidth={1.5} fill="url(#pattern-area-fill)" />
      </AreaChart>
    </ChartContainer>
  )
}
