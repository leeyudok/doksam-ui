import { RatingDemo } from "./rating.demo.client"

export const demo = <RatingDemo />

export const code = `function RatingDemo() {
  const [value, setValue] = useState(3.5)

  return (
    <>
      <Rating value={value} onChange={setValue} showValue />
      <Rating value={4.5} max={5} readOnly showValue />
      <Rating value={1} readOnly showValue severity />
      <Rating value={2} readOnly showValue severity />
      <Rating value={3} readOnly showValue severity />
      <Rating value={4} readOnly showValue severity />
    </>
  )
}`

export const dos = [
  "사용자가 매길 수 있는 평점에는 반드시 onChange를 연결해 controlled로 쓴다.",
  "이미 매겨진 평점을 보여주기만 할 때는 readOnly를 켜 실수로 값이 바뀌지 않게 한다.",
  "정확한 값이 중요한 화면에서는 showValue로 숫자를 함께 노출한다.",
  "낮은 점수를 시각적으로 강조해야 하면 severity를 켜거나, 색 규칙을 직접 정의해야 하면 toneByValue를 쓴다.",
]

export const donts = [
  "max를 5 밖으로 임의로 늘려 별 의미(1~5점 척도)를 깨지 않는다.",
  "hover 프리뷰만 믿고 실제 선택 확정(onClick) 없이 값을 저장하지 않는다.",
  "severity와 toneByValue를 동시에 지정해 우선순위를 헷갈리게 하지 않는다(toneByValue가 항상 우선).",
]
