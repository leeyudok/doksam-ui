/**
 * Admin 템플릿 "설정" 페이지 데모 데이터 — 순수 데이터 모듈.
 */

export interface SettingsFormState {
  orgName: string
  supportEmail: string
  locale: "ko" | "en"
  notifyEmail: boolean
  notifySlack: boolean
  notifyWeeklyDigest: boolean
  twoFactorRequired: boolean
  sessionTimeout: "15" | "30" | "60" | "240"
  apiKey: string
  webhookUrl: string
}

export const SETTINGS_DEFAULT: SettingsFormState = {
  orgName: "doksam 백오피스",
  supportEmail: "ops@doksam.com",
  locale: "ko",
  notifyEmail: true,
  notifySlack: true,
  notifyWeeklyDigest: false,
  twoFactorRequired: true,
  sessionTimeout: "30",
  apiKey: "sk_live_admin_9f21ac8d4e",
  webhookUrl: "https://hooks.doksam.com/admin/events",
}
