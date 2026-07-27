"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  CHAT_SETTINGS_DEFAULT,
  MODEL_OPTIONS,
  TONE_OPTIONS,
  type ChatSettingsState,
  type ChatTone,
  type MaxTokens,
} from "../_lib/data"

const MAX_TOKENS_OPTIONS: { value: MaxTokens; label: string }[] = [
  { value: "512", label: "512 토큰 (짧은 답변)" },
  { value: "1024", label: "1,024 토큰" },
  { value: "2048", label: "2,048 토큰" },
  { value: "4096", label: "4,096 토큰 (긴 답변)" },
]

/** 설정 페이지 — 모델/프롬프트/톤/생성 옵션/동작 5개 섹션을 로컬 controlled state 로 관리한다. */
export function SettingsForm() {
  const [form, setForm] = useState<ChatSettingsState>(CHAT_SETTINGS_DEFAULT)
  const [savedAt, setSavedAt] = useState<string | null>(null)

  function update<K extends keyof ChatSettingsState>(key: K, value: ChatSettingsState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    setSavedAt(new Date().toLocaleTimeString("ko-KR"))
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">모델</CardTitle>
          <CardDescription>대화에 사용할 모델과 시스템 프롬프트를 설정합니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="chat-model">모델</Label>
            <Select value={form.model} onValueChange={(value) => update("model", value)}>
              <SelectTrigger id="chat-model" className="w-full sm:w-72">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MODEL_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {MODEL_OPTIONS.find((option) => option.value === form.model)?.description}
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="chat-system-prompt">시스템 프롬프트</Label>
            <Textarea
              id="chat-system-prompt"
              value={form.systemPrompt}
              onChange={(e) => update("systemPrompt", e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">톤</CardTitle>
          <CardDescription>응답의 말투를 선택합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={form.tone} onValueChange={(value) => update("tone", value as ChatTone)} className="gap-3">
            {TONE_OPTIONS.map((option) => (
              <div key={option.value} className="flex items-start gap-2">
                <RadioGroupItem id={`chat-tone-${option.value}`} value={option.value} className="mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor={`chat-tone-${option.value}`} className="font-normal">
                    {option.label}
                  </Label>
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">생성 옵션</CardTitle>
          <CardDescription>응답의 다양성과 길이를 조절합니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="chat-temperature">응답 다양성(temperature)</Label>
              <span className="text-sm text-muted-foreground">{form.temperature}%</span>
            </div>
            <Slider
              id="chat-temperature"
              value={[form.temperature]}
              onValueChange={([value]) => update("temperature", value ?? form.temperature)}
              max={100}
              step={5}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="chat-max-tokens">최대 응답 길이</Label>
            <Select value={form.maxTokens} onValueChange={(value) => update("maxTokens", value as MaxTokens)}>
              <SelectTrigger id="chat-max-tokens" className="w-full sm:w-72">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MAX_TOKENS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">동작</CardTitle>
          <CardDescription>응답 방식과 개인화 옵션을 설정합니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <SettingToggle
            label="스트리밍 응답"
            description="응답을 완성 즉시가 아니라 생성되는 대로 실시간으로 보여줍니다."
            checked={form.streaming}
            onCheckedChange={(value) => update("streaming", value)}
          />
          <Separator />
          <SettingToggle
            label="출처 표시"
            description="답변 근거가 된 첨부 자료·문서를 함께 인용합니다."
            checked={form.citations}
            onCheckedChange={(value) => update("citations", value)}
          />
          <Separator />
          <SettingToggle
            label="대화 기억"
            description="이전 대화 내용을 기억해 다음 대화에도 참고합니다."
            checked={form.memory}
            onCheckedChange={(value) => update("memory", value)}
          />
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
