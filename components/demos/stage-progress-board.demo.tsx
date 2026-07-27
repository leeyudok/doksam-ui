import { StageProgressBoard, type Stage } from "@/components/stage-progress-board"

const stages: Stage[] = [
  {
    key: "ba",
    label: "요구분석",
    status: "done",
    progress: 100,
    tasks: [
      { label: "요구사항 도출", done: true },
      { label: "유저 스토리", done: true },
      { label: "SRS 문서", done: true },
    ],
  },
  {
    key: "pm",
    label: "기획",
    status: "done",
    progress: 100,
    tasks: [
      { label: "릴리즈 플랜", done: true },
      { label: "심의 승인 (4인)", done: true },
    ],
  },
  {
    key: "coder",
    label: "개발",
    status: "active",
    progress: 60,
    tasks: [
      { label: "코드 생성", done: true },
      { label: "코드 리뷰", done: false },
    ],
  },
  {
    key: "qa",
    label: "품질보증",
    status: "active",
    progress: 33,
    tasks: [
      { label: "테스트 실행", done: true },
      { label: "전체 테스트 통과", done: false },
      { label: "자동화 스크립트", done: false },
    ],
  },
  {
    key: "sre",
    label: "운영",
    status: "pending",
    progress: 0,
    tasks: [
      { label: "런북 작성", done: false },
      { label: "인시던트 해소", done: false },
    ],
  },
]

export const demo = <StageProgressBoard stages={stages} />

export const code = `import { StageProgressBoard, type Stage } from "@/components/stage-progress-board"

const stages: Stage[] = [
  {
    key: "ba",
    label: "요구분석",
    status: "done",
    progress: 100,
    tasks: [
      { label: "요구사항 도출", done: true },
      { label: "SRS 문서", done: true },
    ],
  },
  {
    key: "coder",
    label: "개발",
    status: "active",
    progress: 60,
    tasks: [
      { label: "코드 생성", done: true },
      { label: "코드 리뷰", done: false },
    ],
  },
  {
    key: "sre",
    label: "운영",
    status: "pending",
    progress: 0,
    tasks: [{ label: "런북 작성", done: false }],
  },
]

<StageProgressBoard stages={stages} />`

export const dos = [
  "progress는 tasks 완료 비율 등 실제 데이터에서 계산해 넘긴다 — 표시값과 체크리스트가 어긋나지 않게 상위에서 일관되게 파생시킨다.",
  "status는 done/active/pending 3단계로만 단순화한다 — 배지 색과 우선순위가 한눈에 구분된다.",
  "tasks 라벨은 각 단계 산출물 이름과 동일하게 맞춘다 — 대시보드 다른 패널과 용어가 일치해 혼란이 없다.",
]

export const donts = [
  "단계 수를 과도하게 늘리지 않는다 — 그리드가 3열을 넘어가면 카드가 좁아져 체크리스트가 읽기 어려워진다.",
  "구조 색(배지·프로그레스바)을 하드코딩하지 않는다 — 시맨틱 토큰을 쓰므로 테마·다크모드에 자동 대응한다.",
  "완료 여부 없는 작업을 tasks에 섞지 않는다 — done이 없으면 진행률·체크 아이콘이 항상 미완료로 보인다.",
]
