"use client";

import { useI18n } from "@/components/i18n-provider";

/**
 * 서버 컴포넌트 안의 카피 한 조각을 번역 렌더하는 최소 클라이언트 래퍼.
 * scripts/i18n/extract.mjs 가 <TranslatedText k="..." ko="..." /> 리터럴도
 * 추출 대상으로 스캔한다.
 */
export function TranslatedText({
  k,
  ko,
  params,
}: Readonly<{ k: string; ko: string; params?: Record<string, string | number> }>) {
  const { t } = useI18n();
  return <>{t(k, ko, params)}</>;
}
