import { ArrowDownIcon, FileTextIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

/** 흐름 도식의 관문(gate) 한 칸 — 진입점과 노드 사이 단계. */
interface GateProps {
  label: string
  title: string
  /** primary=주 강조 관문, secondary=보조 관문. */
  tone?: "primary" | "secondary"
}

function Gate({ label, title, tone = "primary" }: Readonly<GateProps>) {
  return (
    <div className="flex w-full max-w-md items-center gap-3">
      <span className="w-24 shrink-0 text-right font-mono text-[11px] text-muted-foreground">{label}</span>
      <div
        className={cn(
          "flex-1 rounded-md border px-3 py-2 text-center text-sm font-medium",
          tone === "primary"
            ? "border-primary/30 bg-primary/10 text-foreground"
            : "border-border bg-muted text-muted-foreground",
        )}
      >
        {title}
      </div>
    </div>
  )
}

function FlowArrow() {
  return <ArrowDownIcon aria-hidden size={16} weight="bold" className="my-1 text-muted-foreground" />
}

/**
 * 아키텍처 흐름 도식 — 진입점(점선 알약) → 관문(gate) → 실행 노드/유닛으로 이어지는
 * 세로 플로우. 어떤 요청/데이터가 어떤 관문을 거쳐 어디로 도달하는지를 한눈에 보여준다.
 * 여기선 docker build → run 흐름을 예로 든다.
 */
export function FlowDiagram() {
  return (
    <div className="flex flex-col items-center gap-0">
      <div className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-dashed border-muted-foreground/50 px-3 py-1 font-mono text-[11px] text-muted-foreground">
        <FileTextIcon aria-hidden size={14} />
        Dockerfile · 레시피 카드
      </div>
      <FlowArrow />
      <Gate label="① docker build" title="IMAGE · 냉동 밀키트" tone="primary" />
      <FlowArrow />
      <Gate label="② docker run" title="데우기 → 접시에 담기" tone="secondary" />

      <div className="mt-3 flex w-full max-w-md justify-center gap-3">
        {HOSTS.map((host) => (
          <div key={host.name} className="flex-1 rounded-md border border-border p-2">
            <div className="border-b border-border pb-1.5 text-center font-mono text-[10px] text-muted-foreground">
              {host.name}
            </div>
            <div className="flex flex-col gap-1 pt-1.5">
              {host.units.map((unit) => (
                <div
                  key={unit}
                  className="rounded-sm bg-secondary px-1 py-1 text-center text-[10px] text-secondary-foreground"
                >
                  {unit}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const HOSTS = [
  { name: "HOST A · 주방", units: ["web 컨테이너", "api 컨테이너"] },
  { name: "HOST B · 주방", units: ["db 컨테이너", "cache 컨테이너"] },
]
