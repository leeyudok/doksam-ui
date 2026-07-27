import Link from "next/link";

import { TranslatedText } from "@/components/showcase/translated-text";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DENSITY_TOKENS = [
  { token: "--control-h", usage: "input 기본 높이", comfortable: "2rem", compact: "1.75rem" },
  { token: "--cell-py", usage: "테이블 셀 세로 패딩", comfortable: "0.5rem", compact: "0.25rem" },
  { token: "--stack-gap", usage: "섹션 세로 간격", comfortable: "1.5rem", compact: "1rem" },
] as const;

function DensityDemo({ density }: Readonly<{ density: "comfortable" | "compact" }>) {
  return (
    <div data-density={density} className="flex flex-1 flex-col gap-2 rounded-lg border border-border p-3">
      <span className="text-xs font-medium text-muted-foreground">{density}</span>
      <Input readOnly value="input 높이" />
      <div className="overflow-hidden rounded-md border border-border">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>배치 #241</TableCell>
              <TableCell className="text-right text-muted-foreground">완료</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>배치 #242</TableCell>
              <TableCell className="text-right text-muted-foreground">대기</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

/**
 * 밀도(density) 토큰 층 문서(#66) — #65에서 신설된 [data-density] 토큰의
 * 값 표와 comfortable/compact 실측 비교 데모.
 */
export function DensitySection() {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium">
          <TranslatedText k="page.tokens.density.title" ko="밀도 토큰" />
        </h2>
        <p className="max-w-prose text-sm text-muted-foreground">
          <TranslatedText
            k="page.tokens.density.description"
            ko="브랜드 프로필이 <html data-density>로 지정하는 밀도 층입니다. data-density가 없으면 아무 규칙도 걸리지 않아 기존 렌더와 동일하며, 값은 프로필이 고정합니다 — 프로젝트에서 임의 재정의하지 않습니다."
          />{" "}
          <Link href="/profiles" className="underline underline-offset-2">
            /profiles
          </Link>
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>토큰</TableHead>
            <TableHead>용도</TableHead>
            <TableHead>comfortable</TableHead>
            <TableHead>compact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DENSITY_TOKENS.map((row) => (
            <TableRow key={row.token}>
              <TableCell>
                <code className="text-xs">{row.token}</code>
              </TableCell>
              <TableCell className="text-muted-foreground">{row.usage}</TableCell>
              <TableCell>
                <code className="text-xs">{row.comfortable}</code>
              </TableCell>
              <TableCell>
                <code className="text-xs">{row.compact}</code>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col gap-3 sm:flex-row">
        <DensityDemo density="comfortable" />
        <DensityDemo density="compact" />
      </div>
    </section>
  );
}
