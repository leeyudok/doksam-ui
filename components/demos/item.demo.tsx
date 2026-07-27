import { CreditCardIcon, PackageIcon, TruckIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"

export const demo = (
  <ItemGroup className="max-w-md">
    <Item variant="outline">
      <ItemMedia variant="icon">
        <PackageIcon size={16} weight="regular" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>주문 #ORD-2026-0117</ItemTitle>
        <ItemDescription>상품 준비 중 · 7월 12일 접수</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Badge variant="secondary">준비중</Badge>
      </ItemActions>
    </Item>
    <ItemSeparator />
    <Item variant="outline">
      <ItemMedia variant="icon">
        <TruckIcon size={16} weight="regular" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>주문 #ORD-2026-0115</ItemTitle>
        <ItemDescription>CJ대한통운 · 7월 10일 발송</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Badge>배송중</Badge>
      </ItemActions>
    </Item>
    <ItemSeparator />
    <Item variant="outline">
      <ItemMedia variant="icon">
        <CreditCardIcon size={16} weight="regular" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>주문 #ORD-2026-0114</ItemTitle>
        <ItemDescription>결제 128,000원 · 신한카드</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Badge variant="outline">결제완료</Badge>
      </ItemActions>
    </Item>
  </ItemGroup>
)

export const code = `<ItemGroup className="max-w-md">
  <Item variant="outline">
    <ItemMedia variant="icon">
      <PackageIcon size={16} weight="regular" />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>주문 #ORD-2026-0117</ItemTitle>
      <ItemDescription>상품 준비 중 · 7월 12일 접수</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Badge variant="secondary">준비중</Badge>
    </ItemActions>
  </Item>
  <ItemSeparator />
  {/* ... */}
</ItemGroup>`

export const dos = [
  "리스트 형태의 항목을 나열할 때는 ItemGroup + ItemSeparator로 구조를 명확히 한다.",
  "ItemTitle은 한 줄로 요약하고 부가 정보는 ItemDescription에 둔다.",
  "행동 버튼·상태 배지는 ItemActions에 모아 우측 정렬한다.",
]

export const donts = [
  "ItemDescription에 문단 단위의 긴 텍스트를 넣지 않는다 — line-clamp로 잘린다.",
  "클릭 가능한 전체 행에 개별 링크를 중첩하지 않는다(중첩 인터랙티브 요소 접근성 문제).",
]
