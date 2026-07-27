import type { ReactNode } from "react"

/** /components 인덱스에서 컴포넌트를 묶는 상위 분류. */
export type ComponentCategory = "form" | "overlay" | "layout" | "data" | "chat" | "bizinfo" | "finance"

/** done = 데모 작성 완료, 그 외 값("done"이 아닌 값)은 레지스트리에만 등록되고 데모는 아직 없음. */
export type ComponentStatus = "done" | "todo"

/** /components 인덱스·상세 페이지가 공유하는 컴포넌트 메타데이터. */
/**
 * 컴포넌트 계층(정석 구분 — 출처가 아니라 조립 수준으로 나눈다).
 * primitive: shadcn CLI가 components/ui/ 에 설치한 저수준 빌딩블록.
 * composition: 프리미티브를 조합해 만든 상위 컴포넌트(shadcn 카탈로그엔 없는 것).
 */
export type ComponentLayer = "primitive" | "composition"

export interface ComponentEntry {
  /** URL 세그먼트로 쓰이는 고유 식별자 (components/ui/<slug>.tsx 파일명과 동일). */
  slug: string
  /** 카드·상세 페이지 제목. */
  title: string
  category: ComponentCategory
  /** 조립 계층 — primitive(components/ui/) vs composition(조합). */
  layer: ComponentLayer
  /** 한 줄 설명. */
  description: string
  status: ComponentStatus
}

export const COMPONENT_LAYER_LABEL: Record<ComponentLayer, string> = {
  primitive: "Primitive",
  composition: "Composition",
}

/**
 * components/demos/<slug>.demo.tsx 가 export 하는 데모 모듈 컨벤션.
 * - demo: 라이브 데모 JSX (현재 선택된 프리셋 토큰으로 렌더링됨)
 * - code: 데모와 동일한 내용을 보여주는 복사용 코드 문자열
 * - dos / donts: 사용 규칙 bullet 목록 (각 2~3개 권장)
 */
export interface ComponentDemoModule {
  demo: ReactNode
  code: string
  dos: string[]
  donts: string[]
}

export const COMPONENT_CATEGORY_LABEL: Record<ComponentCategory, string> = {
  form: "Form",
  overlay: "Overlay",
  layout: "Layout",
  data: "Data",
  chat: "Chat",
  // 공통 표준이 아니라 bizinfo 프로젝트 전용으로 이식된 확장 패턴/유틸 모음.
  bizinfo: "Bizinfo — 프로젝트 확장",
  // 한국식 시세 등락(gain/loss)·금액 표시 등 금융 도메인 전용 토큰/유틸 모음 (#18).
  finance: "Finance — 금융 도메인 확장",
}

export const COMPONENT_CATEGORY_ORDER: ComponentCategory[] = [
  "form",
  "overlay",
  "layout",
  "data",
  "chat",
  "bizinfo",
  "finance",
]
