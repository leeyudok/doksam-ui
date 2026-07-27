import { TranslatedText } from "@/components/showcase/translated-text";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { THEME_PRESETS } from "@/themes";
import type { ThemeTokens } from "@/themes";

const MATRIX_KEYS = [
  "primary",
  "background",
  "foreground",
  "accent",
  "border",
  "success",
  "warning",
  "destructive",
] as const satisfies readonly (keyof ThemeTokens)[];

/**
 * 프리셋 비교 매트릭스(#66) — themes/*.ts 의 TS 값을 직접 렌더한다.
 * CSS 변수(현재 프리셋)와 무관하게 8개 프리셋 전체를 한눈에 비교하며,
 * 셀은 위(라이트)/아래(다크) 2단 칩이다.
 */
export function PresetMatrix() {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium">
          <TranslatedText k="page.tokens.matrix.title" ko="프리셋 비교" />
        </h2>
        <p className="max-w-prose text-sm text-muted-foreground">
          <TranslatedText
            k="page.tokens.matrix.description"
            ko="테마 프리셋 전체의 핵심 토큰을 TS 정의값으로 직접 렌더한 매트릭스입니다. 상단 스위처와 무관하게 전 프리셋을 비교할 수 있으며, 각 셀은 위가 라이트, 아래가 다크 값입니다."
          />
        </p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>프리셋</TableHead>
              {MATRIX_KEYS.map((key) => (
                <TableHead key={key}>
                  <code className="text-xs">{key}</code>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {THEME_PRESETS.map((preset) => (
              <TableRow key={preset.name}>
                <TableCell>
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <span
                      aria-hidden="true"
                      className="size-3 shrink-0 rounded-full ring-1 ring-inset ring-border"
                      style={{ backgroundColor: preset.swatch }}
                    />
                    <span className="text-xs font-medium">{preset.label}</span>
                  </span>
                </TableCell>
                {MATRIX_KEYS.map((key) => (
                  <TableCell key={key}>
                    <span className="flex flex-col gap-0.5">
                      <span
                        title={`${preset.label} light ${key}: ${preset.light[key]}`}
                        className="h-4 w-10 rounded-sm border border-border"
                        style={{ backgroundColor: preset.light[key] }}
                      />
                      <span
                        title={`${preset.label} dark ${key}: ${preset.dark[key]}`}
                        className="h-4 w-10 rounded-sm border border-border"
                        style={{ backgroundColor: preset.dark[key] }}
                      />
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
