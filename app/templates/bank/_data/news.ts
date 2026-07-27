import type { Icon } from "@phosphor-icons/react"
import {
  ArrowsLeftRightIcon,
  DeviceMobileIcon,
  FileTextIcon,
  HeadsetIcon,
} from "@phosphor-icons/react/dist/ssr"

/** 하단 퀵액션 4아이콘 — 앱설치·서류제출·고객상담·계좌이동. */
export interface BottomQuickAction {
  key: string
  label: string
  icon: Icon
  href: string
}

export const BOTTOM_QUICK_ACTIONS: BottomQuickAction[] = [
  { key: "app-install", label: "앱설치", icon: DeviceMobileIcon, href: "#quickaction-app-install" },
  { key: "document-submit", label: "서류제출", icon: FileTextIcon, href: "#quickaction-document-submit" },
  { key: "customer-support", label: "고객상담", icon: HeadsetIcon, href: "#quickaction-customer-support" },
  { key: "account-transfer", label: "계좌이동", icon: ArrowsLeftRightIcon, href: "#quickaction-account-transfer" },
]

/** 새소식 뉴스 목록. */
export interface NewsItem {
  id: string
  category: string
  title: string
  date: string
}

export const NEWS_ITEMS: NewsItem[] = [
  { id: "n1", category: "공지", title: "추석 연휴 인터넷뱅킹 및 모바일뱅킹 정상 운영 안내", date: "2026-07-10" },
  { id: "n2", category: "이벤트", title: "누리 청년 자유적금 가입 이벤트 당첨자 발표", date: "2026-07-08" },
  { id: "n3", category: "상품", title: "누리 글로벌 성장펀드 판매 개시 안내", date: "2026-07-03" },
  { id: "n4", category: "공지", title: "전자금융사기 예방을 위한 이용자 주의사항 안내", date: "2026-06-28" },
  { id: "n5", category: "채용", title: "2026년 하반기 신입/경력 행원 공개채용 공고", date: "2026-06-20" },
]
