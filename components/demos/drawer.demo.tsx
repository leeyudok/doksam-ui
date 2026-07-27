import { MapPinIcon } from "@phosphor-icons/react/dist/ssr"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export const demo = (
  <Drawer>
    <DrawerTrigger asChild>
      <Button variant="outline">배송지 선택</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>배송지 선택</DrawerTitle>
        <DrawerDescription>주문을 받을 주소를 선택해주세요.</DrawerDescription>
      </DrawerHeader>
      <div className="flex flex-col gap-2 px-4">
        <div className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm">
          <MapPinIcon size={16} weight="regular" className="text-muted-foreground" />
          집 · 서울 강남구 테헤란로 123
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm">
          <MapPinIcon size={16} weight="regular" className="text-muted-foreground" />
          회사 · 서울 성동구 성수이로 45
        </div>
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button>이 주소로 배송</Button>
        </DrawerClose>
        <DrawerClose asChild>
          <Button variant="outline">취소</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
)

export const code = `<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">배송지 선택</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>배송지 선택</DrawerTitle>
      <DrawerDescription>주문을 받을 주소를 선택해주세요.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button>이 주소로 배송</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`

export const dos = [
  "모바일 뷰포트에서 하단으로 여는 시트가 필요할 때 Sheet 대신 Drawer를 사용한다.",
  "드래그로 닫을 수 있음을 알리는 핸들(상단 바)을 임의로 제거하지 않는다.",
  "목록이 길어질 수 있는 선택 UI는 DrawerContent 내부에 스크롤 영역을 둔다.",
]

export const donts = [
  "데스크톱 전용 화면에 Drawer를 강제하지 않는다 — 그 경우 Dialog나 Sheet가 더 적합하다.",
  "DrawerTitle 없이 열어 스크린리더에서 패널 목적을 알 수 없게 하지 않는다.",
]
