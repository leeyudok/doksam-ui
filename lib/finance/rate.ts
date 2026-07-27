/**
 * 등락률/등락액 표시 유틸 (tossinvest `frontend/lib/utils.ts` 이식, #18).
 * 한국식 시세 관례 — 이익/상승은 빨강(gain), 손실/하락은 파랑(loss).
 * 색은 항상 시맨틱 토큰(--gain/--loss, themes/*.ts)에서 해소한다 — 하드코딩 색 금지.
 */

/** 부호에 따라 gain/loss 시맨틱 색 텍스트 클래스를 반환한다. 0은 중립(muted-foreground). */
export function rateColor(n: number): string {
  if (n > 0) return "text-gain";
  if (n < 0) return "text-loss";
  return "text-muted-foreground";
}

/**
 * 부호를 붙인 등락률/등락액 텍스트를 만든다.
 * 양수는 "+" 접두를 붙이고, 음수는 toFixed 가 만드는 "-"를 그대로 쓰고, 0은 부호 없이 표기한다.
 */
export function rateText(n: number, digits = 2): string {
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(digits)}`;
}

/** 양수에만 "+" 접두를 반환한다 — 이미 포맷된 숫자 문자열 앞에 붙이는 용도. */
export function rateSign(n: number): string {
  return n > 0 ? "+" : "";
}
