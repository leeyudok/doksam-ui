import { ColorPickerDemo } from "./color-picker.demo.client"

export const demo = <ColorPickerDemo />

export const code = `const [color, setColor] = useState("#3b82f6")

<ColorPicker value={color} onValueChange={setColor} />`

export const dos = [
  "value/onValueChange 로 항상 controlled 로 쓴다 — 색상 state는 부모가 소유한다.",
  "프리셋(presets)만으로 부족하면 팝오버 안 hex 입력으로 임의 색을 지정하게 한다.",
  "3자리 축약 hex(#f00 등)도 입력하면 6자리로 정규화돼 onValueChange 에 전달된다.",
]

export const donts = [
  "스와치 배경색 외의 컴포넌트 UI(테두리·링·팝오버 배경)에 임의 hex를 하드코딩하지 않는다 — 시맨틱 토큰만 쓴다.",
  "유효하지 않은 hex 문자열로 onValueChange 를 호출하지 않는다 — 정규화 실패 시 커밋을 보류한다.",
]
