import type { PatternSampleData } from "@/components/showcase/pattern-sample"
import { ActivityHeatmapDemo } from "@/components/patterns/dataviz/activity-heatmap-demo"
import { AreaChartDemo } from "@/components/patterns/dataviz/area-chart-demo"
import { BarChartHorizontalDemo } from "@/components/patterns/dataviz/bar-chart-horizontal-demo"
import { BarChartVerticalDemo } from "@/components/patterns/dataviz/bar-chart-vertical-demo"
import { ChartComboDemo } from "@/components/patterns/dataviz/chart-combo-demo"
import { DivergingBarDemo } from "@/components/patterns/dataviz/diverging-bar-demo"
import { PieChartDemo } from "@/components/patterns/dataviz/pie-chart-demo"
import { ReturnCurveDemo } from "@/components/patterns/dataviz/return-curve-demo"
import { SparklineDemo } from "@/components/patterns/dataviz/sparkline-demo"

const REGION_DATA = [
  { label: "서울", value: 1250 },
  { label: "경기", value: 980 },
  { label: "부산", value: 420 },
  { label: "대구", value: 310 },
  { label: "인천", value: 290 },
]
const REGION_MAX = Math.max(...REGION_DATA.map((d) => d.value))

export const DATAVIZ_SAMPLES: PatternSampleData[] = [
  {
    num: 1,
    title: "BarChart 가로",
    description: "recharts 가로 막대 — 항목이 6개 이상이라 라벨을 세로로 나열할 때 사용합니다.",
    demo: <BarChartHorizontalDemo />,
    code: `const chartConfig = {
  count: { label: "인원", color: "var(--chart-1)" },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="h-[180px] w-full">
  <BarChart data={teamHeadcount} layout="vertical">
    <CartesianGrid horizontal={false} />
    <XAxis type="number" tickLine={false} axisLine={false} allowDecimals={false} />
    <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={56} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
      {teamHeadcount.map((entry, i) => (
        <Cell key={entry.name} fill={CHART_COLOR_VARS[i % 5]} />
      ))}
    </Bar>
  </BarChart>
</ChartContainer>`,
    notes: [
      "항목이 6개 이상이면 세로 라벨 겹침을 피해 가로 막대(layout='vertical')를 쓴다.",
      "Cell 색상은 chart-1~5 시맨틱 토큰을 순환(i % 5)해서 적용한다.",
      "YAxis width는 라벨 길이에 맞춰 52~72px 정도로 잡는다.",
    ],
  },
  {
    num: 2,
    title: "BarChart 세로",
    description: "recharts 세로 막대 — 월별/카테고리별 다중 시리즈 비교에 사용합니다.",
    demo: <BarChartVerticalDemo />,
    code: `const chartConfig = {
  desktop: { label: "데스크톱", color: "var(--chart-1)" },
  mobile: { label: "모바일", color: "var(--chart-2)" },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="h-[160px] w-full">
  <BarChart data={monthlyVisits}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <YAxis tickLine={false} axisLine={false} allowDecimals={false} width={32} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={[4, 4, 0, 0]} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={[4, 4, 0, 0]} />
  </BarChart>
</ChartContainer>`,
    notes: [
      "다중 시리즈는 ChartConfig에 시리즈별 chart-1~5 색상을 하나씩 지정한다.",
      "Bar radius는 [4, 4, 0, 0](위쪽만 둥글게)이 세로 막대의 기본값이다.",
      "높이는 140~180px 사이 고정값으로 페이지 리듬을 맞춘다.",
    ],
  },
  {
    num: 3,
    title: "AreaChart",
    description: "시계열 추이 — 일별/월별 누적·트렌드를 보여줄 때 사용합니다.",
    demo: <AreaChartDemo />,
    code: `const chartConfig = {
  count: { label: "가입", color: "var(--chart-1)" },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="h-[160px] w-full">
  <AreaChart data={dailySignups}>
    <defs>
      <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="var(--color-count)" stopOpacity={0.3} />
        <stop offset="95%" stopColor="var(--color-count)" stopOpacity={0} />
      </linearGradient>
    </defs>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="date" tickLine={false} axisLine={false} />
    <YAxis tickLine={false} axisLine={false} allowDecimals={false} width={32} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Area type="monotone" dataKey="count" stroke="var(--color-count)" strokeWidth={1.5} fill="url(#fill)" />
  </AreaChart>
</ChartContainer>`,
    notes: [
      "linearGradient fill로 영역 아래를 옅게 채워 추이를 강조한다.",
      "strokeWidth는 1.5 정도로 얇게 유지해 데이터가 아닌 선이 시선을 뺏지 않게 한다.",
      "그라디언트 id는 페이지 내에서 고유해야 하므로 컴포넌트별로 접두어를 붙인다.",
    ],
  },
  {
    num: 4,
    title: "PieChart",
    description: "도넛/원형 분포 — 항목이 5개 이하일 때 사용합니다.",
    demo: <PieChartDemo />,
    code: `const chartConfig = { value: { label: "건수" } } satisfies ChartConfig

<ChartContainer config={chartConfig} className="aspect-square h-[160px]">
  <PieChart>
    <Pie data={sentiment} dataKey="value" nameKey="name" outerRadius="80%" innerRadius="40%" paddingAngle={2}>
      {sentiment.map((entry, i) => (
        <Cell key={entry.name} fill={CHART_COLOR_VARS[i % 5]} />
      ))}
    </Pie>
    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
  </PieChart>
</ChartContainer>`,
    notes: [
      "도넛형은 innerRadius=40%, outerRadius=80%, paddingAngle=2가 기본값이다.",
      "범례는 차트 아래 flex-wrap으로 배치하고 색상 사각형(size-2 rounded-sm)을 함께 둔다.",
      "항목이 6개를 넘어가면 PieChart 대신 BarChart 가로를 쓴다.",
    ],
  },
  {
    num: 5,
    title: "BarList",
    description: "recharts 없이 CSS만으로 만드는 간단한 비율 막대 — 가벼운 랭킹/분포 표시에 사용합니다.",
    demo: (
      <div className="flex w-full flex-col gap-1.5">
        {REGION_DATA.map((item) => (
          <div key={item.label} className="-mx-1 flex items-center gap-1 rounded px-1 transition-colors hover:bg-accent/50">
            <span className="min-w-[60px] max-w-[120px] shrink-0 truncate text-xs" title={item.label}>
              {item.label}
            </span>
            <div className="h-2.5 flex-1 rounded bg-secondary">
              <div
                className="h-2.5 rounded bg-primary transition-all duration-300"
                style={{ width: `${(item.value / REGION_MAX) * 100}%` }}
              />
            </div>
            <span className="min-w-[32px] text-right text-xs font-medium tabular-nums">{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    ),
    code: `<div className="flex flex-col gap-1.5">
  {regionData.map((item) => (
    <div key={item.label} className="flex items-center gap-1">
      <span className="min-w-[60px] max-w-[120px] truncate text-xs">{item.label}</span>
      <div className="h-2.5 flex-1 rounded bg-secondary">
        <div
          className="h-2.5 rounded bg-primary transition-all duration-300"
          style={{ width: \`\${(item.value / max) * 100}%\` }}
        />
      </div>
      <span className="min-w-[32px] text-right text-xs tabular-nums">{item.value.toLocaleString()}</span>
    </div>
  ))}
</div>`,
    notes: [
      "recharts 오버헤드 없이 가벼운 랭킹/분포를 보여줄 때 적합하다.",
      "값은 tabular-nums + toLocaleString()으로 자릿수를 맞춰 정렬한다.",
      "라벨은 min-w/max-w + truncate로 길이가 달라도 정렬이 흐트러지지 않게 한다.",
    ],
  },
  {
    num: 6,
    title: "차트 조합",
    description: "여러 차트를 한 그리드에 섞어 요약 대시보드를 구성하는 예시입니다.",
    demo: <ChartComboDemo />,
    code: `<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
  <Card><CardContent>{/* 가로 막대 */}</CardContent></Card>
  <Card><CardContent>{/* 도넛 */}</CardContent></Card>
  <Card><CardContent>{/* 추이 */}</CardContent></Card>
  <Card><CardContent>{/* 세로 막대 */}</CardContent></Card>
</div>`,
    notes: [
      "카드 그리드는 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2가 기본값이다.",
      "각 미니 차트는 축·범례를 최소화하고 높이를 66px 안팎으로 눌러 요약 용도임을 드러낸다.",
      "카드마다 다른 차트 종류를 조합해 한눈에 여러 지표를 비교할 수 있게 한다.",
    ],
  },
  {
    num: 7,
    title: "인라인 스파크라인",
    description: "외부 의존성 없는 순수 SVG 미니 차트 — 참조선·밴드·이벤트 마커를 겹쳐 카드/리스트 행에 인라인으로 씁니다.",
    demo: <SparklineDemo />,
    code: `function Sparkline({ values, refLine, band, marker, height = 40 }: SparklineProps) {
  // ...toX/toY 스케일 계산은 min/max + 10% 패딩
  return (
    <div className={cn("w-full", isUp ? "text-gain" : "text-loss")} style={{ height }}>
      <svg viewBox={\`0 0 \${W} \${H}\`} preserveAspectRatio="none" className="h-full w-full">
        {band && <rect x={0} y={toY(band.max)} width={W} height={toY(band.min) - toY(band.max)} className="fill-primary/10" />}
        {refLine && <line x1={0} y1={toY(refLine.value)} x2={W} y2={toY(refLine.value)} stroke="var(--muted-foreground)" strokeDasharray="3,3" />}
        <polygon points={areaPoints} fill="currentColor" opacity={0.08} />
        <polyline points={points} fill="none" stroke="currentColor" strokeWidth={1.5} />
        <circle cx={lastX} cy={lastY} r={2.5} fill="currentColor" />
        {marker && <circle cx={markerPoint.x} cy={markerPoint.y} r={2.5} fill="var(--chart-4)" />}
      </svg>
    </div>
  )
}`,
    notes: [
      "색상은 부모 div에 text-gain/text-loss를 걸고 SVG는 stroke/fill='currentColor'로 상속받는다 — 하드코딩 색 없음.",
      "참조선은 var(--muted-foreground) 대시선, 밴드는 fill-primary/10, 마커는 var(--chart-4)로 서로 겹쳐도 구분되게 한다.",
      "recharts 없이 순수 SVG라 리스트 행 수십 개에 인라인으로 반복해도 가볍다.",
    ],
  },
  {
    num: 8,
    title: "수익률 곡선",
    description: "0% 기준선을 공유하는 시계열 — ResizeObserver로 컨테이너 폭을 측정해 반응형으로 그립니다.",
    demo: <ReturnCurveDemo />,
    code: `function ReturnCurveChart({ points, height = 100 }: ReturnCurveChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(320)

  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof ResizeObserver === "undefined") return
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // yMin/yMax는 0을 항상 포함하도록 계산해 0% 기준선이 항상 그려지게 한다.
  return (
    <div ref={containerRef} className={isUp ? "text-gain" : "text-loss"} style={{ height }}>
      <svg width={W} height={H} viewBox={\`0 0 \${W} \${H}\`}>
        <line x1={drawLeft} y1={zeroY} x2={drawRight} y2={zeroY} stroke="var(--muted-foreground)" strokeDasharray="4,3" />
        <polygon points={areaPoints} fill="currentColor" opacity={0.08} />
        <polyline points={linePoints} fill="none" stroke="currentColor" strokeWidth={2} />
      </svg>
    </div>
  )
}`,
    notes: [
      "ResizeObserver는 typeof 체크로 feature-detect한다 — SSR/jsdom처럼 미구현 환경에서는 초기 width로 정적 렌더된다.",
      "yMin/yMax 계산에 0을 항상 포함시켜 데이터가 전부 양수/음수여도 0% 기준선이 화면 안에 남는다.",
      "마지막 수익률 부호로 text-gain/text-loss를 정해 선·영역·라벨이 한 색으로 통일된다.",
    ],
  },
  {
    num: 9,
    title: "활동 히트맵",
    description: "GitHub contribution graph 스타일 — 주(週) 단위 열 × 요일 행 그리드에 primary 알파 농도로 활동량을 표현합니다.",
    demo: <ActivityHeatmapDemo />,
    code: `function levelClass(n: number): string {
  if (n <= 0) return "bg-muted"
  if (n <= 2) return "bg-primary/25"
  if (n <= 5) return "bg-primary/50"
  if (n <= 9) return "bg-primary/75"
  return "bg-primary"
}

<div className="flex gap-[3px] overflow-x-auto" role="img" aria-label="최근 N주 일별 활동 건수 히트맵">
  {weeks.map((col) => (
    <div key={col[0].week} className="flex flex-col gap-[3px]">
      {col.map((cell) => (
        <span key={cell.day} title={\`\${cell.count}건\`} className={\`h-2.5 w-2.5 rounded-[2px] \${levelClass(cell.count)}\`} />
      ))}
    </div>
  ))}
</div>`,
    notes: [
      "농도 5단계는 bg-muted(0) → bg-primary/25 → /50 → /75 → bg-primary(최대) — 하드코딩 색 없이 알파값만 바꾼다.",
      "그리드 전체에 role='img' + aria-label을 달아 개별 셀 title 툴팁 없이도 스크린리더가 요약을 읽는다.",
      "데모 데이터는 sin 기반 결정적 의사난수로 생성해 스냅샷/렌더 테스트가 항상 같은 모양을 재현한다.",
    ],
  },
  {
    num: 10,
    title: "발산형 막대",
    description: "여러 항목이 중앙 0축을 공유하는 막대 — 음수는 왼쪽, 양수는 오른쪽으로 뻗어 순매수/순매도 같은 대비를 보여줍니다.",
    demo: <DivergingBarDemo />,
    code: `const maxAbs = Math.max(...data.map((d) => Math.abs(d.value)), 1)

{data.map((item) => {
  const width = item.value ? Math.max((Math.abs(item.value) / maxAbs) * 100, 2) : 0
  return (
    <div key={item.label} className="relative h-2.5">
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border" />
      {item.value < 0 && <div className="absolute inset-y-0 rounded-l-sm bg-loss" style={{ right: "50%", width: \`\${width / 2}%\` }} />}
      {item.value > 0 && <div className="absolute inset-y-0 rounded-r-sm bg-gain" style={{ left: "50%", width: \`\${width / 2}%\` }} />}
    </div>
  )
})}`,
    notes: [
      "폭은 절반 영역(중앙 0축~끝) 기준 %다 — 전체 폭이 아니라 반쪽 폭에 대한 비율로 계산한다.",
      "0/누락 값은 막대 자체를 그리지 않는다 — 최소폭 슬리버가 가짜 신호를 주지 않도록 한다.",
      "양수는 bg-gain/text-gain, 음수는 bg-loss/text-loss로 고정해 부호와 색이 항상 일치한다.",
    ],
  },
]
