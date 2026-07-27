import { ChatWidgetDemo } from "./chat-widget.demo.client"

export const demo = <ChatWidgetDemo />

export const code = `<ChatWidget
  messages={messages}            {/* chat/whisper/system 3종 */}
  connected={wsConnected}
  unread={unreadCount}
  currentUsername={me.username}
  onOpen={resetUnread}
  onSend={(content) => ws.send(content)} />
{/* 기본 fixed 우하단 — 컨테이너에 가두려면 className="absolute …" 로 덮어쓴다 */}`

export const dos = [
  "실시간 연동(WebSocket·SSE)은 호출부가 소유하고, 위젯엔 messages/onSend 만 넘긴다.",
  "미읽음 배지는 닫힘 상태에서만 보인다 — onOpen 에서 미읽음을 리셋한다.",
  "귓속말은 warning 틴트 + 점선 테두리로 일반 말풍선과 구분된다.",
]

export const donts = [
  "풀페이지 대화 화면에 쓰지 않는다 — 그건 templates/chat 몫이고, 이건 화면 구석 상주형이다.",
  "한 화면에 위젯을 두 개 이상 띄우지 않는다.",
]
