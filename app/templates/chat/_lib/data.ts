/**
 * Chat/AI Assistant 템플릿(#29) 전용 데모 데이터 — 순수 데이터/타입 모듈.
 *
 * "use client" 없음 — 서버 컴포넌트(page.tsx, settings/page.tsx)에서 바로
 * import 해 쓴다. React 컴포넌트·훅 같은 "client 값"은 여기서 export 하지
 * 않는다 — 그건 app/templates/chat/_components/ 쪽 클라이언트 컴포넌트가
 * 담당하고, 이 모듈은 그쪽에 props로 흘려보낼 값만 정의한다.
 *
 * 가상 제품 "Atlas Assistant" — 사내 업무용 AI 어시스턴트라는 설정. 실존
 * 브랜드/모델과 무관한 제네릭 카피이며, 대화·메시지 전부 가상의 예시다.
 */

export const PRODUCT_NAME = "Atlas Assistant"

// -----------------------------------------------------------------------
// 대화 목록 · 메시지
// -----------------------------------------------------------------------

export interface Conversation {
  id: string
  title: string
  preview: string
  updatedAt: string
  unread: boolean
  pinned: boolean
}

export type MessageRole = "user" | "assistant"

export interface MessageAttachment {
  id: string
  name: string
  size: string
  kind: "pdf" | "image" | "sheet"
}

export interface ChatMessage {
  id: string
  conversationId: string
  role: MessageRole
  content: string
  time: string
  attachments?: MessageAttachment[]
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: "quarterly-report",
    title: "분기 보고서 초안 검토",
    preview: "표 3개를 요약 문단으로 바꿔줄 수 있어?",
    updatedAt: "오전 10:24",
    unread: false,
    pinned: true,
  },
  {
    id: "onboarding-copy",
    title: "온보딩 이메일 문구",
    preview: "톤을 조금 더 친근하게 다듬었어요.",
    updatedAt: "어제",
    unread: true,
    pinned: false,
  },
  {
    id: "sql-debug",
    title: "SQL 쿼리 디버깅",
    preview: "GROUP BY 절에 컬럼을 하나 빠뜨리신 것 같아요.",
    updatedAt: "어제",
    unread: false,
    pinned: false,
  },
  {
    id: "meeting-notes",
    title: "화요일 회의록 정리",
    preview: "액션 아이템 4개를 담당자별로 정리했습니다.",
    updatedAt: "3일 전",
    unread: false,
    pinned: false,
  },
  {
    id: "new-chat",
    title: "새 대화",
    preview: "아직 메시지가 없습니다.",
    updatedAt: "지금",
    unread: false,
    pinned: false,
  },
]

export const DEFAULT_CONVERSATION_ID = "quarterly-report"

export const MESSAGES: ChatMessage[] = [
  {
    id: "quarterly-report-1",
    conversationId: "quarterly-report",
    role: "user",
    content: "분기 보고서 초안을 첨부했어요. 표 3개를 요약 문단으로 바꿔줄 수 있어?",
    time: "오전 10:18",
    attachments: [{ id: "att-1", name: "2026_1분기_보고서_초안.pdf", size: "2.4MB", kind: "pdf" }],
  },
  {
    id: "quarterly-report-2",
    conversationId: "quarterly-report",
    role: "assistant",
    content:
      "첨부해 주신 표 3개를 검토했습니다. 매출·비용·인력 현황을 각각 한 문단으로 요약했고, 전분기 대비 증감은 괄호로 병기했어요. 초안 문서 2페이지에 이어 붙이면 자연스러울 것 같습니다.",
    time: "오전 10:20",
  },
  {
    id: "quarterly-report-3",
    conversationId: "quarterly-report",
    role: "user",
    content: "좋네요. 인력 현황 문단만 조금 더 짧게 줄여줄 수 있을까요?",
    time: "오전 10:23",
  },
  {
    id: "quarterly-report-4",
    conversationId: "quarterly-report",
    role: "assistant",
    content: "네, 두 문장으로 압축했습니다. 채용 인원과 이직률만 남기고 나머지 세부 지표는 각주로 뺐어요.",
    time: "오전 10:24",
  },
  {
    id: "onboarding-copy-1",
    conversationId: "onboarding-copy",
    role: "user",
    content: "신규 입사자 온보딩 이메일 초안을 써줘. 너무 딱딱하지 않게.",
    time: "어제 오후 4:02",
  },
  {
    id: "onboarding-copy-2",
    conversationId: "onboarding-copy",
    role: "assistant",
    content: "톤을 조금 더 친근하게 다듬었어요. 첫 문단에 환영 인사를, 마지막에 담당자 연락처를 넣어 뒀습니다.",
    time: "어제 오후 4:05",
  },
  {
    id: "sql-debug-1",
    conversationId: "sql-debug",
    role: "user",
    content: "이 쿼리가 집계 결과에서 중복이 나는데 원인을 못 찾겠어요.",
    time: "어제 오전 11:40",
    attachments: [{ id: "att-2", name: "query.sql", size: "1.1KB", kind: "sheet" }],
  },
  {
    id: "sql-debug-2",
    conversationId: "sql-debug",
    role: "assistant",
    content: "GROUP BY 절에 컬럼을 하나 빠뜨리신 것 같아요. order_id 기준으로만 묶여 있어서 상품 단위 중복이 남아있습니다.",
    time: "어제 오전 11:42",
  },
  {
    id: "meeting-notes-1",
    conversationId: "meeting-notes",
    role: "user",
    content: "화요일 회의 녹취를 정리해서 액션 아이템만 뽑아줘.",
    time: "3일 전",
  },
  {
    id: "meeting-notes-2",
    conversationId: "meeting-notes",
    role: "assistant",
    content: "액션 아이템 4개를 담당자별로 정리했습니다. 마감일이 명시되지 않은 항목은 별도로 표시해 뒀어요.",
    time: "3일 전",
  },
]

export function getMessagesForConversation(conversationId: string): ChatMessage[] {
  return MESSAGES.filter((message) => message.conversationId === conversationId)
}

export function getConversation(conversationId: string): Conversation | undefined {
  return CONVERSATIONS.find((conversation) => conversation.id === conversationId)
}

// -----------------------------------------------------------------------
// 설정 — 모델 · 프롬프트 · 톤
// -----------------------------------------------------------------------

export interface ModelOption {
  value: string
  label: string
  description: string
}

export const MODEL_OPTIONS: ModelOption[] = [
  { value: "atlas-pro", label: "Atlas Pro", description: "복잡한 추론·긴 문서 작업에 적합한 고성능 모델" },
  { value: "atlas-fast", label: "Atlas Fast", description: "짧은 응답 시간이 중요한 간단한 작업에 적합" },
  { value: "atlas-vision", label: "Atlas Vision", description: "이미지·차트 등 시각 자료 분석에 특화" },
]

export type ChatTone = "professional" | "friendly" | "concise"

export interface ToneOption {
  value: ChatTone
  label: string
  description: string
}

export const TONE_OPTIONS: ToneOption[] = [
  { value: "professional", label: "전문적", description: "격식 있는 존댓말과 정확한 용어를 사용합니다." },
  { value: "friendly", label: "친근함", description: "편안한 말투로 대화하듯 응답합니다." },
  { value: "concise", label: "간결함", description: "군더더기 없이 핵심만 짧게 응답합니다." },
]

export type MaxTokens = "512" | "1024" | "2048" | "4096"

export interface ChatSettingsState {
  model: string
  systemPrompt: string
  tone: ChatTone
  temperature: number
  maxTokens: MaxTokens
  streaming: boolean
  citations: boolean
  memory: boolean
}

export const CHAT_SETTINGS_DEFAULT: ChatSettingsState = {
  model: "atlas-pro",
  systemPrompt: "당신은 doksam 팀의 업무를 돕는 어시스턴트입니다. 답변은 한국어로, 근거를 함께 제시하세요.",
  tone: "professional",
  temperature: 40,
  maxTokens: "2048",
  streaming: true,
  citations: true,
  memory: false,
}
