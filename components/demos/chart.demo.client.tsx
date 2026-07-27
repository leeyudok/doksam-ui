"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const MONTHLY_REVENUE = [
  { month: "3월", revenue: 42500000 },
  { month: "4월", revenue: 38900000 },
  { month: "5월", revenue: 51200000 },
  { month: "6월", revenue: 47600000 },
  { month: "7월", revenue: 56300000 },
]

const chartConfig = {
  revenue: {
    label: "매출",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="max-h-64 w-full">
      <BarChart data={MONTHLY_REVENUE}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
