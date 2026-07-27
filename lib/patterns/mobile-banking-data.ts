/**
 * 모바일뱅킹 패턴(#34) 전용 데모 데이터 — 순수 데이터/함수 모듈.
 *
 * "use client" 없음 — 서버 컴포넌트(samples 파일)에서 바로 import 해 쓴다. React
 * 컴포넌트나 클라이언트 전용 값(훅 등)은 여기서 export 하지 않는다 — 그건
 * components/patterns/mobile-banking-transfer, mobile-banking-history 쪽 클라이언트 컴포넌트가 담당한다.
 *
 * 계좌·거래·수취인은 전부 가상의 예시 값이며 실제 계좌 정보가 아니다.
 */

export type AccountKind = "입출금" | "예금" | "적금"

export interface Account {
  id: string
  kind: AccountKind
  bankName: string
  accountNumber: string
  nickname: string
  balance: number
  isPrimary: boolean
}

export const ACCOUNTS: Account[] = [
  {
    id: "acc-1",
    kind: "입출금",
    bankName: "doksam은행",
    accountNumber: "110-234-567890",
    nickname: "생활비 통장",
    balance: 2_845_600,
    isPrimary: true,
  },
  {
    id: "acc-2",
    kind: "예금",
    bankName: "doksam은행",
    accountNumber: "110-998-112233",
    nickname: "비상금",
    balance: 12_000_000,
    isPrimary: false,
  },
  {
    id: "acc-3",
    kind: "적금",
    bankName: "doksam은행",
    accountNumber: "110-556-778899",
    nickname: "여행 적금",
    balance: 1_320_000,
    isPrimary: false,
  },
]

/** 대표계좌(없으면 첫 계좌)를 반환한다. */
export function getPrimaryAccount(accounts: Account[] = ACCOUNTS): Account {
  return accounts.find((a) => a.isPrimary) ?? accounts[0]
}

/** 전체 계좌 잔액 합계. */
export function getTotalBalance(accounts: Account[] = ACCOUNTS): number {
  return accounts.reduce((sum, a) => sum + a.balance, 0)
}

export interface QuickMenuItem {
  id: string
  label: string
  href?: string
}

export const QUICK_MENU: QuickMenuItem[] = [
  { id: "transfer", label: "이체" },
  { id: "deposit", label: "예금" },
  { id: "card", label: "카드" },
  { id: "loan", label: "대출" },
  { id: "insurance", label: "보험" },
  { id: "exchange", label: "환전" },
  { id: "asset", label: "자산관리" },
  { id: "more", label: "전체메뉴" },
]

export interface Recipient {
  id: string
  name: string
  bankName: string
  accountNumber: string
  /** 최근 이체 상대에 붙는 "즐겨찾는" 플래그 — 빠른 선택 목록 상단 노출용. */
  isFavorite: boolean
}

export const RECENT_RECIPIENTS: Recipient[] = [
  { id: "r-1", name: "김민지", bankName: "doksam은행", accountNumber: "110-111-222333", isFavorite: true },
  { id: "r-2", name: "이서준", bankName: "새싹은행", accountNumber: "302-4455-6677", isFavorite: true },
  { id: "r-3", name: "박도현", bankName: "한들은행", accountNumber: "999-01-234567", isFavorite: false },
  { id: "r-4", name: "최유나", bankName: "doksam은행", accountNumber: "110-777-888999", isFavorite: false },
]

export type TransactionType = "입금" | "출금" | "이체"

export interface Transaction {
  id: string
  /** ISO 8601 날짜(YYYY-MM-DD) — 같은 값끼리 날짜 그룹 헤더로 묶인다. */
  date: string
  time: string
  type: TransactionType
  counterparty: string
  description: string
  /** 입금은 양수, 출금/이체출금은 음수 — rateColor()/formatWon() 부호 규칙과 그대로 맞아떨어진다. */
  amount: number
  balanceAfter: number
}

export const TRANSACTIONS: Transaction[] = [
  { id: "tx-1", date: "2026-07-12", time: "14:32", type: "출금", counterparty: "스타벅스 강남점", description: "카드 결제", amount: -6500, balanceAfter: 2_845_600 },
  { id: "tx-2", date: "2026-07-12", time: "09:10", type: "입금", counterparty: "㈜doksam", description: "급여", amount: 3_200_000, balanceAfter: 2_852_100 },
  { id: "tx-3", date: "2026-07-11", time: "20:45", type: "출금", counterparty: "GS25 역삼점", description: "카드 결제", amount: -12_400, balanceAfter: -347_900 },
  { id: "tx-4", date: "2026-07-11", time: "13:02", type: "이체", counterparty: "김민지", description: "점심값 송금", amount: -30_000, balanceAfter: -335_500 },
  { id: "tx-5", date: "2026-07-10", time: "18:20", type: "입금", counterparty: "이서준", description: "회비 정산", amount: 50_000, balanceAfter: -305_500 },
  { id: "tx-6", date: "2026-07-10", time: "08:15", type: "출금", counterparty: "국민연금공단", description: "자동이체", amount: -230_000, balanceAfter: -355_500 },
  { id: "tx-7", date: "2026-07-09", time: "22:05", type: "출금", counterparty: "쿠팡", description: "카드 결제", amount: -45_800, balanceAfter: -125_500 },
  { id: "tx-8", date: "2026-07-09", time: "10:00", type: "입금", counterparty: "doksam은행", description: "이자", amount: 1_230, balanceAfter: -79_700 },
]

export const TRANSACTION_TYPE_FILTERS: readonly (TransactionType | "전체")[] = ["전체", "입금", "출금", "이체"]

/** 거래 내역을 날짜(내림차순 유지)별로 그룹핑한다 — 입력이 이미 최신순 정렬돼 있다고 가정한다. */
export function groupTransactionsByDate(transactions: Transaction[]): { date: string; items: Transaction[] }[] {
  const groups: { date: string; items: Transaction[] }[] = []
  for (const tx of transactions) {
    const last = groups.at(-1)
    if (last && last.date === tx.date) {
      last.items.push(tx)
    } else {
      groups.push({ date: tx.date, items: [tx] })
    }
  }
  return groups
}

/** YYYY-MM-DD -> "7월 12일 (토)" 같은 한국어 날짜 그룹 헤더 문구로 변환한다. */
export function formatDateHeader(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`)
  if (Number.isNaN(date.getTime())) return isoDate
  const weekday = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${weekday})`
}
