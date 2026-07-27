"use client"

import type { ReactNode } from "react"
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, XAxis, YAxis } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { CHART_COLOR_VARS } from "@/components/patterns/dataviz/chart-color"

const TOP3_TEAMS = [
  { name: "개발팀", count: 25 },
  { name: "기획팀", count: 18 },
  { name: "디자인팀", count: 12 },
]

const SENTIMENT = [
  { name: "긍정", value: 45 },
  { name: "중립", value: 30 },
  { name: "부정", value: 15 },
  { name: "미분류", value: 10 },
]

const DAILY_SIGNUPS = [
  { date: "03-01", count: 12 },
  { date: "03-10", count: 19 },
  { date: "03-20", count: 22 },
  { date: "03-30", count: 30 },
]

const MONTHLY_VISITS = [
  { month: "1월", desktop: 186 },
  { month: "2월", desktop: 305 },
  { month: "3월", desktop: 237 },
  { month: "4월", desktop: 173 },
]

const barConfig = { count: { label: "인원", color: "var(--chart-1)" } } satisfies ChartConfig
const pieConfig = { value: { label: "건수" } } satisfies ChartConfig
const areaConfig = { count: { label: "가입", color: "var(--chart-2)" } } satisfies ChartConfig
const visitsConfig = { desktop: { label: "방문", color: "var(--chart-3)" } } satisfies ChartConfig

export function ChartComboDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
      <MiniChartCard title="가로 막대">
        <ChartContainer config={barConfig} className="aspect-auto h-[66px] w-full">
          <BarChart data={TOP3_TEAMS} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={44} />
            <Bar dataKey="count" fill="var(--color-count)" radius={[0, 3, 3, 0]} />
          </BarChart>
        </ChartContainer>
      </MiniChartCard>

      <MiniChartCard title="도넛">
        <ChartContainer config={pieConfig} className="aspect-auto h-[66px] w-full">
          <PieChart>
            <Pie data={SENTIMENT} dataKey="value" cx="50%" cy="50%" outerRadius="90%" innerRadius="50%" paddingAngle={2}>
              {SENTIMENT.map((entry, i) => (
                <Cell key={entry.name} fill={CHART_COLOR_VARS[i % CHART_COLOR_VARS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </MiniChartCard>

      <MiniChartCard title="추이">
        <ChartContainer config={areaConfig} className="aspect-auto h-[66px] w-full">
          <AreaChart data={DAILY_SIGNUPS} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
            <Area type="monotone" dataKey="count" stroke="var(--color-count)" fill="var(--color-count)" fillOpacity={0.2} />
          </AreaChart>
        </ChartContainer>
      </MiniChartCard>

      <MiniChartCard title="세로 막대">
        <ChartContainer config={visitsConfig} className="aspect-auto h-[66px] w-full">
          <BarChart data={MONTHLY_VISITS} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </MiniChartCard>
    </div>
  )
}

function MiniChartCard({ title, children }: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <Card>
      <CardContent className="px-2 pt-2 pb-1">
        <p className="px-1 text-[11px] font-bold">{title}</p>
        {children}
      </CardContent>
    </Card>
  )
}
