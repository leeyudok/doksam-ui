"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const PORTFOLIO_VALUE = [
  { day: "04-01", value: 100 },
  { day: "04-02", value: 103 },
  { day: "04-03", value: 98 },
  { day: "04-04", value: 105 },
  { day: "04-05", value: 112 },
  { day: "04-06", value: 108 },
  { day: "04-07", value: 115 },
  { day: "04-08", value: 118 },
  { day: "04-09", value: 120 },
]

const chartConfig = {
  value: { label: "포트폴리오 가치", color: "var(--chart-1)" },
} satisfies ChartConfig

/** 포트폴리오 가치 추이 라인 차트 — chart-1 토큰 하나로 시드(100) 대비 변화를 보여준다. */
export function SimulationChart() {
  return (
    <ChartContainer config={chartConfig} className="max-h-48 w-full">
      <LineChart data={PORTFOLIO_VALUE}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} fontSize={9} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line dataKey="value" type="monotone" stroke="var(--color-value)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  )
}
