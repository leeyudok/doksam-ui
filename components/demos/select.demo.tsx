import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const demo = (
  <Select defaultValue="latest">
    <SelectTrigger className="w-48">
      <SelectValue placeholder="정렬 기준 선택" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="latest">최신순</SelectItem>
      <SelectItem value="popular">인기순</SelectItem>
      <SelectItem value="price-asc">가격 낮은순</SelectItem>
      <SelectItem value="price-desc">가격 높은순</SelectItem>
      <SelectItem value="return-desc">수익률 높은순</SelectItem>
    </SelectContent>
  </Select>
)

export const code = `<Select defaultValue="latest">
  <SelectTrigger className="w-48">
    <SelectValue placeholder="정렬 기준 선택" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="latest">최신순</SelectItem>
    <SelectItem value="popular">인기순</SelectItem>
    <SelectItem value="price-asc">가격 낮은순</SelectItem>
    <SelectItem value="price-desc">가격 높은순</SelectItem>
    <SelectItem value="return-desc">수익률 높은순</SelectItem>
  </SelectContent>
</Select>`

export const dos = [
  "옵션이 5개 안팎이고 검색이 필요 없는 목록에는 Select를 사용한다.",
  "defaultValue 또는 value로 항상 초기 선택 상태를 명확히 지정한다.",
  "SelectTrigger 너비를 콘텐츠에 맞게 지정해 트리거 크기가 흔들리지 않게 한다.",
]

export const donts = [
  "옵션이 수십 개 이상인 목록에 검색 기능 없는 Select를 그대로 쓰지 않는다.",
  "SelectItem의 value를 빈 문자열로 두지 않는다(Radix에서 허용되지 않음).",
  "모바일에서 네이티브 선택 UX가 더 적합한 단순 폼에는 NativeSelect를 대신 검토한다.",
]
