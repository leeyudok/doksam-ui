/**
 * Ontology Knowledge Console 데모 데이터 — 순수 데이터 모듈(컴포넌트 로직 없음).
 * 가상의 프로젝트 `.claude` 에이전트 인프라(루트 지침·규칙·메모리·에이전트·스킬·
 * 커맨드·이슈 허브)를 노드-엣지 온톨로지로 엮었다. 실제 연동 시 이 파일을 교체한다.
 */

/** 노드 타입 정의 — 라벨과 색 토큰 클래스(하드코딩 hex 금지, chart-1~5·primary만). */
export interface NodeType {
  id: string
  /** 범례 칩·배지에 노출할 한국어 라벨. */
  label: string
  /** SVG 노드 채움 클래스(fill-*). */
  fill: string
  /** 범례 점·배지 배경 클래스(bg-*). */
  dot: string
}

/** 지식 노드 — 문서/에이전트/이슈 등 온톨로지 개체. */
export interface OntologyNode {
  id: string
  /** 그래프 라벨·사전 표제로 쓰는 짧은 이름. */
  label: string
  /** 레포 상대 경로 또는 식별자(모노스페이스 표기). */
  path: string
  /** NODE_TYPES 의 id. */
  type: string
  /** 메모리 노드의 세부 종류 배지(레퍼런스/피드백/프로젝트). 없으면 빈 문자열. */
  kind: string
  /** 1~2문장 설명. */
  description: string
}

/** 엣지 — kind 에 따라 선 스타일이 달라진다(link=문서 참조, wiki=메모리 상호링크, issue=이슈 공유). */
export interface OntologyEdge {
  from: string
  to: string
  kind: "link" | "wiki" | "issue"
}

export const NODE_TYPES: NodeType[] = [
  { id: "root", label: "루트 지침", fill: "fill-primary", dot: "bg-primary" },
  { id: "rule", label: "규칙", fill: "fill-chart-1", dot: "bg-chart-1" },
  { id: "memory", label: "메모리", fill: "fill-chart-2", dot: "bg-chart-2" },
  { id: "agent", label: "에이전트", fill: "fill-chart-3", dot: "bg-chart-3" },
  { id: "skill", label: "스킬", fill: "fill-chart-4", dot: "bg-chart-4" },
  { id: "command", label: "커맨드", fill: "fill-chart-5", dot: "bg-chart-5" },
  { id: "issue", label: "이슈 허브", fill: "fill-muted-foreground", dot: "bg-muted-foreground" },
]

export const NODES: OntologyNode[] = [
  // ===== 루트 지침 =====
  {
    id: "agents-md",
    label: "AGENTS",
    path: "AGENTS.md",
    type: "root",
    kind: "",
    description:
      "레포 최상위 에이전트 지침. 규칙 인덱스와 보안 규칙을 참조하며 모든 세션이 가장 먼저 읽는 진입점이다.",
  },
  {
    id: "claude-md",
    label: "CLAUDE",
    path: "CLAUDE.md",
    type: "root",
    kind: "",
    description: "Claude Code 전용 루트 지침. AGENTS 지침을 포함 참조해 단일 진실원천을 유지한다.",
  },

  // ===== 규칙 =====
  {
    id: "rules-readme",
    label: "rules/README",
    path: ".claude/rules/README.md",
    type: "rule",
    kind: "",
    description: "규칙 문서 인덱스. 도메인별 규칙 파일로 향하는 허브로, 모든 규칙이 여기서 링크된다.",
  },
  {
    id: "rule-common",
    label: "common",
    path: ".claude/rules/common.md",
    type: "rule",
    kind: "",
    description: "공통 작업 규칙 — 브랜치 전략, 커밋 컨벤션, 이슈 우선 워크플로를 정의한다.",
  },
  {
    id: "rule-api",
    label: "api",
    path: ".claude/rules/api.md",
    type: "rule",
    kind: "",
    description: "API 계층 규칙 — 엔드포인트 네이밍, 에러 응답 포맷, 페이지네이션 컨벤션.",
  },
  {
    id: "rule-db",
    label: "db",
    path: ".claude/rules/db.md",
    type: "rule",
    kind: "",
    description: "DB 규칙 — 마이그레이션 절차, 인덱스 설계, 대용량 쿼리 주의사항을 담는다.",
  },
  {
    id: "rule-frontend",
    label: "frontend",
    path: ".claude/rules/frontend.md",
    type: "rule",
    kind: "",
    description: "프론트엔드 규칙 — 컴포넌트 구조, 상태 관리, 접근성 체크리스트.",
  },
  {
    id: "rule-security",
    label: "security",
    path: ".claude/rules/security.md",
    type: "rule",
    kind: "",
    description: "보안 규칙 — 시크릿 노출 금지 경로, 입력 검증, 의존성 감사 기준.",
  },
  {
    id: "rule-testing",
    label: "testing",
    path: ".claude/rules/testing.md",
    type: "rule",
    kind: "",
    description: "테스트 규칙 — 커버리지 기준, 픽스처 관리, 통합 테스트 게이트.",
  },

  // ===== 메모리 =====
  {
    id: "memory-index",
    label: "MEMORY",
    path: ".claude/memory/MEMORY.md",
    type: "memory",
    kind: "",
    description: "메모리 인덱스. 세션마다 로드되는 한 줄 포인터 목록으로, 모든 메모리 파일이 여기 등재된다.",
  },
  {
    id: "ref-deploy-pipeline",
    label: "ref: 배포 파이프라인",
    path: ".claude/memory/reference_deploy-pipeline.md",
    type: "memory",
    kind: "레퍼런스",
    description: "배포 파이프라인 단계·러너 태그·머지 게이트 설정을 정리한 레퍼런스 메모리.",
  },
  {
    id: "ref-search-pitfalls",
    label: "ref: 검색 함정",
    path: ".claude/memory/reference_search-pitfalls.md",
    type: "memory",
    kind: "레퍼런스",
    description: "한국어 형태소 분석기 토큰화·타임존 매핑 등 검색 구현에서 실측된 함정 모음.",
  },
  {
    id: "ref-api-quirks",
    label: "ref: 외부 API 특성",
    path: ".claude/memory/reference_external-api-quirks.md",
    type: "memory",
    kind: "레퍼런스",
    description: "외부 연계 API 의 호출 규약·장애 모드·재시도 정책을 기록한 레퍼런스.",
  },
  {
    id: "fb-worktree-isolation",
    label: "fb: 워크트리 격리",
    path: ".claude/memory/feedback_worktree-isolation.md",
    type: "memory",
    kind: "피드백",
    description: "병렬 세션이 같은 폴더를 공유하다 발생한 사고 이후, 세션마다 git worktree 격리를 강제한 피드백.",
  },
  {
    id: "fb-review-first",
    label: "fb: 리뷰 우선",
    path: ".claude/memory/feedback_review-before-merge.md",
    type: "memory",
    kind: "피드백",
    description: "머지 전 코드 리뷰 에이전트를 반드시 거치라는 운영 피드백. CRITICAL 발견 시 머지 차단.",
  },
  {
    id: "proj-security-audit",
    label: "proj: 보안 사전점검",
    path: ".claude/memory/project_security-audit.md",
    type: "memory",
    kind: "프로젝트",
    description: "외부 보안 검사 대비 자체 사전점검 진행 상황과 후속 조치 이력을 추적하는 프로젝트 메모리.",
  },
  {
    id: "proj-search-rebuild",
    label: "proj: 검색 개편",
    path: ".claude/memory/project_search-rebuild.md",
    type: "memory",
    kind: "프로젝트",
    description: "검색 엔진 교체 프로젝트의 범위·마일스톤·미해결 결정 사항을 담은 프로젝트 메모리.",
  },

  // ===== 에이전트 =====
  {
    id: "agent-code-reviewer",
    label: "code-reviewer",
    path: ".claude/agents/code-reviewer.md",
    type: "agent",
    kind: "",
    description: "머지 전 코드 변경을 버그·보안·품질 관점으로 리뷰하는 서브에이전트.",
  },
  {
    id: "agent-db-migration",
    label: "db-migration",
    path: ".claude/agents/db-migration.md",
    type: "agent",
    kind: "",
    description: "스키마 변경 위험도 평가·롤백 SQL 생성·FK 정합성 체크를 전담하는 서브에이전트.",
  },
  {
    id: "agent-security-audit",
    label: "security-audit",
    path: ".claude/agents/security-audit.md",
    type: "agent",
    kind: "",
    description: "하드코딩 시크릿·인증 누락 등 보안 규칙 위반을 grep 기반으로 스캔하는 서브에이전트.",
  },
  {
    id: "agent-release-notes",
    label: "release-notes",
    path: ".claude/agents/release-notes.md",
    type: "agent",
    kind: "",
    description: "머지된 MR 목록에서 릴리스 노트 초안을 생성하는 서브에이전트.",
  },

  // ===== 스킬 =====
  {
    id: "skill-status",
    label: "status",
    path: ".claude/skills/status/SKILL.md",
    type: "skill",
    kind: "",
    description: "Git 상태·빌드·테스트·최근 이슈를 한 번에 조회하는 프로젝트 상태 점검 스킬.",
  },
  {
    id: "skill-review",
    label: "review",
    path: ".claude/skills/review/SKILL.md",
    type: "skill",
    kind: "",
    description: "code-reviewer 와 security-audit 에이전트를 순차 실행하는 리뷰 래퍼 스킬.",
  },
  {
    id: "skill-search-first",
    label: "search-first",
    path: ".claude/skills/search-first/SKILL.md",
    type: "skill",
    kind: "",
    description: "새 코드를 짜기 전에 레포 내부→사내 미러→패키지 레지스트리 순으로 기존 솔루션을 먼저 찾는 스킬.",
  },
  {
    id: "skill-restart",
    label: "restart",
    path: ".claude/skills/restart/SKILL.md",
    type: "skill",
    kind: "",
    description: "로컬 프론트·백엔드 개발 서버를 포트 충돌 정리와 함께 재기동하는 스킬.",
  },

  // ===== 커맨드 =====
  {
    id: "cmd-fix-issue",
    label: "fix-issue",
    path: ".claude/commands/fix-issue.md",
    type: "command",
    kind: "",
    description: "이슈 번호를 받아 브랜치 생성→구현→검증→MR 까지 한 사이클을 실행하는 커맨드.",
  },
  {
    id: "cmd-deploy-check",
    label: "deploy-check",
    path: ".claude/commands/deploy-check.md",
    type: "command",
    kind: "",
    description: "main 대비 배포 커밋 격차·컨테이너 헬스·프로드 응답을 한 번에 확인하는 배포 점검 커맨드.",
  },
  {
    id: "cmd-sonar",
    label: "sonar",
    path: ".claude/commands/sonar.md",
    type: "command",
    kind: "",
    description: "정적분석을 실행하고 품질 게이트·보안 핫스팟 결과를 요약하는 커맨드.",
  },

  // ===== 이슈 허브 =====
  {
    id: "issue-12",
    label: "#12",
    path: "issues/12",
    type: "issue",
    kind: "",
    description: "보안 사전점검 결과를 추적하는 이슈. 보안 규칙·프로젝트 메모리가 함께 참조한다.",
  },
  {
    id: "issue-27",
    label: "#27",
    path: "issues/27",
    type: "issue",
    kind: "",
    description: "검색 엔진 교체 마일스톤 이슈. 검색 함정 레퍼런스와 개편 프로젝트 메모리가 공유한다.",
  },
  {
    id: "issue-34",
    label: "#34",
    path: "issues/34",
    type: "issue",
    kind: "",
    description: "배포 게이트 강화 이슈. 배포 레퍼런스와 배포 점검 커맨드가 함께 참조한다.",
  },
  {
    id: "issue-41",
    label: "#41",
    path: "issues/41",
    type: "issue",
    kind: "",
    description: "워크트리 격리 도입 이슈. 루트 지침과 격리 피드백 메모리가 공유한다.",
  },
  {
    id: "issue-58",
    label: "#58",
    path: "issues/58",
    type: "issue",
    kind: "",
    description: "외부 API 장애 대응 이슈. API 규칙과 외부 API 레퍼런스가 함께 참조한다.",
  },
  {
    id: "issue-63",
    label: "#63",
    path: "issues/63",
    type: "issue",
    kind: "",
    description: "테스트 커버리지 기준 상향 이슈. 테스트 규칙과 리뷰 스킬이 공유한다.",
  },
]

export const EDGES: OntologyEdge[] = [
  // 루트 → 규칙
  { from: "agents-md", to: "rules-readme", kind: "link" },
  { from: "agents-md", to: "rule-security", kind: "link" },
  { from: "claude-md", to: "agents-md", kind: "link" },
  // 규칙 인덱스 → 각 규칙
  { from: "rules-readme", to: "rule-common", kind: "link" },
  { from: "rules-readme", to: "rule-api", kind: "link" },
  { from: "rules-readme", to: "rule-db", kind: "link" },
  { from: "rules-readme", to: "rule-frontend", kind: "link" },
  { from: "rules-readme", to: "rule-security", kind: "link" },
  { from: "rules-readme", to: "rule-testing", kind: "link" },
  // 규칙 상호 참조
  { from: "rule-api", to: "rule-db", kind: "link" },
  { from: "rule-frontend", to: "rule-testing", kind: "link" },
  { from: "rule-db", to: "ref-search-pitfalls", kind: "link" },
  { from: "rule-api", to: "ref-api-quirks", kind: "link" },
  // 메모리 인덱스 → 각 메모리
  { from: "memory-index", to: "ref-deploy-pipeline", kind: "link" },
  { from: "memory-index", to: "ref-search-pitfalls", kind: "link" },
  { from: "memory-index", to: "ref-api-quirks", kind: "link" },
  { from: "memory-index", to: "fb-worktree-isolation", kind: "link" },
  { from: "memory-index", to: "fb-review-first", kind: "link" },
  { from: "memory-index", to: "proj-security-audit", kind: "link" },
  { from: "memory-index", to: "proj-search-rebuild", kind: "link" },
  // 메모리 상호 위키링크
  { from: "ref-deploy-pipeline", to: "fb-review-first", kind: "wiki" },
  { from: "proj-search-rebuild", to: "ref-search-pitfalls", kind: "wiki" },
  { from: "proj-security-audit", to: "fb-review-first", kind: "wiki" },
  { from: "fb-worktree-isolation", to: "ref-deploy-pipeline", kind: "wiki" },
  // 에이전트·스킬·커맨드 참조
  { from: "skill-review", to: "agent-code-reviewer", kind: "link" },
  { from: "skill-review", to: "agent-security-audit", kind: "link" },
  { from: "agent-security-audit", to: "rule-security", kind: "link" },
  { from: "agent-code-reviewer", to: "rule-testing", kind: "link" },
  { from: "agent-db-migration", to: "rule-db", kind: "link" },
  { from: "agent-release-notes", to: "rule-common", kind: "link" },
  { from: "cmd-fix-issue", to: "rule-common", kind: "link" },
  { from: "cmd-fix-issue", to: "skill-review", kind: "link" },
  { from: "cmd-deploy-check", to: "ref-deploy-pipeline", kind: "link" },
  { from: "cmd-sonar", to: "agent-security-audit", kind: "link" },
  { from: "skill-restart", to: "ref-api-quirks", kind: "link" },
  { from: "skill-search-first", to: "rule-common", kind: "link" },
  { from: "skill-status", to: "cmd-deploy-check", kind: "link" },
  // 이슈 공유
  { from: "rule-security", to: "issue-12", kind: "issue" },
  { from: "proj-security-audit", to: "issue-12", kind: "issue" },
  { from: "agent-security-audit", to: "issue-12", kind: "issue" },
  { from: "proj-search-rebuild", to: "issue-27", kind: "issue" },
  { from: "ref-search-pitfalls", to: "issue-27", kind: "issue" },
  { from: "rule-db", to: "issue-27", kind: "issue" },
  { from: "ref-deploy-pipeline", to: "issue-34", kind: "issue" },
  { from: "cmd-deploy-check", to: "issue-34", kind: "issue" },
  { from: "agents-md", to: "issue-41", kind: "issue" },
  { from: "fb-worktree-isolation", to: "issue-41", kind: "issue" },
  { from: "rule-api", to: "issue-58", kind: "issue" },
  { from: "ref-api-quirks", to: "issue-58", kind: "issue" },
  { from: "rule-testing", to: "issue-63", kind: "issue" },
  { from: "skill-review", to: "issue-63", kind: "issue" },
]

export const NODE_BY_ID: Record<string, OntologyNode> = Object.fromEntries(NODES.map((n) => [n.id, n]))

export const TYPE_BY_ID: Record<string, NodeType> = Object.fromEntries(NODE_TYPES.map((t) => [t.id, t]))

/** 노드별 연결 차수 — 그래프 노드 반지름 산정에 쓴다. */
export const DEGREE: Record<string, number> = (() => {
  const deg: Record<string, number> = {}
  for (const e of EDGES) {
    deg[e.from] = (deg[e.from] ?? 0) + 1
    deg[e.to] = (deg[e.to] ?? 0) + 1
  }
  return deg
})()

export interface NodePosition {
  x: number
  y: number
}

/**
 * 결정론적 force-directed 레이아웃 — 골든앵글 나선으로 초기 배치 후 반발력·스프링·
 * 중심 인력을 고정 횟수 반복한다. 난수·시간 의존이 없어 SSR/테스트에서 항상 같은
 * 좌표가 나온다. 결과는 VIEW_W×VIEW_H viewBox 안으로 정규화된다.
 */
export const VIEW_W = 800
export const VIEW_H = 560

export const POSITIONS: Record<string, NodePosition> = (() => {
  const pts = NODES.map((n, i) => ({
    id: n.id,
    x: Math.cos(i * 2.399963) * (60 + 14 * Math.sqrt(i)),
    y: Math.sin(i * 2.399963) * (60 + 14 * Math.sqrt(i)),
    vx: 0,
    vy: 0,
  }))
  const byId = Object.fromEntries(pts.map((p) => [p.id, p]))
  const springs = EDGES.map((e) => [byId[e.from], byId[e.to]] as const)

  for (let iter = 0; iter < 320; iter++) {
    // 반발력(모든 쌍)
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i]
        const b = pts[j]
        let dx = b.x - a.x
        let dy = b.y - a.y
        const d2 = dx * dx + dy * dy || 1
        if (d2 < 90000) {
          const f = 1600 / d2
          const d = Math.sqrt(d2)
          dx /= d
          dy /= d
          a.vx -= dx * f
          a.vy -= dy * f
          b.vx += dx * f
          b.vy += dy * f
        }
      }
    }
    // 스프링(엣지)
    for (const [a, b] of springs) {
      const dx = b.x - a.x
      const dy = b.y - a.y
      const d = Math.sqrt(dx * dx + dy * dy) || 1
      const f = (d - 80) * 0.005
      a.vx += (dx / d) * f
      a.vy += (dy / d) * f
      b.vx -= (dx / d) * f
      b.vy -= (dy / d) * f
    }
    // 중심 인력 + 감쇠 적분
    for (const p of pts) {
      p.vx -= p.x * 0.001
      p.vy -= p.y * 0.001
      p.vx *= 0.85
      p.vy *= 0.85
      p.x += p.vx
      p.y += p.vy
    }
  }

  // viewBox 정규화(패딩 40, 세로는 라벨 여유로 아래 24 추가)
  const xs = pts.map((p) => p.x)
  const ys = pts.map((p) => p.y)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  const pad = 40
  const sx = (VIEW_W - pad * 2) / (maxX - minX || 1)
  const sy = (VIEW_H - pad * 2 - 24) / (maxY - minY || 1)
  return Object.fromEntries(
    pts.map((p) => [p.id, { x: pad + (p.x - minX) * sx, y: pad + (p.y - minY) * sy }]),
  )
})()
