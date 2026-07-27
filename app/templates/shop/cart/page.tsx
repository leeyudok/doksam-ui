import Link from "next/link"
import { ArrowRightIcon, ShoppingCartSimpleIcon, StorefrontIcon } from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ProductVisual } from "@/app/templates/shop/_components/product-visual"
import { FREE_SHIPPING_THRESHOLD, cartLineDetails, cartTotals } from "@/app/templates/shop/_lib/data"

export default function ShopCartPage() {
  const details = cartLineDetails()
  const totals = cartTotals(details)

  if (details.length === 0) {
    return (
      <Empty className="min-h-[50vh]">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShoppingCartSimpleIcon size={20} />
          </EmptyMedia>
          <EmptyTitle>장바구니가 비어 있습니다</EmptyTitle>
          <EmptyDescription>마음에 드는 상품을 담아보세요.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href="/templates/shop">
              <StorefrontIcon size={16} />
              쇼핑 계속하기
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    )
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">장바구니</h1>
        <p className="text-sm text-muted-foreground">담은 상품 {totals.itemCount}개</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="py-0">
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>상품</TableHead>
                  <TableHead className="text-right">수량</TableHead>
                  <TableHead className="text-right">금액</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {details.map(({ line, product, lineTotal }) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <ProductVisual category={product.category} className="size-14 shrink-0" />
                        <div className="flex flex-col gap-0.5">
                          <Link
                            href={`/templates/shop/product/${product.id}`}
                            className="text-sm font-medium text-foreground hover:underline"
                          >
                            {product.name}
                          </Link>
                          {Object.keys(line.selectedOptions).length > 0 && (
                            <p className="text-xs text-muted-foreground">
                              {Object.entries(line.selectedOptions)
                                .map(([label, value]) => `${label}: ${value}`)
                                .join(" · ")}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">{product.price.toLocaleString()}원</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{line.quantity}개</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">
                      {lineTotal.toLocaleString()}원
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardContent className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-foreground">결제 요약</h2>
            <dl className="flex flex-col gap-2 text-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <dt>상품 금액</dt>
                <dd className="tabular-nums text-foreground">{totals.subtotal.toLocaleString()}원</dd>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <dt>배송비</dt>
                <dd className="tabular-nums text-foreground">
                  {totals.shipping === 0 ? "무료" : `${totals.shipping.toLocaleString()}원`}
                </dd>
              </div>
              {totals.shipping > 0 && (
                <p className="text-xs text-muted-foreground">
                  {(FREE_SHIPPING_THRESHOLD - totals.subtotal).toLocaleString()}원 더 담으면 무료배송
                </p>
              )}
            </dl>
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="text-sm font-semibold text-foreground">총 결제 금액</span>
              <span className="text-xl font-bold tabular-nums text-foreground">
                {totals.total.toLocaleString()}원
              </span>
            </div>
            <Button size="lg" className="w-full">
              결제하기
              <ArrowRightIcon size={16} weight="bold" />
            </Button>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/templates/shop">
                <StorefrontIcon size={14} />
                쇼핑 계속하기
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
