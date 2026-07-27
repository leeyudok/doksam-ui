import { MultiSelectDemo } from "./multi-select.demo.client"

export const demo = <MultiSelectDemo />

export const code = `const FRAMEWORKS = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

const [value, setValue] = useState<string[]>(["next"])

<MultiSelect options={FRAMEWORKS} value={value} onValueChange={setValue} />`

export const dos = [
  "선택 항목이 여러 개일 수 있고, 선택된 항목을 한눈에 보여줘야 하는 필드에 사용한다.",
  "선택된 항목은 칩으로 노출하고 칩마다 개별 제거 버튼을 제공한다.",
  "옵션이 많아지면 CommandInput의 검색으로 빠르게 좁힐 수 있게 한다.",
]

export const donts = [
  "단일 선택만 필요하면 MultiSelect 대신 Select/Combobox를 쓴다.",
  "칩 제거 버튼 클릭이 팝오버를 열고 닫는 트리거 클릭과 뒤섞이지 않도록 이벤트 전파를 막지 않은 채 방치하지 않는다.",
]
