"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const MONTHLY_VISITS = [
  { month: "1월", desktop: 186, mobile: 80 },
  { month: "2월", desktop: 305, mobile: 200 },
  { month: "3월", desktop: 237, mobile: 120 },
  { month: "4월", desktop: 173, mobile: 190 },
  { month: "5월", desktop: 209, mobile: 130 },
  { month: "6월", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: { label: "데스크톱", color: "var(--chart-1)" },
  mobile: { label: "모바일", color: "var(--chart-2)" },
} satisfies ChartConfig

export function BarChartVerticalDemo() {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[160px] w-full">
      <BarChart data={MONTHLY_VISITS} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} allowDecimals={false} width={32} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
