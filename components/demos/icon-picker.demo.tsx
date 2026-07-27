import { IconPickerDemo } from "./icon-picker.demo.client"

export const demo = <IconPickerDemo />

export const code = `const [icon, setIcon] = useState("ChartBar")

<IconPicker value={icon} onSelect={setIcon} />
// 이름 → 컴포넌트 해소는 getPickerIcon(icon)`

export const dos = [
  "value/onSelect 로 controlled 로 쓴다 — 선택 아이콘 이름은 부모 state 가 소유한다.",
  "저장은 아이콘 이름(문자열)으로 하고, 렌더 시 getPickerIcon() 으로 컴포넌트를 해소한다.",
  "검색은 영문 이름과 한글 별칭을 함께 매칭한다 — 도메인 용어(예: '설정', '차트')로 찾게 한다.",
]

export const donts = [
  "카탈로그 밖의 임의 아이콘 이름을 value 로 넣지 않는다 — 미등록 이름은 미리보기 없이 이름만 표시된다.",
  "아이콘 격자 버튼의 강조색에 hex 를 하드코딩하지 않는다 — primary 토큰만 쓴다.",
]
