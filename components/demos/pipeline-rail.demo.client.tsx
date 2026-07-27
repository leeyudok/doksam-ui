"use client"

import { useState } from "react"

import { PipelineRail, type PipelineStage } from "@/components/pipeline-rail"

const stages: PipelineStage[] = [
  {
    key: "ba",
    label: "BA",
    sub: "요구사항",
    subTabs: [
      { key: "elicitor", label: "요구사항 도출 챗" },
      { key: "stories", label: "유저 스토리" },
      { key: "srs", label: "SRS" },
    ],
  },
  {
    key: "design",
    label: "설계",
    sub: "아키텍처",
    subTabs: [
      { key: "diagrams", label: "UML 시각화" },
      { key: "review", label: "설계 리뷰" },
    ],
  },
  {
    key: "coder",
    label: "구현",
    sub: "개발",
    subTabs: [
      { key: "code_gen", label: "소스코드 생성기" },
      { key: "code_copilot", label: "코드 코파일럿" },
    ],
  },
  { key: "qa", label: "QA", sub: "품질", excluded: true },
  { key: "sre", label: "운영", sub: "SRE", excluded: true },
]

export function PipelineRailDemo() {
  const [activeStage, setActiveStage] = useState("ba")
  const [activeTab, setActiveTab] = useState("elicitor")

  const handleStageChange = (key: string) => {
    setActiveStage(key)
    const first = stages.find((s) => s.key === key)?.subTabs?.[0]?.key
    setActiveTab(first ?? "")
  }

  return (
    <PipelineRail
      stages={stages}
      activeStage={activeStage}
      activeTab={activeTab}
      onStageChange={handleStageChange}
      onTabChange={setActiveTab}
      className="rounded-xl"
    />
  )
}
