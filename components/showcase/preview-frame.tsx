"use client"

import { useEffect, useState, type ReactNode } from "react"
import {
  DeviceMobileIcon,
  DeviceTabletIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
} from "@phosphor-icons/react/dist/ssr"

import { useI18n } from "@/components/i18n-provider"
import { CopyButton } from "@/components/showcase/copy-button"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type WidthKey = "full" | "tablet" | "mobile"

const WIDTHS: { key: WidthKey; width: number | null; icon: typeof MonitorIcon; labelKey: string; labelKo: string }[] = [
  { key: "full", width: null, icon: MonitorIcon, labelKey: "chrome.preview.full", labelKo: "전체" },
  { key: "tablet", width: 768, icon: DeviceTabletIcon, labelKey: "chrome.preview.tablet", labelKo: "태블릿" },
  { key: "mobile", width: 390, icon: DeviceMobileIcon, labelKey: "chrome.preview.mobile", labelKo: "모바일" },
]

interface PreviewFrameProps {
  children: ReactNode
  /** 있으면 툴바에 코드 복사 버튼을 노출한다. */
  code?: string
}

/**
 * 데모를 감싸 국소 테마 토글·반응형 폭·코드 복사 툴바를 제공하는 순수 표시 컴포넌트.
 * 국소 테마: 현재 프리셋(document.documentElement.dataset.theme)을 표면에 재부여하고
 * 다크 상태면 dark 클래스를 더해 기존 [data-theme][.dark] 토큰 블록을 재사용한다.
 */
export function PreviewFrame({ children, code }: Readonly<PreviewFrameProps>) {
  const { t } = useI18n()
  const [widthKey, setWidthKey] = useState<WidthKey>("full")
  const [preset, setPreset] = useState<string | undefined>(undefined)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // mount 직후 1회 <html> 상태로 동기화(의도된 mount-sync).
    const root = document.documentElement
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreset(root.dataset.theme)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(root.classList.contains("dark"))
  }, [])

  const maxWidth = WIDTHS.find((w) => w.key === widthKey)?.width ?? null

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border">
      <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/30 px-3 py-2">
        <div className="flex items-center gap-1">
          {WIDTHS.map(({ key, icon: Icon, labelKey, labelKo }) => (
            <Button
              key={key}
              type="button"
              size="icon"
              variant={key === widthKey ? "secondary" : "ghost"}
              aria-label={t(labelKey, labelKo)}
              aria-pressed={key === widthKey}
              onClick={() => setWidthKey(key)}
            >
              <Icon size={16} weight="regular" />
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label={t("chrome.preview.toggleTheme", "테마 전환")}
            onClick={() => setIsDark((v) => !v)}
          >
            {isDark ? <SunIcon size={16} weight="regular" /> : <MoonIcon size={16} weight="regular" />}
          </Button>
          {code ? <CopyButton value={code} /> : null}
        </div>
      </div>
      <div className="flex justify-center overflow-x-auto p-6">
        <div
          data-testid="preview-surface"
          data-theme={preset}
          className={cn(
            "flex min-h-32 w-full flex-wrap items-center gap-4 rounded-md bg-background p-4 text-foreground",
            isDark && "dark",
          )}
          style={maxWidth ? { maxWidth } : undefined}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
