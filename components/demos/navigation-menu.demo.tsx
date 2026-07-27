import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export const demo = (
  <NavigationMenu viewport={false}>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>상품</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-48 gap-1 p-1">
            <li>
              <NavigationMenuLink href="#">신상품</NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink href="#">베스트</NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink href="#">할인전</NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>고객센터</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-48 gap-1 p-1">
            <li>
              <NavigationMenuLink href="#">자주 묻는 질문</NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink href="#">1:1 문의</NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="#">이벤트</NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
)

export const code = `<NavigationMenu viewport={false}>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>상품</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-48 gap-1 p-1">
          <li><NavigationMenuLink href="#">신상품</NavigationMenuLink></li>
          <li><NavigationMenuLink href="#">베스트</NavigationMenuLink></li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="#">이벤트</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`

export const dos = [
  "드롭다운이 필요 없는 단일 링크는 NavigationMenuTrigger 없이 NavigationMenuLink만 둔다.",
  "하위 메뉴 항목 수는 한 번에 훑어볼 수 있는 5~7개 이내로 유지한다.",
  "viewport 크기가 좁은 페이지에서는 viewport={false}로 레이아웃 밀림을 줄인다.",
]

export const donts = [
  "모바일 화면에서 그대로 사용하지 않는다 — 좁은 뷰포트에서는 Sheet 기반 메뉴로 전환한다.",
  "메뉴 트리거 라벨을 링크가 아닌 순수 설명 텍스트로 오용하지 않는다.",
]
