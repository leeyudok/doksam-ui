"use client"

import { useEffect, useId, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

export interface MermaidViewerProps {
  /** mermaid 다이어그램 소스. ```mermaid 코드펜스가 있으면 자동으로 벗겨낸다. */
  code: string
  className?: string
}

function stripCodeFence(raw: string): string {
  let cleaned = raw.trim()
  if (cleaned.startsWith("```mermaid")) {
    cleaned = cleaned.replace(/^```mermaid\s*/, "").replace(/```$/, "")
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/```$/, "")
  }
  return cleaned.trim()
}

/**
 * 테마 CSS 변수를 브라우저가 resolve 한 rgb 문자열로 읽는다 — mermaid의 색
 * 파서(khroma)가 oklch 표기를 못 다루므로 probe 엘리먼트의 computed color 를
 * 경유한다. jsdom 등 resolve 가 안 되는 환경은 undefined 를 돌려 mermaid
 * 기본 테마 변수로 폴백한다.
 */
function resolveTokenColor(variable: string): string | undefined {
  const probe = document.createElement("span")
  probe.style.color = `var(${variable})`
  probe.style.display = "none"
  document.body.appendChild(probe)
  const resolved = getComputedStyle(probe).color
  probe.remove()
  if (!resolved) return undefined
  if (resolved.startsWith("rgb")) return resolved
  // Chrome 은 oklch 변수를 lab(...) 로 계산해 돌려주는데 mermaid 의 색 파서
  // (khroma)는 rgb/hex 만 이해한다 — 1px 캔버스에 칠해 실제 rgb 로 정규화한다.
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = 1
  const ctx = canvas.getContext("2d")
  if (!ctx) return undefined
  ctx.fillStyle = resolved
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return `rgb(${r}, ${g}, ${b})`
}

/**
 * mermaid 소스를 클라이언트에서 SVG로 렌더링한다(ai-sdlc mermaid, #50 이식).
 * 초기 번들에서 mermaid를 빼기 위해 동적 import를 쓰고, LLM 출력에 흔한
 * ```mermaid 코드펜스는 자동으로 벗겨낸다. securityLevel "strict"로 생성 SVG의
 * click 핸들러·javascript: URI·foreignObject/HTML을 제거해 XSS 경로를 닫는다.
 * 색은 내장 테마 대신 base 테마 + 현재 테마 프리셋 토큰(themeVariables 주입,
 * #52)을 쓰고, 렌더마다 initialize 를 다시 호출한다(재마운트 기준).
 */
function MermaidViewer({ code, className }: Readonly<MermaidViewerProps>) {
  const [svg, setSvg] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const reactId = useId()
  const containerId = useRef(`mermaid-viewer-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`)

  useEffect(() => {
    let active = true

    async function renderChart() {
      if (!code) return
      setError(null)
      setSvg("")

      try {
        const mermaid = (await import("mermaid")).default
        const isDark = document.documentElement.classList.contains("dark")

        // 현재 프리셋 토큰을 mermaid base 테마 변수로 주입 — 프리셋 8종 ×
        // 라이트/다크 어디서든 사이트와 같은 팔레트로 그려진다(#52).
        const accent = resolveTokenColor("--accent")
        const primary = resolveTokenColor("--primary")
        const foreground = resolveTokenColor("--foreground")
        const card = resolveTokenColor("--card")
        const border = resolveTokenColor("--border")
        const mutedForeground = resolveTokenColor("--muted-foreground")
        const themed = accent && primary && foreground

        mermaid.initialize({
          startOnLoad: false,
          ...(themed
            ? {
                theme: "base" as const,
                themeVariables: {
                  darkMode: isDark,
                  background: card,
                  primaryColor: accent,
                  primaryBorderColor: primary,
                  primaryTextColor: foreground,
                  secondaryColor: card,
                  secondaryBorderColor: border,
                  secondaryTextColor: foreground,
                  tertiaryColor: card,
                  tertiaryBorderColor: border,
                  lineColor: mutedForeground,
                  textColor: foreground,
                  fontFamily: "inherit",
                },
              }
            : { theme: isDark ? ("dark" as const) : ("neutral" as const) }),
          securityLevel: "strict",
        })

        if (!active) return

        const cleanCode = stripCodeFence(code)
        const { svg: renderedSvg } = await mermaid.render(containerId.current, cleanCode)
        if (active) setSvg(renderedSvg)
      } catch (err: unknown) {
        if (active) {
          setError(err instanceof Error ? err.message : "다이어그램을 렌더링하지 못했습니다.")
        }
      }
    }

    renderChart()

    return () => {
      active = false
    }
  }, [code])

  if (error) {
    return (
      <div
        data-slot="mermaid-viewer-error"
        className={cn(
          "rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive",
          className,
        )}
      >
        <p className="mb-1 font-semibold">다이어그램 렌더링 오류</p>
        <pre className="whitespace-pre-wrap font-mono text-xs">{error}</pre>
        <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap rounded-md bg-muted p-2 font-mono text-xs text-muted-foreground">
          {code}
        </pre>
      </div>
    )
  }

  if (!svg) {
    return (
      <div
        data-slot="mermaid-viewer-loading"
        className={cn(
          "flex min-h-[200px] items-center justify-center gap-2 rounded-xl border bg-card text-sm text-muted-foreground",
          className,
        )}
      >
        <Spinner />
        다이어그램 렌더링 중...
      </div>
    )
  }

  return (
    <div
      data-slot="mermaid-viewer"
      className={cn(
        "flex max-w-full items-center justify-center overflow-auto rounded-xl border bg-card p-6",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export { MermaidViewer }
