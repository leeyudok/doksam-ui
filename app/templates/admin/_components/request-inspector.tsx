"use client"

import { useState } from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { CopyButton } from "@/components/copy-button"
import { cn } from "@/lib/utils"
import type { RequestEntry } from "../_data/logs-data"

function statusTone(status: number) {
  if (status >= 500) return "text-destructive"
  if (status >= 400) return "text-warning"
  return "text-success"
}

function toCurl(entry: RequestEntry): string {
  const headerFlags = Object.entries(entry.headers)
    .map(([key, value]) => `-H "${key}: ${value}"`)
    .join(" ")
  const query = new URLSearchParams(entry.query).toString()
  const url = `https://api.doksam.com${entry.path}${query ? `?${query}` : ""}`
  const body = entry.payload ? ` -d '${JSON.stringify(entry.payload)}'` : ""
  return `curl -X ${entry.method} ${headerFlags} "${url}"${body}`
}

/**
 * components/patterns/request-inspector/request-inspector-demo.tsx를 props
 * 기반으로 일반화한 버전 — 요청 목록 + Headers/Query/Payload/Response 상세.
 */
export function RequestInspector({ requests }: Readonly<{ requests: RequestEntry[] }>) {
  const [selectedId, setSelectedId] = useState(requests[0]?.id)
  const selected = requests.find((entry) => entry.id === selectedId) ?? requests[0]

  if (!selected) {
    return <p className="text-xs text-muted-foreground">기록된 요청이 없습니다.</p>
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <ul className="flex flex-col divide-y divide-border rounded-md border border-border font-mono text-xs">
        {requests.map((entry) => (
          <li key={entry.id}>
            <button
              type="button"
              aria-pressed={entry.id === selectedId}
              onClick={() => setSelectedId(entry.id)}
              className={cn(
                "flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-accent/50",
                entry.id === selectedId && "bg-accent",
              )}
            >
              <span className="w-12 shrink-0 font-semibold text-muted-foreground">{entry.method}</span>
              <span className="flex-1 truncate text-foreground">{entry.path}</span>
              <span className={cn("w-10 shrink-0 text-right font-semibold", statusTone(entry.status))}>
                {entry.status}
              </span>
              <span className="w-16 shrink-0 text-right tabular-nums text-muted-foreground">
                {entry.durationMs}ms
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="rounded-md border border-border p-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono text-xs">
            <Badge variant="outline">{selected.method}</Badge>
            <span className="text-foreground">{selected.path}</span>
            <span className={cn("font-semibold", statusTone(selected.status))}>{selected.status}</span>
          </div>
          <CopyButton value={toCurl(selected)} label="cURL 복사" />
        </div>

        <Accordion type="multiple" defaultValue={["headers"]}>
          <AccordionItem value="headers">
            <AccordionTrigger>Headers</AccordionTrigger>
            <AccordionContent>
              <KeyValueTable data={selected.headers} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="query">
            <AccordionTrigger>Query</AccordionTrigger>
            <AccordionContent>
              {Object.keys(selected.query).length > 0 ? (
                <KeyValueTable data={selected.query} />
              ) : (
                <p className="text-xs text-muted-foreground">쿼리 파라미터 없음</p>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="payload">
            <AccordionTrigger>Payload</AccordionTrigger>
            <AccordionContent>
              {selected.payload ? (
                <pre className="overflow-x-auto rounded bg-muted/40 p-2 font-mono text-[11px]">
                  {JSON.stringify(selected.payload, null, 2)}
                </pre>
              ) : (
                <p className="text-xs text-muted-foreground">본문 없음</p>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="response">
            <AccordionTrigger>Response</AccordionTrigger>
            <AccordionContent>
              <pre
                className={cn(
                  "overflow-x-auto rounded p-2 font-mono text-[11px]",
                  selected.status >= 400 ? "bg-destructive/10" : "bg-muted/40",
                )}
              >
                {JSON.stringify(selected.response, null, 2)}
              </pre>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

function KeyValueTable({ data }: Readonly<{ data: Record<string, string> }>) {
  return (
    <dl className="flex flex-col gap-1 font-mono text-[11px]">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex gap-2">
          <dt className="w-28 shrink-0 text-muted-foreground">{key}</dt>
          <dd className="text-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
