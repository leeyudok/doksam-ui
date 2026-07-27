import { BadgeWithSpinner } from "@/components/badge-with-spinner"

export const demo = (
  <div className="flex flex-wrap items-center gap-3">
    <BadgeWithSpinner>수집 중</BadgeWithSpinner>
    <BadgeWithSpinner variant="success">배포 진행 중</BadgeWithSpinner>
    <BadgeWithSpinner variant="danger">재시도 중 (3회차)</BadgeWithSpinner>
  </div>
)

export const code = `<BadgeWithSpinner>수집 중</BadgeWithSpinner>
<BadgeWithSpinner variant="success">배포 진행 중</BadgeWithSpinner>
<BadgeWithSpinner variant="danger">재시도 중 (3회차)</BadgeWithSpinner>`

export const dos = [
  "진행 중인 백그라운드 작업(수집·배포·재시도)의 상태 셀·헤더에 붙인다.",
  "variant 는 badge-extended 의 success/warning/danger 시맨틱을 그대로 따른다 — 기본은 warning(진행 중).",
  "작업이 끝나면 일반 badge-extended 로 교체해 스피너를 남기지 않는다.",
]

export const donts = [
  "페이지·패널 전체 로딩에 쓰지 않는다 — 그건 spinner/skeleton 몫이다.",
  "스피너 색을 배지 variant 와 따로 놀게 커스텀하지 않는다.",
]
