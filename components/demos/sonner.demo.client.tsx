"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"

export function SonnerDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast.success("저장되었습니다", {
            description: "변경 사항이 정상적으로 반영되었습니다.",
          })
        }
      >
        저장 토스트
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.error("저장에 실패했습니다", {
            description: "네트워크 연결을 확인한 뒤 다시 시도해주세요.",
          })
        }
      >
        오류 토스트
      </Button>
    </div>
  )
}
