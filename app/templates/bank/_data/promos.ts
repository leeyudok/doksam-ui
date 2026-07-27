/** 프로모 카드 2장 — EVENT/NEW 뱃지. */
export interface PromoCard {
  id: string
  badge: "EVENT" | "NEW"
  title: string
  description: string
  href: string
}

export const PROMO_CARDS: PromoCard[] = [
  {
    id: "referral-event",
    badge: "EVENT",
    title: "친구 초대하고 커피 쿠폰 받기",
    description: "누리은행 앱을 친구에게 추천하면 두 분 모두에게 쿠폰을 드립니다.",
    href: "#promo-referral",
  },
  {
    id: "youth-account",
    badge: "NEW",
    title: "누리 청년 자유적금 출시",
    description: "만 19~34세 전용, 최대 연 5.0% 우대금리를 제공하는 자유적금입니다.",
    href: "#promo-youth-account",
  },
]
