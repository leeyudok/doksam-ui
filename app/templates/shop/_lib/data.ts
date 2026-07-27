import type { Icon } from "@phosphor-icons/react"
import {
  HandbagIcon,
  HeadphonesIcon,
  SneakerIcon,
  TShirtIcon,
  WatchIcon,
} from "@phosphor-icons/react/dist/ssr"

/**
 * Shop 템플릿(app/templates/shop/) 전용 데모 데이터.
 *
 * 가상 스토어 "Nooko" — 의류·신발·가방·액세서리·전자기기를 파는 제네릭
 * 셀렉트샵이라는 설정. 실존 브랜드/인물과 무관한 제네릭 카피이며,
 * 상품 이미지는 외부 URL 대신 CSS 그라디언트/도형(app/templates/shop/_components/product-visual.tsx)으로
 * 대체한다 — 순수 데이터만 담아 컴포넌트와 분리해 테스트·재사용을 쉽게 한다.
 */

export const STORE_NAME = "Nooko"

// -----------------------------------------------------------------------
// 카테고리
// -----------------------------------------------------------------------

export type CategoryKey = "clothing" | "shoes" | "bags" | "accessories" | "electronics"

export interface Category {
  key: CategoryKey
  label: string
  icon: Icon
  /** ProductVisual 그라디언트 톤 — 시맨틱 chart 토큰만 사용(하드코딩 색 금지). */
  toneClass: string
}

export const CATEGORIES: Category[] = [
  { key: "clothing", label: "의류", icon: TShirtIcon, toneClass: "from-chart-1/70 to-chart-1/20" },
  { key: "shoes", label: "신발", icon: SneakerIcon, toneClass: "from-chart-2/70 to-chart-2/20" },
  { key: "bags", label: "가방", icon: HandbagIcon, toneClass: "from-chart-3/70 to-chart-3/20" },
  { key: "accessories", label: "액세서리", icon: WatchIcon, toneClass: "from-chart-4/70 to-chart-4/20" },
  { key: "electronics", label: "전자기기", icon: HeadphonesIcon, toneClass: "from-chart-5/70 to-chart-5/20" },
]

export function categoryOf(key: CategoryKey): Category {
  const category = CATEGORIES.find((c) => c.key === key)
  if (!category) throw new Error(`unknown category: ${key}`)
  return category
}

// -----------------------------------------------------------------------
// 상품
// -----------------------------------------------------------------------

export type ProductBadge = "신상품" | "베스트" | "품절임박" | "세일"

export interface ProductOption {
  label: string
  values: string[]
}

export interface ReviewSummary {
  average: number
  count: number
  /** 별점 5→1 순서의 비율(%) 배열, 합계 100. */
  breakdown: number[]
}

export interface Product {
  id: string
  name: string
  category: CategoryKey
  price: number
  originalPrice?: number
  badges: ProductBadge[]
  stock: number
  shortDescription: string
  description: string
  options: ProductOption[]
  reviews: ReviewSummary
  /** 상세페이지 carousel용 슬라이드 개수(각 슬라이드는 ProductVisual 변형으로 렌더). */
  gallerySlides: number
}

export const PRODUCTS: Product[] = [
  {
    id: "cotton-crew-tee",
    name: "코튼 크루넥 티셔츠",
    category: "clothing",
    price: 29000,
    badges: ["베스트"],
    stock: 42,
    shortDescription: "부드러운 오가닉 코튼 100% 크루넥 티셔츠",
    description:
      "오가닉 코튼 원사를 사용해 통기성과 촉감을 모두 잡은 크루넥 티셔츠입니다. 세탁 후에도 형태가 잘 유지되며 사계절 레이어드 아이템으로 활용하기 좋습니다.",
    options: [
      { label: "사이즈", values: ["S", "M", "L", "XL"] },
      { label: "컬러", values: ["화이트", "블랙", "그레이"] },
    ],
    reviews: { average: 4.6, count: 128, breakdown: [62, 24, 9, 3, 2] },
    gallerySlides: 3,
  },
  {
    id: "wide-denim-pants",
    name: "와이드 데님 팬츠",
    category: "clothing",
    price: 59000,
    originalPrice: 79000,
    badges: ["세일"],
    stock: 17,
    shortDescription: "허리 밴딩이 편안한 와이드 핏 데님 팬츠",
    description:
      "적당히 힘 있는 원단으로 핏이 오래 유지되는 와이드 데님입니다. 허리 안쪽 밴딩 처리로 활동성이 좋고, 기장은 워싱 후에도 크게 줄지 않도록 사전 가공했습니다.",
    options: [
      { label: "사이즈", values: ["26", "27", "28", "29", "30"] },
      { label: "컬러", values: ["미드블루", "블랙"] },
    ],
    reviews: { average: 4.3, count: 76, breakdown: [48, 30, 14, 5, 3] },
    gallerySlides: 4,
  },
  {
    id: "light-runner-sneaker",
    name: "라이트 러너 스니커즈",
    category: "shoes",
    price: 89000,
    badges: ["신상품"],
    stock: 31,
    shortDescription: "쿠셔닝이 뛰어난 데일리 러닝 스니커즈",
    description:
      "경량 미드솔과 통기성 메시 갑피를 적용해 하루 종일 신어도 발이 편안합니다. 일상복과 러닝 모두에 어울리는 미니멀한 디자인입니다.",
    options: [
      { label: "사이즈", values: ["250", "260", "270", "280"] },
      { label: "컬러", values: ["화이트", "그레이", "네이비"] },
    ],
    reviews: { average: 4.8, count: 203, breakdown: [78, 15, 5, 1, 1] },
    gallerySlides: 4,
  },
  {
    id: "classic-canvas-sneaker",
    name: "클래식 캔버스 스니커즈",
    category: "shoes",
    price: 49000,
    badges: [],
    stock: 5,
    shortDescription: "어디에나 잘 어울리는 캔버스 로우탑",
    description:
      "질긴 캔버스 소재와 고무 밑창으로 내구성을 높인 스테디셀러 로우탑입니다. 어떤 스타일에도 무난하게 매치할 수 있습니다.",
    options: [
      { label: "사이즈", values: ["240", "250", "260", "270"] },
      { label: "컬러", values: ["화이트", "블랙"] },
    ],
    reviews: { average: 4.1, count: 54, breakdown: [40, 32, 18, 6, 4] },
    gallerySlides: 3,
  },
  {
    id: "canvas-tote-bag",
    name: "캔버스 토트백",
    category: "bags",
    price: 39000,
    badges: ["베스트"],
    stock: 60,
    shortDescription: "노트북까지 넉넉한 캔버스 토트백",
    description:
      "두꺼운 캔버스 원단에 내부 지퍼 포켓을 더해 실용성을 높였습니다. 13인치 노트북과 서류가 여유롭게 들어가는 사이즈입니다.",
    options: [{ label: "컬러", values: ["베이지", "블랙", "카키"] }],
    reviews: { average: 4.5, count: 91, breakdown: [58, 27, 10, 3, 2] },
    gallerySlides: 3,
  },
  {
    id: "leather-crossbody",
    name: "레더 크로스백",
    category: "bags",
    price: 129000,
    originalPrice: 159000,
    badges: ["세일", "품절임박"],
    stock: 3,
    shortDescription: "미니멀한 실루엣의 천연가죽 크로스백",
    description:
      "은은한 광택의 천연가죽을 사용한 미니 크로스백입니다. 조절 가능한 스트랩으로 크로스백과 숄더백 두 가지로 착용할 수 있습니다.",
    options: [{ label: "컬러", values: ["브라운", "블랙", "카멜"] }],
    reviews: { average: 4.7, count: 38, breakdown: [70, 20, 7, 2, 1] },
    gallerySlides: 4,
  },
  {
    id: "minimal-watch",
    name: "미니멀 스틸 손목시계",
    category: "accessories",
    price: 149000,
    badges: ["신상품"],
    stock: 22,
    shortDescription: "얇은 두께의 스테인리스 스틸 손목시계",
    description:
      "6.8mm 슬림 케이스에 사파이어 글래스를 적용한 미니멀 손목시계입니다. 5기압 생활방수를 지원해 일상 사용에 부담이 없습니다.",
    options: [{ label: "스트랩", values: ["스틸", "블랙 레더", "브라운 레더"] }],
    reviews: { average: 4.4, count: 65, breakdown: [55, 28, 12, 3, 2] },
    gallerySlides: 3,
  },
  {
    id: "wool-blend-scarf",
    name: "울 블렌드 머플러",
    category: "accessories",
    price: 45000,
    badges: [],
    stock: 48,
    shortDescription: "가볍고 포근한 울 혼방 머플러",
    description:
      "울과 캐시미어를 혼방해 가볍지만 보온성이 뛰어난 머플러입니다. 다양한 톤의 아우터에 포인트로 매치하기 좋습니다.",
    options: [{ label: "컬러", values: ["차콜", "카멜", "아이보리", "버건디"] }],
    reviews: { average: 4.2, count: 33, breakdown: [45, 33, 15, 5, 2] },
    gallerySlides: 2,
  },
  {
    id: "wireless-earbuds",
    name: "무선 노이즈캔슬링 이어버드",
    category: "electronics",
    price: 179000,
    originalPrice: 219000,
    badges: ["세일", "베스트"],
    stock: 55,
    shortDescription: "액티브 노이즈캔슬링을 지원하는 무선 이어버드",
    description:
      "능동 소음 제거와 주변음 허용 모드를 지원하는 무선 이어버드입니다. 케이스 포함 최대 24시간 재생이 가능합니다.",
    options: [{ label: "컬러", values: ["화이트", "블랙"] }],
    reviews: { average: 4.6, count: 312, breakdown: [66, 22, 8, 2, 2] },
    gallerySlides: 4,
  },
  {
    id: "portable-speaker",
    name: "포터블 블루투스 스피커",
    category: "electronics",
    price: 69000,
    badges: [],
    stock: 0,
    shortDescription: "방수 기능을 갖춘 휴대용 블루투스 스피커",
    description:
      "IPX7 방수 등급을 지원해 야외나 욕실에서도 부담 없이 사용할 수 있는 휴대용 스피커입니다. 최대 12시간 연속 재생됩니다.",
    options: [{ label: "컬러", values: ["블랙", "레드", "블루"] }],
    reviews: { average: 4.0, count: 47, breakdown: [38, 30, 20, 8, 4] },
    gallerySlides: 3,
  },
]

export function listProducts(): Product[] {
  return PRODUCTS
}

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function listProductIds(): string[] {
  return PRODUCTS.map((p) => p.id)
}

export function discountPercent(product: Product): number | undefined {
  if (!product.originalPrice || product.originalPrice <= product.price) return undefined
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
}

// -----------------------------------------------------------------------
// 장바구니 — 데모용 고정 데이터(실제 상태관리 없이 정적 렌더)
// -----------------------------------------------------------------------

export interface CartLine {
  productId: string
  quantity: number
  selectedOptions: Record<string, string>
}

export const CART_LINES: CartLine[] = [
  { productId: "cotton-crew-tee", quantity: 2, selectedOptions: { 사이즈: "M", 컬러: "블랙" } },
  { productId: "light-runner-sneaker", quantity: 1, selectedOptions: { 사이즈: "270", 컬러: "화이트" } },
  { productId: "leather-crossbody", quantity: 1, selectedOptions: { 컬러: "브라운" } },
]

export interface CartLineDetail {
  line: CartLine
  product: Product
  lineTotal: number
}

export function cartLineDetails(): CartLineDetail[] {
  return CART_LINES.map((line) => {
    const product = getProduct(line.productId)
    if (!product) throw new Error(`unknown product in cart: ${line.productId}`)
    return { line, product, lineTotal: product.price * line.quantity }
  })
}

export const SHIPPING_FEE = 3000
export const FREE_SHIPPING_THRESHOLD = 50000

export interface CartTotals {
  subtotal: number
  shipping: number
  total: number
  itemCount: number
}

export function cartTotals(details: CartLineDetail[]): CartTotals {
  const subtotal = details.reduce((sum, d) => sum + d.lineTotal, 0)
  const itemCount = details.reduce((sum, d) => sum + d.line.quantity, 0)
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  return { subtotal, shipping, total: subtotal + shipping, itemCount }
}
