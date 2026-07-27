import { CodeBlock } from "@/components/code-block"

const sample = `function greet(name: string) {
  return \`안녕하세요, \${name}님\`
}`

export const demo = (
  <div className="flex w-full max-w-lg flex-col gap-3">
    <CodeBlock code={sample} language="TypeScript" showLineNumbers />
    <CodeBlock code={`pnpm install\npnpm dev`} language="bash" />
  </div>
)

export const code = `<CodeBlock
  code={sample}
  language="TypeScript"
  showLineNumbers
/>`

export const dos = [
  "명령어·설정 스니펫처럼 그대로 복사해 쓸 값에는 항상 CodeBlock + CopyButton을 함께 둔다.",
  "줄 참조가 필요한 긴 코드에는 showLineNumbers를 켜 특정 줄을 가리키기 쉽게 한다.",
  "language 라벨은 실제 문법과 일치시켜 사용자가 붙여넣을 위치를 헷갈리지 않게 한다.",
]

export const donts = [
  "문법 하이라이팅을 위해 외부 라이브러리를 붙이지 않는다 — 폐쇄망 환경을 깨는 원인이 된다.",
  "여러 언어가 섞인 긴 실행 로그를 통째로 넣지 않는다 — 코드 스니펫 용도로만 쓴다.",
]
