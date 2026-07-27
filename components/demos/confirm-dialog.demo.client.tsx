"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/confirm-dialog"

export function ConfirmDialogDemo() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <div>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        종목 삭제
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="종목을 삭제할까요?"
        description={
          <>
            <b>한빛반도체(042700)</b> 를 포트폴리오에서 삭제합니다.
          </>
        }
        loading={loading}
        onConfirm={async () => {
          setLoading(true)
          await new Promise((r) => setTimeout(r, 700))
          setLoading(false)
          toast.success("삭제 완료")
        }}
      />
    </div>
  )
}
