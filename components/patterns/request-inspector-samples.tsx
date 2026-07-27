import type { PatternSampleData } from "@/components/showcase/pattern-sample"
import { RequestInspectorDemo } from "@/components/patterns/request-inspector/request-inspector-demo"

export const REQUEST_INSPECTOR_SAMPLES: PatternSampleData[] = [
  {
    num: 1,
    title: "요청 목록 + Accordion 상세 + cURL 복사",
    description:
      "요청 행을 클릭하면 아래 패널이 선택한 요청으로 바뀌고, shadcn Accordion으로 Headers/Query/Payload/Response를 펼쳐볼 수 있습니다. 4xx/5xx 상태 코드는 색으로 강조하고, 현재 요청을 cURL 명령으로 바로 복사할 수 있습니다.",
    demo: <RequestInspectorDemo />,
    code: `function statusTone(status: number) {
  if (status >= 500) return "text-destructive"
  if (status >= 400) return "text-warning"
  return "text-success"
}

<button aria-pressed={entry.id === selectedId} onClick={() => setSelectedId(entry.id)}>
  <span>{entry.method}</span>
  <span>{entry.path}</span>
  <span className={statusTone(entry.status)}>{entry.status}</span>
</button>

<CopyButton value={toCurl(selected)} label="cURL 복사" />

<Accordion type="multiple" defaultValue={["headers"]}>
  <AccordionItem value="headers">
    <AccordionTrigger>Headers</AccordionTrigger>
    <AccordionContent><KeyValueTable data={selected.headers} /></AccordionContent>
  </AccordionItem>
  {/* query / payload / response 동일 패턴 */}
</Accordion>`,
    notes: [
      "상태 코드 색은 success/warning/destructive 시맨틱 토큰만 쓴다 — 2xx는 success, 4xx는 warning, 5xx는 destructive.",
      "cURL 문자열은 CopyButton(components/copy-button.tsx)을 그대로 재사용해 /tokens·/icons 등 다른 페이지와 복사 UX를 통일한다.",
      "Accordion은 type='multiple'로 둬 Headers/Query/Payload/Response를 동시에 여러 개 펼쳐놓고 비교할 수 있게 한다.",
      "Response 패널은 4xx/5xx일 때만 배경을 destructive/10으로 깔아, 실패 응답을 목록에서 상세로 넘어와도 한 번 더 눈에 띄게 한다.",
      "실제 서비스에 연결할 때는 Authorization 등 민감 헤더 값을 원문 그대로 렌더링하지 말고 마스킹(예: Bearer ***)한 뒤 표시한다.",
    ],
  },
]
