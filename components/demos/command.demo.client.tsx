"use client"

import { useState } from "react"
import { MapPinIcon, PackageIcon, QuestionIcon, UserCircleIcon } from "@phosphor-icons/react/dist/ssr"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export function CommandDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        명령어 검색
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="명령어 검색"
        description="이동할 페이지나 실행할 작업을 검색합니다."
      >
        <CommandInput placeholder="검색할 명령어를 입력하세요..." />
        <CommandList>
          <CommandEmpty>일치하는 결과가 없습니다.</CommandEmpty>
          <CommandGroup heading="이동">
            <CommandItem>
              <UserCircleIcon size={16} weight="regular" />
              내 프로필
            </CommandItem>
            <CommandItem>
              <PackageIcon size={16} weight="regular" />
              주문 내역
            </CommandItem>
            <CommandItem>
              <MapPinIcon size={16} weight="regular" />
              배송지 관리
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="지원">
            <CommandItem>
              <QuestionIcon size={16} weight="regular" />
              고객센터 문의
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
