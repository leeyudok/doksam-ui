import { Badge } from "@/components/ui/badge"
import { FeedExplorer } from "@/app/templates/saas/_components/feed-explorer"

export default function SaasFeedPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          피드
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">업데이트 피드</h1>
        <p className="max-w-prose text-sm text-muted-foreground">
          워크스페이스별로 최근 릴리스, 엔지니어링 노트, 고객 사례를 모아봅니다.
        </p>
      </section>

      <FeedExplorer />
    </div>
  )
}
