"use client";

import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { FONT_LICENSE_NOTE, FONT_PRESETS } from "@/fonts";
import { useI18n } from "@/components/i18n-provider";
import { useFontPreset } from "@/hooks/use-font-preset";

/**
 * 폰트 프리셋 선택 — themes 레지스트리를 순회하는 ThemeSwitcher 와 대칭 구조.
 * fonts/index.ts 의 FONT_PRESETS 에 항목을 추가하면 이 컴포넌트도
 * 코드 변경 없이 자동으로 옵션이 늘어난다.
 */
export function FontSwitcher({ className }: Readonly<{ className?: string }> = {}) {
  const { font, setFont } = useFontPreset();
  const { t } = useI18n();

  return (
    <NativeSelect
      aria-label={t("chrome.font.aria", "폰트 프리셋")}
      title={FONT_LICENSE_NOTE}
      size="sm"
      className={className}
      value={font}
      onChange={(event) => setFont(event.target.value)}
    >
      {FONT_PRESETS.map((preset) => (
        <NativeSelectOption key={preset.name} value={preset.name}>
          {preset.label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
}
