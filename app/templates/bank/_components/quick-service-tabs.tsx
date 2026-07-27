"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DEFAULT_QUICK_SERVICE_KEY, QUICK_SERVICE_TABS } from "@/app/templates/bank/_data/quick-services"

/**
 * 퀵서비스 탭바 — "카드등록" 기본 활성. 가로 스크롤로 모바일 대응(그리드 리플로우
 * 대신 탭 특성상 가로 스크롤이 자연스럽다).
 */
export function QuickServiceTabs() {
  return (
    <Tabs defaultValue={DEFAULT_QUICK_SERVICE_KEY} className="w-full">
      <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto bg-muted/60 p-1">
        {QUICK_SERVICE_TABS.map((tab) => {
          const Icon = tab.icon
          return (
            <TabsTrigger key={tab.key} value={tab.key} className="flex-none gap-1.5 px-3 py-1.5">
              <Icon size={16} />
              {tab.label}
            </TabsTrigger>
          )
        })}
      </TabsList>
      {QUICK_SERVICE_TABS.map((tab) => (
        <TabsContent key={tab.key} value={tab.key} className="px-1 py-2 text-sm text-muted-foreground">
          {tab.description}
        </TabsContent>
      ))}
    </Tabs>
  )
}
