import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const demo = (
  <Tabs defaultValue="account" className="w-full max-w-sm">
    <TabsList>
      <TabsTrigger value="account">계정</TabsTrigger>
      <TabsTrigger value="password">비밀번호</TabsTrigger>
      <TabsTrigger value="billing">결제</TabsTrigger>
    </TabsList>
    <TabsContent value="account" className="pt-3 text-sm text-muted-foreground">
      표시 이름·이메일 등 계정 기본 정보를 관리합니다.
    </TabsContent>
    <TabsContent value="password" className="pt-3 text-sm text-muted-foreground">
      로그인 비밀번호를 변경하고 2단계 인증을 설정합니다.
    </TabsContent>
    <TabsContent value="billing" className="pt-3 text-sm text-muted-foreground">
      결제 수단과 청구 내역을 확인합니다.
    </TabsContent>
  </Tabs>
)

export const code = `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">계정</TabsTrigger>
    <TabsTrigger value="password">비밀번호</TabsTrigger>
    <TabsTrigger value="billing">결제</TabsTrigger>
  </TabsList>
  <TabsContent value="account">표시 이름·이메일 등 계정 기본 정보를 관리합니다.</TabsContent>
  <TabsContent value="password">로그인 비밀번호를 변경하고 2단계 인증을 설정합니다.</TabsContent>
  <TabsContent value="billing">결제 수단과 청구 내역을 확인합니다.</TabsContent>
</Tabs>`

export const dos = [
  "TabsTrigger 개수가 3~5개인 동등한 카테고리 전환에 사용한다.",
  "defaultValue 또는 controlled value를 항상 지정해 빈 화면 상태를 피한다.",
  "탭 하나당 콘텐츠 성격이 명확히 구분될 때만 사용한다 — 순차 단계에는 부적합하다.",
]

export const donts = [
  "탭 전환으로 폼 입력값이 사라지는 구조를 만들지 않는다 — 상태는 탭 밖에서 유지한다.",
  "탭 개수가 7개를 넘어가면 Tabs 대신 사이드 내비게이션이나 Select를 검토한다.",
]
