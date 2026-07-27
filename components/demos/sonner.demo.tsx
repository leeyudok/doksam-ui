import { SonnerDemo } from "./sonner.demo.client"

export const demo = <SonnerDemo />

export const code = `<Button
  onClick={() =>
    toast.success("저장되었습니다", {
      description: "변경 사항이 정상적으로 반영되었습니다.",
    })
  }
>
  저장 토스트
</Button>

// app 최상단에 한 번만 마운트
<Toaster />`

export const dos = [
  "<Toaster />는 앱 루트에 한 번만 마운트하고, 어디서든 toast() 함수만 호출한다.",
  "성공·오류처럼 결과가 명확한 짧은 피드백에 사용한다.",
  "action이 필요한 토스트는 toast()의 action 옵션으로 버튼을 붙인다 — 별도 레이아웃을 만들지 않는다.",
]

export const donts = [
  "폼 유효성 에러처럼 사용자가 계속 참조해야 하는 메시지를 토스트로만 보여주지 않는다 — 필드 옆 에러 텍스트가 우선이다.",
  "같은 화면에서 Toaster를 여러 번 중복 마운트하지 않는다.",
]
