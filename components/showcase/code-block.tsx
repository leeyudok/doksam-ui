import { CopyButton } from "@/components/showcase/copy-button"

interface CodeBlockProps {
  code: string
}

/** 데모 코드 스니펫 + 복사 버튼. */
export function CodeBlock({ code }: Readonly<CodeBlockProps>) {
  return (
    <div className="relative rounded-lg border border-border bg-muted/40">
      <div className="absolute top-2 right-2">
        <CopyButton value={code} />
      </div>
      <pre className="overflow-x-auto p-4 pr-24 text-sm">
        <code>{code}</code>
      </pre>
    </div>
  )
}
