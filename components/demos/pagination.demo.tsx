import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export const demo = (
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious href="#" text="이전" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">1</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" isActive>
          2
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">3</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">12</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationNext href="#" text="다음" />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
)

export const code = `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" text="이전" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">12</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" text="다음" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`

export const dos = [
  "현재 페이지는 isActive로 표시하고 aria-current='page'가 자동 반영되게 둔다.",
  "페이지 수가 많을 때는 PaginationEllipsis로 중간 구간을 생략한다.",
  "이전/다음 텍스트는 실제 서비스 언어(한국어)로 커스터마이즈한다.",
]

export const donts = [
  "href 없이 onClick만으로 페이지를 이동시켜 새 탭 열기·북마크를 막지 않는다.",
  "전체 페이지가 5개 이하로 적을 때 Ellipsis를 억지로 넣지 않는다.",
]
