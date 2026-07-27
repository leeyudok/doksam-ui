import { PageHeading } from "../_components/page-heading"
import { SettingsForm } from "../_components/settings-form"

export default function AdminSettingsPage() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <PageHeading
        eyebrow="Admin · 설정"
        title="워크스페이스 설정"
        description="조직 정보, 알림, 보안 정책, API 연동을 관리합니다."
      />
      <SettingsForm />
    </div>
  )
}
