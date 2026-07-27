import { CheckIcon, MinusIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface ComparisonRow {
  label: string
  starter: boolean
  team: boolean
  enterprise: boolean
}

const ROWS: ComparisonRow[] = [
  { label: "워크스페이스", starter: true, team: true, enterprise: true },
  { label: "자동화 규칙", starter: false, team: true, enterprise: true },
  { label: "SSO / SCIM", starter: false, team: false, enterprise: true },
  { label: "감사 로그 무제한", starter: false, team: false, enterprise: true },
]

const COLUMNS = [
  { key: "starter" as const, label: "Starter" },
  { key: "team" as const, label: "Team" },
  { key: "enterprise" as const, label: "Enterprise" },
]

/** 티어별 기능 포함 여부를 체크/마이너스 아이콘으로 압축해 보여주는 비교 목록(#33). 추천 티어 컬럼 헤더만 강조 배지로 구분한다. */
export function PricingFeatureListDemo() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[28rem] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="py-2 text-left font-medium text-muted-foreground">기능</th>
            {COLUMNS.map((col) => (
              <th key={col.key} className="py-2 text-center font-medium text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  {col.label}
                  {col.key === "team" && (
                    <Badge variant="default" className="text-[9px]">
                      추천
                    </Badge>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-b-0">
              <td className="py-2 text-foreground">{row.label}</td>
              {COLUMNS.map((col) => (
                <td key={col.key} className="py-2 text-center">
                  {row[col.key] ? (
                    <CheckIcon
                      size={16}
                      weight="bold"
                      className={cn("mx-auto text-success", col.key === "team" && "text-primary")}
                    />
                  ) : (
                    <MinusIcon size={16} className="mx-auto text-muted-foreground/50" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
