/**
 * 지식관리 콘솔 · 위키 데모 데이터 — 순수 데이터 모듈(컴포넌트 로직 없음).
 * 좌측 문서 트리(tree-view)와 우측 본문·TOC 렌더에 함께 쓰인다. 전부 가상
 * 콘텐츠이며 특정 기업·인물·실프로젝트명을 포함하지 않는다. 실제 연동 시 이
 * 파일을 문서 저장소에서 로드한 트리/본문으로 교체한다.
 */

import type { TreeNode } from "@/components/tree-view"

/** 본문 섹션 — heading(레벨 2~3)과 문단들. id 는 TOC 앵커로 쓴다. */
export interface WikiSection {
  id: string
  /** 헤딩 텍스트. */
  heading: string
  /** 2 또는 3(들여쓰기 TOC 용). */
  level: 2 | 3
  /** 문단 텍스트 목록. */
  paragraphs: string[]
}

/** 위키 문서 한 건 — 메타 + 본문 섹션. */
export interface WikiDoc {
  id: string
  /** 문서 제목(본문 상단 h1). */
  title: string
  /** 분류 라벨(배지). */
  category: string
  /** 최종 수정 일자(YYYY-MM-DD). */
  updated: string
  /** 작성 역할(가상, 개인명 아님). */
  author: string
  /** 예상 읽기 시간(분). */
  readMinutes: number
  /** 상태 배지: 정식/초안/검토중. */
  status: "정식" | "초안" | "검토중"
  /** 태그 목록. */
  tags: string[]
  /** 본문 섹션. */
  sections: WikiSection[]
}

/**
 * 좌측 문서 트리. tree-view 의 TreeNode 규격(id/label/children?)을 그대로
 * 쓴다. 리프 노드의 id 는 WIKI_DOCS 의 키와 일치한다.
 */
export const WIKI_TREE: TreeNode[] = [
  {
    id: "grp-onboarding",
    label: "온보딩",
    children: [
      { id: "doc-welcome", label: "지식베이스 시작하기" },
      { id: "doc-glossary", label: "용어 사전" },
    ],
  },
  {
    id: "grp-guides",
    label: "운영 가이드",
    children: [
      { id: "doc-writing", label: "문서 작성 규칙" },
      { id: "doc-review", label: "리뷰 · 승인 절차" },
      { id: "doc-tagging", label: "태그 · 분류 체계" },
    ],
  },
  {
    id: "grp-reference",
    label: "레퍼런스",
    children: [
      { id: "doc-search", label: "검색 문법" },
      { id: "doc-shortcuts", label: "단축키 모음" },
      { id: "doc-faq", label: "자주 묻는 질문" },
    ],
  },
]

/** 트리에서 기본으로 펼쳐둘 그룹. */
export const WIKI_DEFAULT_EXPANDED = ["grp-onboarding", "grp-guides", "grp-reference"]

/** 초기 선택 문서. */
export const WIKI_DEFAULT_DOC = "doc-welcome"

export const WIKI_DOCS: Record<string, WikiDoc> = {
  "doc-welcome": {
    id: "doc-welcome",
    title: "지식베이스 시작하기",
    category: "온보딩",
    updated: "2026-07-12",
    author: "운영팀",
    readMinutes: 4,
    status: "정식",
    tags: ["개요", "온보딩", "필독"],
    sections: [
      {
        id: "intro",
        heading: "이 문서는 무엇인가요",
        level: 2,
        paragraphs: [
          "지식베이스는 팀이 축적한 문서·아이디어·작업 기록을 한곳에서 다루는 공간입니다. 위키에서 정리된 지식을 읽고, 보드에서 초기 아이디어를 발전시키며, 로그에서 지난 작업 흐름을 되짚습니다.",
          "처음 방문했다면 이 문서를 먼저 읽고, 이어서 문서 작성 규칙과 태그 체계를 확인하는 순서를 권장합니다.",
        ],
      },
      {
        id: "structure",
        heading: "구성 요소",
        level: 2,
        paragraphs: [
          "위키 트리는 그룹과 문서의 2단계로 구성됩니다. 그룹은 주제 영역을, 문서는 개별 지식 단위를 나타냅니다.",
          "각 문서는 상단에 분류·수정일·읽기 시간 같은 메타 정보를 두고, 오른쪽 목차로 긴 문서 안에서도 빠르게 이동할 수 있게 합니다.",
        ],
      },
      {
        id: "next",
        heading: "다음 단계",
        level: 3,
        paragraphs: [
          "용어 사전으로 공통 어휘를 맞추고, 문서 작성 규칙에서 형식 합의를 확인하세요. 검색 문법을 익히면 원하는 문서를 훨씬 빨리 찾을 수 있습니다.",
        ],
      },
    ],
  },
  "doc-glossary": {
    id: "doc-glossary",
    title: "용어 사전",
    category: "온보딩",
    updated: "2026-07-09",
    author: "운영팀",
    readMinutes: 6,
    status: "정식",
    tags: ["용어", "레퍼런스"],
    sections: [
      {
        id: "core",
        heading: "핵심 용어",
        level: 2,
        paragraphs: [
          "문서: 위키에 정식 등록된 지식 단위입니다. 리뷰를 거쳐 정식 상태가 됩니다.",
          "카드: 보드에 올라가는 초기 아이디어 단위입니다. 발전하면 문서로 승격될 수 있습니다.",
          "세션: 하나의 작업 흐름을 로그로 남긴 기록입니다. 날짜·시각·요약으로 추적합니다.",
        ],
      },
      {
        id: "status",
        heading: "상태 값",
        level: 2,
        paragraphs: [
          "초안은 작성 중, 검토중은 리뷰 대기, 정식은 승인 완료를 뜻합니다. 상태는 문서 상단 배지로 표시됩니다.",
        ],
      },
    ],
  },
  "doc-writing": {
    id: "doc-writing",
    title: "문서 작성 규칙",
    category: "운영 가이드",
    updated: "2026-07-14",
    author: "품질팀",
    readMinutes: 5,
    status: "정식",
    tags: ["규칙", "스타일", "필독"],
    sections: [
      {
        id: "title",
        heading: "제목과 요약",
        level: 2,
        paragraphs: [
          "제목은 명사구로 짧게 씁니다. 문서 첫 문단은 이 글이 무엇을 다루는지 한두 문장으로 요약해 독자가 계속 읽을지 판단할 수 있게 합니다.",
        ],
      },
      {
        id: "heading",
        heading: "헤딩 계층",
        level: 2,
        paragraphs: [
          "헤딩은 2단계까지만 사용하는 것을 기본으로 합니다. 더 깊은 구조가 필요하면 문서를 나누는 편이 검색과 목차 이동에 유리합니다.",
        ],
      },
      {
        id: "links",
        heading: "링크와 인용",
        level: 3,
        paragraphs: [
          "다른 문서를 참조할 때는 제목을 그대로 링크 텍스트로 씁니다. 외부 출처는 인용 블록으로 구분해 본문과 섞이지 않게 합니다.",
        ],
      },
    ],
  },
  "doc-review": {
    id: "doc-review",
    title: "리뷰 · 승인 절차",
    category: "운영 가이드",
    updated: "2026-07-11",
    author: "품질팀",
    readMinutes: 4,
    status: "검토중",
    tags: ["절차", "리뷰"],
    sections: [
      {
        id: "flow",
        heading: "기본 흐름",
        level: 2,
        paragraphs: [
          "초안 작성 후 검토 요청을 올리면 담당자가 내용을 확인합니다. 수정 의견이 반영되면 정식으로 승격됩니다.",
        ],
      },
      {
        id: "criteria",
        heading: "승인 기준",
        level: 2,
        paragraphs: [
          "정확성, 최신성, 형식 준수 세 가지를 확인합니다. 셋 중 하나라도 부족하면 검토중 상태로 되돌립니다.",
        ],
      },
    ],
  },
  "doc-tagging": {
    id: "doc-tagging",
    title: "태그 · 분류 체계",
    category: "운영 가이드",
    updated: "2026-07-08",
    author: "운영팀",
    readMinutes: 3,
    status: "정식",
    tags: ["태그", "분류"],
    sections: [
      {
        id: "principle",
        heading: "분류 원칙",
        level: 2,
        paragraphs: [
          "한 문서에는 주제 그룹 하나만 배정하고, 세부 성격은 태그로 표현합니다. 그룹은 위치를, 태그는 맥락을 나타냅니다.",
        ],
      },
      {
        id: "reuse",
        heading: "태그 재사용",
        level: 3,
        paragraphs: [
          "새 태그를 만들기 전에 비슷한 태그가 있는지 확인합니다. 태그가 늘어나면 오히려 찾기 어려워집니다.",
        ],
      },
    ],
  },
  "doc-search": {
    id: "doc-search",
    title: "검색 문법",
    category: "레퍼런스",
    updated: "2026-07-10",
    author: "운영팀",
    readMinutes: 4,
    status: "정식",
    tags: ["검색", "레퍼런스"],
    sections: [
      {
        id: "basic",
        heading: "기본 검색",
        level: 2,
        paragraphs: [
          "단어를 입력하면 제목과 본문에서 함께 찾습니다. 여러 단어를 넣으면 모두 포함하는 문서를 우선 보여줍니다.",
        ],
      },
      {
        id: "filter",
        heading: "필터 문법",
        level: 2,
        paragraphs: [
          "태그로 좁히려면 태그 이름을 그대로 조건에 더합니다. 상태나 그룹으로도 같은 방식으로 범위를 줄일 수 있습니다.",
        ],
      },
    ],
  },
  "doc-shortcuts": {
    id: "doc-shortcuts",
    title: "단축키 모음",
    category: "레퍼런스",
    updated: "2026-07-07",
    author: "운영팀",
    readMinutes: 2,
    status: "초안",
    tags: ["단축키", "생산성"],
    sections: [
      {
        id: "nav",
        heading: "이동 단축키",
        level: 2,
        paragraphs: [
          "위아래 화살표로 트리 항목을 오가고, 오른쪽·왼쪽으로 그룹을 펼치거나 접습니다. 엔터로 문서를 엽니다.",
        ],
      },
    ],
  },
  "doc-faq": {
    id: "doc-faq",
    title: "자주 묻는 질문",
    category: "레퍼런스",
    updated: "2026-07-06",
    author: "운영팀",
    readMinutes: 3,
    status: "정식",
    tags: ["FAQ", "도움말"],
    sections: [
      {
        id: "q1",
        heading: "문서를 지우면 어떻게 되나요",
        level: 2,
        paragraphs: [
          "삭제된 문서는 일정 기간 보관함에 남아 복구할 수 있습니다. 완전 삭제는 관리자만 수행합니다.",
        ],
      },
      {
        id: "q2",
        heading: "보드 카드를 문서로 만들 수 있나요",
        level: 2,
        paragraphs: [
          "채택된 카드는 문서 초안으로 옮길 수 있습니다. 이후 리뷰 절차를 거쳐 정식 문서가 됩니다.",
        ],
      },
    ],
  },
}
