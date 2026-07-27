/** 상단 유틸바 링크 — 로그인/공동인증센터/고객센터 등 보조 도구 모음. */
export interface UtilityLink {
  label: string
  href: string
}

export const UTILITY_LINKS: UtilityLink[] = [
  { label: "로그인", href: "#login" },
  { label: "공동인증센터", href: "#auth-center" },
  { label: "고객센터", href: "#support" },
  { label: "전체메뉴", href: "#all-menu" },
]

/** 메인 내비게이션 1뎁스 메뉴 — 개인/기업/카드/스마트금융/금융상품. */
export interface MainNavItem {
  label: string
  href: string
}

export const MAIN_NAV_ITEMS: MainNavItem[] = [
  { label: "개인", href: "#personal" },
  { label: "기업", href: "#business" },
  { label: "카드", href: "#card" },
  { label: "스마트금융", href: "#smart-finance" },
  { label: "금융상품", href: "#products" },
]
