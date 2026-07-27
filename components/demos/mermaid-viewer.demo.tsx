import { MermaidViewer } from "@/components/mermaid-viewer"

const CHART = `flowchart TD
  A[커밋 푸시] --> B[CI 빌드]
  B --> C{테스트 통과?}
  C -- 예 --> D[스테이징 배포]
  C -- 아니오 --> E[빌드 실패 알림]
  D --> F{승인?}
  F -- 예 --> G[프로덕션 배포]
  F -- 아니오 --> H[대기]`

export const demo = <MermaidViewer code={CHART} />

export const code = `import { MermaidViewer } from "@/components/mermaid-viewer"

const chart = \`flowchart TD
  A[커밋 푸시] --> B[CI 빌드]
  B --> C{테스트 통과?}
  C -- 예 --> D[스테이징 배포]
  C -- 아니오 --> E[빌드 실패 알림]
  D --> F{승인?}
  F -- 예 --> G[프로덕션 배포]
  F -- 아니오 --> H[대기]\`

<MermaidViewer code={chart} />`

export const dos = [
  "```mermaid 코드펜스가 섞인 LLM 출력을 그대로 넘겨도 된다 — 자동으로 벗겨낸다.",
  "code가 바뀔 때마다 새로 렌더링되므로 스트리밍 중인 다이어그램 소스를 그대로 바인딩해도 된다.",
  "렌더 실패는 원본 코드와 에러 메시지를 함께 보여주므로 별도 fallback UI를 안 만들어도 된다.",
]

export const donts = [
  "mermaid를 최상단에서 정적으로 import하지 않는다 — 이 컴포넌트가 이미 동적 import로 초기 번들에서 뺀다.",
  "securityLevel을 loose로 낮추지 않는다 — LLM 생성 다이어그램 소스를 렌더하므로 strict로 XSS 경로를 막아야 한다.",
  "다크모드 대응을 위해 별도 theme prop을 만들지 않는다 — document.documentElement의 dark 클래스를 자동으로 본다.",
]
