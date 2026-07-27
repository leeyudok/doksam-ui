import type { PatternSampleData } from "@/components/showcase/pattern-sample"
import { TransferFlowDemo } from "@/components/patterns/mobile-banking-transfer/transfer-flow-demo"

export const MOBILE_BANKING_TRANSFER_SAMPLES: PatternSampleData[] = [
  {
    num: 1,
    title: "이체 플로우",
    description: "받는사람 선택 → 숫자 키패드 금액 입력 → 확인 3단계로 진행하는 이체 화면입니다.",
    demo: <TransferFlowDemo />,
    code: `type Step = "recipient" | "amount" | "confirm" | "done"

// 상단 진행 인디케이터: 완료/현재 단계는 bg-primary, 이후 단계는 bg-secondary
<ol className="flex flex-1 items-center gap-1.5">
  {STEPS.map((s, i) => (
    <li key={s.id} className="flex flex-1 flex-col items-center gap-1">
      <div className={\`h-1 w-full rounded-full \${i <= stepIndex ? "bg-primary" : "bg-secondary"}\`} />
      <span className={i === stepIndex ? "font-semibold" : "text-muted-foreground"}>{s.label}</span>
    </li>
  ))}
</ol>

// 금액 입력: 3열 숫자 키패드, formatWon으로 실시간 표시
<div className="grid grid-cols-3 gap-2">
  {KEYPAD_KEYS.map((key) => (
    <button key={key} onClick={() => handleKeypadPress(key)} className="h-11 rounded-lg bg-secondary">
      {key === "back" ? <BackspaceIcon /> : key}
    </button>
  ))}
</div>`,
    notes: [
      "모바일 우선 — max-w-sm mx-auto 카드 하나에 단계별 콘텐츠를 교체하는 방식이라 화면 전환 없이 폰에서 자연스럽다.",
      "금액은 문자열이 아니라 숫자 상태(amount: number)로 누적하고, 항상 formatWon()으로 표시해 값과 표시를 분리한다.",
      "이전 단계 버튼은 첫 단계(받는사람 선택)에서는 숨겨 뒤로 갈 곳이 없을 때 빈 화살표를 노출하지 않는다.",
      "실제 화면에 얹을 때는 각 단계 전환 지점(수취인 확정, 이체 확정)에 서버 검증/API 호출을 끼워 넣는다.",
    ],
  },
]
