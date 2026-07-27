"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckCircleIcon, InfoIcon, WarningCircleIcon, WarningIcon, XIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

const bannerVariants = cva(
  "group/banner relative flex w-full items-start gap-2 rounded-lg border px-3 py-2.5 text-sm [&>svg]:mt-0.5 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        info: "border-primary/20 bg-primary/10 text-primary",
        success: "border-success/20 bg-success/10 text-success",
        warning: "border-warning/20 bg-warning/10 text-warning",
        destructive: "border-destructive/20 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

const bannerIcons = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: WarningIcon,
  destructive: WarningCircleIcon,
} as const

export interface BannerProps extends React.ComponentProps<"div">, VariantProps<typeof bannerVariants> {
  /** 닫기 버튼 클릭 시 호출. 배너 자체는 항상 내부 상태로 닫힘을 처리한다. */
  onDismiss?: () => void
}

/**
 * 상단 공지 배너(#36) — info/success/warning/destructive cva variant + 상태 아이콘 +
 * 닫기 버튼. 닫힘 상태를 내부에서 관리하는 client 컴포넌트.
 */
function Banner({ className, variant = "info", onDismiss, children, ...props }: Readonly<BannerProps>) {
  const [dismissed, setDismissed] = React.useState(false)
  const resolvedVariant = variant ?? "info"
  const Icon = bannerIcons[resolvedVariant]

  if (dismissed) return null

  return (
    <div
      data-slot="banner"
      data-variant={resolvedVariant}
      role="status"
      className={cn(bannerVariants({ variant: resolvedVariant }), className)}
      {...props}
    >
      <Icon size={16} weight="regular" />
      <div data-slot="banner-content" className="min-w-0 flex-1">
        {children}
      </div>
      <button
        type="button"
        aria-label="배너 닫기"
        data-slot="banner-dismiss"
        className="shrink-0 rounded-md p-0.5 text-current opacity-70 transition-opacity hover:opacity-100"
        onClick={() => {
          setDismissed(true)
          onDismiss?.()
        }}
      >
        <XIcon size={14} weight="regular" />
      </button>
    </div>
  )
}

export { Banner, bannerVariants }
