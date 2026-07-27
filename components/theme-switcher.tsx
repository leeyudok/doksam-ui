"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";
import { THEME_PRESETS } from "@/themes";
import { useThemePreset } from "@/hooks/use-theme-preset";

/**
 * 프리셋 칩(테마 레지스트리 순회 + 대표색 dot) + 라이트/다크 토글.
 * themes/index.ts 의 THEME_PRESETS 에 항목을 추가하면 이 컴포넌트도
 * 코드 변경 없이 자동으로 칩이 늘어난다.
 */
export function ThemeSwitcher({
  presetChipsClassName,
}: Readonly<{ presetChipsClassName?: string }> = {}) {
  const { preset, mode, setPreset, toggleMode } = useThemePreset();
  const { t } = useI18n();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div
        role="radiogroup"
        aria-label={t("chrome.theme.presets-aria", "테마 프리셋")}
        className={cn(
          "flex flex-wrap items-center gap-1 rounded-lg border border-border bg-muted/50 p-1",
          presetChipsClassName,
        )}
      >
        {THEME_PRESETS.map((item) => (
          <button
            key={item.name}
            type="button"
            role="radio"
            aria-checked={preset === item.name}
            aria-label={item.label}
            title={item.label}
            onClick={() => setPreset(item.name)}
            className={cn(
              "flex size-6 items-center justify-center rounded-md transition-colors",
              preset === item.name ? "bg-background shadow-sm" : "hover:bg-background/60",
            )}
          >
            <span
              aria-hidden="true"
              className="size-3.5 rounded-full ring-1 ring-inset ring-border"
              style={{ backgroundColor: item.swatch }}
            />
          </button>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={mode === "dark" ? t("chrome.theme.to-light", "라이트 모드로 전환") : t("chrome.theme.to-dark", "다크 모드로 전환")}
        onClick={toggleMode}
      >
        {mode === "dark" ? <SunIcon weight="regular" /> : <MoonIcon weight="regular" />}
      </Button>
    </div>
  );
}
