import {
  BankIcon,
  CreditCardIcon,
  DotsThreeIcon,
  GiftIcon,
  HandshakeIcon,
  PercentIcon,
  PiggyBankIcon,
  ScanIcon,
} from "@phosphor-icons/react/dist/ssr"
import type { Icon } from "@phosphor-icons/react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { PatternSampleData } from "@/components/showcase/pattern-sample"
import { formatWon } from "@/lib/finance/format-won"
import { ACCOUNTS, QUICK_MENU, getPrimaryAccount, getTotalBalance } from "@/lib/patterns/mobile-banking-data"

const QUICK_MENU_ICONS: Record<string, Icon> = {
  transfer: HandshakeIcon,
  deposit: PiggyBankIcon,
  card: CreditCardIcon,
  loan: PercentIcon,
  insurance: BankIcon,
  exchange: ScanIcon,
  asset: GiftIcon,
  more: DotsThreeIcon,
}

const primary = getPrimaryAccount(ACCOUNTS)
const total = getTotalBalance(ACCOUNTS)

export const MOBILE_BANKING_ACCOUNT_SAMPLES: PatternSampleData[] = [
  {
    num: 1,
    title: "대표계좌 잔액 카드",
    description: "대표계좌 잔액을 크게 보여주고 전체 계좌 합계를 함께 안내하는 홈 화면 상단 카드입니다.",
    demo: (
      <div className="mx-auto w-full max-w-sm">
        <Card>
          <CardContent className="flex flex-col gap-1 px-4 py-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {primary.bankName} · {primary.nickname}
              </p>
              <Badge variant="secondary" className="text-[10px]">
                대표계좌
              </Badge>
            </div>
            <p className="text-2xl font-bold tabular-nums">{formatWon(primary.balance)}</p>
            <p className="text-[11px] text-muted-foreground">전체 계좌 합계 {formatWon(total)}</p>
          </CardContent>
        </Card>
      </div>
    ),
    code: `<Card>
  <CardContent className="flex flex-col gap-1 px-4 py-4">
    <div className="flex items-center justify-between">
      <p className="text-xs text-muted-foreground">{account.bankName} · {account.nickname}</p>
      <Badge variant="secondary" className="text-[10px]">대표계좌</Badge>
    </div>
    <p className="text-2xl font-bold tabular-nums">{formatWon(account.balance)}</p>
    <p className="text-[11px] text-muted-foreground">전체 계좌 합계 {formatWon(total)}</p>
  </CardContent>
</Card>`,
    notes: [
      "모바일 우선 — 컨테이너를 max-w-sm mx-auto로 폰 화면 폭에 맞추고 데스크톱에서는 중앙 정렬로 확장한다.",
      "잔액은 lib/finance/format-won의 formatWon()으로 억/조 단위까지 일관되게 축약한다.",
      "대표계좌 여부는 Badge secondary로만 표시하고 별도 색상을 하드코딩하지 않는다.",
    ],
  },
  {
    num: 2,
    title: "계좌 목록",
    description: "보유 계좌를 종류별 배지와 함께 세로로 나열하는 목록 카드입니다.",
    demo: (
      <div className="mx-auto flex w-full max-w-sm flex-col gap-2">
        {ACCOUNTS.map((account) => (
          <Card key={account.id}>
            <CardContent className="flex items-center justify-between px-4 py-3">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold">{account.nickname}</span>
                  <Badge variant="outline" className="text-[9px]">
                    {account.kind}
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {account.bankName} {account.accountNumber}
                </p>
              </div>
              <p className="text-sm font-semibold tabular-nums">{formatWon(account.balance)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    ),
    code: `{accounts.map((account) => (
  <Card key={account.id}>
    <CardContent className="flex items-center justify-between px-4 py-3">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold">{account.nickname}</span>
          <Badge variant="outline" className="text-[9px]">{account.kind}</Badge>
        </div>
        <p className="text-[11px] text-muted-foreground">{account.bankName} {account.accountNumber}</p>
      </div>
      <p className="text-sm font-semibold tabular-nums">{formatWon(account.balance)}</p>
    </CardContent>
  </Card>
))}`,
    notes: [
      "계좌 하나당 카드 1장 — 터치 타깃을 넓게 잡아 모바일에서 누르기 쉽게 한다.",
      "계좌 종류(입출금/예금/적금)는 outline Badge로 구분해 시각 소음을 줄인다.",
      "잔액은 우측 정렬 + tabular-nums로 세로 나열 시 자릿수가 흔들리지 않게 한다.",
    ],
  },
  {
    num: 3,
    title: "빠른메뉴 아이콘 그리드",
    description: "자주 쓰는 기능으로 바로 이동하는 4열 아이콘 그리드입니다.",
    demo: (
      <div className="mx-auto grid w-full max-w-sm grid-cols-4 gap-3">
        {QUICK_MENU.map((item) => {
          const Icon = QUICK_MENU_ICONS[item.id] ?? BankIcon
          return (
            <button
              key={item.id}
              type="button"
              className="flex flex-col items-center gap-1.5 rounded-lg p-2 text-center transition-colors hover:bg-muted"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-secondary">
                <Icon size={18} weight="regular" className="text-secondary-foreground" />
              </span>
              <span className="text-[10px] text-muted-foreground">{item.label}</span>
            </button>
          )
        })}
      </div>
    ),
    code: `<div className="grid grid-cols-4 gap-3">
  {QUICK_MENU.map((item) => (
    <button key={item.id} type="button" className="flex flex-col items-center gap-1.5 rounded-lg p-2 hover:bg-muted">
      <span className="flex size-10 items-center justify-center rounded-full bg-secondary">
        <Icon size={18} className="text-secondary-foreground" />
      </span>
      <span className="text-[10px] text-muted-foreground">{item.label}</span>
    </button>
  ))}
</div>`,
    notes: [
      "grid-cols-4는 표준 폰 폭(360~430px)에서 아이콘 8개를 2줄로 배치하기 위한 기준값이다.",
      "아이콘 배경은 rounded-full bg-secondary로 통일하고, 아이콘 색은 secondary-foreground 토큰만 쓴다.",
      "라벨은 10px로 작게 잡되 아이콘과 세로 간격(gap-1.5)을 충분히 둬 터치 오인식을 줄인다.",
    ],
  },
]
