import { MapPinIcon } from "@phosphor-icons/react/dist/ssr"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { COMPANY } from "../_data/company"

/**
 * 위치 카드(#53) — 실지도 임베드 없이 토큰 색 placeholder 박스 + MapPinIcon 으로
 * 소재지를 표현한다. bg-muted 격자 박스에 가상 주소를 얹는 정적 데모다.
 */
export function LocationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <MapPinIcon className="size-4" />
          소재지
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div
          aria-hidden
          className="relative flex h-44 items-center justify-center overflow-hidden rounded-lg border border-dashed bg-muted"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
            <MapPinIcon className="size-6" weight="fill" />
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{COMPANY.address}</p>
      </CardContent>
    </Card>
  )
}
