import type { PatternSampleData } from "@/components/showcase/pattern-sample"
import { ListControlsDemo } from "@/components/patterns/list-controls/list-controls-demo"

const QUERY_EXAMPLES = [
  { state: "탭=전체, 검색=없음, 페이지=1", query: "/" },
  { state: "탭=가이드, 검색=없음, 페이지=1", query: "/?type=guide" },
  { state: "탭=가이드, 검색=\"설정\", 페이지=1", query: "/?type=guide&q=%EC%84%A4%EC%A0%95" },
  { state: "탭=가이드, 검색=\"설정\", 페이지=2", query: "/?type=guide&q=%EC%84%A4%EC%A0%95&page=1" },
]

export const LIST_CONTROLS_SAMPLES: PatternSampleData[] = [
  {
    num: 1,
    title: "URL 탭 + 검색 필터 + 페이지네이션",
    description: "탭·검색·페이지 상태를 모두 URLSearchParams 하나로 관리해, 새로고침·공유·뒤로가기에서도 같은 결과를 SSR로 재현할 수 있는 목록 컨트롤입니다.",
    demo: <ListControlsDemo />,
    code: `function buildQuery(params: { type: string; q: string; page: number }) {
  const sp = new URLSearchParams()
  if (params.type) sp.set("type", params.type)
  if (params.q) sp.set("q", params.q)
  if (params.page > 0) sp.set("page", String(params.page))
  const qs = sp.toString()
  return qs ? \`?\${qs}\` : ""
}

// 서버 컴포넌트: searchParams prop이 URL과 항상 동기화된 단일 진실원천이다.
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const sp = await searchParams
  const items = await fetchItems({ type: sp.type, q: sp.q, page: Number(sp.page ?? 0) })
  return <List items={items} params={sp} />
}`,
    notes: [
      "탭(필터 축)이 바뀌면 이전 페이지 번호가 더 이상 유효하지 않을 수 있으므로 page 파라미터를 항상 0(1페이지)으로 되돌린다.",
      "값이 기본값(전체 탭·빈 검색어·1페이지)이면 해당 파라미터 자체를 URL에서 제거해 쿼리스트링을 짧게 유지한다.",
      "실서비스에서는 버튼 onClick 대신 <Link href={buildQuery(...)}>로 렌더해 실제 페이지 이동 + 서버 컴포넌트 재조회가 일어나게 한다.",
    ],
  },
  {
    num: 2,
    title: "상태 → 쿼리스트링 매핑",
    description: "탭·검색어·페이지 조합이 실제로 어떤 URL로 직렬화되는지 보여주는 예시입니다. 같은 buildQuery 함수 하나로 세 컨트롤의 href를 모두 만든다.",
    demo: (
      <ul className="flex w-full flex-col gap-1.5">
        {QUERY_EXAMPLES.map((ex) => (
          <li
            key={ex.query}
            className="flex flex-col gap-0.5 rounded-md border border-border bg-card px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-xs text-muted-foreground">{ex.state}</span>
            <code className="font-mono text-xs text-foreground">{ex.query}</code>
          </li>
        ))}
      </ul>
    ),
    code: `buildQuery({ type: "", q: "", page: 0 })                 // "" (기본값 → 루트 경로)
buildQuery({ type: "guide", q: "", page: 0 })             // "?type=guide"
buildQuery({ type: "guide", q: "설정", page: 0 })          // "?type=guide&q=설정"
buildQuery({ type: "guide", q: "설정", page: 1 })          // "?type=guide&q=설정&page=1"`,
    notes: [
      "탭·필터·페이지네이션 3개 컨트롤이 각자 URL을 조립하지 않고, 하나의 buildQuery 함수를 공유해 직렬화 규칙을 한 곳에 둔다.",
      "빈 값/기본값은 파라미터를 생략하므로, 같은 목록이라도 조건이 적을수록 짧고 읽기 쉬운 URL이 된다.",
    ],
  },
]
