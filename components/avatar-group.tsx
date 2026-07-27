import * as React from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup as AvatarGroupStack,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export interface AvatarGroupUser {
  /** 표시 이름. Fallback 이니셜을 자동 생성하는 데도 쓰인다. */
  name: string
  /** 이니셜을 직접 지정하고 싶을 때. 생략하면 name 앞 2글자를 쓴다. */
  fallback?: string
}

export interface AvatarGroupProps extends React.ComponentProps<"div"> {
  users: AvatarGroupUser[]
  /** 겹쳐서 보여줄 최대 인원. 초과분은 "+N"으로 축약. 기본 4. */
  max?: number
  size?: "default" | "sm" | "lg"
}

function initialsOf(name: string) {
  return name.trim().slice(0, 2)
}

/**
 * 스택형 아바타 그룹(#36) — users 목록을 max개까지 겹쳐 보여주고 초과 인원은
 * "+N"으로 축약한다. components/ui/avatar.tsx의 AvatarGroup/AvatarGroupCount
 * 프리미티브를 그대로 재사용하는 고수준 래퍼. 외부 이미지 없이 이니셜
 * Fallback만 사용한다.
 */
function AvatarGroup({ users, max = 4, size = "default", className, ...props }: Readonly<AvatarGroupProps>) {
  const visible = users.slice(0, max)
  const overflow = users.length - visible.length

  return (
    <AvatarGroupStack data-slot="avatar-group" data-size={size} className={cn(className)} {...props}>
      {visible.map((user, index) => (
        <Avatar key={`${user.name}-${index}`} size={size}>
          <AvatarFallback aria-label={user.name}>{user.fallback ?? initialsOf(user.name)}</AvatarFallback>
        </Avatar>
      ))}
      {overflow > 0 && <AvatarGroupCount>+{overflow}</AvatarGroupCount>}
    </AvatarGroupStack>
  )
}

export { AvatarGroup }
