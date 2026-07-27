import type { Icon } from "@phosphor-icons/react"
import {
  ChatCircleIcon,
  CheckCircleIcon,
  CreditCardIcon,
  UserPlusIcon,
  WarningCircleIcon,
  XCircleIcon,
} from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

type ActivityStatus = "success" | "warning" | "destructive" | "muted"

interface ActivityItem {
  time: string
  status: ActivityStatus
  icon: Icon
  title: string
  description: string
}

interface ActivityGroup {
  date: string
  items: ActivityItem[]
}

const GROUPS: ActivityGroup[] = [
  {
    date: "2026-07-13 (오늘)",
    items: [
      {
        time: "14:12",
        status: "success",
        icon: CheckCircleIcon,
        title: "결제 완료",
        description: "ORD-1042 주문이 정상 결제되었습니다.",
      },
      {
        time: "11:05",
        status: "muted",
        icon: ChatCircleIcon,
        title: "댓글 등록",
        description: "'배송이 언제쯤 시작되나요?' 문의가 등록되었습니다.",
      },
    ],
  },
  {
    date: "2026-07-12",
    items: [
      {
        time: "22:40",
        status: "destructive",
        icon: XCircleIcon,
        title: "결제 실패",
        description: "카드사 한도 초과로 ORD-1039 결제가 거절되었습니다.",
      },
      {
        time: "16:18",
        status: "warning",
        icon: WarningCircleIcon,
        title: "재고 부족 경고",
        description: "SKU-2210 재고가 5개 미만으로 떨어졌습니다.",
      },
      {
        time: "09:02",
        status: "success",
        icon: UserPlusIcon,
        title: "신규 가입",
        description: "새 회원 3명이 가입했습니다.",
      },
    ],
  },
  {
    date: "2026-07-11",
    items: [
      {
        time: "18:30",
        status: "muted",
        icon: CreditCardIcon,
        title: "정기 결제 갱신",
        description: "구독 62건이 자동 갱신되었습니다.",
      },
    ],
  },
]

const NODE_CLASS: Record<ActivityStatus, string> = {
  success: "border-success/40 bg-success/10 text-success",
  warning: "border-warning/40 bg-warning/10 text-warning",
  destructive: "border-destructive/40 bg-destructive/10 text-destructive",
  muted: "border-border bg-muted text-muted-foreground",
}

function ActivityNode({ item }: Readonly<{ item: ActivityItem }>) {
  const Icon = item.icon
  return (
    <li className="relative flex gap-3 pb-6 last:pb-0">
      <span aria-hidden className="absolute top-6 bottom-0 left-[15px] w-px bg-border last:hidden" />
      <span
        className={cn(
          "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border",
          NODE_CLASS[item.status]
        )}
      >
        <Icon size={16} weight="fill" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 pt-1">
        <div className="flex items-baseline gap-2">
          <p className="text-sm font-medium">{item.title}</p>
          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{item.time}</span>
        </div>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>
    </li>
  )
}

/**
 * #1 세로 활동 타임라인 — 아이콘 노드 + 시각 + 제목/설명, 날짜별 그룹 구분(#33).
 * 상태 4종(success/warning/destructive/muted)은 각각 결제 성공/재고 경고/결제 실패/일반
 * 활동을 나타내며 노드 테두리·배경·아이콘 색을 같은 시맨틱 토큰으로 통일한다.
 */
export function ActivityTimeline() {
  return (
    <div className="flex flex-col gap-6">
      {GROUPS.map((group) => (
        <section key={group.date} className="flex flex-col gap-3">
          <h3 className="sticky top-0 text-xs font-semibold tracking-wide text-muted-foreground uppercase">{group.date}</h3>
          <ol className="flex flex-col">
            {group.items.map((item) => (
              <ActivityNode key={`${group.date}-${item.time}-${item.title}`} item={item} />
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}
