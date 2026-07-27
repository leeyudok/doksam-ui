"use client"

import { QuestionIcon } from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

/** {@link ScreenHelpDialog}에 넘기는 화면 매뉴얼 항목 하나(제목 + 본문). */
export interface ScreenHelpItem {
  title: string
  body: string
}

interface ScreenHelpDialogProps {
  title: string
  description: string
  items: ScreenHelpItem[]
}

/**
 * 화면 제목 옆 (?) 버튼 → 화면 매뉴얼 다이얼로그.
 * shadcn Dialog + Button(asChild)을 조합한 커스텀 패턴 — components/ui/ 원본은 건드리지 않는다.
 * bizinfo `screen-help-dialog.tsx` 이식(#8).
 */
export function ScreenHelpDialog({ title, description, items }: Readonly<ScreenHelpDialogProps>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="ghost" size="icon-sm" aria-label="화면 매뉴얼">
          <QuestionIcon className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <dl className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.title}>
              <dt className="text-sm font-medium">{item.title}</dt>
              <dd className="text-sm text-muted-foreground">{item.body}</dd>
            </div>
          ))}
        </dl>
      </DialogContent>
    </Dialog>
  )
}
