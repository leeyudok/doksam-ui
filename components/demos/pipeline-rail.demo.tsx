import { PipelineRailDemo } from "./pipeline-rail.demo.client"

export const demo = <PipelineRailDemo />

export const code = `const stages: PipelineStage[] = [
  { key: "ba", label: "BA", sub: "요구사항", subTabs: [{ key: "elicitor", label: "요구사항 도출 챗" }] },
  { key: "design", label: "설계", sub: "아키텍처", subTabs: [{ key: "diagrams", label: "UML 시각화" }] },
  { key: "coder", label: "구현", sub: "개발", subTabs: [{ key: "code_gen", label: "소스코드 생성기" }] },
  { key: "qa", label: "QA", sub: "품질", excluded: true },
  { key: "sre", label: "운영", sub: "SRE", excluded: true },
]

const [activeStage, setActiveStage] = useState("ba")
const [activeTab, setActiveTab] = useState("elicitor")

<PipelineRail
  stages={stages}
  activeStage={activeStage}
  activeTab={activeTab}
  onStageChange={setActiveStage}
  onTabChange={setActiveTab}
/>`

export const dos = [
  "stages는 진행 순서 그대로 배열로 넘긴다 — 노드 번호는 배열 인덱스로 자동 매겨진다.",
  "activeStage/activeTab을 상위 state로 관리한다 — controlled 컴포넌트라 스텝·탭 전환은 콜백에서 처리해야 반영된다.",
  "이번 스코프에서 다루지 않는 스텝은 excluded로 표시한다 — 점선 노드+배지로 구분되고 클릭이 막힌다.",
]

export const donts = [
  "excluded 스텝에 subTabs를 채워 넣지 않는다 — 어차피 선택 불가라 2단 레일이 열리지 않는다.",
  "스텝 색을 하드코딩하지 않는다 — bg-primary/text-muted-foreground 등 시맨틱 토큰만 쓰므로 다크모드에 자동 대응한다.",
  "onTabChange 없이 subTabs만 넘기지 않는다 — 콜백이 없으면 서브탭 클릭이 아무 효과가 없다.",
]
