import type { PatternSampleData } from "@/components/showcase/pattern-sample"
import { HistoryListDemo } from "@/components/patterns/mobile-banking-history/history-list-demo"

export const MOBILE_BANKING_HISTORY_SAMPLES: PatternSampleData[] = [
  {
    num: 1,
    title: "거래 내역",
    description: "유형 필터 칩 + 날짜 그룹 헤더로 구성한 거래 내역 목록입니다.",
    demo: <HistoryListDemo />,
    code: `// 입금은 amount 가 양수, 출금/이체는 음수 — rateColor()가 부호로 gain/loss 를 고른다.
<span className={\`tabular-nums \${rateColor(tx.amount)}\`}>
  {tx.amount > 0 ? "+" : ""}{formatWon(tx.amount)}
</span>

// 필터링 후 날짜별로 그룹핑해 그룹 헤더 아래 나열
const filtered = TRANSACTIONS.filter((tx) => filter === "전체" || tx.type === filter)
const groups = groupTransactionsByDate(filtered)

{groups.map((group) => (
  <div key={group.date}>
    <p className="text-xs font-semibold text-muted-foreground">{formatDateHeader(group.date)}</p>
    {group.items.map((tx) => <TransactionRow key={tx.id} tx={tx} />)}
  </div>
))}`,
    notes: [
      "입금/출금 색은 lib/finance/rate의 rateColor()로 계산한다 — 한국식 관례로 입금(양수)=text-gain(적), 출금(음수)=text-loss(청).",
      "필터 칩은 aria-pressed로 현재 선택 상태를 알리고, 선택된 칩만 bg-primary로 채워 시각 구분한다.",
      "날짜 그룹 헤더는 필터링된 결과 기준으로 다시 계산해 빈 날짜 그룹이 남지 않게 한다.",
      "금액 옆에 거래 후 잔액(balanceAfter)을 작게 함께 보여줘 통장 정리 느낌을 살린다.",
    ],
  },
]
