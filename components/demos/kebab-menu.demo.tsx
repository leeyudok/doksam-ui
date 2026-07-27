import { KebabMenuDemo } from "./kebab-menu.demo.client";

export const demo = <KebabMenuDemo />;

export const code = `const [lastAction, setLastAction] = useState<string | null>(null)

<KebabMenu
  label="파일 옵션"
  items={[
    { label: "이름 변경", icon: <PencilSimpleIcon size={16} weight="regular" />, onSelect: () => setLastAction("이름 변경") },
    { label: "공유", icon: <ShareNetworkIcon size={16} weight="regular" />, onSelect: () => setLastAction("공유") },
    "separator",
    { label: "삭제", icon: <TrashIcon size={16} weight="regular" />, variant: "destructive", onSelect: () => setLastAction("삭제") },
  ]}
/>`;

export const dos = [
  "label 하나로 트리거 아이콘 버튼의 aria-label을 강제로 채운다 — 케밥(⋮) 버튼은 텍스트가 없어 이게 유일한 접근 라벨이다.",
  "성격이 다른 액션(삭제 등)은 \"separator\"로 그룹을 가르고 destructive variant로 시각적으로 분리한다.",
  "행(row)·카드 우상단의 '더보기' 액션 묶음에 기본으로 사용한다.",
  "onSelect 핸들러가 필요하므로 데모/사용처는 클라이언트 컴포넌트에서 렌더한다 — 서버 컴포넌트는 함수 prop을 넘길 수 없다.",
];

export const donts = [
  "항목이 6~7개를 넘어가면 케밥 메뉴에 몰아넣지 말고 별도 페이지나 Command(검색형)로 전환한다.",
  "케밥 메뉴 안에 폼 입력·긴 문단처럼 무거운 콘텐츠를 넣지 않는다 — 짧은 액션 목록 전용이다.",
];
