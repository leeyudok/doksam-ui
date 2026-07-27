import { RocketLaunchIcon } from "@phosphor-icons/react/dist/ssr"
import type { Icon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

export interface AppLogoProps {
  /** 렌더할 Phosphor 아이콘 컴포넌트. 기본 RocketLaunchIcon. */
  icon?: Icon
  /** 아이콘 크기(px). 기본 18. */
  size?: number
  /** 컨테이너 크기/모양 클래스(size-*, rounded-* 등). */
  className?: string
  /** 접근성 라벨 — 로고가 링크 안에서 단독으로 쓰일 때 지정. */
  label?: string
}

/**
 * 앱 로고 아이콘 — primary 배경 타일 위에 Phosphor 아이콘을 올린다.
 * 로그인·사이드바 헤더 등에서 공용 사용(srope customs/app-logo 이식,
 * 환경변수 대신 icon prop 으로 아이콘을 주입).
 */
export function AppLogo({ icon: IconComp = RocketLaunchIcon, size = 18, className, label }: AppLogoProps) {
  return (
    <div
      className={cn("flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground", className)}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <IconComp size={size} aria-hidden />
    </div>
  )
}
