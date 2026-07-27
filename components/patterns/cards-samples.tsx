import {
  ChartLineUpIcon,
  DatabaseIcon,
  GearIcon,
  TrendUpIcon,
  UsersIcon,
} from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { PatternSampleData } from "@/components/showcase/pattern-sample"

const SUMMARIES = [
  { label: "전체 직원", value: 1234, unit: "명", icon: UsersIcon, tone: "text-primary" },
  { label: "매출", value: 52800, unit: "만원", icon: TrendUpIcon, tone: "text-success" },
  { label: "방문자", value: 8920, unit: "명", icon: TrendUpIcon, tone: "text-warning" },
  { label: "서버", value: 12, unit: "대", icon: DatabaseIcon, tone: "text-destructive" },
]

const STATUSES = [
  { name: "API 서버", status: "정상", tone: "text-success", percent: 99.9 },
  { name: "DB 서버", status: "경고", tone: "text-warning", percent: 78.5 },
  { name: "캐시 서버", status: "장애", tone: "text-destructive", percent: 0 },
]

const ACTIONS = [
  { title: "빠른 시작", description: "새 프로젝트를 생성합니다", actionLabel: "시작하기", icon: ChartLineUpIcon, tone: "text-primary" },
  { title: "시스템 설정", description: "환경 변수를 관리합니다", actionLabel: "설정 열기", icon: GearIcon, tone: "text-warning" },
  { title: "문서 보기", description: "API 문서를 확인합니다", actionLabel: "바로가기", icon: DatabaseIcon, tone: "text-success" },
]

const CATEGORIES = [
  {
    label: "시스템",
    total: 21045,
    icon: GearIcon,
    tone: "text-primary",
    items: [
      { label: "직원", value: "1" },
      { label: "로그", value: "18K" },
      { label: "메뉴", value: "41" },
    ],
  },
  {
    label: "비즈니스",
    total: 88,
    icon: DatabaseIcon,
    tone: "text-warning",
    items: [
      { label: "1원인증", value: "50" },
      { label: "DB정보", value: "37" },
      { label: "사업자", value: "1" },
    ],
  },
  {
    label: "통계",
    total: 6543,
    icon: ChartLineUpIcon,
    tone: "text-destructive",
    items: [
      { label: "리포트", value: "4.1K" },
      { label: "이벤트", value: "1.2K" },
      { label: "알림", value: "721" },
    ],
  },
]

export const CARDS_SAMPLES: PatternSampleData[] = [
  {
    num: 1,
    title: "SummaryCard",
    description: "아이콘 + 숫자 + 단위로 핵심 지표를 요약하는 카드입니다.",
    demo: (
      <div className="grid w-full grid-cols-2 gap-1.5 md:grid-cols-4">
        {SUMMARIES.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label}>
              <CardContent className="flex flex-col gap-1 px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-medium text-muted-foreground">{s.label}</p>
                  <Icon size={14} weight="duotone" className={s.tone} />
                </div>
                <p>
                  <span className="text-base font-black">{s.value.toLocaleString()}</span>
                  <span className="ml-0.5 text-[10px] text-muted-foreground">{s.unit}</span>
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    ),
    code: `<Card>
  <CardContent className="flex flex-col gap-1 px-3 py-2.5">
    <div className="flex items-center justify-between">
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <Icon size={14} weight="duotone" className={tone} />
    </div>
    <p>
      <span className="text-base font-black">{value.toLocaleString()}</span>
      <span className="ml-0.5 text-[10px] text-muted-foreground">{unit}</span>
    </p>
  </CardContent>
</Card>`,
    notes: [
      "라벨·아이콘·수치를 한 카드에 압축해 4~5개를 grid-cols-2 md:grid-cols-4로 나열한다.",
      "색상은 text-primary / text-success / text-warning / text-destructive 시맨틱 토큰만 쓴다.",
      "숫자는 toLocaleString()으로 천단위 콤마를 넣는다.",
    ],
  },
  {
    num: 2,
    title: "DetailCard",
    description: "미니 차트나 진행률 그래픽을 내장한 카드입니다.",
    demo: (
      <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
        <Card>
          <CardContent className="px-2 pt-2 pb-1">
            <p className="px-1 text-[11px] font-bold text-foreground">일별 등록 추이</p>
            <div className="flex h-[80px] items-end gap-1 rounded bg-gradient-to-r from-primary/5 to-primary/20 px-2 pb-1">
              {[30, 45, 25, 60, 40, 55, 35].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-primary/60" style={{ height: `${h}%` }} />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-2 pt-2 pb-1">
            <p className="px-1 text-[11px] font-bold text-foreground">분포 현황</p>
            <div className="flex h-[80px] items-center justify-center">
              <div className="relative size-16">
                <svg viewBox="0 0 36 36" className="size-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3" className="text-muted" />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-primary"
                    strokeDasharray="62 88"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">70%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    ),
    code: `<Card>
  <CardContent className="px-2 pt-2 pb-1">
    <p className="px-1 text-[11px] font-bold">일별 등록 추이</p>
    <div className="flex h-[80px] items-end gap-1 px-2 pb-1">
      {values.map((h, i) => (
        <div key={i} className="flex-1 rounded-t bg-primary/60" style={{ height: \`\${h}%\` }} />
      ))}
    </div>
  </CardContent>
</Card>`,
    notes: [
      "본격 recharts 그래프가 아니라 요약용 미니 시각화(막대 스파크라인, 도넛)에 적합하다.",
      "카드 패딩은 px-2 pt-2 pb-1로 좁게 잡아 데이터 밀도를 높인다.",
      "복잡한 인터랙션이 필요하면 dataviz 패턴의 ChartContainer 기반 차트로 승격한다.",
    ],
  },
  {
    num: 3,
    title: "StatusCard",
    description: "상태 뱃지 + 진행률로 서비스/서버 상태를 보여주는 카드입니다.",
    demo: (
      <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-3">
        {STATUSES.map((s) => (
          <Card key={s.name}>
            <CardContent className="flex flex-col gap-2 px-3 py-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">{s.name}</span>
                <Badge
                  variant={s.status === "정상" ? "default" : s.status === "경고" ? "secondary" : "destructive"}
                  className="px-1.5 py-0 text-[9px]"
                >
                  {s.status}
                </Badge>
              </div>
              <Progress value={s.percent} />
              <span className={`text-[10px] font-medium tabular-nums ${s.tone}`}>{s.percent}%</span>
            </CardContent>
          </Card>
        ))}
      </div>
    ),
    code: `<Card>
  <CardContent className="flex flex-col gap-2 px-3 py-2.5">
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium">{name}</span>
      <Badge variant={statusVariant}>{status}</Badge>
    </div>
    <Progress value={percent} />
    <span className="text-[10px] tabular-nums">{percent}%</span>
  </CardContent>
</Card>`,
    notes: [
      "상태 문자열에 따라 Badge variant를 default(정상)/secondary(경고)/destructive(장애)로 매핑한다.",
      "shadcn Progress 컴포넌트를 그대로 써서 접근성(role=progressbar)을 확보한다.",
      "퍼센트 숫자는 시각적 진행률과 함께 텍스트로도 노출해 정확한 값을 전달한다.",
    ],
  },
  {
    num: 4,
    title: "ActionCard",
    description: "버튼/링크로 이어지는 액션을 담은 카드입니다.",
    demo: (
      <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-3">
        {ACTIONS.map((a) => {
          const Icon = a.icon
          return (
            <Card key={a.title}>
              <CardContent className="flex flex-col gap-2 px-3 py-3">
                <Icon size={20} weight="duotone" className={a.tone} />
                <div>
                  <p className="text-sm font-semibold">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.description}</p>
                </div>
                <Button size="sm" variant="outline" className="w-fit">
                  {a.actionLabel}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    ),
    code: `<Card>
  <CardContent className="flex flex-col gap-2 px-3 py-3">
    <Icon size={20} weight="duotone" className={tone} />
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    <Button size="sm" variant="outline" className="w-fit">{actionLabel}</Button>
  </CardContent>
</Card>`,
    notes: [
      "아이콘 → 제목/설명 → 액션 버튼 순서로 시선 흐름을 만든다.",
      "카드 하나당 액션은 1개만 두어 클릭 대상이 모호해지지 않게 한다.",
      "outline 버튼을 기본으로 쓰고, 파괴적 액션에만 destructive variant를 쓴다.",
    ],
  },
  {
    num: 5,
    title: "CategoryCard",
    description: "카테고리로 묶은 하위 항목들을 한 카드에 정리해 보여줍니다.",
    demo: (
      <div className="grid w-full grid-cols-1 gap-1.5 md:grid-cols-3">
        {CATEGORIES.map((c) => {
          const Icon = c.icon
          return (
            <Card key={c.label}>
              <CardContent className="flex flex-col gap-2 px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Icon size={14} weight="duotone" className={c.tone} />
                    <span className="text-xs font-semibold">{c.label}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{c.total.toLocaleString()}</span>
                </div>
                <div className="flex flex-col gap-1">
                  {c.items.map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>{item.label}</span>
                      <span className="font-medium text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    ),
    code: `<Card>
  <CardContent className="flex flex-col gap-2 px-3 py-2.5">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Icon size={14} weight="duotone" className={tone} />
        <span className="text-xs font-semibold">{label}</span>
      </div>
      <span className="text-[10px] text-muted-foreground">{total.toLocaleString()}</span>
    </div>
    <div className="flex flex-col gap-1">
      {items.map((item) => (
        <div key={item.label} className="flex justify-between text-[10px] text-muted-foreground">
          <span>{item.label}</span>
          <span className="font-medium text-foreground">{item.value}</span>
        </div>
      ))}
    </div>
  </CardContent>
</Card>`,
    notes: [
      "카테고리 헤더(아이콘+라벨+합계)와 세부 항목 리스트를 한 카드 안에서 위계로 구분한다.",
      "세부 항목은 3~4개로 제한하고, 더 많으면 상세 페이지로 링크한다.",
      "합계 수치는 우측 상단에 작게, 항목별 값은 우측 정렬해 스캔하기 쉽게 한다.",
    ],
  },
]
