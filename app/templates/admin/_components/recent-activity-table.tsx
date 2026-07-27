import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { RecentActivityRow } from "../_data/dashboard-data"

/** 대시보드 하단 요약 테이블 — 최근 관리자/시스템 활동 로그. */
export function RecentActivityTable({ rows }: Readonly<{ rows: RecentActivityRow[] }>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">최근 활동</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>사용자</TableHead>
              <TableHead>액션</TableHead>
              <TableHead>대상</TableHead>
              <TableHead className="text-right">시간</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium text-foreground">{row.actor}</TableCell>
                <TableCell className="text-muted-foreground">{row.action}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{row.target}</TableCell>
                <TableCell className="text-right text-xs text-muted-foreground">{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
