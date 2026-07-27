import { ChartDemo } from "./chart.demo.client"

export const demo = <ChartDemo />

export const code = `const MONTHLY_REVENUE = [
  { month: "3월", revenue: 42500000 },
  { month: "4월", revenue: 38900000 },
  { month: "5월", revenue: 51200000 },
]

const chartConfig = {
  revenue: { label: "매출", color: "var(--chart-1)" },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="max-h-64 w-full">
  <BarChart data={MONTHLY_REVENUE}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
  </BarChart>
</ChartContainer>`

export const dos = [
  "시리즈 색상은 ChartConfig의 chart-1~5 시맨틱 토큰만 사용한다.",
  "ChartTooltipContent로 값에 단위·포맷을 붙여 정확한 수치를 전달한다.",
  "데이터 포인트가 적을 때(5개 내외)는 CartesianGrid를 최소화해 시각적 노이즈를 줄인다.",
]

export const donts = [
  "fill 색상에 hex 코드를 하드코딩하지 않는다 — var(--color-*) 토큰을 사용한다.",
  "축 라벨 없이 숫자만 나열해 맥락 없는 차트를 만들지 않는다.",
]
