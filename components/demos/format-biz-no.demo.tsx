import { FormatBizNoDemo } from "./format-biz-no.demo.client"

export const demo = <FormatBizNoDemo />

export const code = `import { formatBizNo } from "@/lib/bizinfo/format-biz-no"

function BizNoField({ value }: { value: string }) {
  return (
    <p>
      표시용 포맷: <span className="font-mono">{formatBizNo(value)}</span>
    </p>
  )
}`

export const dos = [
  "화면 표시(테이블 셀·상세 필드 등)에만 formatBizNo를 쓴다 — 저장·API 전송은 원본 10자리 문자열을 그대로 유지한다.",
  "10자리 숫자가 아닌 입력(짧은 값·이미 포맷된 값)은 그대로 반환되므로 별도 방어 코드 없이 바로 써도 된다.",
  "null/undefined 입력에는 빈 문자열을 반환하므로 옵셔널 필드에도 안전하게 쓴다.",
]

export const donts = [
  "formatBizNo 결과값을 폼 상태나 API 요청 바디에 그대로 넣지 않는다 — 하이픈이 섞인 값이 저장되면 안 된다.",
  "타이핑 중 실시간 하이픈 삽입(진행형 포맷)이 필요하면 이 함수를 억지로 쓰지 않는다 — 10자리 완성 전에는 원본을 그대로 보여준다.",
]
