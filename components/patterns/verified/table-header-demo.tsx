import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const ITEMS = [
  { name: "표준 플랜", price: 9900, seats: 5 },
  { name: "프로 플랜", price: 29900, seats: 20 },
  { name: "엔터프라이즈 플랜", price: 99000, seats: 100 },
]

/**
 * shadcn TableHead에 font-bold를 개별로 붙이지 않아도 볼드로 보인다 —
 * app/globals.css의 `thead th { @apply font-bold; }` 전역 규칙이 적용된 결과.
 */
export function TableHeaderDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>플랜</TableHead>
          <TableHead className="text-right">가격</TableHead>
          <TableHead className="text-right">좌석 수</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ITEMS.map((item) => (
          <TableRow key={item.name}>
            <TableCell>{item.name}</TableCell>
            <TableCell className="text-right">{item.price.toLocaleString()}원</TableCell>
            <TableCell className="text-right">{item.seats}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
