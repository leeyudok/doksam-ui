import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export const demo = (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="destructive">계정 삭제</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>정말 계정을 삭제할까요?</AlertDialogTitle>
        <AlertDialogDescription>
          삭제된 계정과 모든 데이터는 복구할 수 없습니다. 이 작업은 되돌릴 수 없습니다.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel asChild>
          <Button variant="outline">취소</Button>
        </AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button variant="destructive">삭제</Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
)

export const code = `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">계정 삭제</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>정말 계정을 삭제할까요?</AlertDialogTitle>
      <AlertDialogDescription>
        삭제된 계정과 모든 데이터는 복구할 수 없습니다. 이 작업은 되돌릴 수 없습니다.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel asChild>
        <Button variant="outline">취소</Button>
      </AlertDialogCancel>
      <AlertDialogAction asChild>
        <Button variant="destructive">삭제</Button>
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`

export const dos = [
  "삭제·환불처럼 되돌릴 수 없는 파괴적 액션 직전에만 사용한다.",
  "AlertDialogAction 버튼 문구는 '확인' 대신 실제 동작(삭제, 초기화 등)을 그대로 쓴다.",
  "취소 버튼을 기본 포커스로 두어 실수로 파괴적 액션이 실행되지 않게 한다.",
]

export const donts = [
  "단순 안내·정보 전달에 AlertDialog를 쓰지 않는다 — 그 경우 Dialog나 Sonner가 적합하다.",
  "바깥 영역 클릭이나 Esc로 쉽게 닫히게 해 확인 절차를 무력화하지 않는다.",
]
