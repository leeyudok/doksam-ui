import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const demo = (
  <Card className="w-full max-w-sm">
    <CardHeader>
      <CardTitle>프로 플랜</CardTitle>
      <CardDescription>팀 협업에 필요한 기능을 모두 제공합니다.</CardDescription>
      <CardAction>
        <Button variant="outline" size="sm">
          비교하기
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-semibold">
        29,000원 <span className="text-sm font-normal text-muted-foreground">/ 월</span>
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        멤버 최대 20명, 무제한 프로젝트, 우선 지원을 포함합니다.
      </p>
    </CardContent>
    <CardFooter>
      <Button className="w-full">
        구독 시작하기
        <ArrowRightIcon size={16} weight="regular" />
      </Button>
    </CardFooter>
  </Card>
)

export const code = `<Card>
  <CardHeader>
    <CardTitle>프로 플랜</CardTitle>
    <CardDescription>팀 협업에 필요한 기능을 모두 제공합니다.</CardDescription>
    <CardAction>
      <Button variant="outline" size="sm">비교하기</Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <p>29,000원 / 월</p>
    <p>멤버 최대 20명, 무제한 프로젝트, 우선 지원을 포함합니다.</p>
  </CardContent>
  <CardFooter>
    <Button className="w-full">구독 시작하기</Button>
  </CardFooter>
</Card>`

export const dos = [
  "CardHeader에 제목·설명·보조 액션을 함께 두어 스캔하기 쉬운 정보 위계를 만든다.",
  "카드 안 여백은 --card-spacing 토큰을 따르는 CardContent/CardFooter를 사용해 통일한다.",
  "카드 전체가 하나의 클릭 대상이면 CardAction 대신 카드 자체를 링크로 감싼다.",
]

export const donts = [
  "CardFooter 없이 버튼을 CardContent 안에 임의 마진으로 붙이지 않는다.",
  "카드 배경을 className으로 직접 칠해 다크 모드 대비를 깨지 않는다.",
]
