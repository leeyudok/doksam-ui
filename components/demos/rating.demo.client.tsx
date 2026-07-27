"use client"

import { useState } from "react"

import { Rating } from "@/components/rating"

export function RatingDemo() {
  const [value, setValue] = useState(3.5)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="text-sm text-muted-foreground">직접 선택</span>
        <Rating value={value} onChange={setValue} showValue />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-sm text-muted-foreground">읽기 전용</span>
        <Rating value={4.5} max={5} readOnly showValue />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-sm text-muted-foreground">severity — 값에 따라 톤 자동 변경</span>
        <div className="flex flex-col gap-1">
          <Rating value={1} readOnly showValue severity />
          <Rating value={2} readOnly showValue severity />
          <Rating value={3} readOnly showValue severity />
          <Rating value={4} readOnly showValue severity />
        </div>
      </div>
    </div>
  )
}
