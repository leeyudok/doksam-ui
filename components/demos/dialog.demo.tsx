import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export const demo = (
  <Dialog>
    <DialogTrigger asChild>
      <Button>프로필 수정</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>프로필 수정</DialogTitle>
        <DialogDescription>다른 사용자에게 표시되는 이름과 소개를 변경합니다.</DialogDescription>
      </DialogHeader>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="demo-dialog-name">이름</FieldLabel>
          <FieldContent>
            <Input id="demo-dialog-name" defaultValue="이유독" />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="demo-dialog-bio">소개</FieldLabel>
          <FieldContent>
            <Input id="demo-dialog-bio" defaultValue="doksam-ui 담당" />
          </FieldContent>
        </Field>
      </FieldGroup>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">취소</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button>저장</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

export const code = `<Dialog>
  <DialogTrigger asChild>
    <Button>프로필 수정</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>프로필 수정</DialogTitle>
      <DialogDescription>다른 사용자에게 표시되는 이름과 소개를 변경합니다.</DialogDescription>
    </DialogHeader>
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="name">이름</FieldLabel>
        <FieldContent>
          <Input id="name" defaultValue="이유독" />
        </FieldContent>
      </Field>
    </FieldGroup>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">취소</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button>저장</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`

export const dos = [
  "DialogTitle과 DialogDescription을 항상 포함해 스크린리더 사용자에게 목적을 알린다.",
  "저장·취소처럼 명확한 종료 지점이 있는 짧은 폼에 사용한다.",
  "닫기 동작은 DialogClose로 위임하고 별도 onOpenChange 상태를 직접 관리하지 않는다.",
]

export const donts = [
  "여러 단계로 이어지는 마법사(wizard) 플로우를 하나의 Dialog에 욱여넣지 않는다.",
  "DialogContent 안에 페이지 전체 내비게이션을 중복 배치하지 않는다.",
]
