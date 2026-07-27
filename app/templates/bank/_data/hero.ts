import type { Icon } from "@phosphor-icons/react"
import { CoinsIcon, PiggyBankIcon, TrendUpIcon } from "@phosphor-icons/react/dist/ssr"

/**
 * 히어로 캐러셀 프로모 배너. 마스코트는 이미지 대신 슬라이드별 Phosphor 아이콘 +
 * CSS 그라디언트 도형으로 추상 표현한다(외부 이미지 URL 금지).
 */
export interface HeroSlide {
  id: string
  eyebrow: string
  title: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
  icon: Icon
  /** 슬라이드별 강조 그라디언트 톤(시맨틱 토큰 조합, 하드코딩 색상 없음). */
  toneClass: string
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "welcome-deposit",
    eyebrow: "신규 가입 이벤트",
    title: "누리 첫걸음 예금, 연 4.2%",
    subtitle: "누리은행을 처음 만나는 고객님께 우대금리를 더해드립니다.",
    ctaLabel: "자세히보기",
    ctaHref: "#promo-welcome-deposit",
    icon: PiggyBankIcon,
    toneClass: "from-primary/35 via-primary/10 to-transparent",
  },
  {
    id: "smart-loan",
    eyebrow: "스마트금융",
    title: "모바일로 3분 만에 신용대출",
    subtitle: "서류 제출 없이 앱에서 한도 조회부터 실행까지 한번에.",
    ctaLabel: "자세히보기",
    ctaHref: "#promo-smart-loan",
    icon: CoinsIcon,
    toneClass: "from-accent/35 via-accent/10 to-transparent",
  },
  {
    id: "fund-lineup",
    eyebrow: "투자상품",
    title: "누리 글로벌 성장펀드 신규 출시",
    subtitle: "해외 우량 자산에 분산 투자하는 신규 펀드 라인업을 만나보세요.",
    ctaLabel: "자세히보기",
    ctaHref: "#promo-fund-lineup",
    icon: TrendUpIcon,
    toneClass: "from-secondary/60 via-secondary/20 to-transparent",
  },
]
