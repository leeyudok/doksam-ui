import type { Metadata } from "next"
import { GlobeIcon } from "@phosphor-icons/react/dist/ssr"

import { BlueprintGuide, BpCode, type BlueprintGuideData } from "@/app/templates/_blueprint/blueprint"

export const metadata: Metadata = {
  title: "쿠버네티스 방화벽 — 아파트로 이해하기 · doksam-ui 템플릿",
  description: "쿠버네티스 4겹 보안(NetworkPolicy·Security Group·Ingress·OS Firewall)을 아파트 단지 비유로 설명하는 블루프린트 템플릿",
}

const GUIDE: BlueprintGuideData = {
  tag: "BLUEPRINT · 2026",
  kicker: "K8s × Junior Dev Guide",
  title: (
    <>
      쿠버네티스 방화벽을
      <br />
      <span style={{ color: "var(--rust)", fontStyle: "italic" }}>아파트 단지</span>로 이해하기
    </>
  ),
  subtitle: (
    <>
      클러스터 = 단지 · Pod = 세대 · Node = 동.
      <br />이 단지에는 <strong>4겹의 보안</strong>이 있습니다.
    </>
  ),
  diagram: {
    label: "ARCHITECTURAL DIAGRAM · 전체 구조",
    entry: { icon: <GlobeIcon aria-hidden />, text: "외부 인터넷" },
    gates: [
      { label: "② 경비실", title: "Security Group · LoadBalancer", tone: "primary" },
      { label: "③ 안내데스크", title: "Ingress Controller", tone: "secondary" },
    ],
    nodes: [
      { name: "NODE A", units: ["Pod 101", "Pod 102"] },
      { name: "NODE B", units: ["Pod 201", "Pod 202"] },
      { name: "NODE C", units: ["Pod 301", "Pod 302"] },
    ],
    footnote: "① 세대 현관문 (NetworkPolicy) · ④ 집 도어락 (OS Firewall)",
  },
  conceptsNum: "4",
  conceptsCaption: "LAYERS OF SECURITY",
  layers: [
    {
      num: "01",
      title: "NetworkPolicy",
      eq: "≈ 세대 현관문",
      analogy: "같은 단지 안에서 집과 집 사이 드나드는 걸 막는 문",
      items: [
        { text: '"A동 101호 ↔ B동 202호 통신해도 돼?"를 결정' },
        { text: <>기본값은 <strong>&quot;아무나 다 드나들 수 있음&quot;</strong> — 이게 위험!</>, warn: true },
        { text: '"얘랑 얘만 통신 OK"라고 명시적으로 규칙을 작성' },
        { text: <>CNI 플러그인이 <BpCode>Calico</BpCode>, <BpCode>Cilium</BpCode> 등이어야 작동</> },
        { text: <><BpCode>Flannel</BpCode>은 NetworkPolicy를 무시함</>, warn: true },
      ],
    },
    {
      num: "02",
      title: "Security Group",
      eq: "≈ 단지 출입구 경비실",
      analogy: "외부에서 단지로 들어오는 차량을 막는 경비실",
      items: [
        { text: "AWS, GCP 같은 클라우드에서 제공" },
        { text: '"외부 인터넷 → 노드"로 들어오는 트래픽을 차단' },
        { text: <>자주 막히는 포인트: <BpCode>6443</BpCode> (API 서버)</> },
        { text: <>NodePort 서비스 쓸 땐 <BpCode>30000-32767</BpCode> 범위 허용 필요</> },
      ],
    },
    {
      num: "03",
      title: "Ingress / LoadBalancer",
      eq: "≈ 안내데스크",
      analogy: '"어떤 집에 찾아왔어요?"라고 용건을 묻는 데스크',
      items: [
        { text: <>도메인/경로 기반 라우팅 (<BpCode>/api → A</BpCode>, <BpCode>/admin → B</BpCode>)</> },
        { text: "특정 소스 IP만 접속 허용하는 차단도 여기서 가능" },
        { text: <>우리가 흔히 보는 <strong>&quot;외부 노출&quot;</strong>의 지점</> },
        { text: "L7 레벨의 필터링까지 가능 (HTTP 헤더, 호스트 등)" },
      ],
    },
    {
      num: "04",
      title: "Node OS Firewall",
      eq: "≈ 집 자체 도어락",
      analogy: "노드 서버의 iptables · ufw · firewalld",
      items: [
        { text: <><strong>건드리지 마세요.</strong></>, warn: true },
        { text: <>쿠버네티스가 <BpCode>kube-proxy</BpCode>로 자동 관리 중</> },
        { text: "수동으로 손대면 내부 통신이 모두 끊길 수 있음" },
        { text: "꼭 필요하면 K8s 규칙과 충돌하지 않게 반영" },
      ],
    },
  ],
  troubleTitle: "문제 생겼을 때",
  troubleTag: "TROUBLESHOOTING",
  troubles: [
    { symptom: "Pod끼리 통신 안 됨", where: "NetworkPolicy" },
    { symptom: "외부에서 접속 안 됨", where: "Security Group / LB" },
    { symptom: "도메인 라우팅 이상", where: "Ingress" },
    { symptom: "갑자기 다 끊김", where: "OS 방화벽 건드린 사람 찾기" },
  ],
  devNote: (
    <>
      <strong>Java / Spring 개발자 관점 비유:</strong>
      <br />
      <strong>NetworkPolicy</strong>는 <BpCode>Spring Security</BpCode>의 내부 권한 체크,{" "}
      <strong>Security Group</strong>은 L7 앞단의 <BpCode>WAF / L4 장비</BpCode>라고 생각하시면 감이 더 잘 오실 거예요.
    </>
  ),
  footer: "— END OF BLUEPRINT —",
}

export default function K8sFirewallTemplatePage() {
  return <BlueprintGuide data={GUIDE} />
}
