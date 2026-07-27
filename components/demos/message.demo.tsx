import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message"

export const demo = (
  <MessageGroup className="w-full max-w-sm">
    <Message>
      <MessageAvatar>
        <span className="flex size-8 items-center justify-center text-xs font-medium">
          지원
        </span>
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>고객지원 · 오전 10:02</MessageHeader>
        <p className="px-3 text-sm">안녕하세요, 무엇을 도와드릴까요?</p>
      </MessageContent>
    </Message>
    <Message align="end">
      <MessageContent>
        <MessageHeader className="justify-end">오전 10:03</MessageHeader>
        <p className="px-3 text-sm">주문 취소는 어디서 하나요?</p>
      </MessageContent>
    </Message>
  </MessageGroup>
)

export const code = `<MessageGroup>
  <Message>
    <MessageAvatar>
      <img src="/agent.png" alt="상담원" />
    </MessageAvatar>
    <MessageContent>
      <MessageHeader>고객지원 · 오전 10:02</MessageHeader>
      <p>안녕하세요, 무엇을 도와드릴까요?</p>
    </MessageContent>
  </Message>
  <Message align="end">
    <MessageContent>
      <MessageHeader className="justify-end">오전 10:03</MessageHeader>
      <p>주문 취소는 어디서 하나요?</p>
    </MessageContent>
  </Message>
</MessageGroup>`

export const dos = [
  "발신자가 나(align='end')인지 상대(align='start')인지에 따라 align을 명확히 구분한다.",
  "MessageGroup으로 연속된 메시지를 묶어 간격 리듬을 통일한다.",
  "MessageAvatar는 상대 메시지에만 붙이고, 내 메시지에는 생략해 반복을 줄인다.",
]

export const donts = [
  "MessageContent 안에 발신자 이름·시간·본문을 구분 없이 한 줄로 뭉치지 않는다.",
  "Message를 폼 입력이나 버튼 그룹 같은 비대화형 콘텐츠에 사용하지 않는다.",
]
