import { GraduationCapIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"

import { ElearningPlayer } from "./_components/elearning-player"
import { COURSE, TOTAL_LESSONS } from "./_data/course"

export default function ElearningPlayerPage() {
  return (
    <div className="flex w-full max-w-6xl flex-col gap-6">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          <GraduationCapIcon weight="fill" aria-hidden />
          Learning · 콘텐츠 플레이어
        </Badge>
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">학습 콘텐츠 플레이어</h2>
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
          챕터 {COURSE.chapters.length}개 · 강의 {TOTAL_LESSONS}편으로 구성된 가상 코스입니다. 좌측 사이드바에서 강의를
          고르면 중앙 플레이어에 로드되고, 완료 강의는 체크 표시됩니다. 자동 재생을 켜면 강의 종료 후 다음 강의로
          카운트다운되며, AI 요약 버튼으로 강의 핵심을 모달로 볼 수 있습니다. 영상은 실제로 재생되지 않는 정적 데모입니다.
        </p>
      </section>

      <ElearningPlayer />
    </div>
  )
}
