/**
 * Admin 템플릿 "데이터 관리" 페이지 데모 데이터 — 순수 데이터 모듈.
 */

export type UserRole = "admin" | "editor" | "viewer"
export type UserStatus = "active" | "invited" | "suspended"

export interface AdminUserRow {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  team: string
  joinedAt: string
}

export const ROLE_LABEL: Record<UserRole, string> = {
  admin: "관리자",
  editor: "편집자",
  viewer: "열람자",
}

export const STATUS_LABEL: Record<UserStatus, string> = {
  active: "활성",
  invited: "초대됨",
  suspended: "정지",
}

export const TEAM_FACETS = [
  { key: "platform", label: "플랫폼", color: "chart-1" as const },
  { key: "growth", label: "그로스", color: "chart-2" as const },
  { key: "support", label: "고객지원", color: "chart-3" as const },
]

export const ADMIN_USERS: AdminUserRow[] = [
  { id: "1", name: "김도현", email: "dohyun.kim@example.com", role: "admin", status: "active", team: "플랫폼", joinedAt: "2024-02-11" },
  { id: "2", name: "이서연", email: "seoyeon.lee@doksam.com", role: "editor", status: "active", team: "그로스", joinedAt: "2024-05-03" },
  { id: "3", name: "박민준", email: "minjun.park@doksam.com", role: "viewer", status: "invited", team: "고객지원", joinedAt: "2025-01-22" },
  { id: "4", name: "최유진", email: "yujin.choi@doksam.com", role: "editor", status: "active", team: "플랫폼", joinedAt: "2024-08-17" },
  { id: "5", name: "정하은", email: "haeun.jeong@doksam.com", role: "viewer", status: "suspended", team: "고객지원", joinedAt: "2023-11-30" },
  { id: "6", name: "강지호", email: "jiho.kang@doksam.com", role: "admin", status: "active", team: "플랫폼", joinedAt: "2023-06-09" },
  { id: "7", name: "윤채원", email: "chaewon.yoon@doksam.com", role: "editor", status: "invited", team: "그로스", joinedAt: "2025-03-14" },
  { id: "8", name: "임태양", email: "taeyang.im@doksam.com", role: "viewer", status: "active", team: "그로스", joinedAt: "2024-12-01" },
  { id: "9", name: "한소율", email: "soyul.han@doksam.com", role: "editor", status: "active", team: "고객지원", joinedAt: "2024-09-25" },
  { id: "10", name: "오준서", email: "junseo.oh@doksam.com", role: "viewer", status: "suspended", team: "플랫폼", joinedAt: "2023-04-18" },
]
