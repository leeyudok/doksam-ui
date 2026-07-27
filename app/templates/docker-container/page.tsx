import type { Metadata } from "next"
import { FileTextIcon } from "@phosphor-icons/react/dist/ssr"

import { BlueprintGuide, BpCode, type BlueprintGuideData } from "@/app/templates/_blueprint/blueprint"

export const metadata: Metadata = {
  title: "도커 컨테이너 — 밀키트 요리로 이해하기 · doksam-ui 템플릿",
  description: "도커 핵심 개념(Image·Container·Volume·Registry)을 밀키트 요리 비유로 설명하는 블루프린트 템플릿",
}

const GUIDE: BlueprintGuideData = {
  tag: "RECIPE · 2026",
  kicker: "Docker × Junior Dev Guide",
  title: (
    <>
      도커 컨테이너를
      <br />
      <span style={{ color: "var(--rust)", fontStyle: "italic" }}>밀키트 요리</span>로 이해하기
    </>
  ),
  subtitle: (
    <>
      Dockerfile = 레시피 · Image = 냉동 밀키트 · Container = 데운 요리.
      <br />
      <strong>레시피 → 밀키트 → 완성 요리</strong>로 이어지는 한 끼의 흐름입니다.
    </>
  ),
  diagram: {
    label: "KITCHEN FLOW · build → run",
    entry: { icon: <FileTextIcon aria-hidden />, text: "Dockerfile · 레시피 카드" },
    gates: [
      { label: "① docker build", title: "IMAGE · 냉동 밀키트 (아직 못 먹음)", tone: "primary" },
      { label: "② docker run", title: "데우기 → 접시에 담기", tone: "secondary" },
    ],
    nodes: [
      { name: "HOST A · 주방", units: ["web 컨테이너", "api 컨테이너"] },
      { name: "HOST B · 주방", units: ["db 컨테이너", "cache 컨테이너"] },
    ],
    footnote: "③ Docker Hub (밀키트 쇼핑몰 · push/pull) · ④ Volume (냉장고 · 데이터 보관)",
  },
  conceptsNum: "4",
  conceptsCaption: "CORE CONCEPTS",
  layers: [
    {
      num: "01",
      title: "Image",
      eq: "≈ 냉동 밀키트",
      analogy: "손질·계량 다 끝난 재료 묶음 — 근데 아직 안 익혔어요",
      items: [
        { text: <>레시피(<BpCode>Dockerfile</BpCode>)대로 <BpCode>docker build</BpCode>하면 만들어짐</> },
        { text: <>여러 <strong>layer</strong>(재료가 켜켜이)로 쌓임 — 안 바뀐 재료는 캐시 재사용</> },
        { text: "불변(immutable): 한 번 만들면 안 바뀜, 몇 번을 데워도 원본은 그대로" },
        { text: <>이미지 자체는 <strong>실행 상태가 아님</strong> — 냉동고에 든 상태일 뿐</>, warn: true },
        { text: <><BpCode>docker pull nginx:1.25</BpCode>로 Docker Hub에서 받아옴</> },
      ],
    },
    {
      num: "02",
      title: "Container",
      eq: "≈ 데워서 접시에 담은 요리",
      analogy: "밀키트를 실제로 데우고 조리해 먹을 수 있게 된 상태",
      items: [
        { text: <><BpCode>docker run</BpCode>하면 이미지가 컨테이너로 &quot;살아남&quot;</> },
        { text: "같은 밀키트(이미지) 하나로 접시 여러 개(컨테이너 N개) 가능" },
        { text: "서로 격리됨 — 옆 접시랑 안 섞임 (프로세스·네트워크 분리)" },
        { text: <>컨테이너를 지우면 <strong>그 안에서 만든 건 다 증발</strong> → Volume 필요</>, warn: true },
      ],
    },
    {
      num: "03",
      title: "Volume",
      eq: "≈ 냉장고",
      analogy: "접시(컨테이너)를 치워도 남아있는 별도 저장고",
      items: [
        { text: <>컨테이너 생명주기와 <strong>분리된</strong> 데이터 저장 공간</> },
        { text: "DB 데이터·업로드 파일처럼 유지해야 하는 건 전부 여기에" },
        { text: <><BpCode>-v mydata:/var/lib/...</BpCode>로 호스트 폴더/볼륨을 마운트</> },
        { text: <>볼륨 안 붙이면 재시작·재배포 때 <strong>데이터 통째로 날아감</strong></>, warn: true },
      ],
    },
    {
      num: "04",
      title: "Registry",
      eq: "≈ 밀키트 쇼핑몰",
      analogy: "만든 밀키트를 올려두고 어디서든 받아 쓰는 창고 (Docker Hub 등)",
      items: [
        { text: <><BpCode>docker push</BpCode>로 올리고 <BpCode>docker pull</BpCode>로 받음</> },
        { text: <>태그(tag)로 버전 구분 — <BpCode>myapp:1.4.0</BpCode>처럼</> },
        { text: <><BpCode>latest</BpCode> 태그만 쓰면 <strong>어떤 버전인지 아무도 모름</strong> — 배포 지옥</>, warn: true },
        { text: "사내 private registry(Harbor·GitLab Registry 등)도 가능" },
      ],
    },
  ],
  troubleTitle: "문제 생겼을 때",
  troubleTag: "TROUBLESHOOTING",
  troubles: [
    { symptom: "이미지 용량이 폭탄", where: "레이어 정리 / 멀티스테이지 빌드" },
    { symptom: "컨테이너 지우니 데이터 증발", where: "Volume" },
    { symptom: "localhost로 접속 안 됨", where: "포트 매핑 (-p)" },
    { symptom: "latest인데 왜 옛날 버전?", where: "이미지 태그 / 다시 pull" },
  ],
  devNote: (
    <>
      <strong>Java / Spring 개발자 관점 비유:</strong>
      <br />
      <strong>Image</strong>는 빌드된 <BpCode>jar/war</BpCode>(실행 가능한 산출물, 근데 <BpCode>java -jar</BpCode> 해야 뜸),{" "}
      <strong>Container</strong>는 실제로 떠 있는 <BpCode>JVM 프로세스</BpCode>, <strong>Volume</strong>은 밖에서 마운트한{" "}
      <BpCode>application.yml · 로그 경로</BpCode>라고 생각하시면 감이 더 잘 오실 거예요.
    </>
  ),
  footer: "— END OF RECIPE —",
}

export default function DockerContainerTemplatePage() {
  return <BlueprintGuide data={GUIDE} />
}
