import { CheckIcon, XIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

interface DoDontListProps {
  dos: string[]
  donts: string[]
}

/** 컴포넌트 상세 페이지의 do/don't 사용 규칙 목록. */
export function DoDontList({ dos, donts }: Readonly<DoDontListProps>) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <RuleList label="Do" tone="success" items={dos} />
      <RuleList label="Don't" tone="destructive" items={donts} />
    </div>
  )
}

function RuleList({
  label,
  tone,
  items,
}: Readonly<{
  label: string
  tone: "success" | "destructive"
  items: string[]
}>) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border p-4">
      <span
        className={cn(
          "text-sm font-medium",
          tone === "success" ? "text-success" : "text-destructive",
        )}
      >
        {label}
      </span>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
            {tone === "success" ? (
              <CheckIcon size={16} weight="regular" className="mt-0.5 shrink-0 text-success" />
            ) : (
              <XIcon size={16} weight="regular" className="mt-0.5 shrink-0 text-destructive" />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
