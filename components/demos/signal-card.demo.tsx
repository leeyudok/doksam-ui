import { SignalCard } from "@/components/signal-card"

export const demo = (
  <div className="flex w-full max-w-sm flex-col gap-4">
    <SignalCard
      name="한빛반도체"
      verdictLabel="강력매수"
      buyPercent={72}
      holdPercent={20}
      sellPercent={8}
      description="HBM 공급 계약 + 기관 순매수 지속"
    />
    <SignalCard
      name="두리조선"
      verdictLabel="보유"
      verdictVariant="secondary"
      buyPercent={34}
      holdPercent={46}
      sellPercent={20}
      description="수주 모멘텀 유효하나 단기 과열"
    />
    <SignalCard
      name="가온바이오"
      verdictLabel="매도"
      verdictVariant="destructive"
      buyPercent={12}
      holdPercent={26}
      sellPercent={62}
      description="임상 지연 리스크 확대"
    />
  </div>
)

export const code = `<SignalCard
  name="한빛반도체" verdictLabel="강력매수"
  buyPercent={72} holdPercent={20} sellPercent={8}
  description="HBM 공급 계약 + 기관 순매수 지속" />
{/* 3단 바: 매수=success / 보유=warning / 매도=destructive */}`

export const dos = [
  "verdict 배지 매핑: 강력매수·매수=default, 보유=secondary, 매도·강력매도=destructive.",
  "점수 바는 매매 판단 색이므로 등락색(gain/loss)이 아닌 success/warning/destructive 를 쓴다.",
  "세 비율의 합을 100으로 맞춘다 — 남는 폭은 회색 배경으로 보인다.",
]

export const donts = [
  "점수 바 색을 green/yellow/red 팔레트로 하드코딩하지 않는다.",
  "설명을 두 줄 이상 쓰지 않는다 — line-clamp-1 로 잘린다.",
]
