import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export const demo = (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline">필터</Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>상품 필터</SheetTitle>
        <SheetDescription>조건을 선택하면 목록에 바로 반영됩니다.</SheetDescription>
      </SheetHeader>
      <FieldGroup className="px-4">
        <Field orientation="horizontal">
          <Checkbox id="demo-sheet-instock" defaultChecked />
          <FieldLabel htmlFor="demo-sheet-instock" className="font-normal">
            재고 있음만 보기
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="demo-sheet-freeship" />
          <FieldLabel htmlFor="demo-sheet-freeship" className="font-normal">
            무료 배송
          </FieldLabel>
        </Field>
      </FieldGroup>
      <SheetFooter>
        <SheetClose asChild>
          <Button>적용</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
)

export const code = `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">필터</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>상품 필터</SheetTitle>
      <SheetDescription>조건을 선택하면 목록에 바로 반영됩니다.</SheetDescription>
    </SheetHeader>
    <FieldGroup className="px-4">
      <Field orientation="horizontal">
        <Checkbox id="instock" defaultChecked />
        <FieldLabel htmlFor="instock" className="font-normal">
          재고 있음만 보기
        </FieldLabel>
      </Field>
    </FieldGroup>
    <SheetFooter>
      <SheetClose asChild>
        <Button>적용</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`

export const dos = [
  "필터·설정처럼 본문 컨텍스트를 유지한 채 참고할 보조 작업에 사용한다.",
  "side='right'가 기본값이므로 좌측 내비게이션과 겹치지 않는지 확인한다.",
  "SheetTitle을 생략하지 않는다 — 없으면 접근성 트리에서 패널의 목적이 사라진다.",
]

export const donts = [
  "Sheet 안에 또 다른 Sheet·Dialog를 중첩해 포커스 트랩을 겹치게 하지 않는다.",
  "모바일 하단 시트가 필요한 경우엔 Sheet 대신 Drawer를 사용한다.",
]
