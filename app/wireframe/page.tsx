import type { Metadata } from "next"

import { TranslatedText } from "@/components/showcase/translated-text"
import { WireframeBuilder } from "@/app/wireframe/_components/wireframe-builder"

export const metadata: Metadata = {
  title: "Wireframe — doksam-ui",
  description: "표준 컴포넌트를 드래그앤드랍으로 조립하는 와이어프레임 빌더",
}

export default function WireframePage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Wireframe</h1>
        <p className="max-w-2xl text-muted-foreground">
          <TranslatedText
            k="page.wireframe.description"
            ko="카탈로그의 표준 컴포넌트를 디바이스 프레임 위에 드래그앤드랍으로 조립해 와이어프레임을 만듭니다. 배치 결과는 데모 코드 기반 JSX 로 복사할 수 있습니다."
          />
        </p>
      </header>
      <WireframeBuilder />
    </div>
  )
}
