import * as React from "react"

import { CopyButton } from "@/components/copy-button"
import { cn } from "@/lib/utils"

export interface CodeBlockProps extends React.ComponentProps<"div"> {
  code: string
  /** 상단에 표시할 언어 라벨(문법 하이라이팅은 하지 않는다). */
  language?: string
  /** 왼쪽에 줄 번호를 붙일지 여부. */
  showLineNumbers?: boolean
}

/**
 * pre/code 기반 순수 코드 블록(#36) — 외부 하이라이터 없이 폰트/줄바꿈만
 * 처리하고, 우상단에 CopyButton(#컴포넌트)을 얹는다. 옵션으로 줄 번호를
 * 붙일 수 있다.
 */
function CodeBlock({ code, language, showLineNumbers = false, className, ...props }: Readonly<CodeBlockProps>) {
  const lines = code.split("\n")

  return (
    <div
      data-slot="code-block"
      className={cn("group/code-block relative overflow-hidden rounded-lg border border-border bg-card", className)}
      {...props}
    >
      {language && (
        <div data-slot="code-block-language" className="border-b border-border px-3 py-1.5 text-xs text-muted-foreground">
          {language}
        </div>
      )}
      <div className="absolute top-1.5 right-1.5 opacity-0 transition-opacity group-hover/code-block:opacity-100 focus-within:opacity-100">
        <CopyButton value={code} label="복사" />
      </div>
      <pre data-slot="code-block-pre" className="overflow-x-auto p-3 text-sm">
        <code data-slot="code-block-code" className="grid font-mono">
          {lines.map((line, index) => (
            <span key={index} data-slot="code-block-line" className="flex gap-3">
              {showLineNumbers && (
                <span aria-hidden="true" className="w-6 shrink-0 select-none text-right text-muted-foreground/60">
                  {index + 1}
                </span>
              )}
              <span className="min-w-0 flex-1 whitespace-pre">{line || " "}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}

export { CodeBlock }
