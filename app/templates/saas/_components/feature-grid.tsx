import { Card, CardContent } from "@/components/ui/card"
import { FEATURES } from "@/app/templates/saas/_lib/data"

export function FeatureGrid() {
  return (
    <section className="flex flex-col gap-6">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">팀이 필요로 하는 모든 기능</h2>
        <p className="text-sm text-muted-foreground">
          워크스페이스 통합부터 자동화까지, 흩어진 업무 도구를 하나로 모읍니다.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => {
          const Icon = feature.icon
          return (
            <Card key={feature.title}>
              <CardContent className="flex flex-col gap-3 px-5 py-5">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon size={20} weight="duotone" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
