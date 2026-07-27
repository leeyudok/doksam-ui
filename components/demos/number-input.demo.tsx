import { NumberInput } from "@/components/number-input"

export const demo = (
  <div className="w-40">
    <NumberInput defaultValue={3} min={0} max={10} step={1} />
  </div>
)

export const code = `<NumberInput defaultValue={3} min={0} max={10} step={1} />`

export const dos = [
  "수량·인원처럼 정해진 범위 안에서 값을 조절하는 필드에 사용한다.",
  "min/max에 도달하면 해당 방향 버튼을 비활성화해 한계를 명확히 보여준다.",
  "직접 입력도 항상 허용하고, blur 시점에 min/max로 clamp해 잘못된 값이 남지 않게 한다.",
]

export const donts = [
  "자유 형식 숫자(전화번호, 금액 문자열 등)에 스테퍼를 강제하지 않는다 — 일반 Input을 쓴다.",
  "step 단위를 벗어난 값을 입력해도 그대로 방치하지 않는다 — blur/step에서 정합성을 맞춘다.",
]
