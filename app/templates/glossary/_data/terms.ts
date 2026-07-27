/**
 * Term Network Explorer 데모 데이터 — 순수 데이터 모듈(컴포넌트 로직 없음).
 * SDLC/AI 개발 도메인의 일반 용어 50개를 카테고리·관계로 엮은 지식 그래프다.
 * 특정 기업·제품명은 배제한 일반화 용어이며, 실제 연동 시 이 파일을 교체한다.
 */

/** 카테고리 정의 — 라벨과 색 토큰 클래스(하드코딩 hex 금지, chart-1~5·primary만). */
export interface TermCategory {
  id: string
  /** 범례·배지에 노출할 한국어 라벨. */
  label: string
  /** SVG 노드 채움 클래스(fill-*). */
  fill: string
  /** SVG 엣지·강조 스트로크 클래스(stroke-*). */
  stroke: string
  /** 텍스트/글로우(currentColor) 클래스(text-*). */
  text: string
  /** 범례 점·배지 배경 클래스(bg-*). */
  dot: string
}

/** 용어 노드 — 약어·풀네임·카테고리·정의·관련 용어 id. */
export interface Term {
  id: string
  /** 노드 라벨로 쓰는 약어/짧은 이름. */
  abbr: string
  /** 풀네임(영문/한글 확장). 없으면 빈 문자열. */
  full: string
  /** CATEGORIES 의 id. */
  category: string
  /** 1~2문장 정의. */
  description: string
  /** 관련 용어 id 목록(양방향 엣지로 그려진다). */
  related: string[]
}

export const CATEGORIES: TermCategory[] = [
  { id: "process", label: "SDLC·전략", fill: "fill-primary", stroke: "stroke-primary", text: "text-primary", dot: "bg-primary" },
  { id: "agents", label: "AI 개발 에이전트", fill: "fill-chart-1", stroke: "stroke-chart-1", text: "text-chart-1", dot: "bg-chart-1" },
  { id: "delivery", label: "요구·코드·형상", fill: "fill-chart-2", stroke: "stroke-chart-2", text: "text-chart-2", dot: "bg-chart-2" },
  { id: "quality", label: "품질·테스트·보안", fill: "fill-chart-3", stroke: "stroke-chart-3", text: "text-chart-3", dot: "bg-chart-3" },
  { id: "rag", label: "RAG·데이터 파이프라인", fill: "fill-chart-4", stroke: "stroke-chart-4", text: "text-chart-4", dot: "bg-chart-4" },
  { id: "model", label: "LLM·모델·인프라", fill: "fill-chart-5", stroke: "stroke-chart-5", text: "text-chart-5", dot: "bg-chart-5" },
]

export const TERMS: Term[] = [
  // ===== SDLC·전략 =====
  {
    id: "sdlc",
    abbr: "SDLC",
    full: "Software Development Life Cycle",
    category: "process",
    description:
      "소프트웨어 개발 생명주기. 요구 정의 → 개발 → 테스트 → 운영에 이르는 전 과정을 뜻한다. AI 에이전트가 이 전 단계를 자동화·고도화해 리드타임을 단축하고 품질을 높이는 것을 목표로 한다.",
    related: ["ax", "aiba", "aicoder", "aiqa", "aipm", "aisre", "leadtime"],
  },
  {
    id: "ax",
    abbr: "AX",
    full: "AI Transformation",
    category: "process",
    description: "AI 전환. 업무·시스템 전반에 AI를 도입해 일하는 방식 자체를 혁신하는 것. SDLC 자동화를 출발점으로 조직 전반의 AI 확산을 지향한다.",
    related: ["sdlc", "mvp", "tobe"],
  },
  {
    id: "leadtime",
    abbr: "리드타임",
    full: "Lead Time",
    category: "process",
    description: "작업 요청부터 완료까지 걸리는 소요 시간. AI BA의 요구 명세 자동화와 AI PM의 문서 자동화로 기획·협의 단계 리드타임을 단축하는 것이 핵심 기대효과다.",
    related: ["sdlc", "aiba", "aipm", "painpoint"],
  },
  {
    id: "mvp",
    abbr: "MVP",
    full: "Minimum Viable Product",
    category: "process",
    description: "최소 기능 제품. 핵심 기능만 우선 구현해 실제 효과를 검증하는 최소 단위 산출물이다. MVP로 Baseline을 확보하고 KPI를 측정해 확산의 근거로 삼는다.",
    related: ["kpi", "baseline", "ax"],
  },
  {
    id: "kpi",
    abbr: "KPI",
    full: "Key Performance Indicator",
    category: "process",
    description: "핵심성과지표. 리드타임 단축·생산성·품질 등 AI 도입 효과를 사실 기반으로 측정하는 정량 지표로, 의사결정 근거를 만든다.",
    related: ["mvp", "baseline", "tobe"],
  },
  {
    id: "baseline",
    abbr: "Baseline",
    full: "기준선",
    category: "process",
    description: "개선 효과를 비교 측정하기 위한 초기 성능·수치 기준이다. MVP로 Baseline을 확보한 뒤 KPI 변화를 추적한다.",
    related: ["mvp", "kpi"],
  },
  {
    id: "poc",
    abbr: "PoC",
    full: "Proof of Concept",
    category: "process",
    description: "개념 검증. 본격 적용 전 기술의 실현 가능성을 시범 검증하는 단계다. 낮은 리스크 영역에서 먼저 효과를 확인한 뒤 핵심 시스템으로 확대한다.",
    related: ["aicoder", "mvp"],
  },
  {
    id: "painpoint",
    abbr: "Pain Point",
    full: "현행 문제점",
    category: "process",
    description: "현행(As-Is) 프로세스가 가진 문제점이다. 요구 정의의 반복 재작업, 수작업 코드·테스트, 문서 작성 부담 등이 대표적이며 AI 도입이 극복하려는 대상이다.",
    related: ["sdlc", "leadtime", "tobe"],
  },
  {
    id: "tobe",
    abbr: "To-Be",
    full: "개선 목표 상태",
    category: "process",
    description: "개선 후 도달하려는 목표 상태다. As-Is의 Pain Point를 측정해 To-Be와 비교함으로써 효과를 정량화한다.",
    related: ["ax", "kpi", "painpoint"],
  },

  // ===== AI 개발 에이전트 =====
  {
    id: "aiba",
    abbr: "AI BA",
    full: "AI Business Analyst",
    category: "agents",
    description:
      "요구사항 명세 자동 생성 에이전트. 자연어 요건을 파싱·유형화하고 유사 SR 검색·요약, 6하원칙 Gap 검출과 대화형 인터뷰를 거쳐 표준 SR 요건 명세를 자동 작성한다. E2E 파이프라인의 시작점이다.",
    related: ["sdlc", "sr", "gap6", "draft", "aicoder", "leadtime", "srms"],
  },
  {
    id: "aicoder",
    abbr: "AI Coder",
    full: "AI Code Generator",
    category: "agents",
    description:
      "코드 자동 생성·리뷰 에이전트. 확정된 SR과 영향 코드베이스를 입력받아 영향도를 분석하고, 프레임워크·도메인 로직을 참조한 코드를 생성·수정하며, 컨벤션·버그·중복을 자동 점검한다.",
    related: ["sdlc", "aiba", "aiqa", "ide", "refactor", "convention", "scm", "poc"],
  },
  {
    id: "aiqa",
    abbr: "AI QA",
    full: "AI Quality Assurance",
    category: "agents",
    description: "테스트 케이스·데이터 생성 에이전트. 요구 기반 TC 자동 생성·추천, 합성 데이터 생성(PII 비식별·마스킹)을 거쳐 테스트를 자동 실행·증적화하고 커버리지를 관리한다.",
    related: ["sdlc", "aicoder", "tc", "uat", "synthdata", "pii", "coverage"],
  },
  {
    id: "aipm",
    abbr: "AI PM",
    full: "AI Project Manager",
    category: "agents",
    description: "사업 추진 문서 자동 작성 에이전트. 협의 자료·심의·품의 문서와 중간 보고자료를 표준 양식과 RAG 기반으로 자동 생성하고 WBS 진척·리스크를 시각화한다.",
    related: ["sdlc", "leadtime", "e2e", "orchestrator"],
  },
  {
    id: "aisre",
    abbr: "AI SRE",
    full: "AI Site Reliability Eng.",
    category: "agents",
    description: "로그 기반 이상 탐지·원인 분석과 초동 대응 자동화 에이전트다. 모니터링 공수를 효율화하고 장애 영향을 줄이는 것을 목표로 한다.",
    related: ["sdlc", "k8s", "guardrail"],
  },
  {
    id: "agent",
    abbr: "Agent",
    full: "AI 에이전트",
    category: "agents",
    description: "특정 과제(BA/Coder/QA/PM)를 자율 수행하는 AI 구성 단위다. On-Prem AI Agent 플랫폼 위에서 구현되며, MLE가 개발과 프롬프트 최적화를 담당한다.",
    related: ["orchestrator", "aiba", "aicoder", "aiqa", "mle", "mcp"],
  },
  {
    id: "orchestrator",
    abbr: "Orchestrator",
    full: "Multi-Agent Orchestrator",
    category: "agents",
    description: "여러 에이전트(BA–Coder–QA) 간 워크플로우를 조율·통제하는 오케스트레이션 계층이다. MCP·워크플로우 엔진 기반으로 에이전트 간 흐름과 데이터 파이프라인을 조율한다.",
    related: ["agent", "e2e", "mcp", "aipm"],
  },
  {
    id: "e2e",
    abbr: "E2E Workflow",
    full: "End-to-End",
    category: "agents",
    description: "AI BA → Coder → QA로 끊김 없이 이어지는 전 과정 통합 개발 파이프라인이다. 과제 간 통합 툴체인과 시스템 연계가 이를 뒷받침한다.",
    related: ["aiba", "aicoder", "aiqa", "orchestrator"],
  },
  {
    id: "mle",
    abbr: "MLE",
    full: "Machine Learning Engineer",
    category: "agents",
    description: "머신러닝 엔지니어. 에이전트 개발, 질의·검색/답변 생성, 프롬프트 최적화를 담당하며 코드 특화 RAG 구성도 맡는다.",
    related: ["agent", "prompt", "llm"],
  },

  // ===== 요구·코드·형상 =====
  {
    id: "sr",
    abbr: "SR",
    full: "Service Request",
    category: "delivery",
    description: "개발요청. 신규·변경 개발 건을 등록·관리하는 단위다. BA가 만든 SR 요건이 Coder 코드의 입력이 된다.",
    related: ["aiba", "srms", "scm"],
  },
  {
    id: "srms",
    abbr: "SRMS",
    full: "SR Management System",
    category: "delivery",
    description: "SR(개발요청) 관리 시스템. SR 본문과 첨부를 RAG 지식베이스로 제공·동기화하는 핵심 연계 시스템이다.",
    related: ["sr", "aiba", "rag"],
  },
  {
    id: "gap6",
    abbr: "Gap 검출",
    full: "6하원칙 Gap Detection",
    category: "delivery",
    description: "요건 명세가 육하원칙(누가·언제·어디서·무엇을·어떻게·왜) 관점에서 빠진 부분을 자동 검출하고, 명확화 질문을 생성해 대화형 인터뷰로 보완한다.",
    related: ["aiba", "draft"],
  },
  {
    id: "draft",
    abbr: "요건 Draft",
    full: "요건 정의서 초안",
    category: "delivery",
    description: "요건 정의서의 자동 생성 초안이다. 챗 흐름에 따라 Draft가 반복 갱신되며 표준 명세서 구조로 자동 구조화된다.",
    related: ["aiba", "gap6"],
  },
  {
    id: "ide",
    abbr: "IDE",
    full: "Integrated Dev. Environment",
    category: "delivery",
    description: "통합 개발 환경. 코드 작성·편집·디버깅을 지원하는 개발 도구로, AI Coder는 IDE 인라인 자동완성으로 코드를 실시간 제안한다.",
    related: ["aicoder", "refactor"],
  },
  {
    id: "refactor",
    abbr: "리팩토링",
    full: "Refactoring",
    category: "delivery",
    description: "기능은 그대로 두면서 코드의 구조·가독성·품질을 개선하는 작업이다. AI Coder의 코드 생성과 함께 검증 대상으로 다뤄진다.",
    related: ["aicoder", "ide", "convention"],
  },
  {
    id: "convention",
    abbr: "코딩 컨벤션",
    full: "Coding Convention",
    category: "delivery",
    description: "조직이 정한 코드 작성 규칙·스타일이다. AI Coder는 컨벤션 위반과 버그·중복·미사용 코드를 자동 점검해 품질을 사전에 걸러낸다.",
    related: ["aicoder", "refactor", "scm"],
  },
  {
    id: "scm",
    abbr: "형상관리",
    full: "Configuration Mgmt.",
    category: "delivery",
    description: "소스코드의 버전·변경 이력을 관리하는 체계(SVN·Git 등)다. 코드·전문 정의를 RAG로 제공하는 연계 시스템이기도 하다.",
    related: ["aicoder", "sr", "rag", "convention"],
  },

  // ===== 품질·테스트·보안 =====
  {
    id: "tc",
    abbr: "TC",
    full: "Test Case",
    category: "quality",
    description: "테스트 케이스. 정상·예외·경계값 등 조건별 검증 시나리오다. 요구 기반 자동 생성, 유사 이력 추천, 리스크 기반 우선순위와 커버리지 관리까지 이뤄진다.",
    related: ["aiqa", "uat", "synthdata", "coverage"],
  },
  {
    id: "uat",
    abbr: "UAT",
    full: "User Acceptance Test",
    category: "quality",
    description: "사용자 인수 테스트. 실제 현업 사용자가 요건 충족 여부를 검증한다. AI QA는 현업 친화적 UAT 시나리오를 자동 생성해 요건 명세와 연계한다.",
    related: ["tc", "aiqa"],
  },
  {
    id: "synthdata",
    abbr: "합성 데이터",
    full: "Synthetic Data",
    category: "quality",
    description: "실제 데이터를 대체하려고 조건 기반으로 생성한 가상 테스트 데이터다. 경계·이상값을 포함하고 다양한 도메인 케이스를 자동 합성한다.",
    related: ["aiqa", "tc", "deident"],
  },
  {
    id: "pii",
    abbr: "PII",
    full: "Personally Identifiable Info.",
    category: "quality",
    description: "개인식별정보. 테스트 데이터 생성 시 PII를 탐지·마스킹하고, LLM Gateway에서도 필터링해 외부 노출을 통제한다.",
    related: ["aiqa", "deident", "masking", "llmgw"],
  },
  {
    id: "deident",
    abbr: "비식별화",
    full: "De-identification",
    category: "quality",
    description: "개인정보를 식별할 수 없도록 가공·변환하는 처리다. 운영 데이터를 테스트에 활용하기 위한 필수 조치로, 암호화 변환과 만료 갱신이 함께 관리된다.",
    related: ["pii", "masking", "synthdata"],
  },
  {
    id: "masking",
    abbr: "마스킹",
    full: "Masking",
    category: "quality",
    description: "민감정보의 일부 또는 전체를 가리거나 대체값으로 치환하는 비식별화 기법이다. PII 탐지 후 마스킹을 적용해 비식별 품질을 확보한다.",
    related: ["pii", "deident"],
  },
  {
    id: "guardrail",
    abbr: "가드레일",
    full: "Guardrail",
    category: "quality",
    description: "AI의 부적절·위험한 출력을 차단하고 정책을 지키게 하는 안전 통제 장치다. 각 과제 개발 시 보안과 함께 구현된다.",
    related: ["aisre", "llmgw", "agent"],
  },
  {
    id: "coverage",
    abbr: "커버리지",
    full: "Test Coverage",
    category: "quality",
    description: "테스트가 코드·시나리오를 얼마나 다뤘는지를 나타내는 척도다. 탐색적 시나리오로 미커버 경로를 자동 식별·제안해 커버리지를 넓힌다.",
    related: ["tc", "aiqa"],
  },

  // ===== RAG·데이터 파이프라인 =====
  {
    id: "rag",
    abbr: "RAG",
    full: "Retrieval-Augmented Generation",
    category: "rag",
    description: "검색 증강 생성. 외부 지식(SR·형상·문서·DB)을 검색해 LLM 답변의 근거로 제공하는 기법이다. 수집 데이터가 정제·Chunking·Embedding을 거쳐 벡터 DB에 적재되어 활용된다.",
    related: ["srms", "scm", "embedding", "chunking", "vectordb", "reranker", "collectionhub"],
  },
  {
    id: "embedding",
    abbr: "Embedding",
    full: "임베딩",
    category: "rag",
    description: "텍스트를 의미를 담은 벡터로 변환하는 처리다. 벡터 DB 유사도 검색의 기반이 되며, 내부망 임베딩 모델이 이 역할을 수행한다.",
    related: ["rag", "chunking", "vectordb", "bgem3"],
  },
  {
    id: "chunking",
    abbr: "Chunking",
    full: "청킹",
    category: "rag",
    description: "문서를 검색·처리에 적합한 작은 단위로 분할하는 처리다. 수집 데이터를 정제-Parsing-Chunking-Embedding 순으로 처리한 뒤 벡터 DB에 적재한다.",
    related: ["embedding", "rag", "collectionhub"],
  },
  {
    id: "vectordb",
    abbr: "Vector DB",
    full: "벡터 데이터베이스",
    category: "rag",
    description: "임베딩된 벡터를 저장하고 유사도로 검색하는 데이터베이스다. 검색 서버가 벡터 DB를 탐색해 LLM 답변 생성의 근거를 제공한다.",
    related: ["embedding", "rag"],
  },
  {
    id: "reranker",
    abbr: "Reranker",
    full: "리랭커",
    category: "rag",
    description: "검색된 후보 결과의 순위를 재정렬해 정확도를 높이는 모델이다. RAG 검색 후보의 순위를 정교화한다.",
    related: ["rag", "bgem3"],
  },
  {
    id: "mcp",
    abbr: "MCP",
    full: "Model Context Protocol",
    category: "rag",
    description: "AI 에이전트가 외부 도구·시스템과 표준 방식으로 연동하도록 하는 프로토콜이다. 에이전트 간 워크플로우와 데이터 파이프라인 오케스트레이션의 기반이 된다.",
    related: ["orchestrator", "agent", "airflow"],
  },
  {
    id: "airflow",
    abbr: "Workflow Engine",
    full: "데이터 워크플로우 엔진",
    category: "rag",
    description: "데이터 파이프라인·워크플로우를 스케줄링·오케스트레이션하는 도구다. 수집 허브 → RAG 데이터 파이프라인과 에이전트 간 흐름을 조율한다.",
    related: ["mcp", "collectionhub", "rag"],
  },
  {
    id: "collectionhub",
    abbr: "수집 허브",
    full: "Collection Hub",
    category: "rag",
    description: "연계 시스템 데이터를 AI 서비스로 전달하기 위한 수집·전처리 계층이다. 복호화·위변조 검증·API·배치 등으로 구성되며 데이터를 정제해 파이프라인에 공급한다.",
    related: ["rag", "airflow", "chunking"],
  },

  // ===== LLM·모델·인프라 =====
  {
    id: "llm",
    abbr: "LLM",
    full: "Large Language Model",
    category: "model",
    description: "대규모 언어 모델. 자연어 이해·생성을 수행하는 AI 모델이다. 요청은 LLM Gateway를 거쳐 내부 sLLM 또는 외부 LLM으로 라우팅된다.",
    related: ["sllm", "llmgw", "ossllm", "mle", "prompt"],
  },
  {
    id: "sllm",
    abbr: "sLLM",
    full: "small LLM",
    category: "model",
    description: "소규모(경량) 언어 모델. 내부망에서 운영되는 OSS LLM으로, 민감정보를 내부에서 처리할 수 있다는 이점이 있다. 임베딩·리랭커 모델도 함께 운영된다.",
    related: ["llm", "llmgw", "ossllm", "bgem3"],
  },
  {
    id: "llmgw",
    abbr: "LLM Gateway",
    full: "LLM 게이트웨이",
    category: "model",
    description: "모든 LLM 호출의 단일 관문. PII·민감정보 필터와 보안을 적용한 뒤 요청을 내부 또는 외부 모델로 라우팅하는 통제 지점이다.",
    related: ["llm", "sllm", "pii", "guardrail", "vpc"],
  },
  {
    id: "ossllm",
    abbr: "OSS LLM",
    full: "Open Source LLM",
    category: "model",
    description: "오픈소스 대규모 언어 모델이다. 내부망에서 운영되는 sLLM들을 가리키며, 외부 상용 모델 대비 민감정보를 내부에서 처리할 수 있다.",
    related: ["sllm", "llm"],
  },
  {
    id: "bgem3",
    abbr: "임베딩 모델",
    full: "Embedding / Reranker Model",
    category: "model",
    description: "다국어 임베딩·리랭킹 모델이다. 내부망에서 텍스트를 벡터로 변환하고 검색 후보를 재정렬해 RAG 검색을 뒷받침한다.",
    related: ["embedding", "reranker", "sllm"],
  },
  {
    id: "prompt",
    abbr: "프롬프트 엔지니어링",
    full: "Prompt Engineering",
    category: "model",
    description: "LLM이 원하는 결과를 내도록 지시문(프롬프트)을 설계·최적화하는 작업이다. MLE가 에이전트 개발과 함께 수행한다.",
    related: ["mle", "llm"],
  },
  {
    id: "k8s",
    abbr: "K8s",
    full: "Kubernetes",
    category: "model",
    description: "쿠버네티스. 컨테이너화된 애플리케이션의 배포·확장·운영을 자동화하는 오케스트레이션 플랫폼이다. 모델 서빙·에이전트 운영 인프라의 기반이 된다.",
    related: ["aisre", "vpc"],
  },
  {
    id: "vpc",
    abbr: "Private VPC",
    full: "Virtual Private Cloud",
    category: "model",
    description: "외부와 격리된 사설 가상 네트워크다. 외부 상용 LLM이 필요할 때 전용 연결과 엔드포인트를 통해 안전하게 접근하는 경로를 구성한다.",
    related: ["k8s", "llmgw"],
  },
]

/** id → Term 조회 맵. */
export const TERM_BY_ID: Record<string, Term> = Object.fromEntries(TERMS.map((t) => [t.id, t]))

/** id → 카테고리 조회 맵. */
export const CATEGORY_BY_ID: Record<string, TermCategory> = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))

/** 무방향 인접 맵(related 를 대칭화). 존재하지 않는 id 는 제외한다. */
export const ADJACENCY: Record<string, Set<string>> = (() => {
  const adj: Record<string, Set<string>> = {}
  for (const t of TERMS) adj[t.id] = new Set()
  for (const t of TERMS) {
    for (const r of t.related) {
      if (!TERM_BY_ID[r]) continue
      adj[t.id].add(r)
      adj[r].add(t.id)
    }
  }
  return adj
})()

/** 중복 제거된 무방향 엣지 목록. */
export const EDGES: { a: string; b: string }[] = (() => {
  const seen = new Set<string>()
  const edges: { a: string; b: string }[] = []
  for (const t of TERMS) {
    for (const r of t.related) {
      if (!TERM_BY_ID[r]) continue
      const key = t.id < r ? `${t.id}|${r}` : `${r}|${t.id}`
      if (seen.has(key)) continue
      seen.add(key)
      edges.push({ a: t.id, b: r })
    }
  }
  return edges
})()
