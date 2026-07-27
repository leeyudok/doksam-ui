import { NewspaperIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { NEWS } from "../_data/company"

/**
 * 뉴스 피드(#53) — 가상 헤드라인 8건을 출처·날짜·논조 태그와 함께 리스트로 쌓는다.
 * bizinfo BizNewsCard 의 목록 구조만 참고했고 기사·출처는 전부 가상이다.
 */
export function NewsFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <NewspaperIcon className="size-4" />
          뉴스 피드
          <span className="text-xs font-normal text-muted-foreground">{NEWS.length}건</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col divide-y divide-border">
          {NEWS.map((item) => (
            <li key={item.id} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
              <p className="text-sm leading-snug font-medium">{item.title}</p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="ghost" className="border-border">
                  {item.tag}
                </Badge>
                <span>{item.source}</span>
                <span aria-hidden>·</span>
                <time dateTime={item.date} className="font-mono">
                  {item.date}
                </time>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
