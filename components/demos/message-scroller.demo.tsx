import { Bubble, BubbleContent } from "@/components/ui/bubble"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"

const TURNS = [
  { id: "1", align: "start" as const, text: "안녕하세요, 예약 변경이 가능할까요?" },
  { id: "2", align: "end" as const, text: "네, 어떤 날짜로 변경을 원하시나요?" },
  { id: "3", align: "start" as const, text: "다음 주 금요일 오후로 부탁드립니다." },
  { id: "4", align: "end" as const, text: "확인했습니다. 금요일 오후 3시로 변경해 드릴게요." },
  { id: "5", align: "start" as const, text: "감사합니다!" },
]

export const demo = (
  <MessageScrollerProvider defaultScrollPosition="end">
    <MessageScroller className="h-56 w-full max-w-sm rounded-lg border">
      <MessageScrollerViewport>
        <MessageScrollerContent className="p-4">
          {TURNS.map((turn) => (
            <MessageScrollerItem key={turn.id} messageId={turn.id}>
              <Bubble align={turn.align} variant={turn.align === "end" ? "default" : "muted"}>
                <BubbleContent>{turn.text}</BubbleContent>
              </Bubble>
            </MessageScrollerItem>
          ))}
        </MessageScrollerContent>
      </MessageScrollerViewport>
      <MessageScrollerButton direction="end" />
    </MessageScroller>
  </MessageScrollerProvider>
)

export const code = `<MessageScrollerProvider defaultScrollPosition="end">
  <MessageScroller className="h-56 rounded-lg border">
    <MessageScrollerViewport>
      <MessageScrollerContent className="p-4">
        {turns.map((turn) => (
          <MessageScrollerItem key={turn.id} messageId={turn.id}>
            <Bubble align={turn.align} variant={turn.align === "end" ? "default" : "muted"}>
              <BubbleContent>{turn.text}</BubbleContent>
            </Bubble>
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton direction="end" />
  </MessageScroller>
</MessageScrollerProvider>`

export const dos = [
  "MessageScrollerProvider로 MessageScroller 전체를 감싸야 자동 스크롤 상태가 공유된다.",
  "각 메시지에 고유한 messageId를 부여해 scrollToMessage로 특정 메시지를 가리킬 수 있게 한다.",
  "MessageScrollerButton으로 위로 스크롤한 뒤에도 최신 메시지로 돌아갈 수단을 제공한다.",
]

export const donts = [
  "고정 높이 컨테이너 없이 사용해 무한정 늘어나는 페이지 스크롤과 뒤섞이게 하지 않는다.",
  "MessageScrollerItem 없이 메시지를 나열해 뷰포트 밖 아이템의 렌더링 최적화를 놓치지 않는다.",
]
