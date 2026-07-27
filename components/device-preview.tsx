"use client"

import * as React from "react"
import { DeviceMobileIcon, DeviceTabletIcon, MonitorIcon } from "@phosphor-icons/react/dist/ssr"

import { useI18n } from "@/components/i18n-provider"
import { cn } from "@/lib/utils"

export type DeviceMode = "desktop" | "tablet" | "mobile"

interface DeviceModeConfig {
  id: DeviceMode
  label: string
  width: number | null
  icon: typeof MonitorIcon
}

const DEVICE_MODES: DeviceModeConfig[] = [
  { id: "desktop", label: "데스크톱", width: null, icon: MonitorIcon },
  { id: "tablet", label: "태블릿", width: 768, icon: DeviceTabletIcon },
  { id: "mobile", label: "모바일", width: 390, icon: DeviceMobileIcon },
]

interface DevicePreviewProps {
  /** iframe으로 격리 렌더할 라우트. 지정 시 children 대신 iframe을 프레임에 넣는다. */
  src?: string
  /** iframe 프레임 높이(px). 기본 720. */
  height?: number
  /** iframe title(접근성). src 사용 시 권장. */
  title?: string
  children?: React.ReactNode
  className?: string
  defaultMode?: DeviceMode
}

/**
 * 데스크톱/태블릿/모바일 3모드 토글로 콘텐츠를 해당 폭 프레임에 렌더한다
 * (shadcn.io 의 device-preview 블록 참고, #28). Tailwind 브레이크포인트는
 * 뷰포트 폭 기준이므로, 실제 반응형 리플로우를 보여주려면 iframe(자체 뷰포트)이
 * 필요하다 — `src`를 주면 iframe으로 격리 렌더한다. `src` 없이 children만 주면
 * max-width 컨테이너로 감싸 폭만 제한한다(컨테이너 쿼리 기반 콘텐츠용).
 * 태블릿/모바일 폭(768/390)은 검증 기준폭과 맞춘다.
 */
export function DevicePreview({
  src,
  height = 720,
  title,
  children,
  className,
  defaultMode = "desktop",
}: Readonly<DevicePreviewProps>) {
  const { t } = useI18n()
  const [mode, setMode] = React.useState<DeviceMode>(defaultMode)
  const active = DEVICE_MODES.find((item) => item.id === mode) ?? DEVICE_MODES[0]

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div
        role="group"
        aria-label={t("chrome.preview.aria", "디바이스 프리뷰 폭 전환")}
        className="flex w-fit items-center gap-1 rounded-lg border border-border bg-card p-1"
      >
        {DEVICE_MODES.map((deviceMode) => {
          const Icon = deviceMode.icon
          const isActive = deviceMode.id === mode
          return (
            <button
              key={deviceMode.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setMode(deviceMode.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon size={16} weight={isActive ? "duotone" : "regular"} />
              {t(`chrome.preview.mode.${deviceMode.id}`, deviceMode.label)}
            </button>
          )
        })}
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-border bg-muted/20 p-4">
        <div
          data-device-mode={mode}
          className="mx-auto overflow-hidden rounded-md border border-border bg-background transition-[width] duration-200"
          style={{ width: active.width ? `${active.width}px` : "100%", maxWidth: "100%" }}
        >
          {src ? (
            <iframe
              src={src}
              title={title ?? t("chrome.preview.title", "디바이스 프리뷰")}
              className="block w-full border-0 bg-background"
              style={{ height: `${height}px` }}
            />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  )
}
