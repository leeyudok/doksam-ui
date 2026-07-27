import { TrendUpIcon } from "@phosphor-icons/react/dist/ssr"

import { GaugeCard } from "@/components/gauge-card"

export const demo = (
  <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
    <GaugeCard
      name="한빛반도체"
      icon={<TrendUpIcon className="size-4 text-gain" aria-hidden />}
      gaugeValue={78}
      tags={[{ label: "KOSPI" }, { label: "반도체" }]}
      cause={{ label: "호재", className: "bg-success/15 text-success", description: "HBM 공급 계약 체결" }}
    />
    <GaugeCard
      name="두리조선"
      active={false}
      gaugeValue={24}
      tags={[{ label: "KOSPI" }, { label: "조선" }]}
      cause={{ label: "악재", className: "bg-destructive/15 text-destructive", description: "환율 급등 원가 부담" }}
    />
  </div>
)

export const code = `<GaugeCard
  name="한빛반도체" gaugeValue={78}
  tags={[{ label: "KOSPI" }, { label: "반도체" }]}
  cause={{ label: "호재", className: "bg-success/15 text-success",
           description: "HBM 공급 계약 체결" }} />
{/* 게이지 색: 60↑ success / 30↑ warning / 미만 destructive */}`

export const dos = [
  "점수형 지표(시그널 점수·건강도)를 항목 그리드로 나열할 때 쓴다.",
  "게이지 색은 값 임계(60/30)로 자동 결정된다 — 색을 따로 지정하지 않는다.",
  "cause 태그 색은 도메인 의미(호재/악재)에 맞는 토큰 틴트 클래스를 넘긴다.",
]

export const donts = [
  "active 테두리와 게이지 색을 팔레트색으로 덮지 않는다 — success/warning/destructive 토큰만.",
  "게이지 하나에 지표 두 개를 겹쳐 그리지 않는다.",
]
