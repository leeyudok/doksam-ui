import { useEffect, useState } from "react";

const DEFAULT_DELAY_MS = 4000;

/**
 * `active`가 true가 될 때마다(또는 `key`가 바뀔 때) `delayMs` 후
 * 자동으로 `false`를 반환하도록 되돌리는 훅.
 *
 * 성공/실패 토스트 메시지처럼 사용자 액션 직후 잠깐 표시했다가
 * 일정 시간 후 자동으로 사라져야 하는 UI 상태에 사용한다.
 * `key`에는 보통 요청 시각(Date.now())처럼 액션마다 달라지는 값을 넣어,
 * 같은 액션을 반복해도 타이머가 정확히 재시작되게 한다.
 */
export function useAutoDismiss(
  active: boolean,
  key: unknown,
  delayMs: number = DEFAULT_DELAY_MS,
): boolean {
  // key(예: 요청 시각)가 마지막으로 자동 해제 처리된 값과 같으면 숨긴다.
  const [dismissedKey, setDismissedKey] = useState<unknown>(null);

  useEffect(() => {
    if (!active) return;

    const timer = setTimeout(() => setDismissedKey(key), delayMs);
    return () => clearTimeout(timer);
  }, [active, key, delayMs]);

  return active && dismissedKey !== key;
}
