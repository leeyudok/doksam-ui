import type { Icon } from "@phosphor-icons/react"
import {
  ArrowsLeftRightIcon,
  CreditCardIcon,
  FileTextIcon,
  ReceiptIcon,
  ShieldCheckIcon,
  WalletIcon,
} from "@phosphor-icons/react/dist/ssr"

/** 퀵서비스 탭바 — 전계좌조회·즉시이체·세금/공과금·카드등록(기본 활성) + 정책 탭. */
export interface QuickServiceTab {
  key: string
  label: string
  icon: Icon
  description: string
}

export const QUICK_SERVICE_TABS: QuickServiceTab[] = [
  {
    key: "all-accounts",
    label: "전계좌조회",
    icon: WalletIcon,
    description: "누리은행뿐 아니라 타행 계좌까지 한 화면에서 잔액을 조회합니다.",
  },
  {
    key: "instant-transfer",
    label: "즉시이체",
    icon: ArrowsLeftRightIcon,
    description: "받는 분 계좌번호만 입력하면 공인인증서 없이 바로 이체됩니다.",
  },
  {
    key: "tax-bill",
    label: "세금/공과금",
    icon: ReceiptIcon,
    description: "지방세·국세·공과금을 조회하고 수수료 없이 바로 납부합니다.",
  },
  {
    key: "card-register",
    label: "카드등록",
    icon: CreditCardIcon,
    description: "새로 발급받은 카드를 등록하고 즉시 온라인 결제에 사용합니다.",
  },
  {
    key: "consumer-protection",
    label: "금융소비자보호",
    icon: ShieldCheckIcon,
    description: "금융상품 관련 권익과 분쟁조정 절차를 안내합니다.",
  },
  {
    key: "forms",
    label: "서식/약관",
    icon: FileTextIcon,
    description: "각종 신청서식과 상품별 약관을 내려받을 수 있습니다.",
  },
] as const

export const DEFAULT_QUICK_SERVICE_KEY = "card-register"
