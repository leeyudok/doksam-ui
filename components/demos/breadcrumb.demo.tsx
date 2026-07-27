import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const demo = (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">홈</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">주문 관리</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbEllipsis />
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>ORD-2026-0117</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
)

export const code = `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">홈</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#">주문 관리</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>ORD-2026-0117</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`

export const dos = [
  "현재 위치는 항상 BreadcrumbPage로 표시하고 링크로 만들지 않는다.",
  "경로가 길 때는 중간 구간을 BreadcrumbEllipsis로 축약한다.",
  "3단계 이상 깊이를 가진 페이지에서만 사용한다 — 얕은 구조에는 불필요하다.",
]

export const donts = [
  "현재 페이지(BreadcrumbPage)에 href를 붙여 클릭 가능한 링크처럼 보이게 하지 않는다.",
  "BreadcrumbSeparator를 생략해 항목들이 붙어 보이게 하지 않는다.",
]
