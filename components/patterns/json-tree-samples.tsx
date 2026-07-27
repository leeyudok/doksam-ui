import type { PatternSampleData } from "@/components/showcase/pattern-sample"
import { JsonTreeDemo } from "@/components/patterns/json-tree/json-tree-demo"

export const JSON_TREE_SAMPLES: PatternSampleData[] = [
  {
    num: 1,
    title: "재귀 JSON 트리 뷰어",
    description:
      "객체/배열을 재귀적으로 펼쳐 보여주는 트리입니다. 각 노드는 접기/펼치기가 가능하고, 문자열·숫자·불리언·null은 타입별 색으로 구분하며, 항목이 많은 배열은 20개씩 끊어 \"더 보기\"로 확장합니다.",
    demo: <JsonTreeDemo />,
    code: `function JsonNode({ label, value, depth, defaultExpanded }: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  if (!isObjectOrArray(value)) {
    return <PrimitiveRow label={label} value={value} />
  }

  const entries = toEntries(value)
  const visible = entries.slice(0, visibleCount)
  const remaining = entries.length - visible.length

  return (
    <>
      <button aria-expanded={expanded} onClick={() => setExpanded((p) => !p)}>
        {expanded ? <CaretDownIcon /> : <CaretRightIcon />} {label}
      </button>
      {expanded && (
        <div className="ml-1 border-l border-border">
          {visible.map(([k, v]) => (
            <JsonNode key={k} label={k} value={v} depth={depth + 1} defaultExpanded={depth < 1} />
          ))}
          {remaining > 0 && (
            <button onClick={() => setVisibleCount((p) => p + PAGE_SIZE)}>더 보기 (+{remaining})</button>
          )}
        </div>
      )}
    </>
  )
}`,
    notes: [
      "타입별 색은 chart-1~5 시맨틱 토큰(카테고리 색상 팔레트)만 사용한다 — 문자열·숫자·불리언에 하드코딩 hex를 쓰지 않는다.",
      "배열/객체는 항목 수를 배지처럼 옆에 표기해, 펼치지 않고도 크기를 가늠할 수 있게 한다.",
      "대용량 배열(수백~수천 항목)을 한 번에 렌더링하면 느려지므로 PAGE_SIZE(20개) 단위로 끊어 \"더 보기\" 클릭 시에만 이어서 렌더링한다.",
      "루트와 1-depth 자식은 기본 펼침, 그 아래는 기본 접힘으로 시작해 첫 화면이 너무 빽빽해지지 않게 한다.",
      "toggle 버튼에 aria-expanded를 달아 접기/펼치기 상태를 스크린리더에도 전달한다.",
    ],
  },
]
