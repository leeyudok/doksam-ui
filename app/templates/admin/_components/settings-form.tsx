"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CopyButton } from "@/components/copy-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import type { SettingsFormState } from "../_data/settings-data"
import { SETTINGS_DEFAULT } from "../_data/settings-data"

/** 설정 페이지 — 일반/알림/보안/API 4개 폼 섹션을 로컬 controlled state로 관리한다. */
export function SettingsForm() {
  const [form, setForm] = useState<SettingsFormState>(SETTINGS_DEFAULT)
  const [savedAt, setSavedAt] = useState<string | null>(null)

  function update<K extends keyof SettingsFormState>(key: K, value: SettingsFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    setSavedAt(new Date().toLocaleTimeString("ko-KR"))
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">일반</CardTitle>
          <CardDescription>조직 이름과 기본 언어를 설정합니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="org-name">조직 이름</Label>
            <Input id="org-name" value={form.orgName} onChange={(e) => update("orgName", e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="support-email">고객지원 이메일</Label>
            <Input
              id="support-email"
              type="email"
              value={form.supportEmail}
              onChange={(e) => update("supportEmail", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="locale">기본 언어</Label>
            <Select value={form.locale} onValueChange={(value: SettingsFormState["locale"]) => update("locale", value)}>
              <SelectTrigger id="locale" className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ko">한국어</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">알림</CardTitle>
          <CardDescription>운영 이벤트 알림 채널을 선택합니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <SettingToggle
            label="이메일 알림"
            description="장애·결제 실패 등 주요 이벤트를 이메일로 받습니다."
            checked={form.notifyEmail}
            onCheckedChange={(value) => update("notifyEmail", value)}
          />
          <Separator />
          <SettingToggle
            label="Slack 알림"
            description="#ops-alerts 채널로 실시간 알림을 전송합니다."
            checked={form.notifySlack}
            onCheckedChange={(value) => update("notifySlack", value)}
          />
          <Separator />
          <SettingToggle
            label="주간 리포트"
            description="매주 월요일 요약 리포트를 이메일로 받습니다."
            checked={form.notifyWeeklyDigest}
            onCheckedChange={(value) => update("notifyWeeklyDigest", value)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">보안</CardTitle>
          <CardDescription>로그인 및 세션 보안 정책을 설정합니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <SettingToggle
            label="2단계 인증 필수"
            description="모든 관리자 계정에 2FA를 강제합니다."
            checked={form.twoFactorRequired}
            onCheckedChange={(value) => update("twoFactorRequired", value)}
          />
          <Separator />
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="session-timeout">세션 타임아웃</Label>
            <Select
              value={form.sessionTimeout}
              onValueChange={(value: SettingsFormState["sessionTimeout"]) => update("sessionTimeout", value)}
            >
              <SelectTrigger id="session-timeout" className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15분</SelectItem>
                <SelectItem value="30">30분</SelectItem>
                <SelectItem value="60">1시간</SelectItem>
                <SelectItem value="240">4시간</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">API</CardTitle>
          <CardDescription>서버 간 연동에 사용하는 키와 웹훅 주소입니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="api-key">API 키</Label>
            <div className="flex items-center gap-2">
              <Input id="api-key" readOnly value={form.apiKey} className="font-mono text-xs" />
              <CopyButton value={form.apiKey} label="복사" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="webhook-url">웹훅 URL</Label>
            <Input
              id="webhook-url"
              value={form.webhookUrl}
              onChange={(e) => update("webhookUrl", e.target.value)}
              className="font-mono text-xs"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="button" onClick={handleSave}>
          변경사항 저장
        </Button>
        {savedAt && <span className="text-xs text-muted-foreground">{savedAt}에 저장됨</span>}
      </div>
    </div>
  )
}

interface SettingToggleProps {
  label: string
  description: string
  checked: boolean
  onCheckedChange: (value: boolean) => void
}

function SettingToggle({ label, description, checked, onCheckedChange }: Readonly<SettingToggleProps>) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}
