import { KeywordCloud, type KeywordCloudKeyword } from "@/components/keyword-cloud"

const keywords: KeywordCloudKeyword[] = [
  {
    label: "부도",
    count: 38,
    items: [
      { title: "대한산업, 어음 부도 처리", meta: "2026-07-10" },
      { title: "협력사 3곳 연쇄 부도 우려", meta: "2026-07-08" },
    ],
  },
  {
    label: "연체",
    count: 27,
    items: [
      { title: "동방건설 대출 이자 연체 발생", meta: "2026-07-09" },
      { title: "카드사 여신 연체율 상승 경보", meta: "2026-07-05" },
    ],
  },
  {
    label: "소송",
    count: 19,
    items: [{ title: "주주대표소송 제기", meta: "2026-07-11" }],
  },
  {
    label: "감사의견거절",
    count: 12,
    items: [{ title: "외부감사인, 계속기업 존속능력 의견거절", meta: "2026-07-03" }],
  },
  {
    label: "횡령",
    count: 9,
    items: [{ title: "전 대표이사 횡령 혐의로 고발", meta: "2026-06-30" }],
  },
  {
    label: "구조조정",
    count: 6,
    items: [{ title: "희망퇴직 접수, 인력 20% 감축", meta: "2026-06-27" }],
  },
  {
    label: "가압류",
    count: 4,
    items: [],
  },
]

export const demo = <KeywordCloud keywords={keywords} />

export const code = `import { KeywordCloud, type KeywordCloudKeyword } from "@/components/keyword-cloud"

const keywords: KeywordCloudKeyword[] = [
  {
    label: "부도",
    count: 38,
    items: [
      { title: "대한산업, 어음 부도 처리", meta: "2026-07-10" },
      { title: "협력사 3곳 연쇄 부도 우려", meta: "2026-07-08" },
    ],
  },
  {
    label: "연체",
    count: 27,
    items: [{ title: "동방건설 대출 이자 연체 발생", meta: "2026-07-09" }],
  },
  { label: "가압류", count: 4, items: [] },
]

<KeywordCloud keywords={keywords} onSelect={(k) => console.log(k?.label)} />`

export const dos = [
  "count만 넘기고 tier는 생략한다 — 분위수(상위 33%/66%)로 자동 3단계 강조가 계산된다.",
  "items를 비워두더라도 배열([])로는 넘긴다 — 클릭 시 안내 문구가 자동으로 뜬다.",
  "onSelect로 상위 상태(필터·URL 쿼리 등)와 선택을 동기화한다 — null이면 선택 해제다.",
]

export const donts = [
  "tier를 임의의 숫자로 강제하지 않는다 — 실제 분포와 다른 강조는 신뢰도를 떨어뜨린다.",
  "수십 개 키워드를 한 번에 욱여넣지 않는다 — 상위 항목만 추리고 나머지는 별도 목록으로 보완한다.",
  "pill 색을 직접 하드코딩하지 않는다 — bg-primary 계열 시맨틱 토큰이 테마·다크모드를 자동 처리한다.",
]
