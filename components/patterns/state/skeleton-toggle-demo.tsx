"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const SUMMARY_LABELS = ["항목A", "항목B", "항목C", "항목D", "항목E"]

/** 로딩/완료 상태를 토글하며 실제 페이지 레이아웃을 그대로 미러링하는 스켈레톤을 보여준다. */
export function SkeletonToggleDemo() {
  const [showSkeleton, setShowSkeleton] = useState(true)

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex gap-2">
        <Button size="sm" variant={showSkeleton ? "default" : "outline"} onClick={() => setShowSkeleton(true)}>
          로딩 중
        </Button>
        <Button size="sm" variant={!showSkeleton ? "default" : "outline"} onClick={() => setShowSkeleton(false)}>
          로딩 완료
        </Button>
      </div>

      {showSkeleton ? (
        <div className="flex flex-col gap-3">
          <div className="space-y-1">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="grid grid-cols-3 gap-1.5 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="space-y-1 px-2 py-2">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-5 w-16" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">페이지 제목</h3>
            <p className="text-sm text-muted-foreground">로딩 완료 상태</p>
          </div>
          <div className="grid grid-cols-3 gap-1.5 md:grid-cols-5">
            {SUMMARY_LABELS.map((label) => (
              <Card key={label}>
                <CardContent className="px-2 py-2">
                  <p className="text-[9px] font-medium text-muted-foreground">{label}</p>
                  <span className="text-base font-black text-primary">123</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
