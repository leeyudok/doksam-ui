import { DatePickerDemo } from "./date-picker.demo.client"

export const demo = <DatePickerDemo />

export const code = `const [date, setDate] = useState<Date | undefined>()

<DatePicker
  value={date}
  onValueChange={setDate}
  placeholder="날짜 선택"
/>`

export const dos = [
  "예약일·마감일처럼 단일 날짜 하나만 고르는 폼 필드에 사용한다.",
  "선택 가능 범위가 제한적이면 Calendar의 disabled prop을 그대로 전달해 범위를 명시한다.",
  "트리거 버튼 라벨은 formatDate로 로케일에 맞게 표시한다.",
]

export const donts = [
  "범위(시작~종료) 선택이 필요하면 DatePicker 대신 DateRangePicker를 쓴다.",
  "날짜 형식을 문자열로 직접 조립하지 않고 formatDate 콜백으로 위임한다.",
]
