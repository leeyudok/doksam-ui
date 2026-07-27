import { ChartBarIcon, GearIcon, HouseIcon, UsersIcon } from "@phosphor-icons/react/dist/ssr"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

/**
 * 페이지 전체 사이드바가 아니라 데모 카드 안에 스코프된 미니 인라인 예시.
 * collapsible="none"은 Sidebar 내부의 fixed 포지셔닝 분기를 타지 않아
 * 뷰포트가 아닌 부모 컨테이너 안에 안전하게 렌더링된다.
 */
export const demo = (
  <div className="h-72 w-full max-w-md overflow-hidden rounded-lg border">
    <SidebarProvider className="h-full min-h-0">
      <Sidebar collapsible="none" className="w-44 border-r">
        <SidebarHeader className="px-3 py-2 text-sm font-medium">
          doksam-ui
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>워크스페이스</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <HouseIcon />
                    <span>홈</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <ChartBarIcon />
                    <span>리포트</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <UsersIcon />
                    <span>팀원</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <GearIcon />
                <span>설정</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex items-center justify-center p-4 text-sm text-muted-foreground">
        선택한 메뉴의 콘텐츠 영역
      </SidebarInset>
    </SidebarProvider>
  </div>
)

export const code = `<div className="h-72 overflow-hidden rounded-lg border">
  <SidebarProvider className="h-full min-h-0">
    <Sidebar collapsible="none" className="w-44 border-r">
      <SidebarHeader>doksam-ui</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>워크스페이스</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <HouseIcon />
                  <span>홈</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton>
          <GearIcon />
          <span>설정</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
    <SidebarInset>선택한 메뉴의 콘텐츠 영역</SidebarInset>
  </SidebarProvider>
</div>`

export const dos = [
  "페이지 전체 앱 셸에는 collapsible='icon' + fixed 포지셔닝을 쓰고, 카드 안 미리보기 등 스코프된 영역에는 collapsible='none'을 쓴다.",
  "SidebarProvider는 반드시 Sidebar와 SidebarInset을 함께 감싸는 최상위에 둔다.",
  "활성 메뉴는 SidebarMenuButton의 isActive로 표시해 별도 배경색 하드코딩을 피한다.",
]

export const donts = [
  "SidebarProvider 없이 Sidebar만 단독으로 렌더링하지 않는다 — useSidebar 컨텍스트 에러가 발생한다.",
  "미니 인라인 데모에 collapsible='icon'을 그대로 써서 fixed 포지셔닝이 부모 컨테이너를 탈출하게 하지 않는다.",
]
