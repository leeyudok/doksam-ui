import type { Icon } from "@phosphor-icons/react"
import {
  BankIcon,
  CalculatorIcon,
  CardholderIcon,
  FileTextIcon,
  MapPinIcon,
  UserCircleGearIcon,
} from "@phosphor-icons/react/dist/ssr"

/** 바로바로서비스 퀵링크 — "예금" 탭과 "카드" 탭을 토글해 목록을 바꿔 보여준다. */
export interface QuickLink {
  key: string
  label: string
  icon: Icon
  href: string
}

export type QuickLinkGroupKey = "deposit" | "card"

export const QUICK_LINK_GROUPS: Record<QuickLinkGroupKey, { label: string; links: QuickLink[] }> = {
  deposit: {
    label: "예금",
    links: [
      { key: "balance", label: "잔액조회", icon: BankIcon, href: "#quicklink-balance" },
      { key: "interest-calc", label: "이자 계산기", icon: CalculatorIcon, href: "#quicklink-interest-calc" },
      { key: "certificate", label: "증명서 발급", icon: FileTextIcon, href: "#quicklink-certificate" },
      { key: "branch", label: "가까운 영업점", icon: MapPinIcon, href: "#quicklink-branch" },
    ],
  },
  card: {
    label: "카드",
    links: [
      { key: "card-usage", label: "이용내역 조회", icon: CardholderIcon, href: "#quicklink-card-usage" },
      { key: "card-limit", label: "한도 조회/변경", icon: CalculatorIcon, href: "#quicklink-card-limit" },
      { key: "card-lost", label: "분실/도난 신고", icon: FileTextIcon, href: "#quicklink-card-lost" },
      { key: "card-manage", label: "카드 관리", icon: UserCircleGearIcon, href: "#quicklink-card-manage" },
    ],
  },
}

export const DEFAULT_QUICK_LINK_GROUP: QuickLinkGroupKey = "deposit"
