import { BankIcon, ChartLineUpIcon } from "@phosphor-icons/react/dist/ssr"

import { AppLogo } from "@/components/app-logo"

export const demo = (
  <div className="flex items-center gap-4">
    <AppLogo label="기본 로고" />
    <AppLogo icon={BankIcon} size={22} className="size-10" label="은행 앱 로고" />
    <AppLogo icon={ChartLineUpIcon} size={14} className="size-6 rounded-md" label="주식 앱 로고" />
    <div className="flex items-center gap-2">
      <AppLogo icon={ChartLineUpIcon} />
      <span className="text-sm font-semibold">srope console</span>
    </div>
  </div>
)

export const code = `<AppLogo />                                        {/* 기본: RocketLaunch, size-8 */}
<AppLogo icon={BankIcon} size={22} className="size-10" />
<AppLogo icon={ChartLineUpIcon} className="size-6 rounded-md" size={14} />`

export const dos = [
  "아이콘은 icon prop 으로 주입한다 — 앱별 로고 교체를 빌드 설정이 아니라 호출부에서 결정한다.",
  "컨테이너(size-*)와 아이콘(size px)을 함께 조정해 여백 비율을 유지한다.",
  "로고가 단독으로 의미를 가지면 label 을 넣어 role=img 접근성 이름을 준다.",
]

export const donts = [
  "배경·전경색을 임의 색으로 덮지 않는다 — primary/primary-foreground 토큰 쌍을 유지한다.",
  "텍스트 로고가 따로 있는 곳에서 label 을 중복 지정하지 않는다(스크린리더 이중 낭독).",
]
