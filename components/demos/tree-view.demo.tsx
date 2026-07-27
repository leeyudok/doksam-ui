import { TreeViewDemo } from "./tree-view.demo.client"

export const demo = <TreeViewDemo />

export const code = `const NODES: TreeNode[] = [
  {
    id: "src",
    label: "src",
    children: [
      { id: "components", label: "components", children: [
        { id: "button-tsx", label: "button.tsx" },
      ] },
      { id: "index-ts", label: "index.ts" },
    ],
  },
  { id: "package-json", label: "package.json" },
]

<TreeView
  nodes={NODES}
  selectedId={selectedId}
  onSelectedIdChange={setSelectedId}
  defaultExpandedIds={["src", "components"]}
/>`

export const dos = [
  "폴더/파일 여부는 children 존재로만 판단한다 — 별도 type 필드를 추가로 만들지 않는다.",
  "노드마다 고유한 id를 준다 — 선택 상태와 펼침 상태 모두 id 기준으로 관리된다.",
  "키보드로도 전체 트리를 조작할 수 있다 — ↑↓←→/Home/End/Enter/Space를 지원한다.",
]

export const donts = [
  "children를 빈 배열이 아닌 undefined로 둬야 할 리프 노드에 빈 배열([])을 넣어 캐럿 아이콘이 잘못 붙지 않게 한다.",
  "노드 라벨·아이콘 등 시각 요소에 하드코딩된 색을 넣지 않는다 — 시맨틱 토큰만 사용한다.",
]
