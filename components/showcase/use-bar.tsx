"use client";

import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/copy-button";
import { buildLlmMarkdown, shadcnAddCommand } from "@/lib/showcase/llm-markdown";

interface UseBarProps {
  slug: string;
  title: string;
  description: string;
  code: string;
  dos: string[];
  donts: string[];
  /** registry.json 편입 여부 — 설치 버튼 vs 배지 분기. */
  inRegistry: boolean;
}

/** 상세 페이지 상단 "가져다 쓰기" 바 — 코드·설치 커맨드·LLM용 마크다운 복사. */
export function UseBar({ slug, title, description, code, dos, donts, inRegistry }: Readonly<UseBarProps>) {
  const { t } = useI18n();
  const llm = buildLlmMarkdown({ slug, title, description, code, dos, donts, inRegistry });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <CopyButton value={code} label={t("chrome.detail.copyCode", "코드 복사")} />
      {inRegistry ? (
        <CopyButton value={shadcnAddCommand(slug)} label={t("chrome.detail.copyInstall", "설치 커맨드 복사")} />
      ) : (
        <span className="rounded-md border border-dashed border-border px-2.5 py-1 text-xs text-muted-foreground">
          {t("chrome.detail.registryPending", "레지스트리 편입 예정")}
        </span>
      )}
      <CopyButton value={llm} label={t("chrome.detail.copyLlm", "LLM용 복사")} />
    </div>
  );
}
