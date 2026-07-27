import { DateRangePickerDemo } from "./date-range-picker.demo.client"

export const demo = <DateRangePickerDemo />

export const code = `const [range, setRange] = useState<DateRange | undefined>()

<DateRangePicker
  value={range}
  onValueChange={setRange}
  placeholder="기간 선택"
/>`

export const dos = [
  "예약 기간·통계 조회 기간처럼 시작~종료 두 값이 함께 필요한 폼에 사용한다.",
  "두 달을 한 번에 보여줘 월 경계를 넘는 범위도 클릭 두 번으로 고를 수 있게 한다.",
  "from만 선택된 중간 상태에서는 팝오버를 닫지 않고 to 선택을 기다린다.",
]

export const donts = [
  "값 하나만 필요하면 DateRangePicker 대신 가벼운 DatePicker를 쓴다.",
  "range.from과 range.to를 검증 없이 그대로 API에 넘기지 않는다 — 순서·존재 여부를 확인한다.",
]
