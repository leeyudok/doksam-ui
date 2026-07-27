import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const NOTIFICATIONS = [
  "김지원 님이 댓글을 남겼습니다.",
  "결제가 정상적으로 처리되었습니다.",
  "새 팀원이 워크스페이스에 합류했습니다.",
  "박서연 님이 회원님을 태그했습니다.",
  "예약된 배포가 완료되었습니다.",
  "이번 주 리포트가 생성되었습니다.",
  "구독이 다음 달 자동 갱신됩니다.",
]

export const demo = (
  <ScrollArea className="h-48 w-full max-w-sm rounded-lg border">
    <div className="p-4">
      {NOTIFICATIONS.map((item, index) => (
        <div key={item}>
          <p className="py-2 text-sm">{item}</p>
          {index < NOTIFICATIONS.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  </ScrollArea>
)

export const code = `<ScrollArea className="h-48 rounded-lg border">
  <div className="p-4">
    {NOTIFICATIONS.map((item) => (
      <p key={item} className="py-2 text-sm">{item}</p>
    ))}
  </div>
</ScrollArea>`

export const dos = [
  "컨테이너에 명시적 높이(h-*)를 지정해야 스크롤 영역이 정상 동작한다.",
  "브라우저 기본 스크롤바 대신 커스텀 스크롤바가 필요한 좁은 패널에만 사용한다.",
]

export const donts = [
  "페이지 전체 스크롤에 ScrollArea를 씌워 브라우저 네이티브 스크롤·검색을 방해하지 않는다.",
  "내부 콘텐츠 높이가 컨테이너보다 작을 때도 무조건 감싸 불필요한 DOM을 늘리지 않는다.",
]
