"use client"

import { useMemo, useState } from "react"
import { MinusIcon, PlusIcon, ShoppingCartSimpleIcon } from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Product } from "@/app/templates/shop/_lib/data"

/** 옵션 선택 + 수량 조절 + 담기 CTA. 데모용 로컬 상태만 관리하고 실제 장바구니에 반영하지는 않는다. */
export function ProductOptions({ product }: Readonly<{ product: Product }>) {
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.options.map((option) => [option.label, option.values[0]])),
  )
  const [quantity, setQuantity] = useState(1)
  const soldOut = product.stock === 0

  const totalPrice = useMemo(() => product.price * quantity, [product.price, quantity])

  function decrement() {
    setQuantity((q) => Math.max(1, q - 1))
  }

  function increment() {
    setQuantity((q) => Math.min(product.stock || 1, q + 1))
  }

  return (
    <div className="flex flex-col gap-5">
      {product.options.map((option) => (
        <fieldset key={option.label} className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-foreground">{option.label}</legend>
          <RadioGroup
            className="grid-flow-col auto-cols-max gap-2"
            value={selected[option.label]}
            onValueChange={(value) => setSelected((prev) => ({ ...prev, [option.label]: value }))}
          >
            {option.values.map((value) => {
              const id = `${option.label}-${value}`
              const active = selected[option.label] === value
              return (
                <Label
                  key={value}
                  htmlFor={id}
                  className="cursor-pointer rounded-md border border-input px-3 py-1.5 text-sm has-data-checked:border-primary has-data-checked:bg-primary has-data-checked:text-primary-foreground"
                >
                  <RadioGroupItem id={id} value={value} className="sr-only" />
                  {value}
                  <span className="sr-only">{active ? " (선택됨)" : ""}</span>
                </Label>
              )
            })}
          </RadioGroup>
        </fieldset>
      ))}

      <div className="flex flex-col gap-2">
        <Label htmlFor="quantity" className="text-sm font-medium text-foreground">
          수량
        </Label>
        <div className="flex w-fit items-center gap-1 rounded-lg border border-input p-1">
          <Button type="button" variant="ghost" size="icon-sm" onClick={decrement} disabled={quantity <= 1 || soldOut}>
            <MinusIcon size={14} />
            <span className="sr-only">수량 감소</span>
          </Button>
          <span id="quantity" className="w-8 text-center text-sm font-medium tabular-nums" aria-live="polite">
            {quantity}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={increment}
            disabled={soldOut || quantity >= product.stock}
          >
            <PlusIcon size={14} />
            <span className="sr-only">수량 증가</span>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {soldOut ? "품절된 상품입니다." : `재고 ${product.stock.toLocaleString()}개 남음`}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4">
        <div>
          <p className="text-xs text-muted-foreground">총 상품 금액</p>
          <p className="text-xl font-bold tabular-nums text-foreground">{totalPrice.toLocaleString()}원</p>
        </div>
        <Button type="button" size="lg" disabled={soldOut}>
          <ShoppingCartSimpleIcon size={16} weight="bold" />
          {soldOut ? "품절" : "장바구니 담기"}
        </Button>
      </div>
    </div>
  )
}
