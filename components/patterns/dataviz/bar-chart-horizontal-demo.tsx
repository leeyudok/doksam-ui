"use client"

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { CHART_COLOR_VARS } from "@/components/patterns/dataviz/chart-color"

const TEAM_HEADCOUNT = [
  { name: "개발팀", count: 25 },
  { name: "디자인팀", count: 12 },
  { name: "기획팀", count: 18 },
  { name: "마케팅", count: 8 },
  { name: "인사팀", count: 6 },
  { name: "영업팀", count: 15 },
  { name: "재무팀", count: 9 },
]

const chartConfig = {
  count: { label: "인원", color: "var(--chart-1)" },
} satisfies ChartConfig

export function BarChartHorizontalDemo() {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[180px] w-full">
      <BarChart data={TEAM_HEADCOUNT} layout="vertical" margin={{ top: 0, right: 24, left: 0, bottom: 0 }}>
        <CartesianGrid horizontal={false} />
        <XAxis type="number" tickLine={false} axisLine={false} allowDecimals={false} />
        <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={56} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
          {TEAM_HEADCOUNT.map((entry, i) => (
            <Cell key={entry.name} fill={CHART_COLOR_VARS[i % CHART_COLOR_VARS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
