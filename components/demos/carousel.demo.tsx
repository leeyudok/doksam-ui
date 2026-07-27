import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const PROMOTIONS = [
  { title: "여름 정기세일", detail: "전 상품 최대 40% 할인 · 7/12 ~ 7/20" },
  { title: "신규 회원 쿠폰", detail: "첫 구매 15,000원 즉시 할인" },
  { title: "무료배송 이벤트", detail: "3만원 이상 구매 시 배송비 무료" },
]

export const demo = (
  <Carousel className="w-full max-w-sm">
    <CarouselContent>
      {PROMOTIONS.map((promo) => (
        <CarouselItem key={promo.title}>
          <div className="flex h-32 flex-col justify-center gap-1 rounded-lg border border-border bg-card p-4">
            <p className="font-medium">{promo.title}</p>
            <p className="text-sm text-muted-foreground">{promo.detail}</p>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
)

export const code = `const PROMOTIONS = [
  { title: "여름 정기세일", detail: "전 상품 최대 40% 할인 · 7/12 ~ 7/20" },
  { title: "신규 회원 쿠폰", detail: "첫 구매 15,000원 즉시 할인" },
]

<Carousel className="w-full max-w-sm">
  <CarouselContent>
    {PROMOTIONS.map((promo) => (
      <CarouselItem key={promo.title}>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="font-medium">{promo.title}</p>
          <p className="text-sm text-muted-foreground">{promo.detail}</p>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`

export const dos = [
  "슬라이드 개수가 적더라도(3장 내외) 키보드 좌우 화살표 탐색이 되는지 확인한다.",
  "이전/다음 버튼은 항상 CarouselPrevious·CarouselNext로 함께 제공한다.",
  "슬라이드 콘텐츠 높이를 통일해 전환 시 레이아웃이 흔들리지 않게 한다.",
]

export const donts = [
  "자동 재생 캐러셀에 일시정지 컨트롤 없이 무한 반복시키지 않는다.",
  "슬라이드 1장짜리에 Carousel을 억지로 쓰지 않는다 — 일반 카드로 충분하다.",
]
