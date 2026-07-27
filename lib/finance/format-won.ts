/**
 * 원화 금액 억/조 축약 유틸 (news `web/components/FlowPanel.tsx` eok() 이식, #18).
 *
 * 입력 단위는 "원" — 억(1e8)/조(1e12) 단위로 축약해 표시하고, 1억 미만은 원 단위
 * 그대로(천단위 콤마) 보여준다.
 *
 * 조 전환은 "반올림 후 값" 기준으로 판단한다 — 9,999.6억처럼 반올림하면 10,000억이
 * 되는 경계값을 먼저 걸러내지 않으면 "10,000억"으로 새어 나간다(원본 #56 버그).
 * 정확히는: 억 단위 절대값을 반올림한 정수가 10,000 이상이면 조로 변환한다.
 */
export function formatWon(won: number): string {
  if (!Number.isFinite(won)) return "-";
  if (won === 0) return "0원";

  const abs = Math.abs(won);

  if (abs < EOK) {
    const rounded = Math.round(abs);
    // 반올림 후 절대값이 0이면(예: -0.4) 부호를 붙이지 않는다 — "-0원" 방지.
    const sign = won < 0 && rounded !== 0 ? "-" : "";
    return `${sign}${rounded.toLocaleString()}원`;
  }

  const sign = won < 0 ? "-" : "";
  const eok = abs / EOK;
  const roundedEok = Math.round(eok);
  if (roundedEok >= EOK_PER_JO) {
    // toFixed는 콤마를 넣지 않으므로 정수부/소수부를 분리해 정수부만 toLocaleString으로 콤마 처리한다.
    const jo = eok / EOK_PER_JO;
    const [intPart, decPart] = jo.toFixed(1).split(".");
    return `${sign}${Number(intPart).toLocaleString()}.${decPart}조`;
  }
  return `${sign}${roundedEok.toLocaleString()}억`;
}

const EOK = 1e8;
const EOK_PER_JO = 10000;
