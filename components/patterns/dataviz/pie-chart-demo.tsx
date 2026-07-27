"use client"

import { Cell, Pie, PieChart } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { CHART_COLOR_VARS } from "@/components/patterns/dataviz/chart-color"

const SENTIMENT = [
  { name: "긍정", value: 45 },
  { name: "중립", value: 30 },
  { name: "부정", value: 15 },
  { name: "미분류", value: 10 },
]

const chartConfig = {
  value: { label: "건수" },
} satisfies ChartConfig

export function PieChartDemo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <ChartContainer config={chartConfig} className="aspect-square h-[160px]">
        <PieChart>
          <Pie data={SENTIMENT} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="80%" innerRadius="40%" paddingAngle={2}>
            {SENTIMENT.map((entry, i) => (
              <Cell key={entry.name} fill={CHART_COLOR_VARS[i % CHART_COLOR_VARS.length]} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        </PieChart>
      </ChartContainer>
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 px-2">
        {SENTIMENT.map((item, i) => (
          <div key={item.name} className="flex items-center gap-1 text-xs">
            <span
              aria-hidden
              className="inline-block size-2 shrink-0 rounded-sm"
              style={{ backgroundColor: CHART_COLOR_VARS[i % CHART_COLOR_VARS.length] }}
            />
            <span className="text-muted-foreground">{item.name}</span>
            <span className="font-medium tabular-nums">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
