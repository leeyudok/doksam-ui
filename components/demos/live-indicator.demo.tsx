import { LiveIndicator } from "@/components/live-indicator"
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card"

export const demo = (
  <div className="flex w-full max-w-md flex-col gap-6">
    <div className="flex flex-wrap items-center gap-4">
      <LiveIndicator status="live" updatedAt={new Date(2026, 6, 16, 9, 41, 12)} />
      <LiveIndicator status="paused" />
      <LiveIndicator status="stale" updatedAt={new Date(2026, 6, 16, 9, 32, 0)} />
      <LiveIndicator status="offline" />
    </div>

    <Card className="w-full">
      <CardHeader>
        <CardTitle>실시간 위험 신호 Live Feed</CardTitle>
        <CardAction>
          <LiveIndicator status="live" updatedAt={new Date(2026, 6, 16, 9, 41, 12)} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">최근 탐지된 신호가 여기에 표시됩니다.</p>
      </CardContent>
    </Card>
  </div>
)

export const code = `import { LiveIndicator } from "@/components/live-indicator"
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card"

<LiveIndicator status="live" updatedAt={new Date()} />
<LiveIndicator status="paused" />
<LiveIndicator status="stale" updatedAt={new Date()} />
<LiveIndicator status="offline" />

<Card>
  <CardHeader>
    <CardTitle>실시간 위험 신호 Live Feed</CardTitle>
    <CardAction>
      <LiveIndicator status="live" updatedAt={new Date()} />
    </CardAction>
  </CardHeader>
  <CardContent>
    <p>최근 탐지된 신호가 여기에 표시됩니다.</p>
  </CardContent>
</Card>`

export const dos = [
  "폴링·소켓 갱신 로직은 상위 컴포넌트에 두고 LiveIndicator에는 status와 updatedAt만 내려준다 — 순수 표기 컴포넌트로 유지한다.",
  "카드·패널 헤더의 CardAction 자리에 붙여 데이터 갱신 여부를 시각적으로 알려준다.",
  "네트워크 실패·지연이 감지되면 stale/offline으로 즉시 전환해 사용자가 오래된 데이터를 신뢰하지 않도록 한다.",
]

export const donts = [
  "updatedAt을 toLocaleTimeString 등 로케일 의존 포맷으로 직접 감싸지 않는다 — 컴포넌트 내부의 고정 HH:MM:SS 포맷을 그대로 쓴다.",
  "live 상태의 펄스 애니메이션을 임의로 다른 상태에도 적용하지 않는다 — 펄스는 '지금 살아있음'의 의미 신호다.",
  "색을 하드코딩하지 않는다 — success/warning/muted-foreground 시맨틱 토큰만 사용해 다크모드에 자동 대응한다.",
]
