/**
 * 사업자등록번호를 000-00-00000 형태로 포맷한다(bizinfo `lib/utils.ts` 이식, #8).
 * 숫자 10자리가 아니면(짧거나 이미 하이픈 등이 섞인 이상 입력) 원본을 그대로 반환한다 —
 * 화면 표시 전용 함수이며, 저장·전송용 원본 값은 이 함수를 거치지 않고 그대로 유지한다.
 */
export function formatBizNo(bizNo: string | null | undefined): string {
  if (!bizNo) return "";
  const clean = bizNo.replace(/\D/g, "");
  if (clean.length === 10) {
    return clean.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3");
  }
  return bizNo;
}
