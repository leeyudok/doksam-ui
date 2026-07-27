import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const ORDERS = [
  { id: "ORD-2026-0114", customer: "김서연", amount: 128000, status: "결제완료" },
  { id: "ORD-2026-0115", customer: "이도현", amount: 64500, status: "배송중" },
  { id: "ORD-2026-0116", customer: "박지민", amount: 219000, status: "배송완료" },
  { id: "ORD-2026-0117", customer: "최유나", amount: 45000, status: "결제대기" },
]

export const demo = (
  <Table>
    <TableCaption>2026년 7월 최근 주문 내역</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>주문번호</TableHead>
        <TableHead>고객</TableHead>
        <TableHead>상태</TableHead>
        <TableHead className="text-right">결제금액</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {ORDERS.map((order) => (
        <TableRow key={order.id}>
          <TableCell className="font-medium">{order.id}</TableCell>
          <TableCell>{order.customer}</TableCell>
          <TableCell>{order.status}</TableCell>
          <TableCell className="text-right">
            {order.amount.toLocaleString()}원
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={3}>합계</TableCell>
        <TableCell className="text-right">
          {ORDERS.reduce((sum, order) => sum + order.amount, 0).toLocaleString()}원
        </TableCell>
      </TableRow>
    </TableFooter>
  </Table>
)

export const code = `const ORDERS = [
  { id: "ORD-2026-0114", customer: "김서연", amount: 128000, status: "결제완료" },
  { id: "ORD-2026-0115", customer: "이도현", amount: 64500, status: "배송중" },
]

<Table>
  <TableCaption>2026년 7월 최근 주문 내역</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>주문번호</TableHead>
      <TableHead>고객</TableHead>
      <TableHead>상태</TableHead>
      <TableHead className="text-right">결제금액</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {ORDERS.map((order) => (
      <TableRow key={order.id}>
        <TableCell className="font-medium">{order.id}</TableCell>
        <TableCell>{order.customer}</TableCell>
        <TableCell>{order.status}</TableCell>
        <TableCell className="text-right">{order.amount.toLocaleString()}원</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`

export const dos = [
  "숫자 컬럼(금액·수량)은 text-right로 정렬해 가독성을 높인다.",
  "행 수가 많을 때는 TableCaption으로 표의 맥락을 요약해 준다.",
  "합계·요약 행은 TableFooter로 본문 행과 시각적으로 분리한다.",
]

export const donts = [
  "고정폭이 필요 없는 컬럼까지 임의 width를 지정해 레이아웃을 깨지 않는다.",
  "상태 값을 색상 텍스트로만 표현하지 않는다 — Badge 등으로 보강한다.",
]
