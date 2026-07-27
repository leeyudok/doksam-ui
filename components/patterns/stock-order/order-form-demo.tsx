"use client"

import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatWon } from "@/lib/finance/format-won"
import { rateColor, rateText } from "@/lib/finance/rate"
import {
  ASK_LEVELS,
  BID_LEVELS,
  ORDER_SIDE_LABEL,
  ORDER_SYMBOL,
  ORDER_TYPE_LABEL,
  estimateOrderAmount,
  type OrderSide,
  type OrderType,
} from "@/lib/patterns/stock-order-data"

/**
 * 주문 입력 데모 — 매수/매도 Tabs + 호가 목록(클릭 시 가격 반영) + 수량/주문유형
 * Select + 예상 체결금액. 실제 주문 제출은 하지 않고 UI 조합만 보여준다.
 */
export function OrderFormDemo() {
  const [side, setSide] = useState<OrderSide>("buy")
  const [orderType, setOrderType] = useState<OrderType>("limit")
  const [price, setPrice] = useState(ORDER_SYMBOL.currentPrice)
  const [quantity, setQuantity] = useState(1)

  const estimatedAmount = useMemo(
    () => estimateOrderAmount(orderType === "market" ? ORDER_SYMBOL.currentPrice : price, quantity),
    [orderType, price, quantity]
  )

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-sm font-semibold">{ORDER_SYMBOL.name}</p>
          <p className="text-[11px] text-muted-foreground">
            {ORDER_SYMBOL.code} · {ORDER_SYMBOL.market}
          </p>
        </div>
        <div className="text-right">
          <p className="text-base font-bold tabular-nums">{ORDER_SYMBOL.currentPrice.toLocaleString()}</p>
          <p className={`text-xs font-medium tabular-nums ${rateColor(ORDER_SYMBOL.changePercent)}`}>
            {rateText(ORDER_SYMBOL.changePercent)}%
          </p>
        </div>
      </div>

      <Tabs value={side} onValueChange={(v) => setSide(v as OrderSide)}>
        <TabsList className="w-full">
          <TabsTrigger value="buy">{ORDER_SIDE_LABEL.buy}</TabsTrigger>
          <TabsTrigger value="sell">{ORDER_SIDE_LABEL.sell}</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col divide-y divide-border rounded-lg border border-border text-xs">
        {ASK_LEVELS.slice()
          .reverse()
          .map((level) => (
            <button
              key={level.price}
              type="button"
              onClick={() => setPrice(level.price)}
              aria-label={`매도호가 ${level.price.toLocaleString()}원 선택`}
              className={`flex items-center justify-between px-3 py-1.5 transition-colors hover:bg-muted ${
                price === level.price ? "bg-muted" : ""
              }`}
            >
              <span className={`tabular-nums ${rateColor(level.price - ORDER_SYMBOL.currentPrice)}`}>
                {level.price.toLocaleString()}
              </span>
              <span className="tabular-nums text-muted-foreground">{level.quantity.toLocaleString()}</span>
            </button>
          ))}
        {BID_LEVELS.map((level) => (
          <button
            key={level.price}
            type="button"
            onClick={() => setPrice(level.price)}
            aria-label={`매수호가 ${level.price.toLocaleString()}원 선택`}
            className={`flex items-center justify-between px-3 py-1.5 transition-colors hover:bg-muted ${
              price === level.price ? "bg-muted" : ""
            }`}
          >
            <span className={`tabular-nums ${rateColor(level.price - ORDER_SYMBOL.currentPrice)}`}>
              {level.price.toLocaleString()}
            </span>
            <span className="tabular-nums text-muted-foreground">{level.quantity.toLocaleString()}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="stock-order-type" className="text-[10px]">
            주문유형
          </Label>
          <Select value={orderType} onValueChange={(v) => setOrderType(v as OrderType)}>
            <SelectTrigger id="stock-order-type" className="h-8 w-full text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="limit">{ORDER_TYPE_LABEL.limit}</SelectItem>
              <SelectItem value="market">{ORDER_TYPE_LABEL.market}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="stock-order-quantity" className="text-[10px]">
            수량(주)
          </Label>
          <Input
            id="stock-order-quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
            className="h-8 text-xs"
          />
        </div>
      </div>

      {orderType === "limit" && (
        <div className="space-y-1">
          <Label htmlFor="stock-order-price" className="text-[10px]">
            주문가격
          </Label>
          <Input
            id="stock-order-price"
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(Math.max(0, Number(e.target.value) || 0))}
            className="h-8 text-xs"
          />
        </div>
      )}

      <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
        <span className="text-xs text-muted-foreground">예상 체결금액</span>
        <span className="text-sm font-bold tabular-nums">{formatWon(estimatedAmount)}</span>
      </div>

      <Button type="button" variant={side === "buy" ? "default" : "destructive"}>
        {ORDER_SIDE_LABEL[side]} 주문
      </Button>
    </div>
  )
}
